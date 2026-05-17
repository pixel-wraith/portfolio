---
title: "Exposure in the Workplace - Colors, Containers, and Looking Up (the tree) to Parents"
description: "Hang on, before you continue, everyone in the conference room!  For all you Office fans, this will..."
date: "2023-09-07"
tags: ["css", "webdev", "frontend"]
slug: "exposure-in-the-workplace-colors-containers-and-looking-up-the-tree-to-parents"
published: true
devto_id: 1592467
---

Hang on, before you continue, everyone in the conference room!

For all you Office fans, this will NOT be a peak into Ryan's photography collection. That's not the kind of exposure I'm talking about...that would be awkward. 😳

No, the kind of exposure I'm referring to here is even better! ...exposure to new web development topics, features, and practices!

I always like having conversations with other web developers because I frequently get exposed to new stuff. Whether it's a new CSS property, some Javascript API, or just a different approach to solving a problem, I love learning new stuff like this. Which inspired me to start a new series to share and expose this stuff to more people. So in each episode, with the help of the Dunder Mifflin crew, I'm going to share a few (hopefully new for you) topics, along with an example or 2 of when they might be used.

![Michael Scott from The Office saying "That sounds good."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zot5tf3bu1kodj43ocvh.gif)

In this first episode, I thought I'd share a few CSS things that I've been really excited about.

- using `oklch()` for colors
- Container Queries (Finally!)
- `:has()` pseudo-class to target elements higher in the tree

Now before Michael finds a another way to distract us, let's dive in!


## `oklch()`

If you haven't heard, we now have access to a whole bunch of new colors in CSS (on supporting devices) via the Display P3, CIELAB, Oklab colors spaces. Naturally, we wanted to use these new colors in CSS, so several new functions were added to support their use. Some of these new functions are [lab()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab), [lch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch), and [oklab()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklab)...but personally, the one I'm most excited about is [oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch).

