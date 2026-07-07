<script lang="ts">
    import type { PostMeta } from "$lib/schemas/post.schema";

    import Intro from "$lib/components/Intro.svelte";
    import IntroContent from "$lib/components/IntroContent.svelte";
    import PostCard from "$lib/components/PostCard.svelte";
    import Section from "$lib/components/Section.svelte";
    import { STARTED_WORKING_IN_SOFTWARE } from "$lib/constants/me";
    import { bookSchema } from "$lib/schemas/book.schema";
    import dayjs from "dayjs";
    import { onMount } from "svelte";
    import { z } from "zod";

    interface IPageProps {
        data: {
            blog: {
                posts: PostMeta[];
            };
            currentlyReading: z.infer<typeof bookSchema>[];
        };
    }

    const { data }: IPageProps = $props();

    // Seed at init so SSR renders the value, then refresh at midnight so a
    // page left open across an anniversary stays in sync with the career bar.
    let yearsExp = $state(dayjs().diff(dayjs(STARTED_WORKING_IN_SOFTWARE), 'years'));

    onMount(() => {
        let timer: number;

        function refresh() {
            yearsExp = dayjs().diff(dayjs(STARTED_WORKING_IN_SOFTWARE), 'years');

            const now = dayjs();
            const millisToTomorrow = now.add(1, 'day').startOf('day').diff(now);
            timer = window.setTimeout(refresh, millisToTomorrow);
        }

        refresh();

        return () => window.clearTimeout(timer);
    });
</script>

<div class="container">
    <Intro header="Hey, I'm Jake.">
        <IntroContent>
            <p class="lead">
                I build fast, solve problems, and lead engineers.
            </p>

            <p>
                Right now I'm building Merge Lantern, risk intelligence that tells small teams
                which pull requests need senior eyes before they merge.
            </p>

            <p>
                I'm an Engineering Manager and Technical Architect. I turn ambitious
                roadmaps into shipped reality, broken and bloated systems into modern marvels,
                and chaotic sprints into calm, dependable releases — all without losing the human
                part along the way.
            </p>

            <p>
                {yearsExp} years in and I still love this stuff...the hard problems, the
                good teams, the moment it all clicks. Poke around; the rest of the site
                fills in the details.
            </p>

            <div class="cta-row">
                <a href="/experience" class="cta">See what I've built →</a>
                <a href="/about" class="cta cta-secondary">Get to know me →</a>
                <a href="https://mergelantern.com" class="cta cta-tertiary">See Merge Lantern →</a>
            </div>
        </IntroContent>
    </Intro>

    {#if data.currentlyReading.length > 0}
        <Section>
            <div class="currently-reading">
                <h2>Currently Reading</h2>

                <div class="currently-reading-list">
                    {#each data.currentlyReading as book}
                        <a href="{book.url}" target="_blank" class="book">
                            <img src={book.image} alt={book.title} />
                        </a>
                    {/each}
                </div>
            </div>
        </Section>
    {/if}

    {#if data.blog.posts.length > 0}
        <Section style="--section-max-width: 80rem">
            <div class="blog-posts-container">
                <h2>Latest Blog Posts</h2>

                <div class="blog-posts">
                    {#each data.blog.posts as post (post.slug)}
                        <PostCard {post} />
                    {/each}
                </div>
            </div>
        </Section>
    {/if}
</div>

<style>
    .lead {
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 600;

        @media (min-width: 768px) {
            font-size: 1.75rem;
            line-height: 2.5rem;
        }
    }

    .cta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 0.5rem;
    }

    .cta {
        padding: 0.5rem 1.25rem;
        font-family: var(--header-font);
        font-size: 1.1rem;
        letter-spacing: 0.05rem;
        text-decoration: none;
        background: var(--primary-500);
        color: var(--neutral-0);
        border: 3px solid var(--primary-500);
        transform: rotate(-1deg);
        transition: all 0.2s ease-in-out;

        &:hover,
        &:focus-visible {
            background: var(--primary-600);
            border-color: var(--primary-600);
            transform: rotate(0deg) scale(1.03);
        }
    }

    .cta-secondary {
        background: transparent;
        color: var(--primary-500);
        transform: rotate(1deg);

        &:hover,
        &:focus-visible {
            background: var(--primary-500);
            color: var(--neutral-0);
            transform: rotate(0deg) scale(1.03);
        }
    }

    .cta-tertiary {
        background: transparent;
        color: var(--primary-500);
        transform: rotate(-2deg);

        &:hover,
        &:focus-visible {
            background: var(--primary-500);
            color: var(--neutral-0);
            transform: rotate(0deg) scale(1.03);
        }
    }

    .currently-reading {
        container-type: inline-size;
        container-name: currently-reading;
        max-width: 60rem;

        & .currently-reading-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            & .book {
                width: 10rem;
                border: 5px solid var(--neutral-300);
                transition: all 0.2s ease-in-out;

                &:hover,
                &:focus-visible {
                    border-color: var(--primary-500);
                    transform: scale(1.03);
                }
            }

            & img {
                display: block;
                width: 100%;
                height: auto;
                object-fit: cover;
                object-position: center;
            }
        }
    }

    .blog-posts-container {
        width: 100%;
        padding: 0 1rem;

        & .blog-posts {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 1.5rem;
        }
    }

    @media (min-width: 1024px) {
        .blog-posts-container .blog-posts {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
        }
    }
</style>