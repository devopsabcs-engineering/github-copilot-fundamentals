---
title: "Section 2: Getting Started with GitHub Copilot"
nav_order: 4
lang: en
---

# Section 2: Getting Started with GitHub Copilot

Minutes 15 to 30. Four slides and Activity A. This section teaches use, not setup. No install, sign-in, or first-run configuration happens in front of the room.

* French counterpart: [{{ '/fr/sections/section-2-getting-started.html' | relative_url }}]({{ '/fr/sections/section-2-getting-started.html' | relative_url }})

## Objectives served

* O2. Differentiate between Copilot Chat, Code Completions, and Agent Mode
* O3. Apply basic prompt engineering techniques
* O4. Use Copilot to support common development activities
* O5. Evaluate and review AI-generated outputs responsibly
* O6. Confidently begin incorporating AI-assisted development into their daily workflows

## Run of show

| Slide | Minutes | Activity |
| --- | --- | --- |
| S05. Ready to Work | 15 to 18 | Show the prepared fixture and the green baseline run |
| S06. Give the Right Context | 18 to 22 | Attach two files, then ask one scoped question |
| S07. Activity A: Explain and Complete | 22 to 28 | Explain, complete one assertion, then write and compare a question |
| S08. Inspect Before Accepting | 28 to 30 | Inspect what Activity A produced |

## The fixture on screen

Three files under `lib/scenario-engine/`:

* `{{ site.data.strings.invariant.files.types }}` holds the enums, the request shape, and the result type.
* `{{ site.data.strings.invariant.files.implementation }}` holds `{{ site.data.strings.invariant.function_name }}`.
* `{{ site.data.strings.invariant.files.test }}` holds the test suite.

The contract the room needs before Activity A:

* The validator takes unknown input and returns a success or error union. Narrow on the discriminator before reading further.
* Free text is trimmed.
* Enum membership is exact and case-sensitive, and the value is not trimmed before the comparison.
* Omitted optional fields stay undefined. The validator never substitutes a default.

That last point is the one most often stated wrongly. If a generated explanation claims the validator fills in a default detail level or output length, reject it in front of the room.

## Activity A: Explain and Complete

Minutes 22 to 28.

1. Minute 1. Ask chat to explain `{{ site.data.strings.invariant.function_name }}`, with no edits.
2. Minutes 2 to 4. Accept one inline completion for a normalized-title assertion, then read it back out loud.
3. Minutes 5 to 6. On paper, write the one question you would ask about the result type, then compare it with the person beside you.

Prompt to use:

```text
Explain what {{ site.data.strings.invariant.function_name }} returns and what a
success result guarantees. Do not edit any file.
```

### Acceptance

* Mechanical gate: the completed assertion compiles and the focused test run is green.
* Judgment gate: the learner states, in their own words, what the result type guarantees.

### Fallback

If Copilot is unavailable, project the prepared completion screenshot, announce aloud that it is recorded rather than live, and run the paper half of the activity unchanged.

## Observed baseline

On the prepared machine, the baseline focused run reported 24 cases, 24 passed, exit code 0.

That number is an observation from one machine on one date, and it depends on the fixture's own test configuration. It is not a guarantee. A learner or facilitator who sees a different count has not failed the activity.

## Next

Continue to [Section 3]({{ '/sections/section-3-everyday-use-cases.html' | relative_url }}).
