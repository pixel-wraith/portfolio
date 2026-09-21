---
title: "Where Trust in Automated Review Actually Comes From"
description: "When your team stops trusting its AI code review, the obvious fix is to add a second AI. I don't think that buys you much...two models trained on the same internet share the same blind spots. What actually helped me was checking the evidence outside the diff. I tried it on a real queue of 58 open PRs, and here's what it caught."
date: "2026-09-21"
tags: ["codereview", "ai", "engineeringmanagement", "programming"]
slug: "where-trust-in-automated-review-actually-comes-from"
cover: "https://images.wraithcode.io/2026-09/code-review-1600.webp"
published: true
devto_id: 5708261
---

There's a tempting fix for the moment your team stops trusting its AI code review...add a second AI to check the first one.

I get why. We do the same thing with people...if a change is risky, we put two reviewers on it, because two people miss less than one. It seems like the same trick should work with models.

I don't think it does. The problem is where a model's judgment comes from. Two models trained on roughly the same internet are going to be wrong in roughly the same ways. When two human reviewers agree, that tells you something, because they built their instincts in different places...different bugs, different codebases, different scars. When two models agree, most of what you've learned is that two systems with the same blind spots read the same text. The second opinion came from the same school as the first one.

## What the diff leaves out

The bigger issue is (and this applies to human review too), most of what makes a change dangerous is not visible in the diff alone. Whether the test it touched actually guards anything. Whether the author (person or agent, doesn't matter) has ever worked in that part of the system. Whether that area has a history of breaking. Whether it lands in your billing path or in some quiet corner. You can read the diff five times and you won't find most of that. So a second model re-reading the diff mostly just buys you more re-reading.

The surface of a diff is also easier to fool than we like to think. A study out of MSR '26 looked at 3,858 pull requests and found that reviewers responded more warmly to agent-written code than to code people wrote. The researchers theorize that agent output looks plausible by design, so reviewers relax without noticing they're doing it. But plausible-looking code is the thing a model produces most of the time. Judging by the surface stopped being a safe habit.

## What I'd add instead

Facts. The stuff you can look up about a change instead of forming an opinion about it. What does it touch? Is there a database migration in it? Did a lockfile change? Did any tests change? Is CI green? Has the author worked in this area before? Has the area broken before? Each of those takes a few seconds to check, and a lookup can't inherit anybody's blind spots or biases.

I tried this on a real queue back in June...58 open pull requests on a public open source repo, hand scored on those signals as part of Merge Lantern's validation work. The top ranked PR touched live billing code, carried a database migration, bumped a lockfile, and had failing CI, all at the same time. 1,584 lines across 52 files. And the #2 PR was the opposite shape...265 lines, small and tidy, sitting in Stripe subscription handling with a schema change. By size it looked safe. It was not the kind of change anybody should skim...but because it was small, neat and tidy, it's very easy to assume it could have been skimmed and approved.

If you want to try this tomorrow with no tooling, do three lookups before you trust any review. What paths does the change touch? What's the history of those paths? Did the tests move with the code? A few seconds each.

I do want to be honest about the limits. These signals catch risky-SHAPED changes. They don't read the code for logic bugs, and they never will. A subtle bug in a small, well-tested change with green CI sails right through. What the signals are good for is deciding where your limited senior attention goes first.

## Where a second model earns its keep

I'm not saying model reviews are worthless. An architect I compared notes with runs multi-agent review well: different providers, different evidence sources for each agent, independent timing. When his agents agree, he treats it as one more data point and keeps checking the evidence. If you run two models, that's the way to do it...make them actually different, and don't let their agreement stand in for proof.

Whoever reviews a change...a person, a model, two models arguing...the deciding question is the same. What does the evidence outside the diff say about it?

So, to end, I have a question for you and your team. When a change lands, what does your review process know about it that isn't in the diff? I think for most teams the answer is close to nothing, and that's exactly where the misses live.
