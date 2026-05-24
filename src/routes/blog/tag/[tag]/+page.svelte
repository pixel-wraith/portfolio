<script lang="ts">
    import type { PostMeta } from "$lib/schemas/post.schema";

    import PostList from "$lib/components/PostList.svelte";
    import { SITE_URL } from "$lib/constants/site";

    interface ITagPageProps {
        data: {
            tag: string;
            posts: PostMeta[];
        };
    }

    const { data }: ITagPageProps = $props();

    const canonical = $derived(`${SITE_URL}/blog/tag/${encodeURIComponent(data.tag)}`);
    const description = $derived(`Posts tagged #${data.tag} by Jake Lundberg.`);
    const isEmpty = $derived(data.posts.length === 0);
</script>

<svelte:head>
    <title>#{data.tag} — Jake Lundberg</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <!-- Any string is a valid [tag] route param, so /blog/tag/{typo} returns a
         friendly empty page instead of a 404. Keep those out of search indexes. -->
    {#if isEmpty}
        <meta name="robots" content="noindex" />
    {/if}
</svelte:head>

<div class="container">
    <header class="tag-header">
        <h1>#{data.tag}</h1>
        {#if isEmpty}
            <p>No posts tagged #{data.tag} yet.</p>
        {:else}
            <p>{data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'} tagged #{data.tag}.</p>
        {/if}
    </header>

    {#if isEmpty}
        <div class="empty-state">
            <a href="/blog" class="back-link">← Browse all posts</a>
        </div>
    {:else}
        <!-- page=1/totalPages=1 suppresses PostList's pagination chrome — tag pages are unpaginated. -->
        <PostList
            posts={data.posts}
            page={1}
            totalPages={1}
        />
    {/if}
</div>

<style>
    .container {
        width: 100%;
        margin: 2rem auto 3rem;
    }

    .tag-header {
        max-width: 80rem;
        margin: 0 auto 1rem;
        padding: 0 1rem;
        text-align: center;
        color: var(--neutral-900);

        & h1 {
            margin: 0 0 0.5rem;
        }

        & p {
            color: var(--neutral-600);
            margin: 0;
        }
    }

    .empty-state {
        max-width: 80rem;
        margin: 2rem auto 0;
        padding: 0 1rem;
        text-align: center;

        & .back-link {
            display: inline-block;
            padding: 0.5rem 1rem;
            border: 2px solid var(--neutral-300);
            color: var(--neutral-900);
            text-decoration: none;
            transition: border-color 0.2s ease-in-out;

            &:hover,
            &:focus-visible {
                border-color: var(--primary-500);
            }
        }
    }
</style>
