<script lang="ts">
    import type { IPaginated } from "$lib/posts/paginate";
    import type { PostMeta } from "$lib/schemas/post.schema";

    import PostList from "$lib/components/PostList.svelte";
    import { SITE_URL } from "$lib/constants/site";

    interface IBlogIndexProps {
        data: IPaginated<PostMeta>;
    }

    const { data }: IBlogIndexProps = $props();
</script>

<svelte:head>
    <title>Blog — Jake Lundberg</title>
    <meta name="description" content="Writing on engineering, leadership, productivity, and the craft of building software." />
    <link rel="canonical" href="{SITE_URL}/blog" />
</svelte:head>

<div class="container">
    <header class="blog-header">
        <h1>Blog</h1>
        <p>Productivity, engineering, leadership, and the craft of shipping software.</p>
    </header>

    <PostList
        posts={data.items}
        page={data.page}
        totalPages={data.totalPages}
    />
</div>

<style>
    .container {
        width: 100%;
        margin: 0 auto 5rem;
    }

    .blog-header {
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
</style>
