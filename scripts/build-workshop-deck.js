#!/usr/bin/env node
/**
 * Bilingual workshop deck generator.
 *
 * Reads one shared manifest (slides/content.json) and emits one PPTX per locale
 * so the locales cannot drift. Invariant software literals and the
 * non-association disclaimer are resolved at build time from
 * docs/_data/strings.yml, which is the single source of truth for both.
 *
 * Usage:
 *   node scripts/build-workshop-deck.js --out <dir> [--locale <en|fr>]
 *
 * The output directory is REQUIRED and has no default. A generator that
 * silently defaults to the published deck directory could let a validation run
 * overwrite an approved, metadata-scrubbed deck. Only Phase 8, Step 8.2
 * publishes into docs/assets/decks/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import yaml from 'js-yaml';
import PptxGenJS from 'pptxgenjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');
const MANIFEST_PATH = path.join(REPO_ROOT, 'slides', 'content.json');

// LAYOUT_WIDE is 13.33 x 7.5 inches. Kept here only for geometry maths and for
// the post-build dimension assertion, never as a second source of truth.
const SLIDE_WIDTH_IN = 13.33;
const SLIDE_HEIGHT_IN = 7.5;
const MARGIN_IN = 0.6;
const CONTENT_WIDTH_IN = SLIDE_WIDTH_IN - MARGIN_IN * 2;

const COLOR_TEXT = '202428';
const COLOR_ACCENT = '176B63';
const COLOR_CANVAS = 'FFFFFF';
const FONT_TITLE = 'Aptos Display';
const FONT_BODY = 'Aptos';

const STRINGS_TOKEN = /\{\{strings:([A-Za-z0-9_.]+)\}\}/g;

const USAGE = [
  'Usage: node scripts/build-workshop-deck.js --out <dir> [--locale <code>]',
  '',
  '  --out <dir>      REQUIRED. Directory to write the generated decks into.',
  '                   There is no default. Use a scratch directory such as',
  '                   build/decks for validation runs. Publishing into the',
  '                   Pages build source is reserved for Phase 8, Step 8.2.',
  '  --locale <code>  Optional. Generate a single locale. Omit to generate',
  '                   every locale declared in the manifest.',
  '  --help           Show this message.'
].join('\n');

function die(message) {
  console.error(`ERROR  ${message}`);
  process.exit(1);
}

function dieWithUsage(message) {
  console.error(`ERROR  ${message}`);
  console.error('');
  console.error(USAGE);
  process.exit(1);
}

function parseArgs(argv) {
  const parsed = { out: null, locale: null, help: false };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }

    const named = arg.startsWith('--') ? arg.slice(2) : null;
    if (named === null) {
      dieWithUsage(`Unexpected argument "${arg}".`);
    }

    const eq = named.indexOf('=');
    const key = eq === -1 ? named : named.slice(0, eq);
    let value = eq === -1 ? null : named.slice(eq + 1);

    if (key !== 'out' && key !== 'locale') {
      dieWithUsage(`Unknown option "--${key}".`);
    }

    if (value === null) {
      value = argv[i + 1];
      i += 1;
      if (value === undefined || value.startsWith('--')) {
        dieWithUsage(`Option "--${key}" requires a value.`);
      }
    }

    if (value.trim() === '') {
      dieWithUsage(`Option "--${key}" requires a non-empty value.`);
    }

    parsed[key] = value.trim();
  }

  return parsed;
}

function readJson(filePath) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    die(`Cannot read ${path.relative(REPO_ROOT, filePath)}: ${error.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    die(`${path.relative(REPO_ROOT, filePath)} is not valid JSON: ${error.message}`);
  }
  return null;
}

function readYaml(filePath) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    die(`Cannot read ${path.relative(REPO_ROOT, filePath)}: ${error.message}`);
  }
  try {
    return yaml.load(raw);
  } catch (error) {
    die(`${path.relative(REPO_ROOT, filePath)} is not valid YAML: ${error.message}`);
  }
  return null;
}

function lookup(source, dottedPath) {
  let current = source;
  for (const segment of dottedPath.split('.')) {
    if (current === null || typeof current !== 'object' || !(segment in current)) {
      return undefined;
    }
    current = current[segment];
  }
  return current;
}

/**
 * Replaces every {{strings:path}} token against the shared strings file.
 * Unresolved tokens are collected rather than silently left in the slide.
 */
