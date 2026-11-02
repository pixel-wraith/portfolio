---
title: "The Thing That Makes a Small Team Fast Is What Makes It Fragile"
description: "A small team is fast because the whole problem lives in two or three heads. That's also why it's fragile...when one of those people leaves, a big chunk of how things work leaves with them. Here's what actually walks out the door, and how to manage it before it happens."
date: "2026-11-02"
tags: ["engineeringmanagement", "leadership", "management", "culture"]
slug: "the-thing-that-makes-a-small-team-fast-is-what-makes-it-fragile"
cover: "https://images.wraithcode.io/2026-11/fragile-1600.webp"
published: true
devto_id: 1660749
---

Small teams are fast. I don't think that surprises anyone.

There's less to coordinate. Fewer meetings, fewer approvals, fewer people to keep in the loop. I saw a post a while back that put it well...the question leaders should keep asking is "what's the smallest group that can own this problem end-to-end?" Ownership scales a lot better than coordination.

I agree with all of that...but there's also a part of it that I think gets skipped a lot.

## Where the speed comes from

A small team is fast because the whole problem lives in two or three heads. Nobody has to write a long doc or wait on another team. The people who need to know already know.

That's also exactly what makes it fragile.

When one of those people leaves, a big chunk of how things actually work leaves with them. A big team might barely notice, but a small team feels it right away.

## "Owns it" quietly turns into "only two people understand it"

Nobody really decides this...it just happens.

From the outside, everything looks great...the team ships fast and everyone knows who to ask. But that's the problem...everyone knows who to ask, because the answers only live in a couple of heads.

So the target is still the right one. Go for the smallest group that can own the problem end-to-end. Just watch for the day "they own it" turns into "only two people actually understand it."

## What actually leaves with them

When someone leaves, the cost usually gets counted as a job posting plus a few months for the new person to ramp up. Honestly, I think that number is way too low, because most of what walks out the door didn't only showed up in a commit.

There's the map of how everything connects. The code stays, and anyone can read it. What leaves is things like knowing that changing one area quietly impacts two others. The team can still make the change. They just can't see what else it might touch anymore, so the side effects show up in production.

There's the list of shortcuts. Every system has patches that were only meant to hold until later. The person who left usually knew where they were. Without them, the team treats the whole thing as solid.

And there's the biggest one, if you ask me...the relationships. They might have been the person everyone DM'd to think something through, ask for advice, or share a worry. You can fill the seat. You can't really fill that.

## Relying on what your seniors know

When you ask a team how they keep track of what's risky, a really common answer is that the senior people just know.

And they probably do. But that's a risk in itself! What's risky in your codebase frequently lives as gut feel in a few senior heads, and it walks out when they do.

It's easy to read that person as your most valuable engineer. They hold all the context and everyone goes through them. But that person is also a single point of failure, regardless of how good they are.

## Managing it on purpose

There isn't a nice and tidy fix here. You don't want to give up the speed, and you shouldn't...especially not in today's crazy pace. Speed and fragility come from the same place, so the job is to manage the concentration on purpose. But there are a few things I'd recommend looking at:

Write down the decisions, not just the code. In my own projects, I write down the trade-offs I made, the use cases I covered, and the things I chose not to build. It takes a lot less time than it used to...I just ask the AI to sum up the decisions from the session. (You can look up ADR's if you want to learn a little more about how I am managing this.)

Use what's already broken. Your past incidents are an honest map of what's risky in your codebase. Get that map out of a couple of heads and into something the whole team can see.

Spread what you know. Making yourself irreplaceable feels like job security, but it really just makes you the single point of failure. Making the people around you better is the thing that actually lasts.

## Keep the team small

None of this is an argument against small teams. They're fast for a reason. And honestly, I prefer working with small teams for a lot of reasons!

Just go in with your eyes open. The same thing that makes your team fast is what makes it fragile, and it's a lot easier to manage before someone leaves than after.

How does your team keep "owns it" from turning into "only two people understand it"?