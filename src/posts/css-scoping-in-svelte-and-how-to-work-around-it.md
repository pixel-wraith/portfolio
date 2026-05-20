---
title: "CSS Scoping in Svelte and How to Work Around It"
description: "As web developers, we often face challenges when it comes to styling our applications. Svelte offers..."
date: "2023-04-22"
tags: ["svelte", "webdev"]
slug: "css-scoping-in-svelte-and-how-to-work-around-it"
cover: "https://images.wraithcode.io/2026-05/css-scoping-in-svelte-and-how-to-work-around-it-cover-1600.webp"
published: true
devto_id: 1443825
---

As web developers, we often face challenges when it comes to styling our applications. Svelte offers unique solutions to manage component styles efficiently. However, when dealing with custom child components, things can get a bit tricky.

In this blog post, we'll explore the intricacies of Svelte's styling system and how it impacts a parent component's ability to style it's custom child components. We'll delve into different approaches for overcoming these challenges, such as using Svelte's style directives, global styles, and CSS variables. By the end of this post, you'll have a better understanding of how to style custom child components in Svelte and be well-equipped to tackle any styling challenge that comes your way. So, let's dive in and start breaking Svelte's style barrier!

-----

Let's say we have 2 components, `Container` and `Button`...

*Container.svelte*
```html
<script lang="ts">
  import Button from "./Button.svelte";

  function onClick() {
    console.log('clicked')
  }
</script>

<div class="container">
  <button on:click={onClick}>I'm a "regular" button!</button>

  <Button on:click={onClick}>I'm a custom button component!</Button>
</div>

<style>
  button {
    background: red;
  }
</style>
```

*Button.svelte*
```html
<button on:click>
  <slot />
</button>
```

Notice our `Container` component has 2 children, a "regular" `<button>` and our custom `Button` component. We're also adding some styles to all the buttons inside the `Container` component's `<style>` block to give them all a red background. Based on standard CSS rules, we should expect both of our buttons to be red, right? Let's take a look at our components in the browser...


