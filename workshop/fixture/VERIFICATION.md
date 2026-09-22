# Fixture verification record

All results below are OBSERVED. Every command in this file was executed on the
date shown and its real output was recorded here. Nothing in this file is a
prediction, an estimate, or a value carried over from a planning document.

## Run identity

| Item | Value |
| --- | --- |
| Date | 2026-09-22 |
| Runner | GitHub Copilot coding agent, Implementation Phase 2, Step 2.3 |
| Operating system | Windows |
| Shell | PowerShell |
| Working directory | `workshop/fixture` |
| Node | v26.7.0 |
| npm | 12.0.1 |
| vitest resolved | 4.1.11 |
| typescript resolved | 5.9.3 |

## Fixture provenance

The fixture is originally authored for this repository. No customer source was
read, copied, adapted, or referenced while authoring it. The extraction
allowlist in Step 2.1 was not exercised, because
`docs/_data/decisions.yml` records `fixture_provenance` as the neutral authored
fixture and `customer_source_extraction` as NOT adopted, with no named approver
for source reuse.

A word-boundary scan of every tracked fixture file found no customer name, no
branding token, and no aviation or safety-critical token. The only matches for
the substring `pilot` are inside the product name GitHub Copilot.

The validator imports exactly one module, `./types`. It has no other import.

## Committed state of the three lab files

The three lab files are committed in their PRISTINE STARTING STATE.

* `MAX_TITLE_LENGTH` is NOT present in `lib/scenario-engine/types.ts`.
* The title length check is NOT present in `lib/scenario-engine/validateGenerateRequest.ts`.
* The three title boundary tests are NOT present in `lib/scenario-engine/validateGenerateRequest.test.ts`.

This is deliberate. Adding the constant, the check, and the boundary tests is
the work the feature lab asks participants to perform, so the shipped fixture
must not already contain it. State 3 and State 4 below were executed in full and
are recorded as observations; those edits were then reverted with
`node scripts/reset.mjs`.

`lib/scenario-engine` and `.pristine/lib/scenario-engine` are byte-identical in
the committed state:

| File | Bytes | SHA-256 prefix |
| --- | --- | --- |
| `types.ts` | 1687 | `1A298E0E7CB32911` |
| `validateGenerateRequest.ts` | 3678 | `C7E315AF0DDF9046` |
| `validateGenerateRequest.test.ts` | 6132 | `485F8597D5B6153C` |

## Dependency install

`npm install` against the corporate proxy registry initially failed:

```text
npm error code EALLOWREMOTE
npm error Fetching packages of type "remote" have been disabled
npm error Refusing to fetch "stackback@https://<internal-feed-host>/<internal-path>/stackback-0.0.2.tgz"
```

The install was completed with `npm install --allow-remote=all`, which produced
a lockfile whose 70 `resolved` URLs all pointed at the internal feed host. That
lockfile would not resolve for anyone
outside that network, so every `resolved` URL was rewritten to
`https://registry.npmjs.org/`. Integrity hashes were not altered, because they
are content hashes of the same tarballs.

The rewritten lockfile was then validated end to end:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci --registry=https://registry.npmjs.org/
```

Observed: `added 45 packages in 2s`, exit code 0. A post-install re-read of the
lockfile confirmed the only host present is `registry.npmjs.org` and that
`npm ci` did not rewrite it back.

Observed dependency tree: 45 packages installed, 46 audited, 0 vulnerabilities.

### Engine range

The declared range is `"node": ">=24.0.0"`. It was derived from the engines the
two dependencies actually resolved to, not copied from another project:

| Installed package | Version | Declared engines |
| --- | --- | --- |
| vitest | 4.1.11 | `^20.0.0 \|\| ^22.0.0 \|\| >=24.0.0` |
| vite (vitest transitive) | 8.3.0 | `^20.19.0 \|\| >=22.12.0` |
| typescript | 5.9.3 | `>=14.17` |

`>=24.0.0` is a subset of the intersection of those three ranges, it avoids the
20.0.0 through 20.18.x window that vitest permits but vite does not, and the
installed Node v26.7.0 satisfies it.

## Observed behavioral sequence

The suite was run in four states. The baseline case count did not change in any
state. No baseline assertion was weakened, relaxed, or deleted at any point:
State 2 was produced by editing only the validator, State 3 only appended a new
`describe` block, and the return to baseline was a byte-identical restore
confirmed by SHA-256.

Command used in every state:

```powershell
npm test -- lib/scenario-engine/validateGenerateRequest.test.ts
```

| State | Total cases | Passed | Failed | Exit code |
| --- | --- | --- | --- | --- |
| 1. Baseline | 24 | 24 | 0 | 0 |
| 2. Seeded trimming fault | 24 | 19 | 5 | 1 |
| 2b. After `node scripts/reset.mjs` | 24 | 24 | 0 | 0 |
| 3. Feature tests added, rule not implemented | 27 | 26 | 1 | 1 |
| 4. Feature implemented | 27 | 27 | 0 | 0 |

### State 1, baseline

```text
 Test Files  1 passed (1)
      Tests  24 passed (24)
