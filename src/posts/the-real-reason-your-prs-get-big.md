---
title: "The Real Reason Your PRs Get Big"
description: "Big PRs don't come from lazy engineers. They come from a skill almost nobody gets taught: how to cut a piece of work down into small, reviewable chunks. Here's why that's still the highest-leverage habit in engineering... and why AI just made it matter more, not less."
date: "2026-06-15"
tags: ["engineeringmanagement", "codereview", "pullrequests", "ai"]
slug: "the-real-reason-your-prs-get-big"
cover: "https://images.wraithcode.io/2026-06/snowball-1600.webp"
published: true
devto_id: 3054125
---

I once worked in an org that shipped massive pull requests as the default. Not occasionally...as a matter of habit. A single PR could sit open for days (or even weeks in some cases), because reviewing it meant holding an entire subsystem in your head at once. Bugs piled up. Deadlines slipped, again and again. And it ended the way these things tend to: we eventually had to rebuild a big chunk of the system, because it had gotten into a state nobody could safely change anymore.

Here's the part nobody said out loud. The engineers weren't bad. They were smart people working hard. The PRs got big for a much more boring reason...and it's probably the same reason yours do.

Nobody ever taught them how to cut the work down.

## Big PRs are a skill gap, not a character flaw

We talk about large PRs like they're a discipline problem. "Just make smaller PRs." As if the only thing standing between a 1,500-change diff and a 150-change one is willpower.

It isn't. Breaking a big piece of work into small, self-contained, independently reviewable chunks is a real skill. It takes time to build, and almost nobody is explicitly taught it. You get handed a ticket that says "add billing," and "add billing" genuinely feels like one thing. Seeing the seams...where this PR could safely end and the next one begin...is the hard part, and it's the part no one trains you on.

I know, because I used to ship big PRs too. When I was younger I wrote sprawling changes all the time. I wasn't being careless. I just thought that was what "done" looked like: you take the problem, you solve the whole problem, you put the whole thing up for review.

It took me years to learn that smaller was simply better, and there was no single moment where it clicked. No disaster, no lecture. It was a slow migration...a little better this week than last week, over and over.

What changed my mind wasn't someone telling me to keep PRs under some number. It was watching what actually happened every time my PRs got smaller:

- **More bugs got caught.** A reviewer can actually reason about 200 changes. They cannot truly reason about 2,000...they skim, they trust, and they approve.
- **They got reviewed and merged faster.** Less time sitting in the queue blocking everyone, including me.
- **They stopped being overwhelming.** I could focus on one piece instead of trying to keep the whole system in my head at once.
- **They made me a better planner.** To ship small, you have to break the work down first...which means actually understanding the shape of what you're building before you build it.

Even once a team ships small, some diffs still land in risky places...auth, a migration, money code. Knowing which PRs need a closer look before they merge, whatever their size, is the thing I'm building Merge Lantern to answer. [mergelantern.com](https://mergelantern.com) if that's your problem too.

That last one snuck up on me. Small PRs forced me to start seeing systems as a stack of Lego bricks...small pieces that snap together and build on each other...instead of one giant thing I had to swallow whole. And once you can see the bricks, cutting the work down stops feeling like overhead. It's just how you think.

## What it looks like when a team gets this right

The team I lead today ships small, manageable PRs as the norm, and the difference isn't subtle:

- Our average open-to-merge time is about **1.5 days**.
- We get far fewer bugs reported, and the ones that do show up, we can usually find and fix quickly...because the change that introduced them was small and legible in the first place.
- Our delivery timing is much more consistent. We say something will land, and it lands.

I'll be honest about one piece: I still do a lot of the up-front planning and decomposition myself. Breaking work down is THE skill, and it's the one I'm actively coaching. Everyone on the team is working on it...but it's learned, not assigned. You don't fix big PRs with a rule. You fix them by teaching people to see the bricks. (The number we aim for is under 300 changes a PR. The number matters less than the habit it builds.)

## And then AI showed up

Here's what makes all of this more urgent than it was even a year ago.

For most of software history, there was a hidden governor keeping PRs from getting too big: writing the code cost the author real effort. Hand-writing 2,000 changes was painful enough that, on some level, you didn't want to. Size was self-limiting. "Keep PRs small" was advice that the sheer friction of typing partly enforced for you.

AI deleted that friction.

It now costs the author almost nothing to generate an enormous change. Type a prompt, get hundreds of changes back. The effort didn't disappear, though...it moved. It landed squarely on the person reviewing it. The author pays almost nothing; the reviewer eats the entire bill.

Which means the one thing that used to keep PRs reasonable...the cost of producing them...is gone. "Make smaller PRs" has stopped being something the workflow quietly enforces for you. It's now something you have to enforce on purpose, every single time, against a tool that will happily hand you a thousand changes you never really thought about.

So the skill I picked up slowly, over years, isn't just nice-to-have craft anymore. It's the thing standing between your team and a review queue that has quietly stopped catching anything.

## The part worth sitting with

If size no longer signals effort...if a giant PR no longer means somebody thought hard and did a lot of work...then size on its own tells you less than it used to about which changes are actually risky.

And that's the real question hiding underneath "why do PRs get big?" Not every PR deserves the same scrutiny. Some are trivial. Some can quietly take down production. The skill was never just cutting work into smaller pieces. It's knowing which of those pieces actually deserve your most careful, most expensive attention.

Most teams don't have a real answer to that yet. They review everything at roughly the same intensity, which means they under-review the dangerous changes and over-review the boring ones.

That's the problem I think about most these days. But it starts somewhere much simpler: learn to cut the work down. Teach your team to see the bricks. It's still the highest-leverage habit in engineering...and AI just made it matter more, not less.

One honest question to close on, because I haven't fully solved it either: once size stops telling you which PRs are risky, how does your team decide which ones get the careful read and which ones get waved through? I'd genuinely like to hear how you handle it.
