#!/usr/bin/env node
/**
 * Restore the three lab files to their pristine starting state.
 *
 * Lab B deliberately seeds a fault and later labs build on the same files, so
 * every participant must be able to return to an identical known state on
 * demand. Running this script is mandatory at the start of the feature lab,
 * including for participants whose earlier repair succeeded.
 *
 * Nothing outside the three lab files is touched.
 */

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtureRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const relativeLabFiles = [
  'lib/scenario-engine/types.ts',
  'lib/scenario-engine/validateGenerateRequest.ts',
  'lib/scenario-engine/validateGenerateRequest.test.ts',
];

const missing = relativeLabFiles.filter(
  (relativePath) => !existsSync(join(fixtureRoot, '.pristine', relativePath)),
);

if (missing.length > 0) {
  process.stdout.write(
    `FAIL: reset aborted, pristine copies are missing: ${missing.join(', ')}\n`,
  );
  process.exit(1);
}

for (const relativePath of relativeLabFiles) {
  const target = join(fixtureRoot, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(fixtureRoot, '.pristine', relativePath), target);
}

process.stdout.write(
  `PASS: restored ${relativeLabFiles.length} lab files from .pristine\n`,
);
process.exit(0);
