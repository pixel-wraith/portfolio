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

    const canonical = $derived(`${SITE_URL}/blog/tag/${data.tag}`);
    const description = $derived(`Posts tagged #${data.tag} by Jake Lundberg.`);
</script>

<svelte:head>
    <title>#{data.tag} — Jake Lundberg</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
</svelte:head>

<div class="container">
    <header class="tag-header">
        <h1>#{data.tag}</h1>
        <p>{data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'} tagged #{data.tag}.</p>
    </header>

    <PostList
        posts={data.posts}
        page={1}
        totalPages={1}
    />
</div>

<style>
    .container {
        width: 100%;
        margin: 0 auto 5rem;
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
</style>
