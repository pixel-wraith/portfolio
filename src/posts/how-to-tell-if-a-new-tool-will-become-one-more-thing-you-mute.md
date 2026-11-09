---
title: "How to Tell If a New Tool Will Become One More Thing You Mute"
description: "You've probably muted a bot at some point. Here are six questions to ask before a new tool joins your team's day, so you can spot early whether it'll stay useful or fade into background noise. Plus how I'm answering them with Merge Lantern."
date: "2026-11-09"
tags: ["codereview", "devtools", "productivity", "engineeringmanagement"]
slug: "how-to-tell-if-a-new-tool-will-become-one-more-thing-you-mute"
cover: "https://images.wraithcode.io/2026-11/smoke-detectory-no-battery-1600.webp"
published: true
---

You've probably muted a bot at some point. Or maybe a whole channel.

It usually starts out fine. The tool posts something useful, people read it. It's a win! But then it posts again. And again. And again. Pretty soon it's just part of the background. In a channel where everything is technically an alert, nothing actually gets read.

So when a team hears about a new tool, a really common reaction is "not another thing I have to keep track of." I've certainly had this reaction myself...

I've been building a tool that tells teams which pull requests need a closer look. The hardest part of building something like that is the line between useful and nagging. Cross it and you've taught the team to ignore you.

Here are the questions I'd ask about any tool before letting it into your team's day.

## Does it show up where you already work?

A heads-up is only worth something if people actually see it. A dashboard nobody opens catches nothing.

The best place for a signal is the one people already look at. If you have to remember to go check somewhere new, you probably won't.

## Does it keep one thing up to date, or keep adding more?

Some tools post a new comment every time something changes. After a few pushes, the thread is a wall of bot messages, and you have to dig to find the real conversation.

One note that stays current is a lot easier to live with than ten that pile up.

## Does it tell you why?

A flag with no reason behind it is hard to trust. If a tool says a change is risky, it should say what made it risky...so you can decide for yourself if it's right.

## Does it know when to stop?

Nobody really reads a list of 30 things. It looks like a wall of text, and people skim right past it. A short list of the ones that matter most is a lot more likely to get read.

## Can you set your own line?

Every team is different. What's risky enough to slow down for on one team might be totally normal on another. A tool that decides that for you is going to be wrong for somebody.

## Can you turn it off?

If a tool stops being worth it, getting rid of it should be easy. A tool that's hard to remove is asking you to trust it a lot up front.

## How I'm answering these with Merge Lantern

Here's how I'm trying to stay on the useful side of that line with Merge Lantern.

The risk score shows up right on the pull request, where the review already happens. It's one comment, and it gets updated in place as new commits come in. There's no pile of bot messages to crawl through.

Risky PRs also get a label, so you can see them in the pull request list without even having to open anything. Low-risk PRs don't get a label at all, so the list stays quiet.

Every score comes with the reasons. There's a short note on why it scored the way it did, plus the signals that fired, like a database migration or no tests changed.

The daily digest shows 5 pull requests, and that's it. Anything longer starts to look like a wall of text.

Each repo can set its own risk bands in a config file, so your team decides where its own line is.

And if it stops being worth it, you can take a repo away from it on GitHub, or uninstall it.

## What I'm still working on

I don't have all of this figured out yet. Right now, a low-risk PR gets the same kind of note as a risky one, just calmer. My current thinking is that it should show what didn't fire...no sensitive code touched, tests changed along with the code, the author has worked in that area before. A low score with no reason behind it is hard to trust too.

That's the bar I'm holding it to. If it ever turns into noise, it has failed at its job.

What's made you mute a tool in the past?
