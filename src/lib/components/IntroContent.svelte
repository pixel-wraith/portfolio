<script lang="ts">
    import type { Snippet } from "svelte";

    interface IntroContentProps {
        children: Snippet;
    }

    const { children }: IntroContentProps = $props();
</script>

<div class="intro-content">
    {@render children()}
</div>

<style>
    .intro-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 50rem;
        margin: 0 auto;
    }
</style>