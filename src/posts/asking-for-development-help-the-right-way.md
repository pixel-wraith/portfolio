---
title: "Asking for Development Help...the Right Way"
description: "Internal Slack channel   \"I have a problem, can someone help?\"   Discord channel:..."
date: "2023-02-22"
tags: ["firebase", "performance", "cleancode", "softwaredevelopment"]
slug: "asking-for-development-help-the-right-way"
cover: "https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-01-1600.webp"
published: true
devto_id: 1373013
---

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-01-1600.webp)

*Internal Slack channel*
> "I have a problem, can someone help?"

*Discord channel: ExpressJS*
> "Anyone here know express?"

*104 lines of code pasted unformatted*
> "Are there any other options?"

*4th post asking this question...*
> "Where is a good place to learn React?"

Do questions like these sound familiar? I'd be surprised if they didn't. Whether you're communicating with your team on Slack, with a community on one of the many Discord servers out there, talking on IRC (yeah, it's still around), or just looking up info on Stack Overflow, questions like these come up excruciatingly often and cause a lot of frustration...both for the people being asked, and the asker.

We all need help sometimes, and we should never feel bad, discouraged or afraid to reach out and ask for it. However, there are good ways of asking for help, and there are bad ways. In this post, I want to highlight some of the good ways we can reach out to other developers for help without causing frustration.

This is by no means a comprehensive list of do's and don'ts. But if you follow these few recommendations, I promise your engagement with other developers will be much more positive and will most assuredly lead to you getting the help you need.

-----

## The 20 Minute Rule

Before you ask someone else to solve your problem, try to solve it yourself. This may sound silly, but you would be surprised how many people immediately ask for help when they encounter something unfamiliar.

Give yourself a solid 20 minutes of working through the problem. 20 minutes is a good measure because it's enough time to try a few troubleshooting techniques, but not so long that it's severly holding things up from meeting deadlines.

If you still haven't been able to solve the issue after 20 minutes, then reach out to someone. Maybe it's something simple that your tired eyes just overlooked.


-----


## If You're Getting an Error, READ IT!

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-02-1600.webp)

So many times I've seen people posting a screenshot of an error they're getting and asking what the issue is, even though the error message clearly says what the problem is.

I know some of the error messages out there are cryptic and unhelpful if you don't fully understanding the tool...but at least read it first! I'd be willing to bet that if you copied that error message and pasted it into any search engine, you would get at least 1 result about it. Go on, give it a try BEFORE you ask other people to tell you the answer.


-----


## Before you Ask, Check if Someone Else Has

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-03-1600.webp)

One of the biggest frustrations I see is when someone asks a question that has already been answered. I understand that the internet is a big place, and we'll miss a few things from time to time. But if I can literally copy your question, paste it into any search engine and find the answer in the top 3 results, it just tells me that you didn't bother looking and instead wanted someone else to do the work for you.

So before you ask, do some looking yourself. Literally type your question into any search engine and see what comes up. Heck, now that ChatGPT exists, you can go ask it first!


-----


## Ask in the Correct Place

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-04-1600.webp)

Okay, so you've done your due diligence and tried to solve the problem for at least 20 minutes. You looked around on Stack Overflow, or in your server's chat history and you've confirmed your question hasn't been answered yet. Now it's time to ask your question. But stop and think...where should you ask it?

It doesn't make any sense to ask a Python question in a Javascript forum, or ask how to set up an Express server inside a React channel. There are already conversations going on in those places, and you asking an unrelated question there only serves to interrupt and derail people trying to get their own *related* questions answered. 

Pay attention to where you're submitting your questions, **AND DON'T SPAM MULTIPLE CHANNELS!!!**


-----


## Ask Clear Questions

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-05-1600.webp)

On many occasions, I've seen incredibely vague questions asked that are like, "Can someone help me with a problem?".

If you have a question, just ask it. Don't beat around the bush. Don't force other devs to play 20 questions.


-----


