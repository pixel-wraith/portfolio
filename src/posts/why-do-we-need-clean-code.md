---
title: "Why do we need clean code?"
description: "Let's start by considering a non-code related example to help us answer this question.  Consider you..."
date: "2024-06-26"
tags: ["development"]
slug: "why-do-we-need-clean-code"
published: true
devto_id: 1881749
---

Let's start by considering a non-code related example to help us answer this question.

Consider you just arrived at your friend's house to pick them up to go to work. They open the door and you can immediately tell they have a lot going on. Maybe they overslept and are now scrambling to get out the door. They also probably feel bad that their situation is going to hold you up as well. You offer to help. They ask you to go into their room and get their jacket. You go into their room and find  lots of cloths in piles on the floor, on the bed, on the chair, and scattered around the rest of the room. More cloths hang out of open drawers and even more are haphazardly tossed into the closet.

What would you do?

You have a few options here...
1. Turn around and say, "Nope..."
2. Go ask them where the jacket is (hopefully they remember)
3. Start digging...you'll find it eventually

Now, imagine this same scenario, but instead, when you enter their room, everything is put away and organized. There's a chest of drawers with each one closed and labeled, "Socks and Underwear", "Pants", "Pajamas", and stuff hung up neatly in the closet.

How much easier would it be to find that jacket now?

This example illustrates similar things developers go through when working on projects.

Opening a new code file is like walking into that friend's room. It can be welcoming, or it can be stressful and overwhelming. Open 100 files (or more!) in a day, and that stress and overwhelmingness is only compounded.

Finding and/or updating a particular feature or piece of functionality is like looking for your friend's jacket. You'll definitely find it, but how much time and effort are you going to spend looking for it or figuring it out? Now think about how many "jackets" you look for in a day...or in a week.

Now consider a much larger mess. Rather than just "1 bedroom", what about a multi-room house? An entire dorm? Or a warehouse? Somewhere with lots of room, lots of stuff, and multiple people making messes in different ways? This is similar to working with a team on a large project with thousands or even tens of thousands of files. With this in mind, let's now circle back to our original question...

**Why do we need clean code?**

Short answer...we don't. Much like the example of looking through your friend's messy, disorganized room, we can still get the job done with messy, disorganized code. **But it comes at a cost.** The time it takes to do things in the project increases. It takes more energy and cognitive effort to follow and understand the various pieces of the mess. It's harder to know how long something will take, or how much effort will be needed. And it's much easier to miss or break things. There's also the impact it has personally.

For me, if I spend a whole day working in a messy, chaotic code base where I had to invest tons of cognitive effort for every single thing I did, I'm beat at the end of the day and have little to no mental energy left for other things. And I'm the kind of person who really enjoys working on side projects on my free time.

On the other hand, if I spend a day working on code that's formatted neatly, organized well, and I'm able to focus more on the task than on trying to understand the mess that already exists, I can tell a drastic difference. I don't feel nearly as drained. My mood is improved, and I'm just generally better off.

Now, I haven't done a statistically significant analysis on the topic, but I've at least talked with other developers about it, and it seems that many others experience something similar.

Additionally, our brains are natural pattern detecters, and we can't help but identify things that stand out from the patterns of our everyday environments. So when reading through a code file, our brains instinctively notice variations in the patterns of the code. Even if something as small as indentation is off pattern, our brains will get side tracked paying attention to the difference rather than the original task of finding that thing you were looking for (unless you were looking for invalid indentation of course 😆). Let's take a look at a quick example to illustrate this...

```html
<input
    id="my-input"
    type="number"
    class="light large"
    min="0"
        max="100"
    placeholder="Enter a number"
/>
```

Now, how quickly did you notice the thing that broke the pattern? For many, it's one of the first things they notice and it's where their eyes are naturally drawn. But what if I was actually trying to find the class attribute so I could update it? This break in the pattern drew my attention away from that task, even for just a moment. Now multiply this by hundreds, thousands, or even tens of thousands of lines of code in a single day. Do you see how much ping-ponging your brain could be doing when looking at "messy" code?

So all this is to say, *it's just better to write clean, well organized code*.


## Why does "dirty" code get written in the first place?

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kpivnq4cpa8us8q3n15j.png)

