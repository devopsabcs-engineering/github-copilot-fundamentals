---
title: "Section 4: Prompting Fundamentals"
nav_order: 6
lang: en
---

# Section 4: Prompting Fundamentals

Minutes 55 to 70. Four slides and Activity C. Activity C is written and scored on paper, so this section runs unchanged even with no tool available at all.

* French counterpart: [{{ '/fr/sections/section-4-prompting.html' | relative_url }}]({{ '/fr/sections/section-4-prompting.html' | relative_url }})

## Objectives served

* O3. Apply basic prompt engineering techniques
* O5. Evaluate and review AI-generated outputs responsibly

## Run of show

| Slide | Minutes | Activity |
| --- | --- | --- |
| S13. A Prompt With a Testable Outcome | 55 to 59 | Introduce the four-part rubric |
| S14. Context Is Evidence | 59 to 62 | Contrast a vague request with a specific one on the same files |
| S15. Activity C: Specify the Title Limit | 62 to 68 | Write a proposal-only prompt, then score a partner prompt |
| S16. Iterate With a Reason | 68 to 70 | Correct an ambiguous measurement, and say why |

## The four-part rubric

A prompt that can be reviewed has four parts.

* **Goal.** Reject titles longer than the limit, measured after trimming.
* **Context.** The three named files and the existing validation order.
* **Constraints.** Measure UTF-16 code units, not visible characters. Place the check after the enum checks. Preserve existing behaviour.
* **Acceptance tests.** {{ site.data.strings.invariant.constant_value }} units accepted, 81 units rejected, a padded {{ site.data.strings.invariant.constant_value }}-unit title accepted with the trimmed title returned.

The first three parts describe intent. Only the fourth can fail. A prompt without acceptance tests cannot be reviewed objectively, and that is the part almost everyone omits on a first draft.

## Context is evidence

`Fix validation` is not a prompt. It names no file, no rule, and no test, so anything it produces is unreviewable.

Attach the validator, the types, and the existing tests. Nothing else. Attaching more is not attaching better, and an environment file, a credential file, or customer material must never be attached as context.

## Activity C: Specify the Title Limit

Minutes 62 to 68.

1. Minute 1. Critique the vague version together.
2. Minutes 2 to 4. Draft a prompt that asks for a **proposal only**, with no file edits and no command execution.
3. Minutes 5 to 6. Score a partner prompt against the four-part rubric.

The prompt must name the constant `{{ site.data.strings.invariant.constant_name }}` with the value {{ site.data.strings.invariant.constant_value }}, placement after the enum checks, the exact error text `{{ site.data.strings.invariant.error_message }}`, the three permitted files, and the three boundary cases.

### Acceptance

* Mechanical gate: the prompt contains goal, context, constraints, and acceptance tests.
* Judgment gate: a partner can restate the intended behaviour from the prompt alone.

### Fallback

None is needed. Nothing is executed during this activity, so it runs to completion on paper with no tool.

Partner scoring is the **first** item in the published cut order. If the section is running long, drop the scoring and keep the drafting.

## Iterate with a reason

The phrase `{{ site.data.strings.invariant.constant_value }} characters` is ambiguous, because bytes, code points, and visible characters all differ. Say UTF-16 code units, measured after trimming.

State plainly that this counts code units rather than visible characters, and that accented and emoji input is therefore out of scope for this boundary test. The boundary cases use ASCII only, so the measurement is unambiguous.

Iterate because the prompt was ambiguous, not because the answer was disappointing. The second attempt succeeds because the request changed, not because the tool improved.

## Next

Continue to [Section 5]({{ '/sections/section-5-agent-mode.html' | relative_url }}).
