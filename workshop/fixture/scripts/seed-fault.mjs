#!/usr/bin/env node
/**
 * Seed the Activity B trimming fault into the validator.
 *
 * The committed fixture is the healthy baseline, so the fault must be applied
 * on purpose before Activity B. This replaces the free-text guard's trimmed
 * length check with a length-only check and changes nothing else.
 *
 *   exit 0 and a line beginning PASS:  the fault is in place
 *   exit 1 and a line beginning FAIL:  the guard was not in its baseline form,
 *                                      run node scripts/reset.mjs and retry
 *
 * Undo it with node scripts/reset.mjs.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtureRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const relativeTarget = 'lib/scenario-engine/validateGenerateRequest.ts';
const target = join(fixtureRoot, relativeTarget);

const healthy = "return typeof value === 'string' && value.trim().length > 0;";
const seeded = "return typeof value === 'string' && value.length > 0;";

const source = readFileSync(target, 'utf8');
const healthyCount = source.split(healthy).length - 1;

if (healthyCount === 0 && source.includes(seeded)) {
  process.stdout.write(`PASS: fault already seeded in ${relativeTarget}\n`);
  process.exit(0);
}

if (healthyCount !== 1) {
  process.stdout.write(
    `FAIL: expected exactly one baseline guard in ${relativeTarget}, found ${healthyCount}; run node scripts/reset.mjs and retry\n`,
  );
  process.exit(1);
}

writeFileSync(target, source.replace(healthy, seeded));

process.stdout.write(`PASS: seeded the trimming fault in ${relativeTarget}\n`);
process.exit(0);
