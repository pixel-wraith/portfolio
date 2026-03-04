<script lang="ts">
    import type { Snippet } from "svelte";

    interface IImgGalleryProps {
        children: Snippet;
    }

    const { children }: IImgGalleryProps = $props();
</script>

<div class="gallery">
    {@render children()}
</div>

<style>
    .gallery {
        display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;

        /* img styles are in styles.css */
    }
</style>