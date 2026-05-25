---
title: "The Code Review Checklist I Actually Use"
description: "Most code-review checklists ask \"does this work?\" The harder question is \"what happens when it doesn't?\" Five things I check on every PR that the standard checklists miss... plus the comment grammar that makes reviews actually move."
date: "2026-05-25"
tags: ["codereview", "engineeringmanagement", "pullrequest"]
slug: "the-code-review-checklist-i-actually-use"
cover: "https://images.wraithcode.io/2026-05/code-review-checklist-1600.webp"
published: true
devto_id: 3750350
---

Every code review checklist I've ever seen...in books, in onboarding docs, in Twitter threads...covers the same six things: tests, naming, style, error handling, complexity, and "did the author actually think about this."

Those things matter...they're table stakes. But they're not what catches the bugs that actually hit production.

For years now, I've kept a personal code review checklist. Every time I miss a real issue in review, I add the thing that would have caught it. The list has grown, then gotten cut back, then grown again. At this point it has five items the standard checklists don't, and they catch most of the problems the standard ones miss.

Here they are...

### 1. Observability changes

When a PR adds a new code path, my first question isn't, "does it work?" It's "will I know when it doesn't?"

Specifically I look for:

- New `try/catch` blocks that swallow errors without logging them
- New endpoints, jobs, or queue consumers with no metric attached
- New async work that won't show up in tracing
- New failure modes that won't trigger an alert

When a code path has no observability, you don't *not* have a bug...you have a bug you won't notice for weeks or months. The cost is real; it's just deferred.

This is a pattern I've seen play out in different forms: a silent failure that sits for weeks before a customer flags it. The code was fine. The review was fine. Nobody had asked "will we know when this breaks?"

### 2. Backward compatibility of public surfaces

Most teams check API compatibility for external APIs. Few check it for *internal* ones.

Things to check on every PR:

- Function signatures in shared modules or libraries
- Database columns: dropped, renamed, or type-changed
- Environment variables: new ones marked required
- JSON keys in any payload anything else consumes
- Message queue payloads
- Config file shape

Anything any other system or service depends on is a public surface, even if you don't think of it that way. If the new code is rolled out before the old consumers stop depending on the old shape, you have an outage in waiting.

This one shows up in deploys, not reviews. The PR looks clean. The merge looks clean. The first 20 minutes of staging traffic look clean. Then the consumer service rolls and everything catches fire.

### 3. Migration rollout/rollback strategy

If a PR touches a database migration, I ask three questions before approving:

1. **Is it forward-only and backward compatible?** The old application code has to be able to run against the new schema, at least for the duration of the rollout. Add columns nullable. Don't drop columns in the same PR that stops writing to them.
2. **Is it idempotent?** Can the migration run twice without breaking anything?
3. **Is it zero-downtime?** No exclusive locks on big tables during peak hours. No blocking changes on the hot path.

A lot of failed migrations I've seen failed on question one. The author wrote the migration assuming the app would already have shipped, but the deploy order doesn't actually guarantee that.

I treat any PR with a migration as automatically higher-attention. The cost of getting it wrong is hours of downtime; the cost of asking three more questions is five minutes.

### 4. Idempotency, concurrency, and timeouts

This is the bucket that quietly swallows the most production bugs.

For any PR that introduces:

- A new POST/PUT/PATCH handler
- A new background job or queue consumer
- A new outbound call to a third-party service
- A new write path of any kind

I look for three things: what happens if this runs twice with the same input? What happens if two of these run at the same time? What's the timeout, and what happens when the timeout fires?

Most engineers know about these concerns in the abstract. They forget about them in practice. A retry handler with no idempotency guard processes a payment twice. A background job with no timeout hangs forever and blocks the queue. A new endpoint with no rate limit becomes the next abuse vector.

Junior code rarely fails on logic. It fails on what happens when something *else* fails.

### 5. The PR description itself

This isn't a code check. It's the check that has to happen *before* the code check.

A good PR description answers:

- What problem does this solve?
- What solution did the author choose?
- What alternatives did they consider?
- How can a reviewer test this manually?
- What ticket does it link to?

If those answers aren't on the PR, I don't review the code yet. I ask for more context.

The reason is simple: once in every three to five PRs I review, I'm asking the author for context before I can evaluate the code at all. Without that context, I produce nitpicks instead of catches.

Asking for the description sounds like overhead. In practice it saves time, because the rewrite cycle on a misunderstood PR is much longer than the description cycle on an understood one.

### And the comment grammar

Everything I flag uses [Conventional Comments](https://conventionalcomments.org/). It's a small grammar that makes review intent explicit. Each comment leads with a label, and the most consequential ones carry a decoration.

The labels I reach for most: **issue** (a specific problem), **suggestion** (a proposal for change), **question** (clarification I need before I can finish the review), **nitpick** (trivial preference), **todo** (small but necessary), **praise** (something worth calling out).

What actually moves the review forward is the decoration: **(blocking)** must be resolved before merge, **(non-blocking)** is the author's call, **(if-minor)** asks them to fix only if the change is small.

A real comment looks like:

> **issue (blocking):** This handler has no idempotency guard. If a client retries, the payment runs twice.

This sounds small. It isn't.

Reviewers who don't label intent train authors to ignore them. When every comment carries the same weight, none of them carry any. Engineers learn quickly that all your feedback is negotiable.

When the (blocking) comments actually block and the nitpicks announce themselves as nitpicks, authors stop arguing. Reviews get faster.

### The checklist isn't the hard part

I've handed this list to people before. They write it down. They use it for a week. Then they stop, because they can't run a ten-item checklist on every PR. Nobody has time. With anywhere from 10–50 open PRs at any moment, the math doesn't work.

So in practice you triage. Most PRs get a quick read. A few get the full pass. The trouble is, the PRs that need the full pass aren't always the ones that look like they do.

The 1000-line refactor with three reviewers and multiple hours or days of back and forth conversation? Usually fine. The 50-line config change that touches the auth path? That's the one that breaks production.

Figuring out which PRs need attention...without reading every line of every diff...is the actual problem. Lately I've been building something for it. More on that soon.