There are lots of arguments, reasons, and excuses why "dirty code" gets written. In this section, let's take a look at 3 of the most common ones I've heard, and dig into them a bit. Maybe some of them will sound familiar...


### I was in a hurry and didn't have time to make it neat.

I get it. In today's work climate, sometimes timelines are tight. Sometimes emergencies come up, like a bug that's severely impacting sales, or preventing someone from being able to do their job and we have to get a fix rolled out quickly. Or maybe a feature needs to be released ASAP in order for a deal with a big client to close. I get it.

HOWEVER...

In my experience, writing clean code doesn't take all that much time...especially if it was prioritized before the "emergency" came up. When I say prioritized, I mean *some* investment was made. Like taking the time to set up code linters and formatters. Agreeing on (and documenting) a set of basic rules around structure and organization of the code. Setting up automations in the CI. Or making it part of the PR process where all team members are expected to enforce clean code standards before it can be merged. If investments like these are made up front, when those emergencies do come up, the "dirty" code that gets written isn't generally as bad. Maybe it'll be lacking in some documentation. Maybe the naming could have been more clear. Perhaps it could have been structured in a better way. But it's at least readable and semi-consistent with the rest of the codebase.


### I just copied the code from another file.

I've always thought of this as the developer way of answering our parent's question, "If your friends jumped off a bridge, would you?".  Apparently our answer is "Yes"!

