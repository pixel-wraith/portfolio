<script lang="ts">
    import type { IPostBySlugResult } from "$lib/posts/loader";
    import PostLayout from "$lib/components/PostLayout.svelte";

    interface IPostPageProps {
        data: IPostBySlugResult;
    }

    const { data }: IPostPageProps = $props();
</script>

<PostLayout
    post={data.post}
    prev={data.prev}
    next={data.next}
/>
