---
title: Facilitator runbook
nav_order: 10
lang: en
---

# Facilitator runbook

Everything needed to run the session, published as a page rather than buried in speaker notes. A co-facilitator, a translator, or a reviewer cannot read speaker notes while the session is running.

* French counterpart: [{{ '/fr/facilitator-runbook.html' | relative_url }}]({{ '/fr/facilitator-runbook.html' | relative_url }})

Profile 1, presenter-led, 90 minutes. Section allocation 15, 15, 25, 15, 15, and 5 minutes.

## Run of show

| Minutes | Slide | What happens | Hard stop |
| --- | --- | --- | --- |
| 0 to 3 | S01 | Title, duration, section split, independence notice read aloud | |
| 3 to 7 | S02 | What Copilot actually does, and where accountability stays | |
| 7 to 11 | S03 | Chat, completions, and agent mode compared | |
| 11 to 15 | S04 | Six misconceptions | Section 1 ends at 15 |
| 15 to 18 | S05 | Prepared fixture on screen, green baseline shown | |
| 18 to 22 | S06 | Attach two files, ask one scoped question | |
| 22 to 28 | S07 | **Activity A**: explain, complete one assertion, write and compare a question | |
| 28 to 30 | S08 | Inspect what Activity A produced | Section 2 ends at 30 |
| 30 to 34 | S09 | Trace one request through the fixed validation order | |
| 34 to 39 | S10 | Seeded failure read aloud, then the guard refactor demonstrated | |
| 39 to 51 | S11 | **Activity B**: predict, diagnose, repair, refactor, check the summary | |
| 51 to 55 | S12 | Change summary generated, then checked against the diff | Section 3 ends at 55 |
| 55 to 59 | S13 | The four-part rubric | |
| 59 to 62 | S14 | Vague request versus specific request on the same files | |
| 62 to 68 | S15 | **Activity C**: write a proposal-only prompt, then score a partner prompt | |
| 68 to 70 | S16 | Correct the ambiguous measurement, and say why | Section 4 ends at 70 |
| 70 to 73 | S17 | Plans from the ask surface and the agent surface, side by side | |
| 73 to 76 | S18 | Read the plan, decide on approval | |
| 76 to 81 | S19 | **Activity D**: apply the reviewed plan to exactly three files | |
| 81 to 85 | S20 | **Review demonstration**: inspect the diff, read the real results, decide | Section 5 ends at 85 |
| 85 to 87 | S21 | Recap, then the exit ticket | |
| 87 to 90 | S22 | Resources, then questions | Session ends at 90 |

Section 6 holds exactly 5 minutes. There is no wrap-up buffer, so the only recovery mechanism is the cut order below. Start the wrap-up no later than minute 85.

## Cut order

Apply these in order. Take item 1 first, and only move to item 2 if the session is still behind.

1. Drop the Activity C partner scoring at minutes 66 to 68. Keep the drafting.
2. Shorten the Activity B refactor demonstration at minutes 49 to 51. The refactor is still demonstrated on S10, so the topic survives.
3. Drop the plan comparison on S17 at minutes 70 to 73. Go straight to the plan review on S18.
4. Drop misconceptions five and six on S04.
5. Shorten Activity D to its review half. Skip the live agent run and review the recorded diff instead.

### Never cut

The review demonstration on S20 at minutes 81 to 85 is **never** cut, at any level of overrun. It is the only place in the session where responsible review of generated output is demonstrated against real results, and it is the sole evidence for objective O5. If the session is so far behind that S20 is at risk, take cut items 1 through 5 first, and if that is still not enough, end section 5 early and shorten the exit ticket rather than the review.

## Two-gate acceptance

Acceptance never depends on what the model happens to generate on the day. Each activity has one mechanical gate that any observer can check, and one judgment gate the facilitator assesses.

