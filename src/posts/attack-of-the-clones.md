---
title: "Attack of the Clones"
description: "Hault! If you're hoping for some interesting tidbits on the second Star Wars movie from 20+ years..."
date: "2023-08-09"
tags: ["javascript"]
slug: "attack-of-the-clones"
published: true
devto_id: 1563689
---

Hault! If you're hoping for some interesting tidbits on the second Star Wars movie from 20+ years ago...this is not the article you are looking for.

![Old Obi-Wan casually waving his hand as he uses his Jedi powers](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t0cds8oxesvp9v8bm8hx.gif)

If you're still hear, then perhaps you're hoping to learn a little something about cloning objects in Javascript. If so, you've come to the right place because that is exactly what I want to talk about in this post!

As a Javascript developer, cloning objects has been a bit of an issue for a while. There are many different ways to do it, but you have to know and understand the ins and out and the pros and cons of each to know when to use them and why. But luckily, a browser API has come available in the last year or 2 that alleviates this problem.

You may be wondering, "If this *thing* has been out for a year or 2, why is this person writing about it now?". That's a great question! The answer...because I still talk to a lot of people who have never heard about it. So this is me trying to spread the word on this little piece of functionality that has made my life better.

So what is this mystical, Jedi-esk power I'm speaking of?

[queue dramatic music]

`structuredClone`

This new browser API's main purpose is to allow us to quickly and easily create deep clones of objects without the need of some workaround or third party library! Not only that, but it also brings with it the ability to *transfer* properties from one object to another instead of cloning them.

![Young Obi-Wan saying "That is good news."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eix1hpg59kd9ftw5d6wu.jpg)

So why is this new API worth a blog post? To understand that, we first need to understand a few things about Javascript.


## Shallow vs Deep Clones
There are actually multiple types of clones in Javascript, and we need to understand these before we can understand why this new API is so valuable. The two types we need to consider are *shallow* and *deep* clones.

When we create a *shallow* clone of an object, it means we're only cloning the top level properties of that object. If the object contains any nested objects, their properties will be *copied* rather than *cloned*.

A deep clone, on the other hand, clones all the properties, even the nested ones.

To better understand this, let's say we have an object like this:

```typescript
const user = {
  name: 'Anakin Skywalker',
  age: 19,
  jedi: {
    rank: 'Knight',
    master: 'Obi-Wan Kenobi',
  },
}
```

If we were to create a *shallow clone*, it would look like this:

```typescript
const user = {
  name: 'Anakin Skywalker',   // new
  age: 19,                    // new
  jedi: {                     // new
    rank: 'Knight',           // old
    master: 'Obi-Wan Kenobi', // old
  },
}
```

When I say old here, I mean that these values were not cloned, they were only copied.

On the other hand, if we were to create a *deep clone* of the same object, it would look like this:

```typescript
const user = {
  name: 'Anakin Skywalker',   // new
  age: 19,                    // new
  jedi: {                     // new
    rank: 'Knight',           // new
    master: 'Obi-Wan Kenobi', // new
  },
}
```

Okay, we understand the difference between shallow and deep clones, but why does it matter? Shallow, deep, we just want to clone the object and use it in our application, right? Now let's look at the problem...


## The Problem

![Star Wars droid saying "This doesn't look good..."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yypyianb8h23r2ki3ls2.gif)

Let say we make a shallow clone of our object and then want to update it. No problem...

```typescript
const user = {
  name: 'Anakin Skywalker',
  age: 19,
  jedi: {
    rank: 'Knight',
    master: 'Obi-Wan Kenobi',
  },
}

// create the shallow clone
const clone = {...user};

// update the cloned data
clone.jedi.rank = 'Master';
```

That was easy...let's log out our objects to confirm everything worked...

```typescript
console.log(user);

\\ {
\\   name: 'Anakin Skywalker',
\\   age: 19,
\\   jedi: {
\\     rank: 'Master',
\\     master: 'Obi-Wan Kenobi',
\\   },
\\ }

console.log(clone);

\\ {
\\   name: 'Anakin Skywalker',
\\   age: 19,
\\   jedi: {
\\     rank: 'Master',
\\     master: 'Obi-Wan Kenobi',
\\   },
\\ }
```

Uh oh, looks like we have an issue...both of our objects have been updated! But we only changed the value on the clone. How could this be?

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/49krfg3mz1kxrxk6citg.jpg)

The problem stems from how Javascript stores data in memory and how it references that data.

When you assign an object to a variable, you aren't actually assigning the data to it. Instead, you're assigning the address of where that data is stored in memory. Then when you assign that variable's value to another variable, the second variable receives the same address. Now there are 2 different variables that contain the same address so they are both looking at the same data in memory.

