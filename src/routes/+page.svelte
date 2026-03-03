<script lang="ts">
    import BlogPost from "$lib/components/BlogPost.svelte";
    import Intro from "$lib/components/Intro.svelte";
    import IntroContent from "$lib/components/IntroContent.svelte";
    import Section from "$lib/components/Section.svelte";
    import { blogPostSchema } from "$lib/schemas/blog.schema";
    import { bookSchema } from "$lib/schemas/book.schema";
    import { z } from "zod";

    interface IPageProps {
        data: {
            blog: {
                posts: z.infer<typeof blogPostSchema>[];
            };
            currentlyReading: z.infer<typeof bookSchema>[];
        };
    }

    const { data }: IPageProps = $props();
</script>

<div class="container">
    <Intro header="Hey, I'm Jake.">
        <IntroContent>
            <p>
                I'm an Engineering Manager and Technical Architect who ships at slightly-illegal speeds by pairing sharp architecture with AI-powered workflows. I lead engineers across the stack, run crisp sprints, and keep code quality high with friendly-but-firm guardrails (review SLAs, PR size limits, and real tests). I modernize platforms from monolith to TypeScript microservices, design scalable Postgres with RLS, build sane RBAC for multi-tenant apps, and wire the hard bits—auth/MFA, data sync, job queues, CDC—so legacy and modern systems play nice. Releases flow through AWS with feature flags, while Sentry and CloudWatch keep us humble. I partner with Product and Design to turn ambitious ideas into shippable reality, balancing speed with reliability and leading with technical excellence, empathy, and just enough sarcasm to keep retros interesting.
            </p>
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
                    {#each data.blog.posts as post}
                        <BlogPost {post} />
                    {/each}
                </div>
            </div>
        </Section>
    {/if}

    <Section style="--section-max-width: 80rem">
        <div class="flex-center">
            What people have to say coming soon...
        </div>
    </Section>
</div>

<style>
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