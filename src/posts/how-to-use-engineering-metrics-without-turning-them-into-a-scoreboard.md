---
title: "How to Use Engineering Metrics Without Turning Them Into a Scoreboard"
description: "Start tracking something new on your team, and the first question is usually \"is this going to be used against me?\" Here's how to keep your metrics useful without turning them into a scoreboard people learn to game. Plus how I'm applying the same rule to the risk scores in Merge Lantern."
date: "2026-11-16"
tags: ["engineeringmanagement", "leadership", "management", "culture"]
slug: "how-to-use-engineering-metrics-without-turning-them-into-a-scoreboard"
cover: "https://images.wraithcode.io/2026-11/metrics-1600.webp"
published: true
---

Say you start tracking something new on your team, like how many reviews each person does. What's the first thing people wonder?

"Is this going to be used against me?"

That's a fair question, and a lot of metrics have earned it. I think what makes a metric dangerous is what gets attached to it.

## What breaks a metric

Once a number is used to judge someone's performance, honesty is the first thing to go. You stop measuring the work and start measuring how well people can make the number look right.

Test coverage is a good example. Reward it, and you get tests that run every line and assert nothing. The number climbs, and the safety it was supposed to stand for stays right where it was.

There's a name for this...Goodhart's law. When a measure becomes a target, it stops being a good measure. People optimize the number and leave the real thing behind.

So what turns a measure into a target? A reward or a punishment riding on it.

## Treat every metric as a leading indicator

Every metric I watch is a leading indicator and nothing else. It's a datapoint that tells me where to look. Nobody gets rewarded or punished for it.

Things like how many reviews someone does, or the average number of comments on a pull request. I don't grade anyone on those numbers, so there's nothing to game. And when one moves, it still means something.

## High or low just means look closer

A count running high or low doesn't mean good or bad. It means go look a little closer.

Most of the time there's a perfectly good reason. Someone got stuck on a hard problem. Someone had a really good week.

But every so often, that second look turns up something real. Maybe it's a spot where someone could use some coaching. And the number was the only reason you went digging.

Attach a reward or a punishment to it, though, and you've made it a target. From then on, it stops telling you the truth.

## What about team targets?

You might be wondering how this fits with setting targets. I set some myself, like keeping pull requests under 300 changes.

Those are goals for the team about how the work moves. They're there to make the work easier and more efficient. Nobody is rewarded or punished for hitting them.

## The same rule for risk scores

I'm building Merge Lantern, a tool that puts a risk score on pull requests. I hold it to the same rule. A risk score is a signal to look closer.

Down the road, Merge Lantern might give developers a risk score too. Say one developer's score runs high. That could be a sign they've been getting assigned too much of the high-risk work.

That's worth knowing. If someone is put in higher-risk, higher-stress situations for long periods of time, it can lead to burnout and unhappiness. It can also leave only one person on the team who knows the sensitive parts of the codebase, along with other issues.

So a high score there is a reason to look at how the team hands out the work.

## Keep nothing riding on it

Metrics stay useful as long as nothing rides on them. Use them to decide where to look, and then go find out what's really going on.

How do you keep a metric from turning into a scoreboard on your team?
