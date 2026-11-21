<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Intro from "$lib/components/Intro.svelte";
    import Section from "$lib/components/Section.svelte";
    import { marked } from "marked";
    import { onMount } from "svelte";

    import type { Motivation } from "../../data/motivation";

    let motivation = $state<Motivation[]>([]);
    let loading = $state(true);
    let error = $state('');

    onMount(loadMotivation);

    async function loadMotivation() {
        try {
            loading = true;

            const res = await fetch('/api/motivation');

            if (!res.ok) {
                error = 'Failed to load motivation. Try again later.';
            }

            motivation = await res.json();
        } catch (err) {
            error = (err as Error).message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="container">
    <Intro header="Motivation">
        <p class="center">
            Get that little extra push to get focussed and ready to kill it!
        </p>
    </Intro>

    <Section>
        {#if loading}
            <div>loading...</div>
        {:else if error}
            <div class="error">{error}</div>
        {:else}
            <ul class="motivations">
                {#each motivation as m}
                    <li class="motivation">
                        <div class="quote">
                            <!-- eslint-disable-next-line svelte/no-at-html-tags -- body HTML is built at build time from author-controlled markdown via marked + Shiki -->
                            {@html marked.parse(m.quote, { breaks: true, async: false })}
                            {#if m.source}
                                <div class="source">
                                    — {m.source}
                                </div>
                            {/if}
                        </div>
                    </li>
                {/each}
            </ul>

            <div class="button-container">
                <Button onclick={loadMotivation}>
                    Load More
                </Button>
            </div>
        {/if}
    </Section>
</div>

<style>
    .center {
        text-align: center;
    }

    .container {
        width: 96%;
        margin: 0 auto;
    }

    .motivations {
        list-style: none;
    }

    .motivation {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 2rem;
    }

    .quote {
        width: 100%;
        padding: 1rem 2rem;
        background: var(--neutral-200);
    }

    .source {
        font-style: italic;
        color: var(--accent2-500);
    }

    .button-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 768px) {
        .motivation {
            &:nth-child(2n) {
                justify-content: flex-end;

                .quote {
                    text-align: right;
                }
            }
        }

        .quote {
            width: auto;
            max-width: 70%;
        }
    }
</style>
