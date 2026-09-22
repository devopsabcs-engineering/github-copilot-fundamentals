#!/usr/bin/env node
/**
 * Structural validator for the generated bilingual workshop decks.
 *
 * Promoted from the throwaway scratch validator used during Implementation
 * Phase 4 so that the structural contract is tracked, reviewable, and runnable
 * in CI rather than living in a gitignored build directory.
 *
 * Every expectation is READ FROM slides/content.json and docs/_data/strings.yml.
 * Nothing about the deck is hardcoded here, so the manifest stays the single
 * source of truth and this file cannot silently disagree with it.
 *
 * Usage:
 *   node scripts/validate-workshop-deck.js <deck-directory>
 *
 * The deck directory is REQUIRED and has no default, for the same reason the
 * generator refuses to guess one: a silent default would let a validation run
 * report on a directory the operator did not mean to inspect.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { XMLParser } from 'fast-xml-parser';
import JSZip from 'jszip';
import yaml from 'js-yaml';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');
const MANIFEST_PATH = path.join(REPO_ROOT, 'slides', 'content.json');

const REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const REL_TYPE_SLIDE = `${REL_NS}/slide`;
const REL_TYPE_NOTES_SLIDE = `${REL_NS}/notesSlide`;
const REL_TYPE_IMAGE = `${REL_NS}/image`;
const REL_TYPE_HYPERLINK = `${REL_NS}/hyperlink`;

const EMAIL_PATTERN = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

const USAGE = [
  'Usage: node scripts/validate-workshop-deck.js <deck-directory>',
  '',
  '  <deck-directory>  REQUIRED. Directory holding the generated .pptx files.',
  '                    There is no default. Example: docs/assets/decks',
  '  --help            Show this message.'
].join('\n');

/** Collects failures so one run reports every violation instead of the first. */
class Failures {
  constructor() {
    this.items = [];
  }

  add(scope, message) {
    this.items.push({ scope, message });
  }

  get count() {
    return this.items.length;
  }
}

function fatal(message) {
  console.error(`ERROR  ${message}`);
  process.exit(2);
}

function parseArgs(argv) {
  const positional = [];
  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      console.log(USAGE);
      process.exit(0);
    }
    if (arg.startsWith('-')) {
      console.error(`ERROR  Unknown option "${arg}".`);
      console.error('');
      console.error(USAGE);
      process.exit(2);
    }
    positional.push(arg);
  }
  if (positional.length !== 1) {
    console.error('ERROR  Exactly one argument is required: the deck directory.');
    console.error('');
    console.error(USAGE);
    process.exit(2);
  }
  return positional[0];
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return fatal(`Cannot read ${path.relative(REPO_ROOT, filePath)}: ${error.message}`);
  }
}

function readYaml(filePath) {
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return fatal(`Cannot read ${path.relative(REPO_ROOT, filePath)}: ${error.message}`);
  }
}

function makeParser() {
  return new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    parseTagValue: false,
    parseAttributeValue: false,
    trimValues: false,
    isArray: (name) => name === 'p:sldId' || name === 'Relationship'
  });
}

function asArray(value) {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

/** Returns the text of every <a:t> run in document order. */
function collectRuns(node, out = []) {
  if (node === null || typeof node !== 'object') {
    return out;
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      collectRuns(item, out);
    }
    return out;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === 'a:t') {
      for (const run of asArray(value)) {
        if (typeof run === 'string') {
          out.push(run);
        } else if (run && typeof run === 'object' && typeof run['#text'] === 'string') {
          out.push(run['#text']);
        }
      }
      continue;
    }
    collectRuns(value, out);
  }
  return out;
}