(I'm not going to do a deep dive here, but I highly recommend you take a look at the docs for these new color spaces and functions.)

With the use of the `oklch()` function, we not only gain access to the Oklab color space (on supporting devices), but we can do so in a way that was much more intuitive for me (personally) to remember. the `LCH` in the function name stands for `L`ightness, `C`hroma, and `H`ue. Lightness represents how close the color is to pure black (0%) or pure white (100%). Chroma refers to the amount of color that is included, where 0 means no color...ie. some shade of gray. Lastly Hue is a number representing the [hue angle](https://developer.mozilla.org/en-US/docs/Web/CSS/hue) of the color. For some reason this format just clicked for me, so I'm much more easily able to read code and know (roughly) what a code is without needing some external tool. But readability isn't all that makes this function great!

Not all devices support these new color spaces. But that's okay because `oklch()` has a built in fallback. If you specify one of the new colors, and the user's device doesn't support it, the browser will automatically fallback to the closes representation of that color! As the developer, we don't have to do anything extra! Now, you may be asking, "how do we know what that fallback is?"...great question.

Thanks to [@evilmartians](https://github.com/evilmartians) there's a fantastic little [color picker](https://oklch.com) I like to use that shows you both the new color and the fallback color right next to each other! You should totally check the tool out and see what new colors are available. I was more surprised than Dwight when Michael returned after not getting the job at corporate (or rather, after Michel "removed himself from consideration")! 

![Dwight from The Office standing speechless](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0iogblu9jn0d31b7fldx.gif)


## Container Queries

Another CSS feature I've been really excited about has been [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries). Many developers have been requesting this for a long time, and it's *finally* here! If you aren't familiar, imagine being able to write media queries, but instead of using the screen's information, you can use a container element's! This is great for components that can be used in a variety of places throughout an app (or more than one app). You specify style changes based on the component's container size, and it will look good wherever that component gets used, regardless of the layout it's in!

But why talk about it, when we can see an example!

Let's say we have a component that looks like this:

![An example component with information about Dwight K. Shrute in a vertical layout for mobile devices. An image of him is at the top. Beneath that is his name and job title. And below that is some content about him.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9k1gvtkfquoh801yeghq.png)

And it's structure looks like this:

```html
  <div class="card">
    <header>
      <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Dwight Schrute" />
      <div>
        <h2>Dwight K. Shrute</h2>
        <p>Assistant to the Regional Manager</p>
      </div>
    </header>
    <main>
      <ul>
        <li><strong>D</strong>etermined</li>
        <li><strong>W</strong>orker</li>
        <li><strong>I</strong>ntense</li>
        <li><strong>G</strong>ood Worker</li>
        <li><strong>H</strong>ard Worker</li>
        <li><strong>T</strong>errific</li>
      </ul>
    </main>
  </div>
```

This card looks good on mobile, but what if we want to change the layout when the component gets a bit wider? 

In the past, we would've had to something like

```css
.card { ... }

@media (min-width: 768px) {
  .card { ... }
}
```

But this limits us to using the screen width...what if we want to change the component's layout whenever it's wide enough? ...regardless if the screen is 300px wide, or 3000px! Enter Container Queries.

We can now easily make this happen by specifying our `.card` element as a container, like this:

```css
.card {
  container-type: inline-size;
  ...
}
```

And then creating a container query to target elements inside  when our container reaches a certain width:

```css
@container (min-width: 500px) {
  .card header {
    flex-direction: row;

    & img {
      margin: 0 20px 0 0;
    }

    & h2 {
      text-align: left;
    }
  }
}
```

Now, whenever our `.card` is 500px wide (or more), our header will change it's layout so the contents are displayed horizontally.

![An example component with information about Dwight K. Shrute in new layout when the .card element is wider than 500px wide. An image of him is at the top-left. To the right of that is his name and job title. And below that header info is some content about him.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k0garj8466f8h9xbfl8i.png)

And according to [caniuse.com](https://caniuse.com/?search=@container) they are supported in the latest versions of the big 4 browsers! 

![Jim from The Office saying yes excitedly](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g0g9xkb4d291b7q9lj96.gif)


## `:has()`

The last thing I'd like to expose you to is another thing developers have been asking for for a long time. It's the new `:has()` pseudo-class in CSS, which allows us to conditionally style an element based on elements that come after it WITHOUT JAVASCRIPT.

You heard me right! CSS no longer just flows from top to bottom!

![Michael from The Office laughing saying "Oh Wow"](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fzxciwyv36g1hlpfvk9c.gif)

And even better, it's incredibly easy to use!

Let's say we want our images to have `margin-bottom: 2rem;` unless they are immediately followed by a `<p>` that has a class of `caption`. This would have required Javascript to first test for a caption to exist and to add a class to the image (or some other similar approach). But now, we can do this entirely in CSS.

```css
img {
  margin-bottom: 2rem;
}

img:has(+ p.caption) {
  margin-bottom: 0;
}
```

Easy Peazy!

We can also style a parent element based on it's children in the same way.

Let's say we want to give all our `.cards` from the previous section a red border when a child `<div>` is found with an `employee-of-the-month` class inside it. Again, this is super easy!

```css
.card:has(div.employee-of-the-month) {
  border: 2px solid red;
}
```

How awesome is that?!

According to [caniuse.com](https://caniuse.com/?search=:has), we're still waiting on Firefox to add full support for this. But it's currently an optional feature that a user can enable for testing in Firefox, so hopefully we'll see it released soon!


## Conclusion

`oklch()`, Container Queries, and `:has()` are just a few of the things I'm really excited about having been released in CSS over the last year or 2. And hopefully you discovered something new here!

What are some of your favorite CSS features that other developers may not know about? I'm sure other's would love to get exposure to your thoughts!

Thanks for taking the time to expose yourself to something (hopefully) new. Until next time, Happy Hacking!

![Stanley from The Office standing up saying "I'm Done. Goodbye."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r08v07ok9qateyhv6hf0.gif)