![Image description](https://images.wraithcode.io/2026-05/css-scoping-in-svelte-and-how-to-work-around-it-img-01-1600.webp)


Uh oh! Only the "regular" button has our styles applied. Why is that?

Let's take a closer look at our components in the browser's dev tools to investigate.

![Image description](https://images.wraithcode.io/2026-05/css-scoping-in-svelte-and-how-to-work-around-it-img-02-1600.webp)

Look at that...some weird looking class was added to one of our buttons, but not the other. But why does that matter? After all, the CSS we added should apply to all `button` elements, shouldn't it?. Let's look at the CSS in the browser's dev tools.

![Image description](https://images.wraithcode.io/2026-05/css-scoping-in-svelte-and-how-to-work-around-it-img-03-1600.webp)

Interesting. That strange class has been added to our CSS as well and instead of our background being set on all `button`'s, it's now only being applied to `button`'s with that special class.

It turns out this is how Svelte is able to scope the styles of our components. During compilation, it adds unique classes to each of our custom components and all of their *non-custom component* children. It then updates the selectors in our CSS so our styles only apply to elements with those unique classes. 

But sometimes we *do* need a parent to be able to add styles to our custom child components. So how might we accomplish this if Svelte is scoping our CSS in this way? Luckily, we have a few options.



## Style Directives
You may already be familiar with inline styles that look something like `style="background: red;"`. We can do this same thing in Svelte, but there's also another way. It's called a **style directive**. Here's what it looks like.

```html
<button style:background="red">
   ...
</button>
```

You can also use this to set multiple styles on an element.

```html
<button style:background="red" style:margin="1rem">
   ...
</button>
```

You are still free to use the style attribute if you want. In fact, you can even use both! If you do, the style directive will take precedence.

So why am I showing you this? After all, this doesn't solve our problem of allowing a parent component to modify a custom child component's styles. Turns out, with a little JavaScript, we can!

In Svelte we can use JavaScript in our HTML by wrapping it in curly braces. So if we use a prop that a parent component is able to pass down to the child, then we can set that prop as the value of our style directive. Let's see what that would look like.

*Container.svelte*
```html
<script lang="ts">
  import Button from "./Button.svelte";

  function onClick() {
    console.log('clicked')
  }
</script>

<div class="container">
  <button on:click={onClick}>I'm a "regular" button!</button>

  <Button on:click={onClick} backgroundColor="red">I'm a custom button component!</Button>
</div>

<style>
  button {
    background: red;
  }
</style>
```

*Button.svelte*
```html
<script lang="ts">
  export let backgroundColor: string = 'none';
</script>

<button on:click style:background={backgroundColor}>
  <slot />
</button>
```

Look at that! Our `Container` component is now able to set the background color of our custom `Button` component.

![Image description](https://images.wraithcode.io/2026-05/css-scoping-in-svelte-and-how-to-work-around-it-img-04-1600.webp)

We could even make this a little shorter if we name our prop the same name as the CSS style.

*Container.svelte*
```html
<script lang="ts">
  import Button from "./Button.svelte";

  function onClick() {
    console.log('clicked')
  }
</script>

<div class="container">
  <button on:click={onClick}>I'm a "regular" button!</button>

  <Button on:click={onClick} background="red">I'm a custom button component!</Button>
</div>

<style>
  button {
    background: red;
  }
</style>
```

*Button.svelte*
```html
<script lang="ts">
  export let background: string = 'none';
</script>

<button on:click style:background>
  <slot />
</button>
```

Notice how our prop name `background` is now the same as the style directive `style:background`. When this is the case, we can leave out the `={...}`. That's pretty handy!

If you would like more information on this, you should check out Svelte's documentation [here](https://svelte.dev/docs#template-syntax-element-directives-style-property).

This method certainly solves our problem, but it also has the same downside as the style attribute. We have to set it on every instance of our `Button` component. In the case of our `Container` component, we also either have to set the style directive on the "regular" button, or also leave our existing CSS in place. It would be great if we only had to set the background color in one place.



## Global Styles
Just like adding a `<style>` block to the `<head>` in your html file, Svelte allows us to set global styles using the `:global` modifier. Here is what that looks like.

*Container.svelte*
```css
:global(button) {
  background: red;
}
```

This applies the `background: red` style to all buttons throughout the app...even ones that are not inside our `Container` component.

The `:global` modifier is very powerful, and offers a lot of flexibility for applying global styles. For example, if we wanted to apply styles to all buttons with a specific class, we can!

```css
button:global(.red) {
  background: red;
}
```

Now, with this new tool, we could update our `Container` component styles to use the `:global` modifier to solve our original issue.

*Container.svelte*
```html
<script lang="ts">
  import Button from "./Button.svelte";

  function onClick() {
    console.log('clicked')
  }
</script>

<div class="container">
  <button on:click={onClick}>I'm a "regular" button!</button>

  <Button on:click={onClick}>I'm a custom button component!</Button>
</div>

<style>
  :global(button) {
    background: red;
  }
</style>
```

*Button.svelte*
```html
<button on:click>
  <slot />
</button>
```

So we have another solution. This one seems better because we no longer have to specify styles on each instance of our elements. But in large applications, this option can become unmanageable pretty quickly.

Let's say we have an application that has hundreds or even thousands of components, and many require special styling from their parents in a variety of situations. Like buttons that need different spacing around them in different layouts, links that require different colors to meet contrast requirements depending on their background, SVG icons that have to support size and color requirements in tons of different use cases, and so many other nuances we all know happen in large projects. At this scale, all those global styles become very difficult to manage and quickly turn into a maintenance nightmare.

Fear not, fellow developers, for I have one more suggestion for you.

(If you would like more information on this topic, I would highly encourage you to check out Svelte awesome documentation on the topic [here](https://svelte.dev/docs#component-format-style).)



## CSS Variables
So far, we have one option we can consider having a very narrow scope, and one with a very broad scope. Each one certainly has areas where it's appropriate to use, but we're missing an option that gives us something in the middle. That's where CSS variables (more accurately known as CSS custom properties) come in.

CSS variables allow you store a single value and reuse it over and over again. Just like variables in JavaScript you gain the benefit of being able to change a value in one single place, but that one update can make changes in many different places throughout the application. If you aren't familiar with CSS variables yet, I highly encourage you to check out MDN's [docs on the topic](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to learn more.

So why am I bringing these up? Well, it turns out CSS variables are easily able to cross the scoping barrier that's been preventing our parent components from manipulating their custom child component's styles. The parent component can set the value of a CSS variable, and the child component can read that value without any issue! Let's take a look at how we can make use of this in our own example.

*Container.svelte*
```html
<script lang="ts">
  import Button from "./Button.svelte";

  function onClick() {
    console.log('clicked')
  }
</script>

<div class="container">
  <button on:click={onClick}>I'm a "regular" button!</button>

  <Button on:click={onClick}>I'm a custom button component!</Button>
</div>

<style>
  .container {
    --button-background-color: red;
  }

  button {
    background: var(--button-background-color, gray);
  }
</style>
```

*Button.svelte*
```html
<button on:click>
  <slot />
</button>

<style>
  button {
    background: var(--button-background-color, gray);
  }
</style>
```

Notice how we're setting the value of the `--button-background-color` variable once inside the `.container` declaration, but using it in 2 different places. One inside the `button` styles in the `Container` component, and the other inside our `button` styles of our `Button` component.

Now that we've made these changes, let's have a look in the browser to make sure our changes worked.


![Image description](https://images.wraithcode.io/2026-05/css-scoping-in-svelte-and-how-to-work-around-it-img-05-1600.webp)

Huzzah, it works! Now we are able to set the value of the background color in a single place, but have it update both the "regular" child component AND our custom component. Even better, if we add another button outside of `.container`, the styles do not get applied.

*Container.svelte*
```html
<script lang="ts">
  import Button from "./Button.svelte";

  function onClick() {
    console.log('clicked')
  }
</script>

<button on:click={onClick}>I don't get to be red :(</button>

<div class="container">
  <button on:click={onClick}>I'm a "regular" button!</button>

  <Button on:click={onClick}>I'm a custom button component!</Button>
</div>

<style>
  .container {
    --button-background-color: red;
  }

  button {
    background: var(--button-background-color, gray);
  }
</style>
```

![Image description](https://images.wraithcode.io/2026-05/css-scoping-in-svelte-and-how-to-work-around-it-img-06-1600.webp)

So not only does this method give us the ability to set our value once and impact both our "regular" `button` element as well as our custom `Button` component, but we also get our scoping back! If this were Goldilocks and the Three Bears, I'd say this one is juuuuust right!


-----


To sum this all up, when working in Svelte, if you ever run into a situation where you need a parent component to modify the styling of a custom child component, you have a number of options to workaround its style scoping.

If your use case is narrow and you don't think you'll need to modify the child component in lots of different places, like a single element that needs to have a different `z-index` in one very specific place, maybe consider using Svelte's style directive.

If you have a very broad use case, where you need styles to be applied to every instance of an element, regardless of what child component it's in, like the `font-family` of your `<h1>` elements, perhaps consider using Svelte's `:global` modifier.

If you find yourself in a situation where you need something a bit more versatile but still easily reusable, like an SVG icon that may need to be many possible colors, CSS variables may be the option for you.

Before I sign off here, I want to give a big thank you to the [Syntax discord community](https://discord.gg/W5y68HMfZV). When I first encountered these issues in my own projects, they were amazing and helped me find the solutions I'm sharing with you here in this post.

Thank you for taking the time to read this, and I hope it helps you build something amazing!

Happy hacking!
