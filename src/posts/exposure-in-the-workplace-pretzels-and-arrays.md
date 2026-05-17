---
title: "Exposure in the Workplace - Pretzels and Arrays"
description: "Lemme start by asking you question...how many methods do you think Arrays have in..."
date: "2023-09-15"
tags: ["webdev", "javascript", "development"]
slug: "exposure-in-the-workplace-pretzels-and-arrays"
published: true
devto_id: 1601416
---

Lemme start by asking you question...how many methods do you think Arrays have in Javascript?


![Dwight Schrute from The Office thinking.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ywgukjcezod8fzu0l4pc.gif)


Answer, a LOT.

At this point, I would assume that even Michael Scott knows about `.map()`, `.filter()`, and `.reduce()`. But in this post, I want to share some other methods I find useful, that I don't hear as many people talking about.

So let's hop into that pretzel line, and while we're waiting, expose ourselves! 


![Stanley from The Office rushing to get to the pretzel line.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/awha89w7v12x0c1vwaj1.gif)



...to some array methods.


## `.at()`
If you've ever had to grab the last element of an array, you'll understand why `.at()` is so special. Does this look familiar?

```javascript
const pretzelLine = [
  'Bob Vance, Vance Refrigeration',
  'Stanley',
  'Michael',
  'Phyllis'
];
const last = pretzelLine[pretzelLine.length - 1];
```

I'd be surprised if it didn't. We used to have to do math on the length of an array in order to get it's last element. There were other ways (like using `.slice()` for example), but I rarely saw those being someone's first thought. Fortunately, `[.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)` solves this for us, nicely and neatly.

Basically, `.at()` takes an integer and returns the item at that index. Simple right? Doesn't sound that useful...after-all, we can do that with simple bracket notation...but what's great is that you can pass it a *negative number*, and it will work backward from the end of the array! So now, if you need the last element of an array, all you have to do is...

```javascript
const last = pretzelLine.at(-1);
```

This is definitely a small convenience, but I love this method for this single reason. However, there are tons of other use cases where `.at()` makes things easier and more readable.


![Holly from The Office sitting on the ground saying, "Crystal Cool".](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ljdjeywybzhazhp5k9ld.gif)


## `.findLast()`
Speaking of working backward from the end of at array...

In ES6 we were gifted the `.find()` method, which allows us to find the first occurrence of some *thing* in an array. It's a gift I've been incredibly grateful for (way more grateful than Michael was when Phyllis knitted him an oven mitt!). But there have been times where I needed the *last* occurrence of some thing, and had to revert to the old ways of doing stuff. But no more! 

Now, we have a new method called `[.findLast()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)` that works exactly like `.find()`, except it works backwards in the array, finding the last occurrence of a thing.

```javascript
const pretzelLine = [
  'Bob Vance, Vance Refrigeration',
  'Michael Smith',
  'Stanley Hudson',
  'Michael Scott',
  'Phyllis Lapin'
];
const last = pretzelLine.findLast(person => {
  return person.name.includes('Michael'));
});

console.log(last); // Michael Scott
```

![Michael Scott from The Office saying, "Awesome blossom".](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nsf4ioj5w3hisj4nalul.gif)


## `.toReversed()`
It's not uncommon to have to reverse the order of an array. Maybe you have a list of names in alphabetical order (A-Z), and the user clicks to filter them from Z-A. Or you have a list of prices sorted lowest to highest and you need to view the highest prices first. This is a relatively normal task, and we've had the `.reverse()` method to handle it for a long time. But the problem has been that the `.reverse()` method mutates the original array.


![Michael Scott with gum in his hair saying, "This just stinks".](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fdp8w66x8terulqk78fc.gif)


Sometimes we need the order reversed *without* changing the original one. Enter our new friend, `[.toReversed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)`.

`.toReversed()` works exactly like `.reverse()` except we get a copy of the array in reversed order, without changing the original array! 

```javascript
const pretzelLine = [
  'Bob Vance, Vance Refrigeration',
  'Michael Smith',
  'Stanley Hudson',
  'Michael Scott',
  'Phyllis Lapin'
];

const reversed = pretzelLine.toReversed();

console.log(reversed[0]); // Phyllis Lapin
console.log(pretzelLine[0]); // Bob Vance, Vance Refrigeration
```


![Michael Scott saying, "Snip Snap" over and over again.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0bko9qq696aro98404tj.gif)


Along with this method, we also got `[.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)` and `[.toSpliced()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)` which also return copies of the array instead of changing the original one!

However, these are pretty new functions, so depending on your browser support requirements, you may not be able to use them just yet. But it's included in the latest versions of the big 4 browsers, so 🤞 you'll be able to soon! 


![Jim from The Office crossing his fingers.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6lskgp3k51hs9jmtsbsa.gif)



## `.with()`
Our last method is another new one that helps us to add a modification to an array without changing the original.

Let's say we need to change an element of an array, but need to keep the original array as is, just in case we need to roll the changes back. Of course we could just clone the array, and add our modifications to the clone. But now, we can do this in just 1 line using `[.with()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with)`!

```javascript
const pretzelLine = [
  'Bob Vance, Vance Refrigeration',
  'Michael Smith',
  'Stanley Hudson',
  'Michael Scott',
  'Phyllis Lapin'
];

const bathroomBreak = pretzelLine.with(3, 'Pam Beasley');
```

In the example above, Pam is going to stand in line for Michael while he runs to the bathroom. But he'll be back, so we need to keep our original line order. The new `.with()` method makes this super easy!

This method is also pretty new, so check your browser support requirements. But hopefully you can start using it right away because it's been a wonderful addition to my toolbox, and I'm sure it will be to yours as well!


## And now I want a pretzel...
Hopefully at least 1 or 2 of these array methods were new to you and you were able to take something away from this. (Other than a craving for a soft pretzel of course!)

Javascript Arrays have lots of methods attached to them to make working with them much easier, and as you can see, we're getting new ones all the time.

So now, if you need to grab an element relative to either the front or the back of the array, reach for that `.at()` method.

If you need to find the last occurrence of some thing in an array, I bet `.findLast()` will server you well.

Need to reverse an array's order, but you need to keep the original unchanged? That's no problem for `.toReversed()`.

Or if you need to change an element in an array, but you want to keep a copy of the unchanged array as well, `.with()` has you covered. 

Thank you for exposing yourself today! And until next time, Happy Hacking!


![Michael Scott spinning, giving finger guns, and then walking off stage.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s7p18xqr0kbecalwxdw5.gif)