/** Returns every relationship identifier referenced by attribute in a part. */
function collectRelReferences(node, out = new Set()) {
  if (node === null || typeof node !== 'object') {
    return out;
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      collectRelReferences(item, out);
    }
    return out;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('@_') && /^@_r:(id|embed|link|pict|dm|lo|qs|cs)$/.test(key)) {
      if (typeof value === 'string' && value !== '') {
        out.add(value);
      }
      continue;
    }
    collectRelReferences(value, out);
  }
  return out;
}

function relsPathFor(partPath) {
  const dir = path.posix.dirname(partPath);
  const base = path.posix.basename(partPath);
  return dir === '.' ? `_rels/${base}.rels` : `${dir}/_rels/${base}.rels`;
}

function resolveTarget(partPath, target) {
  const dir = path.posix.dirname(partPath);
  const joined = dir === '.' ? target : path.posix.join(dir, target);
  return path.posix.normalize(joined).replace(/^\/+/, '');
}

function normalizeWhitespace(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function firstText(node) {
  if (typeof node === 'string') {
    return node;
  }
  if (node && typeof node === 'object' && typeof node['#text'] === 'string') {
    return node['#text'];
  }
  return undefined;
}

async function readPart(zip, partPath) {
  const entry = zip.file(partPath);
  if (!entry) {
    return null;
  }
  return entry.async('string');
}

async function readRelationships(zip, parser, partPath) {
  const relsPath = relsPathFor(partPath);
  const xml = await readPart(zip, relsPath);
  if (xml === null) {
    return { relsPath, present: false, byId: new Map(), all: [] };
  }
  const parsed = parser.parse(xml);
  const all = asArray(parsed?.Relationships?.Relationship).map((rel) => ({
    id: rel['@_Id'],
    type: rel['@_Type'],
    target: rel['@_Target'],
    external: rel['@_TargetMode'] === 'External'
  }));
  return { relsPath, present: true, byId: new Map(all.map((rel) => [rel.id, rel])), all };
}

/**
 * Walks every part that has a .rels companion and reports dangling identifiers,
 * unresolved internal targets, empty media parts, and malformed hyperlinks.
 */
async function checkRelationshipGraph(zip, parser, scope, failures) {
  const partPaths = Object.keys(zip.files).filter(
    (name) => !zip.files[name].dir && name.endsWith('.xml') && !name.includes('/_rels/') && !name.startsWith('_rels/')
  );

  for (const partPath of partPaths) {
    const rels = await readRelationships(zip, parser, partPath);
    const xml = await readPart(zip, partPath);
    if (xml === null) {
      continue;
    }

    let parsed;
    try {
      parsed = parser.parse(xml);
    } catch (error) {
      failures.add(scope, `${partPath} is not parseable XML: ${error.message}`);
      continue;
    }

    for (const referenced of collectRelReferences(parsed)) {
      if (!rels.byId.has(referenced)) {
        failures.add(
          scope,
          `${partPath} references relationship "${referenced}" but ${rels.relsPath} does not declare it.`
        );
      }
    }

    for (const rel of rels.all) {
      if (rel.external) {
        if (rel.type === REL_TYPE_HYPERLINK && !/^https?:\/\/\S+$/.test(rel.target ?? '')) {
          failures.add(scope, `${rels.relsPath}: hyperlink "${rel.id}" target "${rel.target}" is not an absolute http(s) URL.`);
        }
        continue;
      }
      const resolved = resolveTarget(partPath, rel.target ?? '');
      const entry = zip.file(resolved);
      if (!entry) {
        failures.add(
          scope,
          `${rels.relsPath}: relationship "${rel.id}" points at "${rel.target}", which resolves to a missing part "${resolved}".`
        );
        continue;
      }
      if (rel.type === REL_TYPE_IMAGE) {
        const bytes = await entry.async('uint8array');
        if (bytes.length === 0) {
          failures.add(scope, `${rels.relsPath}: media part "${resolved}" is zero bytes.`);
        }
      }
    }
  }
}

async function readSlideOrder(zip, parser, scope, failures) {
  const presentationPath = 'ppt/presentation.xml';
  const xml = await readPart(zip, presentationPath);
  if (xml === null) {
    failures.add(scope, `${presentationPath} is missing, so the package is not a presentation.`);
    return [];
  }

  const parsed = parser.parse(xml);
  const rels = await readRelationships(zip, parser, presentationPath);
  const sldIds = asArray(parsed?.['p:presentation']?.['p:sldIdLst']?.['p:sldId']);

  const ordered = [];
  for (const sldId of sldIds) {
    const rId = sldId['@_r:id'];
    const rel = rels.byId.get(rId);
    if (!rel || rel.type !== REL_TYPE_SLIDE) {
      failures.add(scope, `presentation.xml slide reference "${rId}" does not resolve to a slide relationship.`);
      continue;
    }
    ordered.push(resolveTarget(presentationPath, rel.target));
  }
  return ordered;
}

async function checkDocumentProperties({ zip, parser, scope, locale, manifest, failures }) {
  const shared = manifest.deck.metadata.shared;
  const localeMeta = manifest.deck.metadata.byLocale[locale];

  const coreXml = await readPart(zip, 'docProps/core.xml');
  const appXml = await readPart(zip, 'docProps/app.xml');

  if (coreXml === null) {
    failures.add(scope, 'docProps/core.xml is missing, so document properties cannot be verified.');
  }
  if (appXml === null) {
    failures.add(scope, 'docProps/app.xml is missing, so document properties cannot be verified.');
  }
  if (coreXml === null || appXml === null) {
    return;
  }

  const core = parser.parse(coreXml)?.['cp:coreProperties'] ?? {};
  const app = parser.parse(appXml)?.Properties ?? {};

  const expectations = [
    ['docProps/core.xml dc:title', firstText(core['dc:title']), localeMeta.title],
    ['docProps/core.xml dc:subject', firstText(core['dc:subject']), localeMeta.subject],
    ['docProps/core.xml dc:creator', firstText(core['dc:creator']), shared.author],
    ['docProps/core.xml cp:lastModifiedBy', firstText(core['cp:lastModifiedBy']), shared.author],
    ['docProps/app.xml Company', firstText(app.Company), shared.company]
  ];

  for (const [label, actual, expected] of expectations) {
    if (actual !== expected) {
      failures.add(scope, `${label} is ${JSON.stringify(actual ?? null)} but the approved manifest value is ${JSON.stringify(expected)}.`);
    }
  }

  const declaredSlides = Number(firstText(app.Slides));
  if (declaredSlides !== manifest.slides.length) {
    failures.add(
      scope,
      `docProps/app.xml Slides is ${JSON.stringify(firstText(app.Slides) ?? null)} but the manifest declares ${manifest.slides.length} slides.`
    );
  }

  // Leakage check runs over the raw XML so it also covers properties this
  // validator does not otherwise assert on.
  const combined = `${coreXml}\n${appXml}`;
  const haystack = combined.toLowerCase();

  const leakCandidates = [
    ['OS username', safeIdentity(() => os.userInfo().username)],
    ['machine name', safeIdentity(() => os.hostname())],
    ['user profile path', safeIdentity(() => os.homedir())]
  ];

  for (const [label, value] of leakCandidates) {
    if (!value || value.length < 3) {
      continue;
    }
    if (haystack.includes(value.toLowerCase())) {
      failures.add(scope, `document properties contain the ${label} "${value}". Metadata travels with the file.`);
    }
    // A Windows profile path also leaks when only its separators differ.
    const alternate = value.replace(/\\/g, '/');
    if (alternate !== value && haystack.includes(alternate.toLowerCase())) {
      failures.add(scope, `document properties contain the ${label} "${alternate}". Metadata travels with the file.`);
    }
  }

  const email = combined.match(EMAIL_PATTERN);
  if (email) {
    failures.add(scope, `document properties contain an email address "${email[0]}".`);
  }
}

function safeIdentity(getter) {
  try {
    const value = getter();
    return typeof value === 'string' ? value : '';
  } catch {
    return '';
  }
}

async function validateDeck({ deckPath, locale, manifest, strings, failures }) {
  const scope = `${locale} (${path.basename(deckPath)})`;

  const bytes = fs.readFileSync(deckPath);
  if (bytes.length === 0) {
    failures.add(scope, 'the package is zero bytes.');
    return null;
  }

  let zip;
  try {
    zip = await JSZip.loadAsync(bytes);
  } catch (error) {
    failures.add(scope, `the package is not a readable zip container: ${error.message}`);
    return null;
  }

  const parser = makeParser();
  const slidePaths = await readSlideOrder(zip, parser, scope, failures);

  if (slidePaths.length !== manifest.slides.length) {
    failures.add(scope, `slide count is ${slidePaths.length} but the manifest declares ${manifest.slides.length} entries.`);
  }

  const runsBySlideIndex = [];
  for (let index = 0; index < slidePaths.length; index += 1) {
    const slidePath = slidePaths[index];
    const xml = await readPart(zip, slidePath);
    if (xml === null) {
      failures.add(scope, `slide part "${slidePath}" is declared in presentation.xml but absent from the package.`);
      runsBySlideIndex.push([]);
      continue;
    }

    let parsed;
    try {
      parsed = parser.parse(xml);
    } catch (error) {
      failures.add(scope, `slide part "${slidePath}" is not parseable XML: ${error.message}`);
      runsBySlideIndex.push([]);
      continue;
    }
    runsBySlideIndex.push(collectRuns(parsed));

    const rels = await readRelationships(zip, parser, slidePath);
    const notesRel = rels.all.find((rel) => rel.type === REL_TYPE_NOTES_SLIDE);
    const manifestId = manifest.slides[index]?.id ?? `position ${index + 1}`;

    if (!notesRel) {
      failures.add(scope, `${manifestId}: slide "${slidePath}" declares no notesSlide relationship.`);
      continue;
    }

    const notesPath = resolveTarget(slidePath, notesRel.target);
    const notesXml = await readPart(zip, notesPath);
    if (notesXml === null) {
      failures.add(scope, `${manifestId}: notes part "${notesPath}" is referenced but absent from the package.`);
      continue;
    }
    const notesText = normalizeWhitespace(collectRuns(parser.parse(notesXml)).join(' '));
    if (notesText === '') {
      failures.add(scope, `${manifestId}: notes part "${notesPath}" contains no text.`);
    }
  }

  // Every manifest identifier appears exactly once, on the slide the manifest
  // orders it at. Matching on a standalone token keeps this independent of the
  // generator's footer formatting.
  for (let index = 0; index < manifest.slides.length; index += 1) {
    const id = manifest.slides[index].id;
    const pattern = new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(id)}(?![A-Za-z0-9])`);
    const hits = [];
    for (let position = 0; position < runsBySlideIndex.length; position += 1) {
      if (runsBySlideIndex[position].some((run) => pattern.test(run))) {
        hits.push(position);
      }
    }
    if (hits.length === 0) {
      failures.add(scope, `manifest identifier "${id}" does not appear on any slide.`);
      continue;
    }
    if (hits.length > 1) {
      failures.add(
        scope,
        `manifest identifier "${id}" appears on ${hits.length} slides (positions ${hits.map((h) => h + 1).join(', ')}); it must appear exactly once.`
      );
      continue;
    }
    if (hits[0] !== index) {
      failures.add(
        scope,
        `manifest identifier "${id}" appears at slide position ${hits[0] + 1} but the manifest orders it at position ${index + 1}.`
      );
    }
  }

  const titleIndex = manifest.slides.findIndex((slide) => slide.role === 'title');
  if (titleIndex === -1) {
    failures.add(scope, 'the manifest declares no slide with role "title", so the disclaimer cannot be located.');
  } else {
    const disclaimer = strings?.[locale]?.disclaimer;
    if (!disclaimer || typeof disclaimer.title !== 'string' || typeof disclaimer.body !== 'string') {
      failures.add(scope, `docs/_data/strings.yml declares no ${locale}.disclaimer.title and ${locale}.disclaimer.body pair.`);
    } else {
      const haystack = normalizeWhitespace((runsBySlideIndex[titleIndex] ?? []).join(' '));
      for (const [label, expected] of [['title', disclaimer.title], ['body', disclaimer.body]]) {
        if (!haystack.includes(normalizeWhitespace(expected))) {
          failures.add(
            scope,
            `the title slide does not carry the non-association disclaimer ${label} from docs/_data/strings.yml for locale "${locale}".`
          );
        }
      }
    }
  }

  await checkRelationshipGraph(zip, parser, scope, failures);
  await checkDocumentProperties({ zip, parser, scope, locale, manifest, failures });

  return { locale, deckPath, slideCount: slidePaths.length, bytes: bytes.length };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  const deckDirArg = parseArgs(process.argv.slice(2));
  const deckDir = path.resolve(process.cwd(), deckDirArg);

  if (!fs.existsSync(deckDir) || !fs.statSync(deckDir).isDirectory()) {
    fatal(`Deck directory "${deckDirArg}" does not exist or is not a directory.`);
  }

  const manifest = readJson(MANIFEST_PATH);
  const stringsRelative = manifest?.sharedStrings?.file;
  if (typeof stringsRelative !== 'string' || stringsRelative.trim() === '') {
    fatal('slides/content.json must declare sharedStrings.file.');
  }
  const strings = readYaml(path.resolve(REPO_ROOT, stringsRelative));

  const declaredLocales = Object.keys(manifest.locales ?? {});
  if (declaredLocales.length === 0) {
    fatal('slides/content.json declares no locales.');
  }

  console.log(`Manifest        ${path.relative(REPO_ROOT, MANIFEST_PATH)}`);
  console.log(`Shared strings  ${stringsRelative}`);
  console.log(`Expected slides ${manifest.slides.length} (from the manifest)`);
  console.log(`Deck directory  ${deckDir}`);
  console.log('');

  const failures = new Failures();
  const present = [];
  const absent = [];

  for (const locale of declaredLocales) {
    const fileName = manifest.locales[locale]?.outputFile;
    const deckPath = path.join(deckDir, fileName);
    if (!fs.existsSync(deckPath)) {
      absent.push({ locale, fileName });
      continue;
    }
    const result = await validateDeck({ deckPath, locale, manifest, strings, failures });
    if (result) {
      present.push(result);
    }
  }

  if (present.length === 0) {
    fatal(`No deck declared by the manifest was found in "${deckDirArg}". Nothing to validate.`);
  }

  for (const result of present) {
    console.log(`Checked ${path.basename(result.deckPath)}  locale=${result.locale}  slides=${result.slideCount}  bytes=${result.bytes}`);
  }
  for (const entry of absent) {
    console.log(`Absent  ${entry.fileName}  locale=${entry.locale}  (not validated)`);
  }

  const counts = new Set(present.map((result) => result.slideCount));
  if (present.length > 1 && counts.size !== 1) {
    failures.add(
      'cross-locale',
      `the decks disagree on slide count: ${present.map((r) => `${r.locale}=${r.slideCount}`).join(', ')}.`
    );
  }

  console.log('');
  if (failures.count > 0) {
    console.error(`FAIL  ${failures.count} structural violation(s):`);
    for (const failure of failures.items) {
      console.error(`  - [${failure.scope}] ${failure.message}`);
    }
    process.exit(1);
  }

  console.log(`PASS  ${present.length} deck(s) validated, ${manifest.slides.length} slides each, against the shared manifest.`);
}

main().catch((error) => {
  fatal(error?.stack ?? String(error));
});
