---
title: "The Warning That Took My Site Down Was in the Log the Whole Time"
description: "A one-line warning in my deploy log took my site down for thirty minutes. It didn't stop anything, the command exited zero, and it looked like every other line scrolling past. Software risk stays invisible until traffic hits it, and that invisibility is why the work that prevents incidents is the first thing a deadline cuts."
date: "2026-07-27"
tags: ["leadership", "engineeringmanagement", "devops", "culture"]
slug: "the-warning-that-took-my-site-down-was-in-the-log-the-whole-time"
cover: "https://images.wraithcode.io/2026-07/contruction-computer-1600.webp"
published: true
devto_id: 2270234
---

A few weeks ago, I mistakenly took my own site down for about thirty minutes.

I was wiring up a queue-based pipeline for GitHub webhooks. That needs two Cloudflare Workers: one that catches the webhook and drops the event on a queue, and a second that picks it up and does the slow work in the background. GitHub gives you ten seconds to respond, so you answer fast and do the real work after.

Two Workers means two deploys. I chained them into a single command.

Cloudflare's build system printed a warning. It said it was overriding the Worker name in my config with the name bound to the build project. One line, sitting in the middle of a wall of normal deploy output. Then the command exited zero, the way a successful command does.

What that warning actually meant is that my second Worker, all 0.39 KiB of it, had just been uploaded as a new version of the first one and promoted to live traffic. That Worker knew how to read from a queue. It had no idea what an HTTP request was. Every request to the site threw an exception until I worked out what had happened.

Thirty minutes of downtime. About two hours all in, from the bad deploy to a rebuilt setup that can't do that to me again.

Nothing about it looked wrong. The config was fine. The command was fine. The output scrolled by looking like every other deploy I've run. The one line that could have saved me was formatted like the ones around it. It didn't stop anything, because it wasn't an error. It was information.

The risk was there the whole time. Nothing showed it. Then traffic hit it.

That's not how it works in the physical world.

Walk past a construction site. You can see the risk. Someone on the fourth floor with nothing behind him. A crane swinging a load over the sidewalk. A beam carrying more than it looks like it should. You don't need a process or a meeting to notice any of that. The risk is right in front of you. Everyone who walks past does some version of assessing it, not just the person who signed off on the plans.

Software has none of that. There's nothing to look at. A risky change and a safe change are the same thing on your screen. They're just text.

So the risk stays in someone's head. Never on paper, never in the ticket.

And you know the feeling. Someone's describing a ticket in planning and something in your gut says this one is going to be worse than it sounds. Maybe you say so. Maybe it turns into an extra point on the estimate. It almost never gets written down anywhere as a fact about the work, somewhere you can look at later.

That invisibility does something worse than hide risk after you ship, though. It changes what you build in the first place.

Put a team under a real deadline and watch what gets cut. It's never the feature. The feature is the visible thing, the thing that goes in the demo. What gets cut is the test for the weird path, the handling for when the third-party call times out, the ten minutes of thought about what happens when this runs at ten times the volume. That work just vanishes, because nobody sees it not happening. Nobody demos the edge case they handled.

And "we'll fix it next sprint" only ever covers the misses you can see. The dangerous ones pass the quality bar looking fine. They ship green. Then they surface on their own schedule, weeks or months later, as an incident.

Which means the corner you cut and the incident it caused almost never land in the same sprint. From the inside they look like two unrelated events.

So what do you actually do about it?

Make it visible. That's the whole job.

Not a new process or a committee. Just moving it out of your head and onto the work itself, at the level of the individual change. This change touches auth. That one has no test for the failure path. Another lands in a part of the system that broke twice this quarter. Write it down where someone else can see it.

Once it's visible, two things change. You can weigh it, which is what the construction site gets for free. And you can defend it when the deadline shows up. The work on the chopping block finally has a name. Instead of being a vague feeling that loses every argument against a feature you can demo.

That warning was in my deploy log the entire time. It just looked like everything else.