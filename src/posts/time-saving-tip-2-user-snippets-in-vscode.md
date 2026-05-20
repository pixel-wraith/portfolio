---
title: "Time Saving Tip #2 - User Snippets in VSCode"
description: "Have you ever noticed how you write the same boilerplate code over and over again? Maybe it's the..."
date: "2023-12-15"
tags: ["development", "tip", "react", "typescript"]
slug: "time-saving-tip-2-user-snippets-in-vscode"
cover: "https://images.wraithcode.io/2026-05/time-saving-tip-2-user-snippets-in-vscode-cover-1600.webp"
published: true
devto_id: 1698868
---

Have you ever noticed how you write the same boilerplate code over and over again? Maybe it's the same pattern of routes or controllers. Perhaps you write your React components the same way. Or what about your classes all having a similar structure. How much time do you spend writing the same thing (or something very similar) over and over again? This is exactly what [User Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) in VSCode can help with.

With User Snippets, you can store any boilerplate you want, give the snippet a name, and then when you're writing your code, you can refer to that name, and VS Code will plop in the boilerplate for you, without you having to type it all out again!

VSCode offers lots of [built-in snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_builtin-snippets) for common stuff like for loops and functions, and you can also find a bunch of extensions on the [VSCode Marketplace](https://marketplace.visualstudio.com/vscode). These are all really helpful, but I personally use my own snippets WAY more. With your personal User Snippets, you can add any boilerplate you want, with any name you want, and you can even have different snippets for different languages/file types!

Here are just a few example of snippets I've written in my own setup:

- React functional components (for both Typescript and Vanilla JS)
- Storybook stories 
- Svelte components
- Mobx classes
- console logs with an Eslint ignore comment
- MongoDB Schemas

User Snippets have saved me so much time over the years, and have allowed me to get way more done. Not to mention the amount of bugs that have been reduced because they keep me from making silly mistakes!

So how do you create your own User Snippets? That's exactly what the rest of this post is going to be about. I'm going to walk though, step by step, creating a User Snippet to add the boilerplate for a functional component in React with Typescript. But don't panic, if you're using a different language, or have a different purpose in mind, I'll be sure to point out where you should do something different.

So let's dive in!

## Creating a User Snippet

First, you'll need to open the User Snippets configuration for the language/file type you want to create a Snippet for. So in VSCode, click to open the `Code` menu, select `Settings`, then click `Configure User Snippets`

![Screenshot of the Code menu open with Settings selected, and the settings menu open beside it with Configure User Snippets highlighted](https://images.wraithcode.io/2026-05/time-saving-tip-2-user-snippets-in-vscode-img-01-1600.webp)

*Note, I'm using VSCode Insiders, so my `Code` menu might look a bit different than yours, but you should have these same options in VSCode.*

Next, in the input that pops up, enter the language/file type you want to create a User Snippet for. In this example, I will search for `react` and click on `typescriptreact`.

![Screenshot of the User Snippets search with "react" entered, and "typescriptreact" highlighted](https://images.wraithcode.io/2026-05/time-saving-tip-2-user-snippets-in-vscode-img-02-1600.webp)

If this is your first time opening this file you should see a comment including information about what properties and variables are supported, as well as a simple example of what a Code Snippet looks like. Let's have a look at this, piece by piece, so we understand what options we have, and what structure we need to use.

```json
// Place your snippets for [INSERT_LANGUAGE_FILE_TYPE] here. Each snippet is defined under a snippet name and has a prefix, body and 
// description.
```
So the name of our snippet is going to be defined as the key on this json object, and it will have a JSON object as it's value. In that object we only have to worry about 3 properties, `prefix`, `body`, and `description`. 

```json
// The prefix is what is used to trigger the snippet...
```
This means, whatever we enter into the `prefix` property, is what we can type as we are writing our code in order to trigger the insertion of the Snippet body.

```json
// ...and the body will be expanded and inserted
```
So the `body` is what will hold the content of our Snippet. When the `prefix` triggers it, the `body` is what will be inserted in our code.

It's not listed in the comment, so I'll just explain it...the `description` is just a plain text description of the snippet to help you (or others) know what the snippet is used for. It will be displayed in the IntelliSense when you're writing your code. 

```json
// Possible variables are:
// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
// same ids are connected.
```
As you can see, there are a few variables we have access to as well. We won't touch on all of these, but we will use 1 or 2 in this example do demonstrate how convenient they can make things.

Alright, now that we understand what a User Snippet consists of, let's figure out what `prefix` we want to use, and what our Snippet `body` is going to consist of.

For `prefixes`, I personally like to prefix the `prefix` (that's fun to say 🤪) with __ (double underscore). This was something I started doing years ago to separate my personal stuff from other built in or third party Snippets, so I'm going to keep that same naming convention. And since this is going to be a Snippet for a Functional Component in React, I think `fc` would be a good, short name to use while I'm coding, so my `prefix` is going to be `__fc`. Feel free to name yours whatever you like.

For the `body`, let's say for the project I'm currently working on, I almost always find myself using this boilerplate for all my new components:

```react
import React from 'react';
import './style.css';

interface IProps {
    className?: string;
    dataCy?: string;
}

export const Example: React.FC<IProps> = ({
    className = '',
    dataCy = '',
}) => {
    return (
        <div
            className={ className }
            data-cy={ dataCy }
        >
            temp Example
        </div>
    );
};
```

It's just a basic Functional Component. In this project, we use vanilla CSS (my favorite 😍), we always include at least a `className` prop and a `dataCy` prop (to use for testing with Cypress), and notice how we're using the name of the component in 2 places...we'll circle back to this later).

With that sorted out, it's finally time to write our Snippet.

Just below the comment in your User Snippets configuration file, let's create a new property (feel free to delete the comment if you want).

I tend to match the key with my `prefix`...

```json
{
  "__fc": {
    prefix: "__fc",
  },
}
```

but you can name yours whatever you like...

```json
{
  "Something more descriptive": {
    prefix: "__fc",
  },
}
```

And then our body. Note, that the body is not one big string. It's an array of strings, and each element in the array is a line of code. So we'll take our boilerplate, and convert it to the following format:

```json
"__fc": {
  "prefix": "__fc",
  "body": [
    "import React from 'react';",
    "import './style.css';"
    "",
    "interface IProps {",
    "\tclassName?: string;",
    "\tdataCy?: string;",
    "}",
    "",
    "export const Example: React.FC<IProps> = ({",
    "\tclassName = '',",
    "\tdataCy = '',",
    "}) => {",
    "\treturn (",
    "\t\t<div",
    "\t\t\tclassName={ className }",
    "\t\t\tdata-cy={ dataCy }",
    "\t\t>",
    "\t\t\ttemp Example",
    "\t\t</div>",
    "\t);",
    "};",
    ""
  ],
},
```

*Notice the use of empty strings and \t to create spacing.*

Remember how the name of the component was in our boilerplate, and it was in there twice? Well, I don't personally want to have to go change both of those occurrences every time I create a new component. Let's use one of those variables to allow us to make our Snippet more dynamic when it gets inserted! The variable I think we should use here is `${1}`. This will put the cursor in that position after the `body` is inserted and allow us to immediately type the name of the component. And because of VSCode's multi-cursor functionality, we can actually reuse the same variable in multiple places so we only have to type the name once! 

```json
"__fc": {
  "prefix": "__fc",
  "body": [
    "import React from 'react';",
    "import './style.css';"
    "",
    "interface IProps {",
    "\tclassName?: string;",
    "\tdataCy?: string;",
    "}",
    "",
    "export const ${1}: React.FC<IProps> = ({",
    "\tclassName = '',",
    "\tdataCy = '',",
    "}) => {",
    "\treturn (",
    "\t\t<div",
    "\t\t\tclassName={ className }",
    "\t\t\tdata-cy={ dataCy }",
    "\t\t>",
    "\t\t\ttemp ${1}",
    "\t\t</div>",
    "\t);",
    "};",
    ""
  ],
},
```

Lastly, let's add a little `description` so we can remember what this Snippet is for when we reuse it in 3 months.

```json
{
  "__fc": {
    ...
    "description": "Boilerplate for a Functional Component in React"
  },
}
```

And that's it, our User Snippet is done and ready to be used! (💾 Don't forget to save!)

Now for the fun part. Let's test out our new time saving super power! 🦸‍♀️

Create a new file with the corresponding file type for your Snippet (or open an existing file). VSCode will automatically filter your snippets based on the file type you're currently working in. In the case of the example above, we can only use the `__fc` User Snippet if we're working in a `.tsx` file.

With the proper file type open, now all we have to do is type the name of our `prefix`, select it from the options that appear, and press Enter.

![Screen recording of utilizing the new "__fc" User Snippet in VSCode](https://images.wraithcode.io/2026-05/time-saving-tip-2-user-snippets-in-vscode-img-03.gif)

Would you look at that?! In just a couple seconds we were able to get an entire component's boilerplate up and running. Not to mention, we can be sure that everything we just added is corrected because it's being reused from a template.

And don't forget, this is just one example! How many other "chunks" of code could you templates like this? Every time you create a new Snippet, you're implementing a way to save time, both in upfront work of that thing, as well long term maintainability because it's less likely that you are implementing little bugs, or variations in coding standards.

Ready to kick it up a notch for even more time savings? Share the snippets with your team so *everyone* is using the same Snippets!

I hope this post has shed a little light on an amazingly powerful feature that can save huge chunks of time for you over the next few months or years! Until next time, Happy Hacking!