To better understand this, let's continue to use our example. Let's imagine that Javascript has stored each value in a different part of memory and the properties don't hold the value, but instead they hold the address to the data in memory...like this:

(*note: This is only for simple visualization to understand the topic. Memory management in Javascript is much more complicated than this simple example portrays, but it serves to help understand the difference between reference and value.*)

```typescript
const user = {
  name: abc123, // 'Anakin Skywalker'
  age: abc124,  // 19
  jedi: {
    rank: abc125 // 'Master'
    master: abc126 // 'Obi-Wan Kenobi'
  },
}
```

We can now see that each property is storing an address in memory where each piece of data is located. With this in mind, let's also look at our clone in the same way:

```typescript
const user = {
  name: def123, // 'Anakin Skywalker'
  age: def124,  // 19
  jedi: {
    rank: abc125 // 'Master'
    master: abc126 // 'Obi-Wan Kenobi'
  },
}
```

Now we can clearly see the differences and similarities between the 2. Remember, our clone is only a *shallow clone* so only the top level properties were cloned. The rest are *copied* from the original object.

So if we look at top level properties `name` and `age`, we can see that new addresses in memory were assigned to them. But the nested properties `jedi.rank` and `jedi.master` have the same addresses as our original object. This is why both objects printed out the same data when we logged them earlier. By changing the value of `clone.jedi.rank`, we were actually changing the data in memory stored at address `abc125`. Since both objects are *referencing* that same address, they both printed out the same data.

Sometimes, when a developer thinks they're cloning an object, they're often only creating a *shallow* clone, resulting in updates being made to other objects they didn't intend to change. This small nuance has caused a great many bugs over the years...and they can be tricky to track down.


## How to make a Shallow Clone

Now that you understand *what* a shallow clone is, I want to show you 2 methods that create them. So when you see them in the wild, you'll know more clearly what they're doing.

```typescript
const clone1 = { ...user };
const clone2 = Object.assign({}, x);
```

## Deep Clones...the old way

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9j460j8ce5001sjd563a.gif)

So we understand what deep clones are, and the need for them, but how do we create them?

Before the `structuredClone` API came about, our options were limited, and none were particularly "good". Here are the 2 most common methods I've encountered:

(*note: These are not the only 2. There are many others, especially when cloning arrays. I limited to only 2 for the sake of time.*)

```typescript
import { cloneDeep } from 'lodash';

const clone1 = JSON.parse(JSON.stringify(user));
const clone2 = cloneDeep(user);
```

In the first example, we first stringify the user object, and then immediately parse it back to JSON. The creates an entirely new object from the original one. While this works in many cases, it has some pretty severe drawbacks. One of the most notable issues with this method is that it doesn't handle non-serializable data correctly. If you had things like Functions, DOM Nodes, or Errors in your object, things wouldn't work out as you planned.

Consider this simple example:

```typescript
const obj = {
  update: () => console.log('update'),
};

const clone = JSON.parse(JSON.stringify(obj));

console.log(clone); // {}
```

Notice how the clone is only an empty object. The update method on `obj` was not cloned over. This is one of the most notable issues with using this method to clone objects.


The second example uses lodash's `cloneDeep` function. The downside here is that we're dependent on an external library. This means there is more code that has to be loaded to our app in order accomplish the task. Depending on your use case and requirements, this may be a deal breaker, or it may not be as big of a deal.


## `structuredClone`

Finally, let's play with the new hotness we've been gifted.

Making a deep clone with `structuredClone` is very simple, just call it like any other function, passing in the object you want to clone.

```typescript
const clone = structuredClone(user);
```

Simple!

We no longer have to import a third party library, and if something can't be cloned (like Functions) `structuredClone` will throw an exception letting us know!


## Browser Support

More good news, `structuredClone` is supported in the latest versions of the big 4 browsers (Chrome, Safari, Firefox, and Edge)! For older versions there's a polyfill available as well.

[MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)

[CanIUse](https://caniuse.com/?search=structuredclone)


## Conclusion

Phew, that was a lot! But we now understand the problems we used to have cloning objects (particularly complex objects) and how `structuredClone` is here to make our lives better!

We also saw the difference between *shallow* and *deep* clones, the difference between accessing data *by reference* and *by value*, and how we used to have to create deep clones, as well as the downsides of those methods.

![Old Obi-Wan telling Luke Skywalker "That's good. You've taken your first step into a larger world."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dmrjs185rrvpribhxcfv.gif)


Thanks for joining me, and until next time, Happy Hacking!
