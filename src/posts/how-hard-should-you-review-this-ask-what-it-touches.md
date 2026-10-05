---
title: "How Hard Should You Review This? Ask What It Touches."
description: "When an agent helped write a pull request, the first question most reviewers ask is who wrote it. I think the better first question is what it touches. Here's how I'd set review depth by risk, where authorship still fits, and why some changes may need very little review at all."
date: "2026-10-05"
tags: ["codereview", "ai", "engineeringmanagement", "programming"]
slug: "how-hard-should-you-review-this-ask-what-it-touches"
cover: "https://images.wraithcode.io/2026-10/thinking-1600.webp"
published: true
devto_id: 1816275
---

When a pull request shows up and an agent helped write it, the first question a lot of reviewers ask is "did an agent write this?"

I get why. We built a lot of our review habits around who wrote the code. A senior engineer's change got a lighter look. A new hire's change got a closer one. Code that two people paired on often got a lighter review too, because pairing had built up a track record. Who wrote it was a quick way to guess at risk, and for a long time it worked well enough.

I think it's the wrong first question now. This post is about what I'd ask first instead.

## Where my last post on this left off

Back in August I wrote about why pair programmed code earned a lighter review, and why developer-plus-agent code hasn't earned it yet. A reader took it one step further in the comments...if agent-written code hasn't earned the discount, it should need more evidence before it merges.

I don't agree with that as a starting point. If you follow it all the way, every agent-written change gets the heavy review. That includes the one-line copy fix and the routine dependency bump. With agents writing more and more of the code, that's a lot of reviewer attention going to changes that were never likely to hurt anybody.

## Start with what the change touches

A lot of teams I've seen and spoken to give every change about the same review. A simple UI update and a change to how money moves get roughly the same look. With agents writing more of the code, that gets riskier. The mistakes are harder to spot, and there are a LOT more changes to look at.

So I'd start somewhere else. Before you open the diff, look at what the change touches. Billing? Auth? A database migration? An area that's broken before? Then decide how hard to look.

Is it a lower-risk area, where it's okay if AI missed something? Or is it a core function the business needs, where it calls for much more scrutiny?

## Where authorship still fits

Authorship still matters...I just treat it as an adjustment after the risk level is set.

How I think about it is agent written code doesn't earn extra scrutiny just for being agent written. I look at what the change is touching to decide that. Low-risk work gets a lighter review whether a person, an agent, or both produced it. High risk work gets my full focus and attention either way.

Where authorship does move the needle is on that high risk work. Take the same high risk change. If a developer and an agent built it, it gets my full attention. If two humans paired on it, I'd probably still go a bit lighter. The pair discount hasn't gone anywhere...it just doesn't transfer.

It also moves the needle earlier. On risky work, I'd rather get senior eyes on the plan before it's ever a pull request. Once someone builds a bad idea, review can't do much with it. By then the only question left is whether to ship it or not.

## Some changes may need very little review

I'll go a step further. There are PRs that would be fine with a light human touch. There are probably some that could move forward without human eyes at all. That frees up your reviewers to focus on the changes that really need them.

Where that line sits is up to each team and how comfortable they are. Lower risk still means some risk. A small change in a quiet corner can still have a bug in it. A lighter review is a bet that if something slips through there, it won't cost much. Your team gets to decide how much of that bet it's willing to make.

What I'd push for is drawing that line on purpose. Most teams inherited their review shortcuts without ever writing down what earned them. When a new kind of change shows up, like agent written code, it gets quietly sorted into whatever bucket already exists.

## How to tell what a change touches

Most of this you can look up in a few seconds. In my last post I suggested three lookups before you trust any review. What paths does the change touch? What's the history of those paths? Did the tests move with the code? The same three work here. They give you a sense of how hard to look before anyone reads a line of the diff.

So, here's my question for you and your team. When a PR lands, what decides how hard someone looks at it? And if you have a lighter review lane, what has to be true for a change to get into it?
