---
title: "Your Team Is Getting Faster at Code Review. Your Seniors are Drowning."
description: "My team reviews code faster than it did before coding agents showed up, and I'm still finding real problems in code that already shipped. Turns out those two things can both be true at once...there's a study that explains how. Here's what actually broke (it wasn't my team), and what I'm doing about it."
date: "2026-08-10"
tags: ["codereview", "ai", "engineeringmanagement", "programming"]
slug: "your-team-is-getting-faster-at-code-review-your-seniors-are-drowning"
cover: "https://images.wraithcode.io/2026-08/drowning-1600.webp"
published: true
devto_id: 5955534
---

Every so often I go read code that's shipped in our platform. Not to review it (that ship has already sailed)...just to see where the system is drifting.

Lately I've been finding a lot of issues. Not nitpicks or code style issues. I mean infrastructure and functional problems that are hurting how our application performs and how far it can scale.

After sitting and thinking on this (and doing some reading), I don't think my team got sloppy. If anything, they got better at code review...

## What actually happened

When coding agents landed in our workflow, the volume shot up almost immediately. Every engineer on my team works with one or more agents throughout the day now, and the majority of the code going into our platform is generated that way.

Like many teams, the first thing to break in our process was the throughput. Everyone still had their own work to get done, and on top of that they suddenly had a lot more pull requests to get through. Things slowed down noticeably. A lot of people have been writing about this, and yeah, we lived it too.

Then we adjusted. My team moves through code review faster today than it did before any of this started.

So the queue problem got better. But the code coming out the other end has real problems in it.

## Nobody on my team stopped caring

I want to be careful about where the blame goes here, because I don't think it belongs to the people doing the reviewing.

There's a paper from MSR '26 (Huang, Jaisri, Shimizu, Chen, Nakashima and Rodríguez-Pérez, "More Code, Less Reuse") that looked at 3,858 Python pull requests and compared agent authored ones against human authored ones. The agent pull requests carried roughly 1.87 times the semantic redundancy...code duplicating logic that already existed in the repo.

Fine, that one I could have guessed...but the second finding surprised me.

Reviewers responded to the agent pull requests more warmly than to the human ones. More neutral and positive reactions on the agent PRs. More disgust, anger, fear and surprise on the ones a person wrote. The authors' read is that agent output is generated on probability, so it looks plausible on the surface, and reviewers ease off accordingly.

Put that next to what happened on my team and it sheds some interesting light on the situation. We got faster at review because we're reviewing code that's really good at looking fine. That's different than getting better at review...but from the inside the two feel the same.

## What it actually costs

Most of what I've seen getting written about has landed on devs getting overwhelmed and burning out. And I definitely see the same patterns emerging. The load is heavy and people are tired.

But burnout is not the number that shows up in a business review...

Senior engineers are spending enormous chunks of their time either reviewing everything that moves, or fixing what slipped through because a change needed senior eyes and didn't get them. That's time they aren't spending on architecture, or on the sophisticated, complicated, genuinely value driving work that mostly only they can do. Your most expensive people are buried in review queues and bug tickets.

I'll use myself, since I'm the example I can speak to honestly. I'm the most senior person on my team. I'm also the manager, the architect of the system, and lately an IC working through a steady stream of issues that reached production. I need to spend more time on reviews...but there's no more time to spend.

In all honesty, I'm drowning. And unless I find a way to identify more clearly and accurately where my attention is actually needed, I don't think this gets better on its own.

## The thing that broke is the model, not the team

Somewhere in here, the review model we inherited quietly stopped working.

That model treats pull requests as roughly interchangeable. They land in one queue, they all get looked at, they all get an approval from somebody. It held up fine for a long time because a human being had to sit down and write every line first. Writing was an unofficial throttle. It isn't anymore.

So the same amount of attention now gets spread across several times the volume, and it thins out everywhere at once. The safe changes get a careful read. The dangerous ones get that same read. And I find out which was which weeks later, when I'm scrolling through merged code and I see glaring issues staring back at me.

The failure is in the model itself. It assumed every change deserves about the same scrutiny, and it's still running in a world where the volume tripled and the risk never spread itself evenly across it.

## Where I've landed

This is the problem I'm building Merge Lantern for, so consider me a little biased. It leaves the reviewing up to you. There dozens of AI review tool out there today with claims to help you with the review process. That's not what Merge Lantern does. Instead, it ranks your open pull requests by how much risk they're carrying, so the senior attention you actually have lands on the changes that need it.

What I'm sure of is the shape of the problem. Attention is the scarce resource now. Spreading it evenly across everything was always a little wasteful, and it worked anyway when volume was low. Obviously it doesn't work now.

So here's the question I'm wrestling with this week...

How do you decide which pull requests get the careful read? Is it a written rule, is it a gut call, or is it whoever has time that afternoon? And if you've found a way to make that decision deliberately, I would love to hear how.