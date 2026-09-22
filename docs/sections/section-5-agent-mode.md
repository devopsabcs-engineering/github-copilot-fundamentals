---
title: "Section 5: Introduction to Agent Mode"
nav_order: 7
lang: en
---

# Section 5: Introduction to Agent Mode

Minutes 70 to 85. Four slides, Activity D, and the review demonstration that carries the responsible-review objective.

* French counterpart: [{{ '/fr/sections/section-5-agent-mode.html' | relative_url }}]({{ '/fr/sections/section-5-agent-mode.html' | relative_url }})

## Objectives served

* O2. Differentiate between Copilot Chat, Code Completions, and Agent Mode
* O3. Apply basic prompt engineering techniques
* O4. Use Copilot to support common development activities
* O5. Evaluate and review AI-generated outputs responsibly

## Run of show

| Slide | Minutes | Activity |
| --- | --- | --- |
| S17. Ask, Edit, and Agent | 70 to 73 | Compare the plans the surfaces produce for the same request |
| S18. Review the Plan and Permissions | 73 to 76 | Read the plan, then decide whether to approve the run |
| S19. Activity D: Implement the Title Limit | 76 to 81 | Apply the reviewed plan to exactly three files |
| S20. Review, Test, Recover | 81 to 85 | Inspect the diff, read the real results, then accept, reject, or revise |

Section 5 ends at minute 85 and section 6 begins there. That boundary is recorded as a resolved decision, and it means there is no wrap-up buffer to spend.

## Choosing a surface

* Ask produces a question and an answer, and changes no file.
* Edit produces a scoped change to files you chose yourself.
* Agent produces a plan, then edits across files, then a review you must perform.

Choose the smallest surface that can do the job.

## Reviewing the plan

Read the plan before approving it: which files, in what order, with what error text. The permitted scope is three files, and anything outside them is a stop rather than a warning. No package installs, no network access, no environment files, and no regulated-domain content.

If the plan names a fourth file, decline it in front of the room. A declined plan is a successful demonstration, not a broken demo. Approval is the control point, because once a tool run is approved the review moves from cheap to expensive.

## Activity D: Implement the Title Limit

Minutes 76 to 81, with the review at 81 to 85.

Before the run, each learner writes down the two files they would inspect first, and why.

The scope is exactly three files under `lib/scenario-engine/`:

* `{{ site.data.strings.invariant.files.types }}` exports `{{ site.data.strings.invariant.constant_name }}` with the value {{ site.data.strings.invariant.constant_value }}.
* `{{ site.data.strings.invariant.files.implementation }}` rejects over-length titles after the existing enum checks, with the exact error `{{ site.data.strings.invariant.error_message }}`.
* `{{ site.data.strings.invariant.files.test }}` gains exactly three boundary cases, written with literal numbers.

### The prompt

Use this prompt as written. It is the approved workshop prompt.

```text
In this synthetic workshop fixture, add a maximum trimmed title length of
{{ site.data.strings.invariant.constant_value }} JavaScript UTF-16 code units. Modify only {{ site.data.strings.invariant.files.types }},
{{ site.data.strings.invariant.files.implementation }}, and {{ site.data.strings.invariant.files.test }} in
lib/scenario-engine/. Export {{ site.data.strings.invariant.constant_name }} from {{ site.data.strings.invariant.files.types }}. Preserve existing
enums, public signatures, errors, and validation order. Put the new check after
the enum checks. Use the error "{{ site.data.strings.invariant.error_message }}".
Preserve every existing test and do not weaken, delete, or rewrite any existing
assertion. Add tests for {{ site.data.strings.invariant.constant_value }} units, 81 units, and a padded {{ site.data.strings.invariant.constant_value }}-unit title, and
write those expected boundaries as literal numbers rather than referring to
{{ site.data.strings.invariant.constant_name }}, so the tests fail if the constant is wrong.
Do not install packages, access the network, read environment files, or
generate content unrelated to this fixture. Run the prepared focused tests and typecheck.
Report the diff and the actual results.
```

Two clauses in that prompt are load-bearing and must not be removed or paraphrased when the prompt is shortened:

1. Every existing test is preserved, and no existing assertion is weakened, deleted, or rewritten.
2. The new boundary expectations are written as literal numbers rather than as references to the new constant.

Without them, an agent that writes its expected values from the new constant produces a suite that passes for any limit value. The review evidence for the responsible-review objective then collapses, even though the run looks green.

### Acceptance

* Mechanical gate: the diff touches only the three permitted files, every baseline case still passes, and the new boundary cases use literal numbers rather than the new constant.
* Judgment gate: the learner identifies at least one thing worth changing in the generated diff.

### Observed results

On the prepared machine:

| Point in the sequence | Observed |
| --- | --- |
| Three boundary cases added, rule not implemented | 27 cases, 26 passed, 1 failed, exit code 1 |
| Rule implemented | 27 cases, 27 passed, exit code 0 |

The 24 baseline cases were unchanged in both states. These counts are observations from one machine on one date, not guarantees.

### Fallback

If the agent run cannot be completed live, review the recorded diff and the recorded before and after output. Announce aloud that they are recorded, and label them as recorded on screen. The review discussion at minutes 81 to 85 runs unchanged.

## The review demonstration is never cut

The review at S20 is the only place in the session where responsible review is demonstrated against real output. It is never dropped, at any level of overrun. Time is recovered from the four earlier items in the published cut order instead.

Recovery from a bad run is a reset, not an argument with the tool. The fixture ships with a reset script and a pristine copy of the three files for exactly this reason.

## Next

Continue to [Section 6]({{ '/sections/section-6-wrap-up.html' | relative_url }}).
