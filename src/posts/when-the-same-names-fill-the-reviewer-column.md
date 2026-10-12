---
title: "When the Same Names Fill the Reviewer Column"
description: "When review depth follows risk, the high risk work falls on the same two or three seniors every week. Here are three ways to spread that load without lowering the bar."
date: "2026-10-12"
tags: ["codereview", "engineeringmanagement", "leadership", "programming"]
slug: "when-the-same-names-fill-the-reviewer-column"
cover: "https://images.wraithcode.io/2026-10/reviewers-1600.webp"
published: true
devto_id: 9905153
---

Last week I wrote about setting review depth based on what a change touches. Lower risk work can get a lighter review...but higher risk work should get full attention, no matter who or what wrote it.

Someone pushed on that in the comments, which surfaced the next problem that could present itself. High risk work almost always needs experienced, senior eyes on it, which tend to be the same two or three people on your team. Look at who reviewed your high risk PRs over the last month, and you'll probably see the same names week after week.

His question was how you spread that load without lowering the bar. I think there are three things worth looking at.

## A risk signal does two jobs

When you watch risk this way, it tells you when a change needs senior eyes. But it can also tell the team when it's taking on too much risk at once.

If the same few seniors are full week after week, that might be a planning problem more than a review problem. Too much high risk work is moving forward at the same time, and all of it lands on the same people. That's something to fix in scheduling and planning.

So the first place I'd look is the plan. How many high risk tickets did the team take on this sprint, and did anyone decide that on purpose?

## Chisel the low-risk work away

It could also mean authors aren't breaking the work up as well as they could.

A lot of work can be split. Say one PR mixes a change to how money moves with a handful of small UI updates. The whole thing gets treated as high risk, and the whole thing goes to a senior. But the author could pull the lower risk pieces out into their own PRs, and they don't need the same reviewers. The high risk part gets smaller, and the senior review gets more focused.

This one is easy to try, and it doesn't need anyone's permission. The next time a big PR shows up, ask which parts could have gone out on their own.

## Grow the list of people who can review it

The last one takes longer, but it matters the most.

As those high risk PRs come in, it's a good time for seniors to work alongside less-senior folks and coach them in those areas. Over time, more people can review the high risk work, and the load spreads without lowering the bar.

There's a second reason to do this. If only two people can review changes to billing, those two people are a single point of failure. When one of them leaves, the team loses more than a reviewer. It loses the person who knew how billing connects to everything else, where the temporary patches are, and what has broken before. Spreading that knowledge out is a risk control on its own.

## Go look at the review column

You don't need a tool to start. Pull up the high risk PRs your team merged in the last month and look at who reviewed them.

How many different names do you see? And if it's the same few, which of these would you try first...planning less high risk work at once, splitting it up, or growing the list of people who can review it?