```

### State 2, seeded trimming fault

The fault was seeded by changing the body of the private guard
`isNonEmptyString` from `value.trim().length > 0` to `value.length > 0`. Nothing
else was changed.

```text
 lib/scenario-engine/validateGenerateRequest.test.ts (24 tests | 5 failed)

 FAIL  step 2, required fields must survive trimming > rejects a whitespace-only title as a missing required field
 FAIL  step 2, required fields must survive trimming > rejects a whitespace-only category as a missing required field
 FAIL  step 2, required fields must survive trimming > rejects a whitespace-only summary as a missing required field
 FAIL  step 3, the required enum-backed field > reports the required-field error before the enum error
 FAIL  step 3, the required enum-backed field > distinguishes a blank category from an unknown category

 Test Files  1 failed (1)
      Tests  5 failed | 19 passed (24)
```

At least one failure is directly attributable to the lost trimming. The
whitespace-only title case shows a request that should have been rejected being
accepted, with the title normalized to the empty string:

```text
AssertionError: expected { success: true, ...(1) } to strictly equal { success: false, ...(1) }

- Expected
+ Received

  {
-   "error": "Missing required fields: title, category, summary",
-   "success": false,
+   "data": {
+     "category": "tutorial",
+     "detailLevel": undefined,
+     "outputLength": undefined,
+     "summary": "Group the cards by colour, then by size.",
+     "title": "",
+   },
```

The enum-versus-required asymmetry was confirmed. Under the seeded fault a
whitespace-only enum-backed field does NOT silently pass and does NOT report the
required-field error. It reaches the enum check and fails there:

```text
FAIL  rejects a whitespace-only category as a missing required field
AssertionError: expected { success: false, ...(1) } to strictly equal { success: false, ...(1) }

- Expected
+ Received

  {
-   "error": "Missing required fields: title, category, summary",
+   "error": "Unsupported category:    ",
    "success": false,
  }
```

This is the precise symptom set the lab must teach. A blanket claim that blank
values pass under the seeded fault would be wrong.

### State 2b, restore

```text
PASS: restored 3 lab files from .pristine
reset exit code: 0
```

All three files returned to the SHA-256 values in the table above, and the suite
returned to `Tests  24 passed (24)`, exit code 0.

### State 3, feature tests added before implementation

Three boundary cases were appended. They use the literal number `80` in their
names and expectations and do not reference the constant, so the rejection case
fails behaviorally rather than failing to compile.

```text
 lib/scenario-engine/validateGenerateRequest.test.ts (27 tests | 1 failed)

 FAIL  title length rule > rejects a title of 81 code units

 Test Files  1 failed (1)
      Tests  1 failed | 26 passed (27)
```

The 24 baseline cases were unchanged and all 24 still passed.

### State 4, feature implemented

`MAX_TITLE_LENGTH = 80` was exported from the types module and the check was
added to the validator after the enum checks, rejecting with the exact literal
`Title must be at most 80 code units` and no trailing period.

```text
 Test Files  1 passed (1)
      Tests  27 passed (27)
```

The 24 baseline cases were unchanged and all 24 still passed. These edits were
then reverted, as recorded above.

## Typecheck

```powershell
./node_modules/.bin/tsc --noEmit --strict --skipLibCheck --target ES2022 --module ESNext --moduleResolution Bundler lib/scenario-engine/types.ts lib/scenario-engine/validateGenerateRequest.ts lib/scenario-engine/validateGenerateRequest.test.ts
```

Observed: no diagnostics, exit code 0. Run in the baseline state, in the feature
state, and again in the final committed state. Also reachable as
`npm run typecheck`, which is the same command with the same flags.

`tsconfig.json` carries the same flags, so the editor and the command line
agree. The typecheck command passes files explicitly and therefore does not read
`tsconfig.json`; the file exists so that an editor sees identical settings.

## Self-check

```powershell
node scripts/self-check.mjs
```

Observed, exactly one line, exit code 0:

```text
PASS: node 26.7.0, 3 lab files and pristine copies present, 2 dependencies installed
```

## Reset round trip after arbitrary edits

`types.ts` had a comment appended and `validateGenerateRequest.test.ts` was
overwritten with a 32-byte stub, on top of the State 4 feature edits. Observed
before reset:

```text
types.ts                            1927 bytes sha256=FC6B994D1394F8C0
validateGenerateRequest.test.ts       32 bytes sha256=C2E838C4E6390461
validateGenerateRequest.ts          3977 bytes sha256=96296E5FCAADAFEA
```

Observed after `node scripts/reset.mjs`:

```text
PASS: restored 3 lab files from .pristine
reset exit code: 0
types.ts                            1687 bytes sha256=1A298E0E7CB32911
validateGenerateRequest.test.ts     6132 bytes sha256=485F8597D5B6153C
validateGenerateRequest.ts          3678 bytes sha256=C7E315AF0DDF9046
MAX_TITLE_LENGTH occurrences in lab files: 0
```

The reset restored all three files byte for byte, including removing the feature
work. This is the state the repository is committed in.

## Divergence from the non-normative predicted counts

The research document states plainly that its counts were derived by hand, were
never executed, and are non-normative. The observed counts are recorded here as
observed and are NOT reconciled to the predictions.

| Point in the sequence | Predicted in research | Observed here |
| --- | --- | --- |
| Baseline | 10 pass | 24 pass |
| Seeded fault | 7 pass, 3 fail | 19 pass, 5 fail |
| Feature tests added, not implemented | 12 pass, 1 fail | 26 pass, 1 fail |
| Feature implemented | 13 pass | 27 pass |

The totals differ because the suite authored here is a different suite from the
illustrative one sketched in the research note. It adds absent-field cases,
case-sensitivity and untrimmed-enum cases, explicit-null optional cases, and
explicit ordering cases. The seeded fault produces 5 failures rather than 3
because two ordering cases also depend on the trimming guard.

Every behavioral acceptance condition held: the baseline is green, the seeded
fault produces failures attributable to trimming, the whitespace-only
enum-backed case fails with the enum error, the feature tests fail before
implementation and pass after it, the baseline case count is unchanged across
all states, no baseline assertion was weakened, and the typecheck passes.

## Deviations and notes for the next phase

1. `vitest.config.ts` was added and is not in the Step 2.1 file list. Without
   it, vitest discovered `.pristine/lib/scenario-engine/validateGenerateRequest.test.ts`
   as a second test file and reported 48 tests across 2 files, double counting
   every case. The config excludes `**/.pristine/**` and nothing else. Any lab
   text that quotes a case count depends on this file.
2. `tsconfig.json` was added and is not in the Step 2.1 file list. It exists to
   satisfy the success criterion that module type and TypeScript resolution
   settings are mutually consistent and visible, and its options are identical
   to the typecheck flags.
3. The lockfile was rewritten away from the internal proxy host. Anyone
   regenerating it on a network with a proxy registry must repeat that rewrite,
   or the fixture will not install for participants.
4. On a network that blocks remote tarball fetches, the initial install needs
   `npm install --allow-remote=all`. Participants installing from the committed
   lockfile against the public registry do not need that flag; `npm ci` was
   observed to succeed without it.
5. These results are from one machine on Windows with Node v26.7.0. They are not
   a claim about participant machines. Organizer preflight should run
   `node scripts/self-check.mjs` and `npm test` on a representative machine.