But more seriously though, this is actually a really good example of the [broken window effect](https://www.theatlantic.com/magazine/archive/1982/03/broken-windows/304465/) which states, “One unrepaired broken window is a signal that no one cares, and so breaking more windows costs nothing.”. The theory was originally focused on how disorder in an environment relates to and leads to crime, but it's principles have been applied to many other areas in the world. So this justification is a development example of someone "breaking a window" and justifying it because another window (file) was already broken.

So how do we stop more windows getting broken? Simple...fix the first "broken window". The longer bad code sits in a code base, the more likely it is that more bad code will be introduced. Whether that's from copy and pasting, or simply because that's the example set for other devs to follow. Fixing 1 window can prevent many other windows from being broken.


### I just want to get this done. I'll circle back and clean it up later.

Oof, I've heard this one a lot over the years. But the sad truth is, that "circling back" often doesn't happen. People tend to move on to the next thing and the "dirty code" is left for the next dev to find. 

Now, this reasoning could be linked to the first argument we discussed (lack of time) but this can also stem from other reasons as well. I see this a lot when the task is tedious, when the dev has a lot of stuff they're juggling, or when they've been working on the same thing for a long time and are just ready to move on to something different. Unfortunately, since the reason can differ, so can the recommended solution.

If the reason is *work load* or *time* related, I almost always suggest delegation. Of course figuring out what task(s) get passed off to who depends on the nature of the work. But in general, if it's a decision of keeping the current workload on the dev and accepting "dirty" code as a result, or taking time to move things around so the dev can write "good" code, my answer is almost always the later. 

If the reason is *motivation* related, and time isn't as much of a factor, I usually suggest taking a break from the task. Go work on something else that will help pick that motivation back up, and come back to the original task later. This may not always be possible, but I find it to be a much better option than accepting messy code that's going to cause more problems down the road.


## What does clean code look like?

So we've discussed why clean code is better, and approaches we can take to avoid "dirty" code. But what does "clean" code actually look like? This a very large topic that contains much more than a single blog post can contain, but if I could choose just 1 word to describe the idea, that word would be "Consistent".

Regardless of what rules you choose to follow...tabs use 2 spaces or 4, class methods are listed alphabetically or grouped by function, helper functions live inside `/lib`, `/utils`, or you don't allow a helper library at all, the list goes on and on...the important thing is consistency. Regardless of what file you open in a codebase, it should follow a consistent pattern so everyone immediately knows where to look to find what they're looking for in a *consistent format*. As we've seen, even small deviations can have compounding effects. 

I don't want to go down too much of a rabbit hole of analyzing all kinds of rules and approaches here. Nor do I want to start any arguments over which pattern or approach is better. But there are a couple of things I see a lot that I think are worth calling out because they tend to not only exacerbate the issues we've discussed, but also cause additional issues.

### Chains and Attributes Formatting

Something I see a lot, especially when people are trying to move rapidly, is inconsistent method chaining and html attributes formatting. Some lines will have 2 or 3 links in the hain, the next line will have 1, and the next line will have 3 or 4. Here are a couple examples of what I mean...

```html
<button
    id="my-button" class="light large"
    data-testid="my-button"
    type="button" on:click={doSomething} disabled={!processing}>
    Click Me</button>
```

```php
$output = $example->doSomething()->getSomeData("query")
    ->parseTheData("some property", 999)
    ->logTheData()->getMoreData()->filterTheNewData()->parseTheFilteredData()
    ->doSomethingElse($someVar < 20);
```

```typescript
const data = await getData(5, 20).then(res => res.json())
    .then(data => data.myThings)
    .then(data => data.someProp.filter(x => x < 20)).then(data => data.reduce((x, sum) => (x.otherProp + sum), 0))).catch(err => console.log(err));
```

This kind of formatting is very inconvenient for other developers to read. Rather than being able to quickly scan code to find specific things that are needed, developers have to carefully read every line in order to know what's being called or applied and in what order.

I beg you, do not do this to your fellow developers! 🥺

A better way to write chains and attributes is either for all links to be on 1 line (if there are only a small few) or each link is on it's own line.

Here is what the above examples would look like following this pattern:

```html
<button
    id="my-button"
    class="light large"
    data-testid="my-button"
    type="button"
    on:click={doSomething}
    disabled={!processing}
>
    Click Me
</button>
```

```php
$output = $example->doSomething()
    ->getSomeData("query")
    ->parseTheData("some property", 999)
    ->logTheData()
    ->getMoreData()
    ->filterTheNewData()
    ->parseTheFilteredData()
    ->doSomethingElse($someVar < 20);
```

```typescript
const data = await getData(5, 20)
    .then(res => res.json())
    .then(data => data.myThings)
    .then(data => data.someProp.filter(x => x < 20))
    .then(data => data.reduce((x, sum) => (x.otherProp + sum), 0)))
    .catch(err => console.log(err));
```

There we go! That's so much easier to read and would be much easier to find what I'm looking for if I was reading someone else's code!

### Function/Method Organizing

Another thing that can take up a lot of time is searching for a particular function or method within a file. Sometimes you just want to see what's available. Other times you might be looking for something specific. But if those functions or methods aren't organized or in any kind of order, it can take lots of time to find what you're looking for, or can cause you to miss or overlook things.

There are of course different ways to handle this. I'm partial to ordering things alphabetically. But regardless of the method you choose...I would highly encourage you to pick some way of organizing and ordering your functions and methods and do that for *all files*. This way, whether it's you, or another developer working on the project, no matter what file it is, everyone knows how things are organized and are able to find what their looking for much more quickly and easily.

### Naming

Naming is super important in coding and can either save lots of time and effort, or cause lots of lost time and cause increased effort.

When things are named well, developers reading the code don't have to look elsewhere to figure out what something is or does. But when things *aren't* named well, developers have to hunt through the code to first try and figure out what that thing is or does before they can continue with what they were originally working on...and depending on the complexity of the code, this could take a good chunk of time.

Let's look at one or two examples of actual code I've encountered to illustrate what I mean here...

```typescript
const user: string;
```

Just reading this Typescript variable declaration, can you tell what it holds? I'm guessing you would have to go look through the rest of the code to figure out that it's actually the user's name being displayed in the UI.

```php
public function users(array $args): array {
  // ...
}
```

What about this PHP method? Can you tell what it does without looking at any other code? Maybe you would guess that it returns an array of users...but would you have guessed that it returns only an array of verified users?

Anyways, I could go on, but instead, let's try to think positive. How could we have named these things better so that we can save other developers (and ourselves in a few months after we've forgotten what we wrote) time not having to hunt down the meanings of these things? To help with this, I generally have 2 suggestions.

#### 1. Don't be afraid to get verbose

There's nothing wrong with having long variable|function|method|class|etc names if they accurately convey what they represent. In the first example above, a clearer name could have been something like `userNameToDisplay`. It's much longer than the original, but this new, more verbose name leaves no questions about what it holds. No need to go look elsewhere to figure out what this thing will hold.

I've seen variables names that were much, much longer than this, and as silly as it may have looked in the code, it was really clear exactly what was going on in the code and saved our team lots of time every single day.

#### 2. Fit your names into a sentence

