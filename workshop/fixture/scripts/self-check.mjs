#!/usr/bin/env node
/**
 * Pre-session readiness check for the practice fixture.
 *
 * Prints exactly one line and exits with a matching code, so a facilitator can
 * collect one unambiguous result per machine without reading a transcript.
 *
 *   exit 0 and a line beginning PASS:  the machine is ready
 *   exit 1 and a line beginning FAIL:  the line names every unmet condition
 *
 * This checks readiness only. It does not run the test suite.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtureRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const relativeLabFiles = [
  'lib/scenario-engine/types.ts',
  'lib/scenario-engine/validateGenerateRequest.ts',
  'lib/scenario-engine/validateGenerateRequest.test.ts',
];

const problems = [];

const manifest = JSON.parse(
  readFileSync(join(fixtureRoot, 'package.json'), 'utf8'),
);
const requiredMajor = Number(
  String(manifest.engines.node).replace(/[^0-9.]/g, '').split('.')[0],
);
const actualMajor = Number(process.versions.node.split('.')[0]);
if (!Number.isFinite(actualMajor) || actualMajor < requiredMajor) {
  problems.push(
    `node ${process.versions.node} does not satisfy ${manifest.engines.node}`,
  );
}

for (const relativePath of relativeLabFiles) {
  if (!existsSync(join(fixtureRoot, relativePath))) {
    problems.push(`missing lab file ${relativePath}`);
  }
  if (!existsSync(join(fixtureRoot, '.pristine', relativePath))) {
    problems.push(`missing pristine copy .pristine/${relativePath}`);
  }
}

for (const dependency of Object.keys(manifest.devDependencies)) {
  if (!existsSync(join(fixtureRoot, 'node_modules', dependency))) {
    problems.push(`dependency ${dependency} is not installed, run npm ci`);
  }
}

if (problems.length > 0) {
  process.stdout.write(`FAIL: ${problems.join('; ')}\n`);
  process.exit(1);
}

process.stdout.write(
  `PASS: node ${process.versions.node}, ${relativeLabFiles.length} lab files and pristine copies present, ${Object.keys(manifest.devDependencies).length} dependencies installed\n`,
);
process.exit(0);
