<script lang="ts">
    import type { IPaginated } from "$lib/posts/paginate";
    import type { PostMeta } from "$lib/schemas/post.schema";

    import { page as currentPage } from '$app/state';
    import PostList from "$lib/components/PostList.svelte";
    import { SITE_URL } from "$lib/constants/site";

    interface IBlogPageProps {
        data: IPaginated<PostMeta>;
    }

    const { data }: IBlogPageProps = $props();

    const canonical = $derived(`${SITE_URL}${currentPage.url.pathname}`);
</script>

<svelte:head>
    <title>Blog — Page {data.page} — Jake Lundberg</title>
    <meta name="description" content="Writing on engineering, leadership, productivity, and the craft of building software." />
    <link rel="canonical" href={canonical} />
</svelte:head>

<div class="container">
    <header class="blog-header">
        <h1>Blog</h1>
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
        margin: 2rem auto 3rem;
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
    }
</style>
