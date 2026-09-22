---
title: GitHub Copilot Fundamentals
description: Agenda, learning objectives, and delivery materials for a 90-minute bilingual GitHub Copilot Fundamentals workshop
---

# GitHub Copilot Fundamentals

A 90-minute, presenter-led introduction to GitHub Copilot, delivered in English and in French. This repository holds the workshop source: the agenda below, the paired site pages, two slide decks, a facilitator runbook, and one small synthetic practice fixture.

> **Independent educational resource**
>
> This workshop is an independent educational resource. It is not affiliated with, endorsed by, or sponsored by GitHub or Microsoft. All product names and trademarks are the property of their respective owners.

> **Ressource éducative indépendante**
>
> Cet atelier est une ressource éducative indépendante. Il n'est ni affilié à GitHub ou Microsoft, ni approuvé ou parrainé par ces sociétés. Tous les noms de produits et toutes les marques de commerce appartiennent à leurs propriétaires respectifs.

## Delivered profile

| Item | Value |
| --- | --- |
| Profile | Profile 1, the default |
| Format | Presenter-led demonstrations at fixed time codes, with short learner activities done in chat or on paper |
| Duration | 90 minutes |
| Languages | English and French |
| Learner prerequisites | None beyond attendance. A Copilot seat is useful but not required. |
| Hands-on keyboard labs | Not in this profile. Profile 2 would add them and is not shipped. |

Profile 1 asks nothing of a learner's machine, so it is safe for a mixed or unknown audience.

## Section time allocation

The six sections are allocated **15/15/25/15/15/5** minutes, totalling 90.

| Section | Minutes | Allocation |
| --- | --- | --- |
| 1. Introduction to GitHub Copilot | 0 to 15 | 15 min |
| 2. Getting Started with GitHub Copilot | 15 to 30 | 15 min |
| 3. Everyday Developer Use Cases | 30 to 55 | 25 min |
| 4. Prompting Fundamentals | 55 to 70 | 15 min |
| 5. Introduction to Agent Mode | 70 to 85 | 15 min |
| 6. Wrap-Up and Q&A | 85 to 90 | 5 min |

Section 5 ends at minute 85 and section 6 holds exactly the 5 minutes this agenda gives it, so there is no wrap-up buffer. Overrun is absorbed through the published cut order in the facilitator runbook.

## Start here

Both locale entry points and every page below are Markdown source in this repository. Read them on GitHub using the links here.

| Resource | English | French |
| --- | --- | --- |
| Entry point | [docs/index.md](docs/index.md) | [docs/fr/index.md](docs/fr/index.md) |
| Prerequisites | [docs/prerequisites.md](docs/prerequisites.md) | [docs/fr/prerequisites.md](docs/fr/prerequisites.md) |
| Facilitator runbook | [docs/facilitator-runbook.md](docs/facilitator-runbook.md) | [docs/fr/facilitator-runbook.md](docs/fr/facilitator-runbook.md) |
| Resources | [docs/resources.md](docs/resources.md) | [docs/fr/resources.md](docs/fr/resources.md) |
| Section pages | [docs/sections/](docs/sections/) | [docs/fr/sections/](docs/fr/sections/) |

These pages are also the source for a GitHub Pages site whose planned address is `https://devopsabcs-engineering.github.io/github-copilot-fundamentals`. That site is not published yet, so use the repository links above.

## Slide decks

Both decks carry 22 slides with speaker notes, and both are generated from the shared manifest in [slides/content.json](slides/content.json).

* English deck: [docs/assets/decks/github-copilot-fundamentals-en.pptx](docs/assets/decks/github-copilot-fundamentals-en.pptx)
* French deck: [docs/assets/decks/github-copilot-fundamentals-fr.pptx](docs/assets/decks/github-copilot-fundamentals-fr.pptx)

## Practice fixture

Every demonstration runs against one small synthetic fixture in [workshop/fixture/](workshop/fixture/): a content-request validator written in TypeScript for this workshop. It is originally authored classroom material, it contains no customer source, and it has no network access, no user interface, and no provider integration. In Profile 1 the facilitator drives it and no learner installs anything.

Run it from the repository root:

```bash
cd workshop/fixture
npm ci
npm test
npm run typecheck
```

Two more commands support delivery:

```bash
npm run reset       # restore the three exercise files to their pristine state
npm run self-check  # verify the fixture behaves as the workshop describes
```

Observed test counts quoted on the section pages were recorded on one machine on one date. They are observations, not guarantees.

## Status and known gaps

Read this before presenting or publishing.

