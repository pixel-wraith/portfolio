<script lang="ts">
    import { z } from "zod";
    import { blogPostSchema } from "$lib/schemas/blog.schema";
	import dayjs from "dayjs";
	
    interface IBlogPostProps {
        post: z.infer<typeof blogPostSchema>;
        condensed?: boolean;
    }

    let { post, condensed = false }: IBlogPostProps = $props();
</script>

<article
    class="blog-post"
    class:condensed
>
    <a
        href={post.url}
        target="_blank"
    >
        <div class="blog-post-image">
            <img
                src={post.cover_image}
                alt={post.title}
            />
        </div>
        
        <div class="blog-post-metadata">
            <p class="metadata">
                posted {dayjs(post.published_timestamp).format('MMM DD, YYYY')}
            </p>

            {#if !condensed}
                <p class="metadata">
                    {post.reading_time_minutes} min read
                </p>
            {/if}
        </div>
    
        <div class="blog-post-content">
            {#if condensed}
                <h3 class="h6">{post.title}</h3>
            {:else}
                <h3>{post.title}</h3>
            {/if}
            <div>
                {#if condensed}
                    <p class="metadata">
                        {post.reading_time_minutes} min read
                    </p>
                {:else}
                    <p>{post.description}</p>

                    <div class="blog-post-tags">
                        {#each (post.tag_list || []) as tag}
                            <div>{tag}</div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </a>
</article>

<style>
    .blog-post {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 40rem;
        border: 5px solid var(--neutral-300);
        background: var(--neutral-100);
        transition: all 0.2s ease-in-out;

        &:hover,
        &:focus {
            border-color: var(--primary-500);
            transform: scale(1.03);
        }

        &.condensed {
            max-width: 30rem;
            
            & img {
                height: 10rem;
            }

            & .metadata {
                text-align: center;
            }
        }

        &:not(.condensed) {
            & .blog-post-metadata {
                display: flex;
                justify-content: space-between;
            }
        }

        & a {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            height: 100%;
            text-decoration: none;
            text-decoration: none;
        }

        & img {
            width: 100%;
            height: 14rem;
            object-fit: cover;
            object-position: center;
        }

        & .blog-post-metadata {
            padding: 0 0.5rem;
        }

        & .metadata {
            font-size: 0.75rem;
            color: var(--neutral-600);
            line-height: 0.9rem;
        }
    

        & .blog-post-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            padding: 0 1rem 0.5rem;

            & h3 {
                margin-bottom: 0.5rem;
            }

            & .blog-post-tags {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin: 0.5rem 0 -1.2rem;

                & div {
                    padding: 0.25rem 0.5rem;
                    background: var(--neutral-900);
                    color: var(--neutral-100);
                    font-size: 0.75rem;
                    line-height: 0.9rem;
                }

                & div:nth-child(1n) {
                    transform: rotate(-3deg);
                }

                & div:nth-child(2n) {
                    transform: rotate(-1deg);
                }

                & div:nth-child(3n) {
                    transform: rotate(2deg);
                }
            }
        }
    }
</style>