<script lang="ts">
    import type { Snippet } from "svelte";

    interface IIntroProps {
        header: string;
        children: Snippet;
    }

    const { header, children }: IIntroProps = $props();
</script>

<section class="intro">
    <h1>{header}</h1>

    {@render children()}
</section>

<style>
    .intro {
        position: relative;
		max-width: 60rem;
		margin: 2vw auto 3rem;
		border-top: 5px solid var(--primary-500);
        background: var(--neutral-200);
        z-index: 1;

        &:not(:last-of-type) {
			padding: 2rem 1rem 4rem;
		}
    }

    @media (min-width: 500px) {
		.intro:not(:last-of-type) {
			padding: 2rem 1rem;
		}
    }
</style>