* The GitHub Pages site is not published. Verified on 2026-09-22: the planned address returns HTTP 404.
* The French locale was machine-authored and translated from the English. No named native or fluent French reviewer has read or approved it. See `french_language_review` in [docs/\_data/decisions.yml](docs/_data/decisions.yml).
* No approved screenshots exist yet, so no page or slide carries one.
* Profile 2, the 120-minute hands-on variant with keyboard labs and a pre-work contract, is not shipped.
* Several Phase 0 decisions and approvals remain unassigned. The full list, including the open publication blockers, is recorded in [docs/\_data/decisions.yml](docs/_data/decisions.yml).

## Agenda

### 1. Introduction to GitHub Copilot (15 min)

#### Topics

* What is GitHub Copilot?
* How AI assists developers throughout the software development lifecycle
* Copilot Chat vs Code Completions
* Supported development environments
* Common misconceptions and expectations

#### Notes

This section introduces GitHub Copilot and establishes a foundation for the rest of the session. Participants will learn how Copilot fits into modern software development and the different ways developers can use AI to accelerate coding, learning, testing, documentation, and problem-solving tasks. We'll also address common misconceptions to help set realistic expectations and demonstrate where Copilot provides the most value.

#### Misconceptions to Address

* Copilot is just autocomplete
* Copilot replaces developers
* AI-generated code is always correct
* Copilot is only useful for writing code
* You need to be an AI expert to benefit from Copilot
* AI eliminates the need to understand the code you're working on

### 2. Getting Started with GitHub Copilot (15 min)

#### Getting Started Topics

* Copilot Chat vs Code Completions
* Navigating the Copilot experience
* Understanding context and responses
* First prompts and interactions
* Tips and best practices for new users

#### Getting Started Notes

Participants will learn how Copilot works within their development environment and how context influences the quality of responses. This section focuses on practical usage patterns and demonstrates how small changes in prompting and context can significantly improve results. The goal is to help users become comfortable interacting with Copilot from their very first day of use.

#### Demonstration Ideas

* Ask Copilot to explain an unfamiliar code snippet
* Generate a simple function
* Generate comments or documentation
* Ask questions about an existing project

### 3. Everyday Developer Use Cases (25 min)

#### Developer Use Case Topics

* Writing and generating code
* Understanding existing codebases
* Debugging and troubleshooting
* Refactoring code
* Generating unit tests
* Creating documentation
* Summarizing changes and pull requests

#### Developer Use Case Notes

This session focuses on practical, real-world scenarios that developers encounter every day. Rather than concentrating solely on code generation, attendees will see how GitHub Copilot can support various activities throughout the development lifecycle. The objective is to help participants identify opportunities to incorporate Copilot into their existing workflows and save time on repetitive tasks.

#### Developer Use Case Demonstrations

* Explain a legacy code file
* Generate unit tests for existing code
* Refactor a method for readability
* Debug a failing piece of code
* Generate documentation from source code

### 4. Prompting Fundamentals (15 min)

#### Prompting Topics

* Characteristics of effective prompts
* Providing useful context
* Asking clear and specific questions
* Iterating on AI responses
* Common prompting mistakes

#### Prompting Notes

The effectiveness of GitHub Copilot is heavily influenced by the quality of the prompts provided. This section introduces foundational prompting techniques that help users receive more accurate and useful results. Participants will learn practical strategies for communicating with AI and refining prompts to improve outcomes.

#### Best Practices

* Be specific about the desired outcome
* Include business or technical context
* Break large problems into smaller tasks
* Iterate and refine responses
* Review and validate AI-generated outputs

### 5. Introduction to Agent Mode (15 min)

#### Agent Mode Topics

* Ask, Edit, and Agent modes
* When to use each mode
* Delegating development tasks
* Multi-file changes
* Reviewing AI-generated work
* Responsible use of agent-based development

#### Agent Mode Notes

This section introduces Agent Mode and how it enables GitHub Copilot to assist with larger and more complex tasks. Participants will learn the differences between Ask, Edit, and Agent modes and see how AI agents can help plan, implement, and manage development activities while keeping developers in control of decisions and code quality.

#### Agent Mode Demonstrations

* Ask Mode: explain a problem
* Edit Mode: refactor existing code
* Agent Mode: implement a small feature across multiple files
* Review and validate generated changes

### 6. Wrap-Up & Q&A (5 min)

#### Wrap-Up Topics

* Key takeaways
* Recommended resources
* Next learning opportunities
* Open discussion and questions

#### Wrap-Up Notes

We'll recap the key concepts covered throughout the session and provide guidance on where participants can continue their GitHub Copilot journey. Attendees should leave with a clear understanding of how Copilot can support their daily work and how to build their skills through continued practice and exploration.

## Learning Objectives

By the end of this session, participants will be able to:

* Understand the core capabilities of GitHub Copilot
* Differentiate between Copilot Chat, Code Completions, and Agent Mode
* Apply basic prompt engineering techniques
* Use Copilot to support common development activities
* Evaluate and review AI-generated outputs responsibly
* Confidently begin incorporating AI-assisted development into their daily workflows
