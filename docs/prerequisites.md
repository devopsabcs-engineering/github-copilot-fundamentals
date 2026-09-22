---
title: Prerequisites
nav_order: 2
lang: en
---

# Prerequisites

This page covers Profile 1 only, which is the delivered profile. Profile 1 is presenter-led and asks nothing of a learner's machine.

> **{{ site.data.strings.en.disclaimer.title }}**
>
> {{ site.data.strings.en.disclaimer.body }}

* French prerequisites page: [{{ '/fr/prerequisites.html' | relative_url }}]({{ '/fr/prerequisites.html' | relative_url }})

## For participants

Nothing is installed, signed in to, or configured during the session.

| Item | Required | Notes |
| --- | --- | --- |
| Attendance | Yes | The session is presenter-led end to end. |
| Something to write with | Yes | Three of the four activities are completed on paper or in chat. |
| A GitHub Copilot seat | No | Useful if you want to follow along, but no activity depends on it. |
| A prepared editor or toolchain | No | No learner runs the fixture in Profile 1. |
| TypeScript experience | No | The fixture is read and discussed, not written by learners. |

If you do have a Copilot seat and want to follow along, sign in before the session starts rather than during it.

## For the facilitator

These must be true before the room arrives, not while it watches.

* A signed-in editor with Copilot working, verified on the presenting machine.
* The practice fixture already expanded, with dependencies already installed and one green baseline run already observed.
* The reset script exercised at least once, so that recovery is a command rather than an improvisation.
* The recorded fallback assets present and reachable offline. They are listed by name in the [facilitator runbook]({{ '/facilitator-runbook.html' | relative_url }}).
* A clean capture profile: no customer paths, no organization names, no account identifiers, no unrelated tabs, and no prior chat history visible on screen.
* The exit ticket form open and ready, so that section 6 does not spend its 5 minutes on logistics.

## Data handling

Only the synthetic fixture goes into a Copilot prompt during this session. Do not place customer material, proprietary source, credentials, or environment files into any prompt, attachment, or screen capture.

Whether Copilot may be used against private or customer code is a separate organizational decision with its own owner. It is out of scope for this session, and a facilitator should decline to improvise an answer to it.

## Profile 2 and the pre-work contract

Profile 2 is the 120-minute variant that replaces each activity with a keyboard lab on a prepared fixture. It introduces real prerequisites that Profile 1 does not have, including a working local toolchain, a verified Copilot seat for every participant, and a signed pre-work contract completed before the event.

Profile 2 and its pre-work contract are **forthcoming in a later release**. They are deliberately not described here and there is no page to link to yet. If pre-work completion cannot be confirmed for a cohort, the session is delivered as Profile 1.
