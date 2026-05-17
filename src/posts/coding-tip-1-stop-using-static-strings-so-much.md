---
title: "Coding Tip #1 - Stop Using Static Strings So Much"
description: "In software development, it's very common to have to utilize or test for string values. Maybe it's..."
date: "2023-11-27"
tags: ["development"]
slug: "coding-tip-1-stop-using-static-strings-so-much"
published: true
devto_id: 1679072
---

In software development, it's very common to have to utilize or test for string values. Maybe it's options from a dropdown, the name of the current environment the code is executing in, or the role of the current user. So things like...

```typescript
switch (selectedOption) {
  case 'linkedin': return ...;
  case 'search engine': return ...;
  case 'a friend told me': return ...;
  case 'other': return ...;
  default: return ...
}
```

```typescript
if (user.role === 'admin') { ... }
```

...are probably pretty familiar. And while there will always be a need to utilize and test for string values, using static strings like what's being done in the above examples can be really problematic...especially if the project grows.


## Why Static Strings Cause Issues

There are several reasons why using static strings in your code is a bad idea. 

It's not maintainable. Consider the second example above where the value of the user's role is being checked. This is something that can happen dozens, or even hundreds of times throughout any reasonably sized codebase. But over time, it's not uncommon to add or remove user roles, or even modify existing ones into new structures. So what would we do if we suddenly had to change "admin" to something else...say "admin-1"? We might be able to use find and replace, but something as commonly referenced as "admin" could be used in other contexts (like the admin area of the application used by internal users, for example), and if we changed those, we would break our app. So now we have to go through our entire app and check each occurrence of the word "admin" to see if we can change it to "admin-1". That could be really time consuming...

Second, it's error prone. As humans, it's really easy for us to make mistakes while typing. We might miss a keystroke, or "fat finger" something as we're typing and accidentally hit multiple keys at once. So in our example, it's absolutely feasible that we could accidentally type "admn" or "admnin" and not realize it. Something like this could easily slip through any automated tools, tests, and the code review, and all of a sudden we've introduced a bug into our code. 

We also aren't able to get much help from our tooling as we're working with these values. AI might be able to help a little, but unless it has all the context of the entire codebase, even it won't know all the different values that could exist, and we certainly aren't getting any help from our Intellisense.

And lastly, it's not intuitive. When using static strings like this, if things aren't documented, we can't easily tell what all the possible values are without digging through lots of code to find all the different occurrences of the different strings.

As you can see, there are lots of issues with using static strings in our code. But what's the alternative?


## What To Do Instead

Rather than using static strings, a much better approach is to use constants, enums, or objects to store the static string value, and then you only ever refer to the appropriate variable or object property throughout the rest of the code. Sticking to our user role example, we might put all the role strings into an object like this...

```typescript
export const UserRoles = {
  Member = 'member',
  Admin = 'admin',
  SuperAdmin = 'super admin',
};
```

...and then in our code, we would do something like...

```typescript
import { UserRoles } from '...';

if (user.role === UserRoles.Admin) { ... }
```

This approach actually solves all the issues mentioned in the previous section.

Since we're now using a variable, and the static string is only used in one place, if we need to change that value for any reason, we can do it in just one place and that change will be reflected throughout the rest of our codebase. Also, if for some reason we need to change the variable or property name, our linter be able to tell us exactly where else we need to make changes, removing the risk of us accidentally changing a static string that shouldn't have been changed.

We no longer have to worry about misspelling things because if we misspell `UserRole.Admin` our linter will yell at us and it will be much more obvious. Either we'll see the squiggles from our linter, we'll see a big error when we run the code, or our automated CI pipeline (hopefully you've set this up!) will  flag it.

Not only are misspellings virtually eliminated, but we also now get help form our tooling. Autocomplete will be able to tell us what the available properties are on the `UserRoles` object, and we can just have to select the right one.

And lastly, it's WAY more intuitive. If you ever need to know what all the possible user roles are, you just have to look at the `UserRoles` object! This makes things way easier to figure out, investigate, and troubleshoot.


## Conclusion

So when you're writing your next bit of code, remember that using static strings can cause a lot of issues. Instead, I would encourage you to store those strings in something like a collection of constants, an object, a class, something that will keep you from using those static strings throughout your code. This will make your code much more readable, maintainable, and way less error prone.

Hopefully this helps you as you build your next great feature or project. Until next time, Happy Hacking!
