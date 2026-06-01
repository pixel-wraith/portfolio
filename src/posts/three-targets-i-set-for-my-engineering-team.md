---
title: "Three Targets I Set for My Engineering Team"
description: "The three targets I set for my engineering team — PR size, open-to-merge time, and change failure rate — and why these are the three that matter."
date: "2026-06-01"
tags: ["engineering", "management", "leadership", "codequality"]
slug: "three-targets-i-set-for-my-engineering-team"
cover: "https://images.wraithcode.io/2026-06/three-1600.webp"
published: true
devto_id: 2239522
---

A while back I set three targets for my engineering team. Not velocity. Not story points. Not "things shipped."

Just three numbers.

Together they tell me whether the work is moving the way it should, or whether next week is shaping up to be a fire-fighting week. I check two of them most days. The third I used to watch closely...until we lost the tool that measured it.

Here they are, and why they earned their spot.

### Why these and not just velocity

The first metric most engineering managers reach for is velocity. Story points completed, tickets closed, work merged.

Velocity is worth watching. It is a lagging indicator...it tells you what already happened...but it still shapes what comes next. When a sprint's work doesn't get finished, it rolls into the following one, and that rollover eats into whatever you had planned.

What velocity doesn't tell you is *how* the work moved...whether it moved in a way that's going to come back and bite you. For that you need numbers that describe the shape and quality of the work, not just the amount of it...ideally ones that flag a problem while there's still time to act.

These three do that.

### 1. Average PR size

**Target: under 300 lines changed per PR.**

What it tells me: how well the team is decomposing work.

A team consistently shipping oversized PRs isn't producing more...they're producing PRs that no reviewer can read carefully. Big PRs get rubber-stamped. Rubber-stamped PRs are where production bugs hide.

The 300-line target isn't magic. It's roughly the size below which most reviewers will actually read every line. I tell my team to aim for under 300 changes and to treat 500 as a hard ceiling, give or take a handful of genuine exceptions. Past 500 changes, I consistently see quality, review time, and thoroughness all drop sharply...the PR stops getting read and starts getting skimmed.

When the team's average creeps up over a few weeks, I have an early signal that one of three things is happening:

- **Stories are too coarse.** The work doesn't break down cleanly into small PRs.
- **Engineers are batching changes.** Often a review-avoidance pattern..."I'll just put it all in one."
- **Capacity mismatch.** The team is shipping faster than the review queue can keep up.

All three predict trouble. None of them show up in velocity.

The fix usually isn't a directive. It's more hands on. It's syncing with whoever's writing the biggest PRs, helping them understand how they could have broken down the work differently so they can take that lesson forward...work decomposition is a learned skill, and most engineers were never explicitly taught it.

### 2. Average PR open-to-merge time

**Target: under 2 business days.**

What it tells me: how fast the team is closing the review loop.

A 2-day average means PRs are getting attention and moving. When the average climbs toward 3+ days, something in the pipeline is dragging. In my experience it's rarely that a PR got *forgotten*...it's usually one of a few specific things:

- **Lots of back-and-forth.** The review turns into a long feedback thread, and each round adds another day.
- **PRs sitting idle.** Nobody picks the review up within a working day.
- **Unclear requirements.** The work opened before the requirements were nailed down or the open questions were answered, so review stalls while everyone figures out what it's supposed to do.
- **Stacked PRs.** Open five dependent PRs in quick succession (happens a lot with AI generated code), each taking a day to merge, and part five is sitting for five days no matter how fast anyone moves.

Whatever the cause, a PR that drags gets expensive. The author moves on to something else. The context goes cold. The merge ends up rushed when someone finally needs it shipped... and rushed merges are one of the leading sources of production bugs I've seen.

The fix isn't more meetings about PRs. A few things help most:

1. **A blocked calendar slot for review.** A few hours per day per engineer, on the calendar, treated like a real meeting. Not "I'll get to it when I have time."
2. **An idle-time SLA.** No PR sits for more than 8 business hours without some action being taking on it (ie. review feedback added, review feedback resolved, approved, etc.)
3. **Pair review for anything risky.** Two reviewers on the same PR, at the same time, in the same room (or call). Faster and catches more than two separate reviews.

If this number creeps up, the team is accruing review debt. It gets paid back, with interest, by whichever engineer has to rebase a five-day-old branch onto a main that's moved underneath them.

### 3. Change failure rate

**Target: under 10%.**

What it tells me: how often our changes cause something to break.

This is the target I set for the team that I can't currently measure... we lost access to the tool that tracked it, and I'm exploring new options to start tracking it again. But it still matters, so it stays on the list.

The definition is the standard one: change failure rate is the share of changes that result in a failure, calculated as failed changes divided by total changes, times 100. If 2 of 30 changes in a month had to be fixed or rolled back, that's a failure rate of about 7%.

Below 10% is healthy. Between 10–20% means something specific is going wrong...usually missing tests, unclear requirements, or rushed reviews. Above 20% is a process problem, not a people problem.

On its own, change failure rate is a *lagging* indicator (like velocity). The damage is already done by the time the number moves. But cross-referenced with the first two, it becomes leading: oversized PRs plus slow merges plus a rising failure rate is the signature of a team about to have a bad month.

When all three trend together, I take it seriously. I sit down one-on-one with the engineers involved, and I bring it to the whole team so we can course-correct together. It's almost always solvable...but only if you catch it in the leading indicators, not in the post-mortem.

### What these three cover together

PR size tells me about *decomposition.* Merge time tells me about *review discipline.* Failure rate tells me whether the first two are working.

Together they trace the SDLC from ticket to working code in production...three checkpoints along the path the work actually travels.

If one is bad and the other two are fine, I have a specific problem to investigate. If all three are bad, the team is in trouble and I still have a few weeks to fix it before things begin to blow up.

That's the part most metrics miss. They tell you what already broke. These three tell you what's about to.

### How I actually use them

I don't keep a spreadsheet or a dashboard. I check the first two most days and let them shape the calls I make...where to spend review time, which work to break down further, when to slow down. The numbers are decision inputs, not a report I file.

The hardest part of being an engineering manager isn't deciding what to ship. It's noticing when the team is about to ship something that's going to hurt...early enough to change course.

These are the numbers I watch for that.
