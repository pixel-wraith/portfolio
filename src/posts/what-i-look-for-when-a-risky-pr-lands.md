---
title: "What I Look For When a Risky PR Lands"
description: "The risky PR is rarely the big one...it's the one carrying money code, a migration, or a red build, regardless of size. Here's what I look for when one lands, and the product I'm building so senior attention goes where the risk actually is."
date: "2026-06-29"
tags: ["programming", "leadership", "buildinpublic"]
slug: "what-i-look-for-when-a-risky-pr-lands"
cover: "https://images.wraithcode.io/2026-06/pull-request-code-1600.webp"
published: true
devto_id: 8993623
---

A few weeks ago I pointed a hand-built risk digest at [unkey](https://github.com/unkeyed/unkey), a real open-source auth and API-keys codebase with 58 open pull requests, and asked it one question. If I were the senior on this team, which five would I want to look at before they merge?

Here is what came back at the top.

A billing change pushing month-to-date deploys to Stripe that also carried a database migration, bumped a dependency lockfile, and had failing CI. A second Stripe change, only 265 lines, but it touched subscription deletion...money-handling code where a small mistake is expensive. A 1,720-line database migration with no test files touched at all.

Notice what put those at the top. It was not size. The second one was tiny. They are at the top because of where they land and what they carry: money code, a schema migration, a dependency lockfile, a red build. Blast radius and correctness, not line count. That is the thing I have spent years learning to scan for the second a PR shows up.

The digest was not perfect, and I will be honest about that. It also flagged a dark-theme CSS change as touching authentication, billing, and secrets. It was wrong, for a dumb and useful reason: it matched on file paths that sit under routes named "auth" and "keys," not on code that actually touches auth. Touching a sensitive-named path is not the same as touching sensitive logic. I am still building this thing. But even when it was wrong, it was wrong in a fixable way, and it was right about the ones that mattered.

Here is what I keep coming back to. On a small team, senior attention is the scarcest resource you have. And the review pipe treats every pull request exactly the same...a 4-line config change and a 1,720-line migration wait in the same queue for the same eyes. The risky ones do not announce themselves. So the thing that actually breaks is not that nobody reviews. It is that the scarce attention gets spread evenly across changes that carry wildly different risk.

What I want is easy to say and apparently hard to get. I want the scarce attention to go where the risk actually is.

And once you start looking at it that way, you notice the question "where should attention go?" does not start or stop at the pull request. It starts when the ticket gets written, because some planned work is risky before a single line exists, just from what it will touch. It runs through the PR, the part I just showed you. It shows up in patterns across the team, the areas that keep generating risk, the places where someone is working in unfamiliar territory and could use a second set of eyes. And it rolls all the way up to a question every engineering leader should be able to answer and almost none can: how much risk are we carrying right now?

That is what I am building. It is called Merge Lantern, and it is a risk intelligence platform for engineering teams. One connected view of where risk lives across your whole software delivery lifecycle: from the ticket that gets written, to the PR that gets merged, to the patterns that emerge across your team, to how much risk you are carrying as a business. It does not review your code for you. It tells you where to look first, and how much risk you are holding.

The risk you ship hides in the dark.

The PR risk digest is the piece that is real today: every morning, a short list of the open PRs most likely to need senior attention, with the reasons attached. The other three layers are the roadmap, and I am building them in the open, one at a time.