---
title: "AI Made Coding Faster. Now Teams Are Cutting the Process That Catches Risky Changes"
description: "AI made coding faster, and the common advice now is to cut process everywhere so all that extra code can flow through. But some of those steps were catching risky changes before they reached users. Here are the three questions I ask to tell the process worth cutting from the process worth keeping."
date: "2026-10-19"
tags: ["ai", "engineeringmanagement", "codereview", "devops"]
slug: "ai-made-coding-faster-now-teams-are-cutting-the-process-that-catches-risky-changes"
cover: "https://images.wraithcode.io/2026-10/water-filter-1600.webp"
published: true
devto_id: 3781586
---

There's a piece of advice I've been seeing a lot lately...reduce friction, protect your engineers' focus, make the common path the easy path, and cut the unnecessary approvals, tickets, and handoffs.

And honestly, I think most of that is good advice. A lot of engineers end up as part-time administrators. They fight with environment setup, hunt for the right doc, and chase a permission across four different teams before they can even start on the actual problem. That stuff should go, no argument from me.

But "reduce friction" isn't the entire idea, at least the way I see it. And the missing half matters a lot more now that AI is in the picture.

## AI moved the bottleneck

Coding agents made writing code a lot faster, and by now there are tons of posts about where the work went. It piled up downstream...in planning, in review queues, in QA, in release approvals. PR volume jumped, and delivery dates barely moved.

The fix I keep seeing for that is to reduce friction across the whole delivery process, so all that new code can flow through every step faster. That's where I think it starts to go wrong. When a team decides it has a speed problem, it tends to treat every bit of friction as waste, and some of that friction was actually doing a valuable job.

## Two kinds of friction

The way I think about it, there are two piles.

The first is accidental friction...things like environment setup, hunting for docs, and chasing permissions across teams. That's pure tax, and it should go to zero.

The second is essential friction, which is the small "wait, should we?" before a change. In my experience that little pause is the cheapest insurance a team has.

## The water filter

To explain this, I like to use an analogy of a water filter. A filter needs friction to catch anything. Take all of the friction away and nothing gets caught...the water just runs straight through. Add too much and nothing flows at all. Clean water comes from getting the balance right between the two.

Code review is friction like that...it's where the risky changes get caught before users find them.

"Make the common path the easy path" is great right up until the common path runs straight through a risky change with no speed bump left on it. Optimize away all the friction, and you usually pull the guardrails out along with the bureaucracy. And it works for a while...you feel fast, right up until that first risky change slips through with a bug in it that impacts every one of your users.

## So which kind is it?

I don't have a clever framework for this. For me it comes down to the pros versus the cons. When I look at a step in our process, I ask three questions. Is there a benefit to having this friction? What do we gain by getting rid of it? And what do we lose?

If you run environment setup through those questions, there's no real benefit to it, you get time back by fixing it, and you don't lose anything.

Run the "wait, should we?" before a migration through them and you'd get a little time back by removing it. But you'd also lose the one moment where someone stops and asks whether this change could hurt users.

From my perspective, the teams getting the most out of AI, put the friction where the risk is and strip it out of everywhere else.

So before your team removes the next step from its process, it's worth asking what that step is getting you, and what you'd lose without it.