| Activity | Minutes | Mechanical gate, objectively checkable | Judgment gate, facilitator assessment |
| --- | --- | --- | --- |
| A. Explain and Complete | 22 to 28 | The completed assertion compiles and the focused test run is green | The learner states, in their own words, what the result type guarantees |
| B. Fix and Verify | 39 to 51 | The previously failing cases pass, the baseline case count is unchanged, and no existing assertion was weakened or deleted | The learner names which symptom pointed to the trimming defect |
| C. Specify the Title Limit | 62 to 68 | The prompt contains goal, context, constraints, and acceptance tests | A partner can restate the intended behaviour from the prompt alone |
| D. Implement the Title Limit | 76 to 81 | The diff touches only the three permitted files, every baseline case still passes, and the new boundary cases use literal numbers rather than the new constant | The learner identifies at least one thing worth changing in the generated diff |
| Review demonstration | 81 to 85 | A decision is stated out loud: accept, reject, or revise, with the file-by-file inspection done first | The room can name what evidence the decision rested on |
| Exit ticket | 85 to 87 | The form records one bounded task and one verification step | The facilitator judges that the task is achievable in a single day |

Activity B fails if the suite is made green by relaxing an assertion, even though the count then looks correct. Say this before the room starts. The mechanical gate is written to catch exactly that case.

Activity D depends on the two load-bearing clauses in the approved prompt: that every existing test is preserved, and that boundary expectations are written as literal numbers rather than as references to the new constant. Removing either clause lets a green run prove nothing, because a suite that derives its expectations from the constant passes for any limit value.

## Objective coverage

Every objective maps to at least one scheduled activity, and every scheduled activity maps to at least one objective.

### Objective to activity

| Objective | Scheduled activities that demonstrate it |
| --- | --- |
| O1. Understand the core capabilities | S01, S02, S04, S09, S21 |
| O2. Differentiate Chat, Completions, and Agent | S01, S03, S06, S07, S17, S19, S21 |
| O3. Apply prompt engineering | S01, S06, S13, S14, S15, S16, S18, S21 |
| O4. Support common development activities | S01, S07, S09, S10, S11, S12, S19 |
| O5. Review outputs responsibly | S01, S04, S08, S10, S11, S12, S14, S16, S18, S20, S21 |
| O6. Begin daily AI-assisted work confidently | S01, S05, S21, S22 |

### Activity to objective

| Slide | Minutes | Objectives served |
| --- | --- | --- |
| S01 | 0 to 3 | O1, O2, O3, O4, O5, O6 |
| S02 | 3 to 7 | O1 |
| S03 | 7 to 11 | O2 |
| S04 | 11 to 15 | O1, O5 |
| S05 | 15 to 18 | O6 |
| S06 | 18 to 22 | O2, O3 |
| S07 | 22 to 28 | O2, O4 |
| S08 | 28 to 30 | O5 |
| S09 | 30 to 34 | O1, O4 |
| S10 | 34 to 39 | O4, O5 |
| S11 | 39 to 51 | O4, O5 |
| S12 | 51 to 55 | O4, O5 |
| S13 | 55 to 59 | O3 |
| S14 | 59 to 62 | O3, O5 |
| S15 | 62 to 68 | O3 |
| S16 | 68 to 70 | O3, O5 |
| S17 | 70 to 73 | O2 |
| S18 | 73 to 76 | O3, O5 |
| S19 | 76 to 81 | O2, O4 |
| S20 | 81 to 85 | O5 |
| S21 | 85 to 87 | O1, O2, O3, O5, O6 |
| S22 | 87 to 90 | O6 |

No objective is unmapped and no activity is unmapped.

## Fallback A: Copilot is unavailable

Trigger: sign-in fails, the service is unreachable, or no response is produced within the slide's window. Decide within 60 seconds and switch. Do not spend an activity window troubleshooting.

The session still runs to its full 90 minutes. Activities C and the paper halves of A and D require no tool at all.

Assets this fallback needs, all reachable offline from the presenting machine:

| Asset | Used at |
| --- | --- |
| `docs/assets/images/v01-completion-and-accepted-diff.png` | S07, S08 in place of the live completion |
| `docs/assets/images/v02-chat-context-attachment.png` | S06, S14 in place of the live attachment |
| `docs/assets/images/v03-fixture-before-and-after.png` | S19 in place of the live agent run |
| `docs/assets/images/v04-failing-test-diff-passing-test.png` | S10, S11, S12 in place of the live repair |
| `docs/assets/images/v05-mode-comparison.png` | S17 in place of the live plan comparison |
| `docs/assets/images/v06-plan-and-approval.png` | S18 in place of the live plan |
| `docs/assets/images/v07-checkpoint-boundary.png` | S20 alongside the recorded diff |
| Recorded terminal output for the baseline, seeded, pre-feature, and implemented states | S05, S08, S10, S11, S19, S20 |
| The fixture working tree at `workshop/fixture/`, already installed | Every section, so that files can still be read and discussed |

