---
title: Resources
nav_order: 9
lang: en
---

# Resources

References for participants after the session, and pointers for facilitators preparing one.

* French counterpart: [{{ '/fr/resources.html' | relative_url }}]({{ '/fr/resources.html' | relative_url }})

## Official documentation

* GitHub Copilot documentation: <https://docs.github.com/copilot>
* Getting started with Copilot Chat: <https://docs.github.com/copilot/using-github-copilot/copilot-chat>
* Prompt engineering guidance for Copilot: <https://docs.github.com/copilot/using-github-copilot/prompt-engineering-for-github-copilot>
* Copilot plans, entitlement, and feature availability: <https://docs.github.com/copilot/about-github-copilot/subscription-plans-for-github-copilot>
* Copilot content exclusion and its limits: <https://docs.github.com/copilot/managing-copilot/configuring-and-auditing-content-exclusion>

Content exclusion is not supported for every flow, including some agent and edit flows. Do not treat it as the control that makes an arbitrary repository safe to use as Copilot context. Entitlement and data handling are organizational decisions with a named owner.

## Workshop pages

* [Home]({{ '/' | relative_url }})
* [Prerequisites]({{ '/prerequisites.html' | relative_url }})
* [Facilitator runbook]({{ '/facilitator-runbook.html' | relative_url }})
* [Section 1: Introduction to GitHub Copilot]({{ '/sections/section-1-introduction.html' | relative_url }})
* [Section 2: Getting Started with GitHub Copilot]({{ '/sections/section-2-getting-started.html' | relative_url }})
* [Section 3: Everyday Developer Use Cases]({{ '/sections/section-3-everyday-use-cases.html' | relative_url }})
* [Section 4: Prompting Fundamentals]({{ '/sections/section-4-prompting.html' | relative_url }})
* [Section 5: Introduction to Agent Mode]({{ '/sections/section-5-agent-mode.html' | relative_url }})
* [Section 6: Wrap-Up and Q and A]({{ '/sections/section-6-wrap-up.html' | relative_url }})

## The practice fixture

The fixture lives in the repository under `workshop/fixture/`. It is originally authored classroom material with two dependencies, no network access, no user interface, and no provider integration.

Files a participant would read:

| File | What it holds |
| --- | --- |
| `lib/scenario-engine/{{ site.data.strings.invariant.files.types }}` | Enums, the request shape, and the discriminated result type |
| `lib/scenario-engine/{{ site.data.strings.invariant.files.implementation }}` | `{{ site.data.strings.invariant.function_name }}` and its fixed validation order |
| `lib/scenario-engine/{{ site.data.strings.invariant.files.test }}` | The test suite |
| `scripts/self-check.mjs` | Prints one pass or fail line |
| `scripts/reset.mjs` | Restores the three lab files from a pristine copy |
| `VERIFICATION.md` | The observed behavioural record, with every count labelled as observed |

Commands, run from the fixture directory:

```powershell
npm ci
npm test -- lib/scenario-engine/validateGenerateRequest.test.ts
npm run typecheck
node scripts/self-check.mjs
node scripts/reset.mjs
```

A passing test run does not establish type correctness, which is why the typecheck is a separate command.

## Invariant software literals

These are code contract values. They are byte-identical in every language edition of this workshop and are never translated, re-cased, re-spaced, or re-punctuated.

| Item | Value |
| --- | --- |
| Constant name | `{{ site.data.strings.invariant.constant_name }}` |
| Constant value | `{{ site.data.strings.invariant.constant_value }}` |
| Error message | `{{ site.data.strings.invariant.error_message }}` |
| Function name | `{{ site.data.strings.invariant.function_name }}` |

The error message carries no trailing period.

## Next learning steps

* Repeat Activity C on a rule from your own codebase: write the goal, the context, the constraints, and the acceptance tests before opening a prompt.
* Repeat Activity D's review half on any generated change: read the diff file by file, run the tests, then accept, reject, or revise.
* Keep the boundary habit. Name the files a change is allowed to touch before you ask for the change.

## Deck downloads

The generated decks are produced in a later phase of this project and are linked from the repository README once they ship. There is no deck link on this page yet, because the file does not exist.