This may seem a bit silly, but it can really help to try and use your names in a sentence. If it can't fit nicely into a sentence, maybe that's a sign to rethink the name. A few examples of this could be:

> "This variable holds the ..."

> "This function is used to ..."

If we consider our examples above...

> "This variable holds the user." 

This sentence makes sense, but it doesn't accurately describe what the variable actually holds. Does this variable hold the user? Since it's a string, it doesn't sound like this is accurate. Let's try again...

> "This variable holds the user name to display in the UI."

That sounds much better. I can clearly tell what this variable is holding now...so now we just smoosh the words together... `userNameToDisplay` or `userNameToDisplayInTheUI`. Either of these would be very clear to anyone reading the code exactly what the variable holds and what it's purpose is.

Let's try the second example...

> "This function is used to users."

Hmmm...that's pretty bad. It doesn't make sense at all! Let's try again.

> "This function is used to get users."

That's a little better...But I think we can still be more clear.

> "This function is used to get verified users from the database."

Ah, there we go! That's much better. Now we smoosh the words together... `getVerifiedUsers` or `getVerifiedUsersFromDB`. Both of these names are great examples of clean code, leaving no questions as to what the function does...unless you're question is, "What's a '*verified*' user?"...this is additional context that would be needed to understand this function. And that is where *comments* come in!


### Comments

I've already written a [blog post](/blog/my-3-rules-for-documenting-code) on documenting code so I'm not going to go crazy here. But basically, comments should be used to provide additional context and answer the "Why" questions. But here, I want to focus specifically on what comments should (and should not) look like in the context of *clean code*.

In general, if a comment can't add additional, *helpful* context, it shouldn't be written. That's not to say that I am against comments...quite the contrary! I LOVE comments...but they need to serve a purpose. Comments can take up a lot of space in a file, and can take some focus away from the actual code. As we saw earlier, our brains are natural pattern detecters. So if we're reading through code and encounter a block of text that's a different color and prefixed with `*` or `//` which is different than everything else around it, we're naturally going to be distracted by it, if even for just a moment. We may skim what it says, or read it carefully. Either way, it's taking attention away from the code, so there needs to be a good reason for doing that.

So in general, if a comment can't offer anything in addition to the name and code, then just leave it out.

Let's take a look at some examples of code I've encountered to help illustrate what I mean here...

```php
/**
 * The company
 *
 * @return Company
 */
public Company $company;
```

Is there anything in this comment that the declaration of this property doesn't already state? I would personally argue, no. And if it's not adding any additional value, why are we taking up 5 extra lines in our file?!

```typescript
// check if user has an email
if (user.email) {
  ...
}
```

Here's another example of a comment that doesn't provide additional value. The `if` statement it's documenting is short, concise, and easy to understand, so the comment isn't adding much of anything to our code other than just taking up space and causing a distraction.

Now, sometimes there are requirements that things always be documented. Maybe it's not necessary for you, but there are standards that need to be upheld for some other reason. In these cases, I highly recommend you search for some way to add additional information. Take our first example. There's probably *some* additional context that could be provided for others here. Maybe something like...

```php
/**
 * The currently selected company the user is editing.
 *
 * ...
 */
```

Maybe this information is already obvious to you, but it provides more information about what this property is that could prove helpful to other developers so maybe they don't have to look elsewhere to find where it's being used.

So please do yourself and your fellow developers a favor. Add comments where they will add additional value|information|context. If they can't do that, just leave them out. If you *have* to include them, don't half a** it. Take the time to at least make those comments useful.


## Conclusion

Wow, we covered a lot!

Throughout this post, we saw examples of how "dirty" code severely impacts our efficiency and productivity. We learned about the benefits that clean code offers, and we also looked at some specific examples of how we could turn "dirty" code into clean code.

As you continue your development career, you'll likely form your own opinions and preferences about how to write, structure, and organize your code. It's also very likely that those preferences and opinions will differ from other developer's. So when working on any project, it's my opinion that the most important contributing factor to writing clean code is *consistency*. Some of the hardest projects I've ever worked on were more challenging than they needed to be simply because there was no consistency across the application. So if your opinions differ from someone else's, communicate. Find a common ground or come to an agreement that all of you will follow to ensure the health and growth of the project as it grows.

Thanks for taking the time to learn with me! Until next time, Happy Hacking!
