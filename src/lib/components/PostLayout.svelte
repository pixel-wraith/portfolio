<script lang="ts">
    import type { Post, PostMeta } from "$lib/schemas/post.schema";

    import { page } from '$app/state';
    import dayjs from "dayjs";

    interface IPostLayoutProps {
        post: Post;
        prev: PostMeta | null;
        next: PostMeta | null;
    }

    const { post, prev, next }: IPostLayoutProps = $props();

    const canonical = $derived(`https://jakelundberg.dev${page.url.pathname}`);
    const ogImage = $derived(post.cover ?? 'https://images.wraithcode.io/og/default.png');
    // Some OG parsers reject bare YYYY-MM-DD and want a full ISO 8601 datetime.
    const publishedDateTime = $derived(`${post.date}T00:00:00.000Z`);
</script>

<svelte:head>
    <title>{post.title} — Jake Lundberg</title>
    <meta name="description" content={post.description} />
    <link rel="canonical" href={canonical} />

    <meta property="og:type" content="article" />
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta property="article:published_time" content={publishedDateTime} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={post.title} />
    <meta name="twitter:description" content={post.description} />
    <meta name="twitter:image" content={ogImage} />
</svelte:head>

<article class="post">
    {#if post.cover}
        <img
            class="post-cover"
            src={post.cover}
            alt={post.title}
        />
    {/if}

    <header class="post-header">
        <h1>{post.title}</h1>

        <div class="post-meta">
            {#if !post.published}
                <span class="post-meta-draft">Draft</span>
                <span aria-hidden="true">·</span>
            {/if}
            <span>{dayjs(post.date).format('MMM DD, YYYY')}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
        </div>

        {#if post.tags.length > 0}
            <div class="post-tags">
                {#each post.tags as tag}
                    <div>{tag}</div>
                {/each}
            </div>
        {/if}
    </header>

    <div class="post-body">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- body HTML is built at build time from author-controlled markdown via marked + Shiki -->
        {@html post.renderedBody}
    </div>

    {#if prev || next}
        <nav
            class="post-nav"
            aria-label="Post navigation"
        >
            {#if prev}
                <a
                    href="/blog/{prev.slug}"
                    class="post-nav-link prev"
                >
                    <span class="post-nav-label">← Older</span>
                    <span class="post-nav-title">{prev.title}</span>
                </a>
            {:else}
                <span></span>
            {/if}

            {#if next}
                <a
                    href="/blog/{next.slug}"
                    class="post-nav-link next"
                >
                    <span class="post-nav-label">Newer →</span>
                    <span class="post-nav-title">{next.title}</span>
                </a>
            {/if}
        </nav>
    {/if}
</article>

<style>
    .post {
        width: 100%;
        max-width: 48rem;
        margin: 0 auto 5rem;
        padding: 0 1rem;
        color: var(--neutral-900);

        & .post-cover {
            display: block;
            width: 100%;
            max-height: 24rem;
            object-fit: cover;
            border: 5px solid var(--neutral-300);
            margin-bottom: 2rem;
        }

        & .post-header {
            margin-bottom: 2rem;
            text-align: center;

            & h1 {
                margin: 0 0 0.75rem;
            }

            & .post-meta {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                font-size: 0.85rem;
                color: var(--neutral-600);

                span {
                    font-size: 0.85rem;
                    color: var(--neutral-600);
                }

                .post-meta-draft {
                    color: var(--accent1-500);
                }
            }
        }

        & .post-tags {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;

            & div {
                padding: 0.25rem 0.5rem;
                background: var(--neutral-900);
                color: var(--neutral-100);
                font-size: 0.75rem;
                line-height: 0.9rem;
            }

            & div:nth-child(1n) {
                transform: rotate(-3deg);
            }

            & div:nth-child(2n) {
                transform: rotate(-1deg);
            }

            & div:nth-child(3n) {
                transform: rotate(2deg);
            }
        }

        & .post-body {
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
            line-height: 1.7;

            & :global(pre) {
                margin: 1.5rem 0;
                padding: 1rem;
                overflow-x: auto;
                font-size: 0.9rem;
                line-height: 1.5;
                border-radius: 4px;
            }

            & :global(:not(pre) > code) {
                padding: 0.1rem 0.35rem;
                background: var(--neutral-200);
                color: var(--neutral-900);
                font-size: 0.9em;
                border-radius: 3px;
            }

            & :global(a) {
                color: var(--primary-500);

                &:hover,
                &:focus-visible {
                    color: var(--primary-700);
                }
            }

            & :global(img) {
                display: block;
                max-width: 100%;
                margin: 1.5rem auto;
            }

            & :global(blockquote) {
                margin: 1.5rem 0;
                padding-left: 1rem;
                border-left: 4px solid var(--primary-500);
                color: var(--neutral-700);
                font-style: italic;
            }
        }

        & .post-nav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid var(--neutral-300);

            & .post-nav-link {
                display: flex;
                flex-direction: column;
                padding: 1rem;
                border: 2px solid var(--neutral-300);
                text-decoration: none;
                color: var(--neutral-900);
                transition: border-color 0.2s ease-in-out;

                &:hover,
                &:focus-visible {
                    border-color: var(--primary-500);
                }

                &.next {
                    text-align: right;
                }
            }

            & .post-nav-label {
                font-size: 0.8rem;
                color: var(--neutral-600);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            & .post-nav-title {
                margin-top: 0.25rem;
                font-weight: 600;
            }
        }
    }
</style>
