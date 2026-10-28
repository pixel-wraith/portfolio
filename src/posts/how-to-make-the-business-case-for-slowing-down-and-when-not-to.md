---
title: "How to Make the Business Case for Slowing Down (and When Not To)"
description: "The case for moving fast usually comes with a number, and the case for slowing down usually comes with a story. Here's how to turn your experience into a number the business can actually weigh...and how to tell when the numbers say you should move faster after all."
date: "2026-10-26"
tags: ["engineeringmanagement", "leadership", "management", "career"]
slug: "how-to-make-the-business-case-for-slowing-down-and-when-not-to"
cover: "https://images.wraithcode.io/2026-10/scale-1600.webp"
published: true
devto_id: 1660749
---

Last week I wrote about the two kinds of friction in an engineering process...the kind that just slows the work down, and the kind that catches risky changes before they ship. Someone left a question on that post that I think deserves a real answer.

Here's roughly what they said. The friction that slows things down shows up on every dashboard...cycle time, lead time, how long a PR sits waiting. But the friction that actually catches stuff? That doesn't show up anywhere. You only see what it was worth in an incident review, and nobody ever connects that incident back to the step that would've caught it. So how do you defend a "wait, should we?" when the case against it has numbers, and the case for it is just a story?

Honestly, I think that's how a lot of good process steps end up getting cut. And I think the fix is simpler than it sounds.

## You can't out-argue a missing number

So say you raise a risk with leadership, and nothing happens. The usual advice is to communicate better...put it in business terms and be more convincing.

And sometimes that really is the problem, and better words fix it. But a lot of the time, they understood you just fine. The feature they picked has a revenue number on it. The risk you raised is a guess about something that might go wrong someday. A win you can count today beats a maybe-cost later almost every time, no matter how well you argue it.

You can't out-argue a missing number. You can go find one, though...and that's a different job than trying to be more convincing.

## Your experience is already a number

Here's the part I think a lot of engineers miss...if you've been doing this a while, you probably already have the number. You just don't think of it as one.

Someone put it to me like this a while back. They couldn't prove their system stayed stable because they kept a dependency up to date. But they knew from experience that falling behind on updates causes a lot more pain down the road.

That's more than a hunch, if you ask me. They've watched what happens to teams that skip those updates, and that's real information. It just isn't in a form the business can compare against anything yet...like hours, or dollars. Until you put it in those terms, there's nothing for the other side to weigh it against.

## Turning it into a number

In my experience, there's almost always some kind of number you can find for the "it's just a story" side. A couple I'd look at:

Time now vs time later. Spending an hour today on something that could cause hours of downtime later? That's a really useful number to share. But if the time involved is tiny, that tells you something too...maybe you don't need the pause after all.

Cost now vs cost later. Businesses understand money. If you can put a dollar amount on a change, it can sway a lot of decisions...and revenue lost from an outage is a powerful number. If the cost comes out low though, that's a sign you might not need the "should we?" either.

And that part matters. If you're honest about it, the numbers can tell you to drop a step just as easily as they tell you to keep it.

## Sometimes the answer is "not right now"

There's one more thing, and I think it's the one engineers skip the most. Sometimes the answer to "should we?" is yes...followed by "not right now, we've got bigger priorities."

As engineers, it's really easy to get tunnel vision and only think about the technical side of a decision. But a business is more than the tech...there's sales, users, customers, money. That new feature might be the difference between landing a big client or not. It might keep a client you already have. You might be losing users to a competitor and need to stop the bleeding as fast as you can. And an imperfect feature can often keep users around, then get better later.

So even when you technically should do something, there might be a good reason not to do it right now.

## Look at the whole business

It all comes back to one thing. You can't just make the technical argument. You've got to think about the business as a whole.

That's why I think it's so important for engineers to understand more about the business side of things...so the calls you push for aren't just leaning toward the tech.