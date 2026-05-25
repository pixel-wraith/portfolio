---
title: "My 3 Rules for Documenting Code"
description: "There are a lot of arguments that have gone on over the years around comments. Many are adamant that..."
date: "2023-12-05"
tags: ["development", "documentation"]
slug: "my-3-rules-for-documenting-code"
cover: "https://images.wraithcode.io/2026-05/my-3-rules-for-documenting-code-cover-1600.webp"
published: true
devto_id: 1688057
---

There are a lot of arguments that have gone on over the years around comments. Many are adamant that "good code comments itself", while others favor including good comments in their code and argue they should be required. When I read and hear these arguments going on, I've noticed they're frequently focussed on the *What* and *How* of the code...ie. *What* the code does, and *How* it does it. But very rarely does the concept of the *Why* enter the discussion...ie. *Why* was this code needed, or *Why* was it written this way. While there are valid arguments on either side, it can be difficult to know which direction to go. This lead me to create 3 rules I believe not only help to bridge the 2 sides, but also encourage better code to be written. I'd like to share my 3 rules with you in the hopes that they might help you as much as they have me.


## Rule 1: Names should explain *What*

![An abstract humanoid thinking about something with question marks over their head](https://images.wraithcode.io/2026-05/my-3-rules-for-documenting-code-img-01-1600.webp)

The name of a variable, parameter, interface, function, class, method, or some other *thing* in your code should provide sufficient information to clearly describe *What* that thing does or *What* value it holds. Another dev should be able to read the name of the thing weeks or months later and know exactly *What* it does or *What* it holds without needing to ask, look through additional code, or read additional documentation. If they do, the name should be changed to be more clear.

To add some clarity here, it's important to note that the name is not responsible for describing what something is *used for*. The name is only responsible for describing *What* the thing does, or *What* value the thing holds.

Let's have a look at some examples I've personally encountered to help clarify this:

```javascript
const derivatives = [];
```

Only knowing this name, are you able to tell what kind of data will be held in this array? Clearly it holds something that's copied or adapted from something else...but is that enough information? Try to step back and think about what kinds of questions you'd be asking yourself or others if you came across this in some code you were working on.

```javascript
function name(user) {
  // ...
}
```

Here we have a function that's doing something related to the name of a user...now, without having to read other code, or ask someone for more context, would you be able to tell what this function does? 

When I came across this, I had to look through more code to figure out what it did...before that I was asking "Does this return a name?", "Does this update a name?", or "Does this construct a name from some other data?"

Hopefully you can see the above examples are not good names, and would need to be changed because they don't meet the requirements of this rule. You would have to look at more code or ask someone else to figure out *What* they do or hold. So what would have been some better names? Obviously there are TONS of different names we could go with, but here are a couple of examples:

```javascript
const derivativeUsers = [];
```

With this updated name, we're now able to tell that this array will hold some number of users that are copied or adapted from others. No need to read additional code or ask someone else. Hazzah!

```javascript
function getFullName(user) {
  // ...
}
```

Here we changed the name of the function to more clearly state *What* this function does. With this simple update, we now know this function returns the full name of the user passed to it.

So to sum up the first rule, anything you give a name to in your code should clearly describe *What* that thing does, or *What* value if holds. This might make your names a little more verbose, but in my personal opinion, being a little more verbose is a worthy cost if it means the code is more readable and maintainable for you and the team.


## Rule 2: Code should explain *How*

![A person sitting at a desk writing how something is done](https://images.wraithcode.io/2026-05/my-3-rules-for-documenting-code-img-02-1600.webp)

While the name of a thing tells *What* it does, the code inside it should describe *How* it does it. Now, that might sound a bit obvious, but it brings with it a few things you have to consider. 

In order for others to understand *How* the code does something, it has to be readable and understandable. It serves much less benefit if no one can comprehend the code that does *the thing*. Part of this comes from the naming of the various pieces that make up the code. But other things that contribute to readable and understandable code are it's simplicity, organization and structure, and formatting and styling, just to name a few. 

This is a massive topic, and there are many articles, books, and courses on it, so I won't go into too much detail here. Just know that writing clean code is a very important piece of writing readable and understandable code that will let the rest of the team know *How* something does what it does.

Another piece of the puzzle is modularity. It's a lot easier to understand how something does what it does if it's small and does just one thing. You've probably heard this concept in some form throughout your career. Maybe you're familiar with the Single Responsibility Principle, which is the "S" in the [SOLID principles](https://www.goodreads.com/book/show/25936819-design-principles-and-design-patterns). If you're not already familiar, I HIGHLY recommend you look into it, because it's an important concept in the world of software development. But back to the point. If a function, class, method, component, or whatever, does more than one thing, the complexity of the code increases drastically, and it becomes much harder to not only identify *How* it does it, but also maintain it over time.

So, in order for your code to meet the second rule, it must be understandable by you months later, or the rest of the team. They should be able to look at the code of some *thing* and be able to easily identify *How* it does what it does. To make this possible, we must write clean, readable, understandable code.


## Rule 3: Comments should explain *Why*

![A team of people on computers wondering why something was done the way it was, with question marks filling a very large display in front of them](https://images.wraithcode.io/2026-05/my-3-rules-for-documenting-code-img-03-1600.webp)

Lastly, when more information is needed, when we need understanding beyond the *What* and *How*, we need the *Why*...and this is where comments come to save the day. When we're writing code, there are times when we need to pass on more information, like *Why* a decision was made, *Why* a piece of code was needed, or some additional context that's relevant to it. These are are the kinds of things that should be commented. 

Maybe there's some obscure use-case that needs to be considered when editing a particular chunk of code that isn't immediately obvious. This should be commented clearly so when the next developer returns to this piece of code next week, next month, or even next year, they'll take that information into consideration as well and not re-introduce some bug, or break some other piece of functionality.

Perhaps something out of the "normal" had to be done in a particular area of the code because of how some third party dependency works. Rather than expecting the rest of the team to run into the same issue and have to solve it themselves, a comment explaining the situation would save them time later (potentially hours or even days).

Understanding *Why* something was done the way it was provides tremendous insight, especially when there were multiple paths to choose from, or if there was indirect context that influenced the decision. In my personal opinion, commenting that *Why* is not just a "nice to have" in your code, it's vital. It's vital for maintainability, for knowledge sharing, and most importantly for setting other members of the team up for success.

Knowing when the *Why* should be included can be tough sometimes. Most people, myself included, forget that we have knowledge and understanding of things that others don't. We move through our lives assuming or expecting others to either know that stuff, or to easily figure it out...even if it took *us* months of collecting different pieces of information to gain that knowledge. So when you're writing that next piece of code, really step back and think to yourself, what information are you assuming the next developer will have in order to understand it? Then, write that stuff down in a comment.

## Conclusion
Well that's it...3 simple rules for keeping code well documented. So the next time you're in the flow, coding out that next big feature, try to remember...

1. Naming should explain *What* your code does.
2. The code itself should be readable and understandable so you and others can easily identify *How* it's doing what it's doing.
3. And use comments to provide all that extra information so everyone knows *Why* the code was written the way it was.

I hope these 3 rules help you as you move forward in your careers! Until next time, Happy Hacking!
