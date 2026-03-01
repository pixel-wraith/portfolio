<script lang="ts">
    import type { Snippet } from "svelte";

    interface ISectionProps {
        style?: string;
        children: Snippet;
    }

    const { style, children }: ISectionProps = $props();
</script>

<section {style}>
    {@render children()}
</section>

<style>
    section {
        position: relative;
        width: 100%;
        max-width: var(--section-max-width, 60rem);
        margin: 0 auto 3rem;
        padding-top: 3rem;

        &:not(:last-of-type) {
            margin-bottom: 5rem;
            padding-bottom: 1rem;
        }

        &:before {
            content: ' ';
            position: absolute;
            bottom: 100%;
            left: 50%;
            width: 50vw;
            height: 1px;
            background: var(--neutral-300);
            transform: translateX(-50%);
        }
    }
</style>