Per-activity substitution:

* Activity A. Project the recorded completion, then run the paper half unchanged. The judgment gate is unaffected.
* Activity B. The facilitator applies the one-line repair by hand and the room performs the prediction and the diff review. The mechanical gate becomes the by-hand run rather than a generated one.
* Activity C. Runs unchanged. It is written and scored on paper.
* Activity D. Review the recorded diff and the recorded before and after output. The review demonstration at S20 runs in full.

## Fallback B: a live demonstration fails

Trigger: the tool responded, but the result is unusable, the run errors, or the fixture is in an unexpected state.

1. Say out loud what went wrong. A visible failure is useful teaching material and should not be hidden.
2. Reset the fixture with `node scripts/reset.mjs` from the fixture directory. Recovery is a reset, not an argument with the tool.
3. If the reset does not restore a usable state within the remaining window, switch to the recorded assets for that slide and continue.
4. Do not retry a failed generation more than once inside an activity window.

Assets this fallback needs:

| Asset | Purpose |
| --- | --- |
| `workshop/fixture/scripts/reset.mjs` | Restores the three lab files from the pristine copy |
| `workshop/fixture/.pristine/lib/scenario-engine/` | The pristine copy the reset restores from |
| `workshop/fixture/scripts/self-check.mjs` | Confirms the environment is usable again, in one line |
| `workshop/fixture/VERIFICATION.md` | The observed record, so the expected behaviour can be quoted without a live run |
| The recorded terminal output and images listed under Fallback A | Substitutes for whichever demonstration failed |

The approved screenshots are captured in a later phase of this project. Until they exist, Fallback A and Fallback B depend on the recorded terminal output and on `VERIFICATION.md`, and a facilitator should confirm every asset in these two tables is present before the session rather than discovering a gap during it.

## Labelling recorded output

Any recorded output shown during delivery must be **announced aloud** and **labelled on screen as recorded rather than live**, every time it is shown. A still image or a captured terminal transcript presented without that label misrepresents a demonstration that did not happen.

This applies to screenshots, recorded terminal output, recorded diffs, and any pre-recorded video. It applies whether the recording is used as a planned aid or as a fallback.

## Verification counts

Every count quoted in this workshop was observed on one prepared machine on one date and recorded as an observation.

| Point in the sequence | Observed |
| --- | --- |
| Baseline | 24 cases, 24 passed, exit code 0 |
| Seeded trimming fault | 24 cases, 19 passed, 5 failed, exit code 1 |
| After reset | 24 cases, 24 passed, exit code 0 |
| Feature tests added, rule not implemented | 27 cases, 26 passed, 1 failed, exit code 1 |
| Feature implemented | 27 cases, 27 passed, exit code 0 |

These numbers are **observed, not guaranteed**. A run that reports a different count has not failed, and no acceptance gate in this runbook depends on a number matching. Every count also depends on the fixture's own test configuration, so a differently configured tree can legitimately double or change them.

Judge acceptance on the behavioural conditions in the two-gate table: that the baseline is green, that the seeded fault produces failures attributable to lost trimming, that the feature tests fail before implementation and pass after it, that the baseline case count is unchanged across states, and that no baseline assertion was weakened.

## Pre-session preparation

* Signed-in editor with Copilot verified on the presenting machine.
* Fixture installed, one green baseline run observed, reset script exercised once.
* Every asset in the Fallback A and Fallback B tables present and reachable offline.
* Clean capture profile: no customer paths, organization names, account identifiers, branch names, unrelated tabs, or prior chat history on screen.
* Exit ticket form open and ready.
* A timer visible to the facilitator, set against the hard stops at 15, 30, 55, 70, 85, and 90.