function resolveTokens(value, strings, where, errors) {
  if (typeof value !== 'string') {
    return value;
  }
  return value.replace(STRINGS_TOKEN, (match, dottedPath) => {
    const found = lookup(strings, dottedPath);
    if (found === undefined || found === null || typeof found === 'object') {
      errors.push(`${where}: unresolved shared-strings reference "${match}".`);
      return match;
    }
    return String(found);
  });
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function validateSchedule(manifest, errors) {
  const sections = manifest.sections;
  if (!Array.isArray(sections) || sections.length === 0) {
    errors.push('manifest.sections must be a non-empty array.');
    return;
  }

  let declaredTotal = 0;
  let cursor = null;

  for (const section of sections) {
    const label = `section ${section.number}`;
    const span = section.endMinute - section.startMinute;

    if (!Number.isInteger(section.startMinute) || !Number.isInteger(section.endMinute)) {
      errors.push(`${label}: startMinute and endMinute must be integers.`);
      continue;
    }
    if (span !== section.allocatedMinutes) {
      errors.push(
        `${label}: window ${section.startMinute}-${section.endMinute} spans ${span} minutes ` +
          `but allocatedMinutes is ${section.allocatedMinutes}.`
      );
    }
    if (cursor !== null && section.startMinute !== cursor) {
      errors.push(`${label}: starts at ${section.startMinute} but the previous section ended at ${cursor}.`);
    }
    cursor = section.endMinute;
    declaredTotal += section.allocatedMinutes;
  }

  const expectedTotal = manifest.schedule?.totalMinutes;
  if (declaredTotal !== expectedTotal) {
    errors.push(`section allocations total ${declaredTotal} minutes but schedule.totalMinutes is ${expectedTotal}.`);
  }
}

function validateSlideTiming(manifest, errors) {
  const byNumber = new Map(manifest.sections.map((section) => [section.number, section]));

  for (const section of manifest.sections) {
    const owned = manifest.slides
      .filter((slide) => slide.section === section.number)
      .sort((a, b) => a.startMinute - b.startMinute);

    if (owned.length === 0) {
      errors.push(`section ${section.number}: no slide is assigned to it.`);
      continue;
    }

    let cursor = section.startMinute;
    for (const slide of owned) {
      if (slide.startMinute !== cursor) {
        errors.push(
          `${slide.id}: starts at minute ${slide.startMinute} but the preceding slide in section ` +
            `${section.number} ended at ${cursor}. Timing must be contiguous.`
        );
      }
      if (slide.endMinute <= slide.startMinute) {
        errors.push(`${slide.id}: endMinute must be greater than startMinute.`);
      }
      cursor = slide.endMinute;
    }

    if (cursor !== section.endMinute) {
      errors.push(
        `section ${section.number}: its slides end at minute ${cursor} but the section window ends at ` +
          `${section.endMinute}.`
      );
    }
  }

  for (const slide of manifest.slides) {
    if (!byNumber.has(slide.section)) {
      errors.push(`${slide.id}: references unknown section ${slide.section}.`);
    }
  }
}

/**
 * Fails loudly when any identifier is missing text or notes for a locale being
 * generated, so a per-locale entry cannot silently go missing.
 */
function validateManifest(manifest, locales, strings) {
  const errors = [];

  if (!Array.isArray(manifest.slides) || manifest.slides.length === 0) {
    errors.push('manifest.slides must be a non-empty array.');
    return errors;
  }

  const seen = new Map();
  for (const slide of manifest.slides) {
    if (!isNonEmptyString(slide.id)) {
      errors.push('every slide must declare a non-empty id.');
      continue;
    }
    seen.set(slide.id, (seen.get(slide.id) ?? 0) + 1);
  }
  for (const [id, count] of seen) {
    if (count !== 1) {
      errors.push(`slide identifier "${id}" appears ${count} times; it must appear exactly once.`);
    }
  }

  const catalog = manifest.assets?.catalog ?? {};
  const titleSlides = manifest.slides.filter((slide) => slide.role === 'title');
  if (titleSlides.length !== 1) {
    errors.push(`exactly one slide must declare role "title"; found ${titleSlides.length}.`);
  }

  for (const slide of manifest.slides) {
    for (const assetId of slide.assetRefs ?? []) {
      if (!(assetId in catalog)) {
        errors.push(`${slide.id}: references asset "${assetId}", which is not in assets.catalog.`);
      }
    }
    for (const invariantPath of slide.invariantRefs ?? []) {
      if (lookup(strings, invariantPath) === undefined) {
        errors.push(`${slide.id}: invariantRefs entry "${invariantPath}" is not present in the shared strings file.`);
      }
    }

    for (const locale of locales) {
      const entry = slide.locales?.[locale];
      const where = `${slide.id} [${locale}]`;

      if (!entry || typeof entry !== 'object') {
        errors.push(`${where}: no localized entry. Every identifier needs one entry per generated locale.`);
        continue;
      }
      if (!isNonEmptyString(entry.title)) {
        errors.push(`${where}: missing "title".`);
      }
      if (!isNonEmptyString(entry.text)) {
        errors.push(`${where}: missing "text".`);
      }
      if (!isNonEmptyString(entry.notes)) {
        errors.push(`${where}: missing "notes".`);
      }
      if (slide.role === 'title') {
        if (!entry.disclaimer || typeof entry.disclaimer !== 'object') {
          errors.push(`${where}: the title slide must carry a "disclaimer" object in every locale.`);
        } else {
          if (!isNonEmptyString(entry.disclaimer.title)) {
            errors.push(`${where}: disclaimer.title is missing.`);
          }
          if (!isNonEmptyString(entry.disclaimer.body)) {
            errors.push(`${where}: disclaimer.body is missing.`);
          }
        }
      }
    }
  }

  for (const locale of locales) {
    const meta = manifest.deck?.metadata?.byLocale?.[locale];
    if (!meta || !isNonEmptyString(meta.title) || !isNonEmptyString(meta.subject)) {
      errors.push(`locale "${locale}": deck.metadata.byLocale.${locale} must declare a title and a subject.`);
    }
    if (!isNonEmptyString(manifest.locales?.[locale]?.outputFile)) {
      errors.push(`locale "${locale}": locales.${locale}.outputFile is missing.`);
    }
  }

  const shared = manifest.deck?.metadata?.shared;
  if (!shared || !isNonEmptyString(shared.author) || !isNonEmptyString(shared.company)) {
    errors.push('deck.metadata.shared must declare an approved author and company.');
  }

  validateSchedule(manifest, errors);
  validateSlideTiming(manifest, errors);

  return errors;
}

function buildDeck({ manifest, locale, strings, outDir, tokenErrors }) {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';

  // Document properties come only from approved manifest values. Nothing here
  // is read from the build environment, the OS user, or the machine name.
  const sharedMeta = manifest.deck.metadata.shared;
  const localeMeta = manifest.deck.metadata.byLocale[locale];
  pptx.author = sharedMeta.author;
  pptx.company = sharedMeta.company;
  pptx.title = localeMeta.title;
  pptx.subject = localeMeta.subject;

  const catalog = manifest.assets?.catalog ?? {};
  const skipped = [];

  for (const entry of manifest.slides) {
    const content = entry.locales[locale];
    const where = `${entry.id} [${locale}]`;
    const slide = pptx.addSlide();
    slide.background = { color: COLOR_CANVAS };

    const isTitle = entry.role === 'title';

    slide.addText(resolveTokens(content.title, strings, `${where} title`, tokenErrors), {
      x: MARGIN_IN,
      y: 0.5,
      w: CONTENT_WIDTH_IN,
      h: 1.0,
      fontFace: FONT_TITLE,
      fontSize: isTitle ? 36 : 32,
      bold: true,
      color: COLOR_TEXT
    });

    const image = resolveImage({ entry, catalog, locale, strings, tokenErrors, skipped });
    const bodyWidth = image ? 7.4 : CONTENT_WIDTH_IN;

    slide.addText(resolveTokens(content.text, strings, `${where} text`, tokenErrors), {
      x: MARGIN_IN,
      y: 1.8,
      w: bodyWidth,
      h: isTitle ? 2.6 : 4.2,
      fontFace: FONT_BODY,
      fontSize: 24,
      color: COLOR_TEXT,
      valign: 'top'
    });

    if (image) {
      slide.addImage({
        path: image.absolutePath,
        x: MARGIN_IN + bodyWidth + 0.4,
        y: 1.8,
        w: CONTENT_WIDTH_IN - bodyWidth - 0.4,
        h: 4.2,
        sizing: { type: 'contain', w: CONTENT_WIDTH_IN - bodyWidth - 0.4, h: 4.2 },
        altText: image.alt
      });
    }

    if (isTitle) {
      const disclaimer = content.disclaimer;
      slide.addText(
        [
          {
            text: resolveTokens(disclaimer.title, strings, `${where} disclaimer.title`, tokenErrors),
            options: { bold: true, breakLine: true }
          },
          {
            text: resolveTokens(disclaimer.body, strings, `${where} disclaimer.body`, tokenErrors),
            options: { bold: false }
          }
        ],
        {
          x: MARGIN_IN,
          y: 4.7,
          w: CONTENT_WIDTH_IN,
          h: 1.7,
          fontFace: FONT_BODY,
          fontSize: 14,
          color: COLOR_TEXT,
          valign: 'top'
        }
      );
    }

    slide.addText(
      `${entry.id} | ${pad2(entry.startMinute)}-${pad2(entry.endMinute)} min | Section ${entry.section} | ` +
        `${locale.toUpperCase()}`,
      {
        x: MARGIN_IN,
        y: 6.7,
        w: CONTENT_WIDTH_IN,
        h: 0.4,
        fontFace: FONT_BODY,
        fontSize: 13,
        color: COLOR_ACCENT
      }
    );

    slide.addNotes(resolveTokens(content.notes, strings, `${where} notes`, tokenErrors));
  }

  const fileName = manifest.locales[locale].outputFile;
  const absoluteOut = path.join(outDir, fileName);

  return {
    locale,
    fileName,
    absoluteOut,
    slideCount: manifest.slides.length,
    skipped,
    write: () => pptx.writeFile({ fileName: absoluteOut })
  };
}

function resolveImage({ entry, catalog, locale, strings, tokenErrors, skipped }) {
  const assetId = (entry.assetRefs ?? [])[0];
  if (!assetId) {
    return null;
  }

  const asset = catalog[assetId];
  const absolutePath = path.resolve(REPO_ROOT, asset.path);

  if (!fs.existsSync(absolutePath)) {
    skipped.push({ slideId: entry.id, assetId, relativePath: asset.path });
    return null;
  }

  return {
    absolutePath,
    alt: resolveTokens(asset.alt?.[locale] ?? '', strings, `${assetId} [${locale}] alt`, tokenErrors)
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(USAGE);
    return;
  }

  if (!args.out) {
    dieWithUsage(
      'The --out <dir> argument is required and has no default. Refusing to guess an output directory, ' +
        'because a silent default could overwrite an approved published deck.'
    );
  }

  const manifest = readJson(MANIFEST_PATH);
  const stringsRelative = manifest.sharedStrings?.file;
  if (!isNonEmptyString(stringsRelative)) {
    die('slides/content.json must declare sharedStrings.file.');
  }
  const strings = readYaml(path.resolve(REPO_ROOT, stringsRelative));

  const declaredLocales = Object.keys(manifest.locales ?? {});
  if (declaredLocales.length === 0) {
    die('slides/content.json declares no locales.');
  }

  let locales = declaredLocales;
  if (args.locale) {
    if (!declaredLocales.includes(args.locale)) {
      dieWithUsage(
        `Unknown locale "${args.locale}". The manifest declares: ${declaredLocales.join(', ')}.`
      );
    }
    locales = [args.locale];
  }

  const validationErrors = validateManifest(manifest, locales, strings);
  if (validationErrors.length > 0) {
    console.error(`ERROR  ${validationErrors.length} manifest validation problem(s):`);
    for (const message of validationErrors) {
      console.error(`  - ${message}`);
    }
    process.exit(1);
  }

  const outDir = path.resolve(process.cwd(), args.out);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Manifest        ${path.relative(REPO_ROOT, MANIFEST_PATH)}`);
  console.log(`Shared strings  ${stringsRelative}`);
  console.log(`Manifest slides ${manifest.slides.length}`);
  console.log(`Locales         ${locales.join(', ')}`);
  console.log(`Output          ${outDir}`);
  console.log(`Layout          LAYOUT_WIDE (${SLIDE_WIDTH_IN} x ${SLIDE_HEIGHT_IN} inches)`);
  console.log('');

  const tokenErrors = [];
  const builds = locales.map((locale) => buildDeck({ manifest, locale, strings, outDir, tokenErrors }));

  if (tokenErrors.length > 0) {
    console.error(`ERROR  ${tokenErrors.length} unresolved shared-strings reference(s):`);
    for (const message of [...new Set(tokenErrors)]) {
      console.error(`  - ${message}`);
    }
    process.exit(1);
  }

  for (const build of builds) {
    await build.write();
    console.log(`Wrote ${build.fileName}  slides=${build.slideCount}  skippedImages=${build.skipped.length}`);
    for (const miss of build.skipped) {
      console.warn(
        `WARN   ${build.locale}: ${miss.slideId} asset ${miss.assetId} not found at ${miss.relativePath}; ` +
          'rendering the slide without it. Approved screenshots are captured in Phase 8, Step 8.1.'
      );
    }
  }

  const counts = new Set(builds.map((build) => build.slideCount));
  if (counts.size !== 1) {
    die(`generated decks disagree on slide count: ${[...counts].join(', ')}.`);
  }

  console.log('');
  console.log(`Done. ${builds.length} deck(s), ${manifest.slides.length} slides each, from one shared manifest.`);
}

main().catch((error) => {
  die(error?.stack ?? String(error));
});
