---
title: "Hello from the new blog"
description: "A short note marking the migration of my blog from dev.to to jakelundberg.dev."
date: "2026-05-17"
tags: ["meta"]
slug: "hello"
published: true
---

This blog now lives at jakelundberg.dev. Previously my writing was scattered across dev.to and other platforms; from now on the canonical source is here, with cross-posts going out to dev.to and Medium pointing back via `rel="canonical"`.

## Why move

A few reasons:

- **Identity.** Writing on a personal-name domain reinforces the brand. People who google my name now find my work.
- **Ownership.** The content lives in version control, not at the mercy of a third-party platform.
- **Control.** Layout, typography, code highlighting, and reading experience are mine to tune.

## How it works

Posts are Markdown files in the repo. A build-time loader parses the frontmatter, computes reading time from the body, and pipes the prose through `marked` plus Shiki for syntax highlighting. Routes are prerendered into static HTML.

```ts
// what the loader returns for a single post
const { post, prev, next } = await getPostBySlug('hello');
```

Cross-platform syndication happens via dev.to's RSS auto-import: when a post is added here, it shows up as a draft on dev.to with `canonical_url` pointing back to this page.

That's it. The full migration plan is tracked at issue #3 — this post exists mostly to verify the pipeline works end to end.