## Provide Context

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-06-1600.webp)

Too often I see questions being asked as though everyone understands the context and details the asker is referring to. Consider an example:

> "How do I sort an array of objects?".

While you may feel this is a legitimate question when asking it, for everyone else, it doesn't provide enough detail and requires anyone willing to help to follow up by asking "How do you want them sorted?" or "What do the objects look like?"

You can't always anticipate what information others will need, but always remember not everyone there has the information you do. You need to provide the necessary details and context to the question in order for others to grasp what you need. Always try to consider: What data is needed to understand the problem? In 1 or 2 sentences, what is the issue? What is the desired output?

As an example, a much better way of asking the above question would have been:

> "I have an array of objects in the following structure:"

```json
[
  {
    foo: 456,
    bar: 'abc,
  },
  {
    foo: 123,
    bar: 'abc,
  },
  ...
]
```

> "How can I sort these objects by their property `foo` so that the output would be:"

```json
[
  {
    foo: 123,
    bar: 'abc,
  },
  {
    foo: 456,
    bar: 'abc,
  },
  ...
]
```

This is a bit more to type out, but it provided plenty of information for other users to know exactly what you're trying to do without having to ask a bunch of other questions.


-----

## Share Your Code

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-07-1600.webp)

This could have gone in the last section, but it's so important I thought it warranted it's own.

Always assume the people you're asking for help are going to need to see your code. I understand it can be scary or embarrassing showing it to others, especially when you're a young developer and feel like it's not very good. Don't be shy or afraid or embarrassed. We've all been there, and truth be told...even the most experienced devs write bad code sometimes.

Don't just share the link to the tutorial you're going through...if someone is going to help, they will need to see YOUR code. So be sure to include it when you ask your initial question.

You may be asking, "But how do I share my code? I don't want to copy and paste dozens of files into a forum or channel..." Have no fear. There are tons of tools out there for this very purpose. Consider sharing a link to your public [GitHub](https://github.com/) or [GitLab](https://about.gitlab.com/) repo. Or paste large amounts of code into [HasteBin](https://hastebin.com/) or [PasteBil](https://pastebin.com/). Need to show some html or maybe some css? No worries, check out [Codepen](https://codepen.io/) or [JSFiddle](https://jsfiddle.net/). Screenshots aren't preferred, but can help in a pinch...but PLEASE DON'T SEND A PICTURE OF YOUR SCREEN TAKEN WITH YOUR PHONE'S CAMERA! If you must send a screenshot of your code, please use screenshot software. Every operating system should have screenshot software built in, or at least available to be downloaded.


-----


## Don't Burn Bridges

![Image description](https://images.wraithcode.io/2026-05/asking-for-development-help-the-right-way-img-08-1600.webp)

> "Well I guess everyone is too busy to help me..."

> "You 'experienced' devs are so selfish and stingy with your knowledge. I've been waiting for over 2 hours for someone to help me."

^ *Actual comments from developers asking a community for help...*

Too often I see people get frustrated because no one is answering their question and they end up posting rude, disrespectful or passive agressive comments into the channel. This *should* be obvious, but this is a very bad idea. This sort of behavior is almost never tolerated, and can result in you being banned from those channels, or just being ignored by it's members because no one wants to deal with you.

Always try to remember, the people you are asking are almost never being paid to help you. They're part of the community and willing to help others for free and on their own time. They're also busy with families, jobs, and all that chaos that comes with life. You may have just reached out during a lull in the day when people are unavailable.

Also consider that your question may be about a tool or technology that no one currently available has knowledge about. People may not be ignoring you, they may just not be able to answer your question.


-----


## In Conclusion

As developers, we all need to reach out for help at some point. But there are good ways of doing it, and there are bad ways. When you need to ask your team or community for assistance, just remember to be clear, concise, and to include as much information about the problem as you can. Don't be rude or disrespectful, and don't just ask someone else to do the work for you!


Thank you, and Happy Hacking!
