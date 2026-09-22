---
title: Home
nav_order: 1
lang: en
---

# GitHub Copilot Fundamentals

A 90-minute, presenter-led introduction to GitHub Copilot, built around one small synthetic practice fixture rather than around slides alone.

> **{{ site.data.strings.en.disclaimer.title }}**
>
> {{ site.data.strings.en.disclaimer.body }}

## Language

This is the English edition. It is the reference edition and is authored first.

* French home page: [{{ '/fr/' | relative_url }}]({{ '/fr/' | relative_url }})

## Delivered profile

| Item | Value |
| --- | --- |
| Profile | Profile 1, the default |
| Format | Presenter-led demonstrations at fixed time codes, with short learner activities done in chat or on paper |
| Duration | 90 minutes |
| Learner prerequisites | None beyond attendance. Copilot access is useful but not required. |
| Hands-on keyboard labs | Not in this profile. Profile 2 adds them and ships in a later release. |

Profile 1 matches the agenda in the repository README exactly. It is safe for a mixed or unknown audience, because no learner needs a prepared machine, a toolchain, or a Copilot seat in order to take part.

## Schedule

| Section | Minutes | Page |
| --- | --- | --- |
| 1. Introduction to GitHub Copilot | 0 to 15 | [Section 1]({{ '/sections/section-1-introduction.html' | relative_url }}) |
| 2. Getting Started with GitHub Copilot | 15 to 30 | [Section 2]({{ '/sections/section-2-getting-started.html' | relative_url }}) |
| 3. Everyday Developer Use Cases | 30 to 55 | [Section 3]({{ '/sections/section-3-everyday-use-cases.html' | relative_url }}) |
| 4. Prompting Fundamentals | 55 to 70 | [Section 4]({{ '/sections/section-4-prompting.html' | relative_url }}) |
| 5. Introduction to Agent Mode | 70 to 85 | [Section 5]({{ '/sections/section-5-agent-mode.html' | relative_url }}) |
| 6. Wrap-Up and Q and A | 85 to 90 | [Section 6]({{ '/sections/section-6-wrap-up.html' | relative_url }}) |

The six sections are allocated 15, 15, 25, 15, 15, and 5 minutes. Section 5 ends at minute 85 and section 6 holds exactly the 5 minutes the README gives it, so there is no wrap-up buffer. Overrun is absorbed through the published cut order in the [facilitator runbook]({{ '/facilitator-runbook.html' | relative_url }}).

## Learning objectives

By the end of the session, participants will be able to:

* O1. Understand the core capabilities of GitHub Copilot
* O2. Differentiate between Copilot Chat, Code Completions, and Agent Mode
* O3. Apply basic prompt engineering techniques
* O4. Use Copilot to support common development activities
* O5. Evaluate and review AI-generated outputs responsibly
* O6. Confidently begin incorporating AI-assisted development into their daily workflows

Every objective is demonstrated by at least one scheduled activity, and every scheduled activity serves at least one objective. The full mapping is published in the [facilitator runbook]({{ '/facilitator-runbook.html' | relative_url }}).

## The practice fixture

Every demonstration runs against the same small synthetic fixture: a content-request validator written in TypeScript for this workshop.

* It validates a request for a short piece of written content. That is the whole of its subject matter.
* It is originally authored classroom material. It contains no customer source and models no regulated, safety-critical, or operational system.
* It has two dependencies, no network access, no user interface, and no provider integration.
* Participants never need to install it. In Profile 1 the facilitator drives it.

## Where the numbers come from

Test counts quoted on these pages were observed on one prepared machine on one date and recorded as observations. They are not guarantees, and a run that reports a different number has not failed. Acceptance is judged on behaviour, which is described on each section page and gated in the runbook.

## Pages

* [Prerequisites]({{ '/prerequisites.html' | relative_url }})
* [Facilitator runbook]({{ '/facilitator-runbook.html' | relative_url }})
* [Resources]({{ '/resources.html' | relative_url }})
