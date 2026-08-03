---
title: "Pair Programming Earned a Lighter Code Review. AI Hasn't."
description: "On a lot of teams, code that a pair of devs wrote usually gets a lighter code review. Nobody wrote that rule down and nobody voted on it, but pairing earned it. Here's what the research actually says about that discount, why it's never one flat size, and what happens when dev + agent starts getting filed under the same category."
date: "2026-08-03"
tags: ["codereview", "ai", "engineeringmanagement", "programming"]
slug: "pair-programming-earned-a-lighter-code-review-ai-hasnt"
cover: "https://images.wraithcode.io/2026-08/pair-programming-1600.webp"
published: true
devto_id: 814577
---

Is writing code with an agent the same thing as pair programming?

That question has been going around lately, and there's a practical consequence sitting inside it that I don't see many people chasing down.

On a lot of teams, code that a pair of devs wrote gets a lighter code review.

I personally have never seen that written down anywhere. It's not in a policy doc and nobody voted on it. But everywhere I have worked, when a PR came from two people who built and tested it together, the review was lighter. Reviewers trusted the code more. Fewer issues got found in review. Fewer bugs slipped through afterward. So the lighter review kept looking like the right call, and it stuck.

That's a risk decision, even though it never feels like one. Somebody looked at a category of change and decided it needed less scrutiny than everything else.

And here is the part worth sitting with. Pairing earned that discount.

## Pairing earned that discount

Researchers have studied pair programming for a long time, and the results are less magical than the marketing but pretty consistent.

Cockburn and Williams (2000) found pairing costs roughly 15% more development time and buys back roughly 15% fewer defects. They also measured statistically significant gains in design quality, technical skill, team communication, and resilience when someone leaves, since knowledge stops living in one person's head.

The 2009 meta-analysis from Hannay, Dybå, Arisholm and Sjøberg is more nuanced. A small positive effect on quality. A medium positive effect on duration, so pairs finish faster on the clock. A medium negative effect on effort, because they burn more total person-hours. Complexity moves the needle too: pairs are faster when the work is simple, and produce higher quality when the work is hard.

A couple caveats here, since I'm using this research to defend a practice. Neither study measured code review specifically. They measured defects and duration, and "so review gets shorter" is my personal inference from fewer defects showing up at the door. The authors of the meta-analysis also flag signs of publication bias in the pair programming literature, which is worth knowing before anyone treats these numbers as completely settled.

Even with these caveats, there's a track record here. The lighter review is resting on something real.

## It was never a flat discount

The other thing about that discount is that it was never a one size fits all deal.

Two juniors pairing usually produce better code than either of them would have alone. Genuinely better. But still not as good as what comes out when a senior is in the pair. I've watched that difference play out enough times to treat it as a hard rule rather than a hunch.

So the shortcut was never "pairing gets a lighter review." It was closer to "this pair, working on this, has earned a lighter review." Everybody doing the reviewing knew that, even if nobody ever said it.

Which raises the question that made me want to write all of this stuff down...if a developer plus an agent counts as a pair, which pair is it?

## AI code has not built that record

I want to be careful here, because there's a lot to consider and the tooling is moving fast. But from what I've seen up to this point, AI generated code on its own comes with a lot of problems in it. Security issues. Functional bugs. And a slower one that worries me more than the rest...people losing their understanding of their own systems, which makes those systems harder to fix the longer it goes on.

None of that earns a lighter review.

The cost moved the other direction at the same time, too. We've all read and seen how producing code got cheap. Evaluating it didn't. Nothing about an agent made reading code faster, made holding a system in your head easier, or made it quicker to spot a wrong assumption (no matter how confident the agent sounds).

So put those together. A lot of developers are working with agents right now. If that counts as pairing, it gets the lighter review. So we read less of the code, right when a lot more of it is showing up. And it's the kind that's hardest to spot problems in just by reading it.

That cost doesn't stay with the team that filed it that way. It lands on users, on clients, and on the business, usually much later.

## Nobody is going to decide this in a meeting

That's the part I'm mulling over today.

No one on the engineering team is going to stand up and propose reviewing AI written code less carefully (at least I hope not). That's not how it happens. It happens when a category you already had quietly absorbs a new kind of work, and the rule attached to that category comes along for the ride. Dev + agent starts getting called pairing, pairing already had a discount, and the discount transfers without anyone explicitly deciding anything.

Most teams inherited their review shortcuts, and I'd be surprised if anyone wrote down what earned them. So when something new shows up asking to be filed under an existing category, there's nothing to check it against.

So here is what I would actually ask you to do, and then a real question.

Go find your team's review shortcuts. The paired code one. The "it's only a config change" one. The "this person's PRs are always clean" one. They exist, they're mostly unwritten, and you probably inherited at least one of them from a team you're no longer on.

Then ask what earned each one, and whether that thing is still true for the code you're merging today.

What did you find when you went looking? I am very curious whether other teams have caught this happening, or whether it's already too far along to see clearly. If you would rather talk it through then feel free to contact me directly, my inbox is open.