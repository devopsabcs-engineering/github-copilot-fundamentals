---
title: "Section 3: Everyday Developer Use Cases"
nav_order: 5
lang: en
---

# Section 3: Everyday Developer Use Cases

Minutes 30 to 55. The longest section, and the one that carries explanation, debugging, testing, an explicit refactor, and documentation. Four slides and Activity B.

* French counterpart: [{{ '/fr/sections/section-3-everyday-use-cases.html' | relative_url }}]({{ '/fr/sections/section-3-everyday-use-cases.html' | relative_url }})

## Objectives served

* O1. Understand the core capabilities of GitHub Copilot
* O4. Use Copilot to support common development activities
* O5. Evaluate and review AI-generated outputs responsibly

## Run of show

| Slide | Minutes | Activity |
| --- | --- | --- |
| S09. Follow One Validation Request | 30 to 34 | Trace one request through the fixed validation order |
| S10. From Failure to Evidence | 34 to 39 | Read the seeded failure, then demonstrate the guard refactor |
| S11. Activity B: Fix and Verify | 39 to 51 | Predict, diagnose, repair, refactor, and check the summary against the diff |
| S12. Explain the Change | 51 to 55 | Generate a change summary, then check every claim in it |

## The validation order

The order is fixed, and every step returns on the first failure.

1. The body must be a plain object.
2. Every required field must be a non-blank string.
3. The required category must be a known enum member.
4. Each supplied optional enum-backed field must be a known member.
5. Free text is trimmed, and omitted optional fields stay undefined.

Step 2 runs before step 3. On the committed baseline, a whitespace-only category is therefore reported as a missing required field rather than as an unsupported enum value. Hold that fact, because Activity B depends on it.

## The seeded fault

The private guard for free-text fields is seeded with a length-only check, so trimming is lost. This is a deliberate exercise fault authored for the workshop. It is not a defect in any real system, and it should be described that way out loud before anyone photographs the screen.

Observed under the fault on the prepared machine: 24 cases, 19 passed, 5 failed, exit code 1.

The five failing case names are the symptom set the room must learn:

1. rejects a whitespace-only title as a missing required field
2. rejects a whitespace-only category as a missing required field
3. rejects a whitespace-only summary as a missing required field
4. reports the required-field error before the enum error
5. distinguishes a blank category from an unknown category

### Teach the asymmetry precisely

Do not say that blank values pass under the seeded fault. That is wrong, and the suite shows why.

* A whitespace-only **title** is wrongly accepted, and the title is normalized to an empty string.
* A whitespace-only **category** is not silently accepted. It survives the required-field check, reaches the enum check, and is rejected there with the unsupported-category error carrying the blank value, rather than with the required-field error.

Both are failures of the same lost trimming, and they surface differently. The precise symptom set is the lesson, not a blanket claim.

## Activity B: Fix and Verify

Minutes 39 to 51.

1. Before the run, write down how many of the 24 cases you expect to fail.
2. Minutes 1 to 2. Reproduce the fault and read the five failing names.
3. Minutes 3 to 6. Locate the private guard in `{{ site.data.strings.invariant.files.implementation }}`.
4. Minutes 7 to 9. Restore whitespace rejection, then rerun.
5. Minutes 10 to 12. Refactor the guard for readability, rerun, then ask for a change summary and check it against the diff.

The refactor is a scheduled step, not an optional extra. It is also demonstrated on S10, so that a shortened Activity B still covers refactoring.

Prompt to use:

```text
Restore whitespace rejection in the private guard. Change nothing else.
Then, as a separate step, rename the private guards for readability without
changing predicates, error strings, or validation order.
```

### Acceptance

* Mechanical gate: the previously failing cases pass, the baseline case count is unchanged, and no existing assertion was weakened or deleted.
* Judgment gate: the learner names which symptom pointed to the trimming defect.

Activity B fails if the suite is made green by relaxing an assertion, even though the count then looks correct. Say this before the room starts.

Observed after the repair on the prepared machine: 24 cases, 24 passed, exit code 0, with the case count unchanged from baseline.

### Fallback

If Copilot is unavailable, the facilitator applies the one-line repair by hand and the room performs the prediction and the diff review unchanged. If the live run fails, use the recorded failing and passing output and announce aloud that it is recorded.

## Checking a change summary

A change summary is evidence only after it has been checked against the diff. A summary naming a file you did not touch is wrong, however fluent it reads. Here the true summary mentions only the validator module: trimming restored, private guards renamed, behaviour unchanged.

Regenerate the documentation comment last, once the behaviour has settled.

## Next

Continue to [Section 4]({{ '/sections/section-4-prompting.html' | relative_url }}).
