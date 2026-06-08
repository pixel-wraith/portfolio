---
title: "Merge Standards That Actually Get Followed"
description: "Most merge standards are wiki decoration. What makes a team actually follow them isn't the list...it's enforcement, consistency, and the why."
date: "2026-06-08"
tags: ["engineeringmanagement", "codereview", "leadership", "productivity"]
slug: "merge-standards-that-actually-get-followed"
cover: "https://images.wraithcode.io/2026-06/zipper-lanes-1600.webp"
published: true
devto_id: 3467326
---

When a PR on my team crosses 500 changes, it gets the same response every time: this one's too big...let's break it down.

I don't enjoy being the line-count police. But I've learned that consistent pushback, with the reasoning attached, is the difference between merge standards that exist and merge standards that actually work.

Here's the thing. Just about every team has a merge standards page sitting in a wiki somewhere. Small PRs. The right reviewers. Tickets linked. And most of those pages? Decoration. Not because the standards are wrong, but because nobody is actually following them.

So instead of handing you another list, I want to show you the honest state of my team's. And I'll be upfront about the list itself...it isn't completely original. It's a collection of pieces I've picked up over the years...from talks, workshops, articles, and the teams I've worked on. Most of them just put words to rules I was already following. The list was never the valuable part. The valuable part is being honest about which standards my team enforces with real mechanisms, which ones run on culture, and which ones we still don't meet.

Let's dig in.

## The standards we're strict about

**Keep changes small.** The goal I've set for my team is to keep PRs under 300 changes. The actual ceiling is 500. That gap is deliberate...the goal is what we aim for, and there's room for judgment in between. But once a PR goes past 500 changes (and isn't one of the few exceptions we allow), I push back and ask for it to be broken down. Not sometimes. Every time. The moment you let one slide, the standard starts becoming a suggestion.

I also keep a close eye on the numbers here: each engineer's average PR size, the team's average, and every individual PR that gets opened. Why so strict? Because a reviewer can actually reason about a 300-change PR. Much past that, and the "review" starts turning into a skim with a green checkmark at the end. I've seen it. You've seen it. We've all done it.

**Don't let PRs sit.** Open-to-merge in under 2 days. A PR that sits around goes stale. The author's context evaporates, conflicts pile up, and by the time someone finally gets to it, the review is worse for the wait. Idle time is where good changes quietly rot.

**Link a ticket to every PR.** The only exception we make is the rare high-priority hotfix (and everyone knows when one of those is happening). Why does this matter? Because the reviewer gets context before they read a single line of the diff by first reading the requirements and source context included in the ticket. And six months from now, when someone asks "why does this code even exist?"...there's an answer.

**Automate the arguments away.** Linters and formatters run in pre-commit hooks, then again in CI. Nobody negotiates with a formatter. That frees up reviewers to hold authors accountable for the things automation can't check: patterns, naming, the shape of a solution, etc. Every argument you automate is review attention you get back for the judgment calls.

## The standards that run on culture

**The right reviewers (informally).** For certain areas of the codebase, like access control and auth, my team requests my direct review. For areas where one team member has the most experience, the developer pulls them in. They don't have to be the formal approver...they just need eyes on the change. Because the wrong reviewer doesn't just lack context. They can focus on the wrong things entirely.

**Extra brains on complex changes.** I'd love to tell you we have a mechanism for this...but we don't. The team just pulls people in when the work gets hairy. It works because the norm exists, and norms survive because people keep modeling them. The important piece is instilling a culture where this kind of thing is encouraged and accepted. 

**Break the work down before it ever becomes a big PR.** This one is coaching, not enforcement. Early on, I broke the work down myself. I wrote the tickets small and showed the team what the expectation looked like. These days, I hand each team member a ticket with the requirements listed, and they do the breakdown themselves. Small PRs don't start at review time...they start at planning.

## The standards we don't meet (yes, really)

**DevSecOps review for high-risk code.** We don't have a DevSecOps team. This standard came from an enterprise context, and I kept it on the list anyway. Our small-team adaptation turned out to be the informal rule above: high-risk areas get senior eyes (mine included). If you're at a startup, odds are you can't meet this standard as written either. That's okay. Adapt it instead of pretending.

**Required documentation.** Our tickets usually carry the PRDs and context docs. "Usually" is doing a lot of work in that sentence. I'm talking with the team right now about additional documentation requirements (like including spec files with changes), but we haven't landed on a process yet. I'm including this one because every honest standards list has a section like it.

**Auto-merging safe changes.** Documentation, tests, non-functional formatting...these don't need the full ceremony. Today they move through quickly because we apply looser expectations, but I'll be honest: that's just how it shakes out, not something we've automated. Eventually I want tooling (something like LinearB) that can auto-approve or even auto-merge these.

**Deprecation automation.** We only recently deprecated our first APIs, so automated change requests for deprecated usage are just now starting to matter for us. Standards can sit dormant until your codebase grows into them. Write them down anyway.

## What actually makes standards get followed

So what's the difference between a wiki page nobody reads and a set of standards a team actually lives by? For my team, it came down to three things. None of them are items on the list.

**The expectation is explicit.** I say it plainly, and I repeat it often: this is the standard. This is how we work. A standards page that leadership never says out loud stays a wiki page. Your team can tell the difference between documentation and an actual expectation...and they respond to the one that gets said in the open.

**I meet my own bar.** My PRs stay small. My changes link tickets. If I expect it from the team, I expect it from myself first. The fastest way to kill a standard is to exempt yourself from it.

**Pushback is consistent.** Every oversized PR gets the same response. Every single one. And not just by me. The entire team is encouraged to push back on violations of our standards. The first time you wave one through because it's Friday afternoon and everyone's tired? Your standard just became a coin flip.

And underneath all three of these: my team knows WHY each standard exists. When someone understands why small PRs matter, they want to write them...they can see the benefit for themselves. When all they hear is "keep it under 300 changes," you get bare-minimum compliance and some very creative line-counting. I spend way more time explaining the why than enforcing the what. Honestly, that ratio is the whole point.

## The standard underneath the standards

Here's a pattern worth noticing. Look at which standards survived contact with reality on my team: they're the ones that point attention at the changes most likely to hurt. Auth paths get senior eyes. Big diffs get broken down. Complex work gets extra brains. The only thing that ever skips a ticket is a hotfix...and a hotfix, by definition, is something that already hurt.

The list is the easy part. The real standard, the one underneath all the others, is deciding where your team's attention goes...and making sure it gets there before the merge, not after.