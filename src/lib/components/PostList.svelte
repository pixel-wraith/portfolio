<script lang="ts">
    import type { PostMeta } from "$lib/schemas/post.schema";

    import PostCard from "$lib/components/PostCard.svelte";

    interface IPostListProps {
        posts: PostMeta[];
        page: number;
        totalPages: number;
    }

    const { posts, page, totalPages }: IPostListProps = $props();

    const prevHref = $derived(page <= 2 ? '/blog' : `/blog/page/${page - 1}`);
    const nextHref = $derived(`/blog/page/${page + 1}`);
</script>

<div class="post-list">
    {#if posts.length === 0}
        <p class="empty">No posts yet.</p>
    {:else}
        <div class="post-grid">
            {#each posts as post (post.slug)}
                <PostCard {post} />
            {/each}
        </div>

        {#if totalPages > 1}
            <nav
                class="pagination"
                aria-label="Pagination"
            >
                {#if page > 1}
                    <a
                        href={prevHref}
                        class="pagination-link"
                    >← Newer</a>
                {:else}
                    <span></span>
                {/if}

                <span class="pagination-status">Page {page} of {totalPages}</span>

                {#if page < totalPages}
                    <a
                        href={nextHref}
                        class="pagination-link"
                    >Older →</a>
                {:else}
                    <span></span>
                {/if}
            </nav>
        {/if}
    {/if}
</div>

<style>
    .post-list {
        width: 100%;
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 1rem;

        & .empty {
            text-align: center;
            color: var(--neutral-600);
        }

        & .post-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
            gap: 1.5rem;
            justify-items: center;
        }

        & .pagination {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            gap: 1rem;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--neutral-300);
            color: var(--neutral-700);

            & .pagination-status {
                font-size: 0.9rem;
                color: var(--neutral-600);
                text-align: center;
            }

            & .pagination-link {
                padding: 0.5rem 1rem;
                border: 2px solid var(--neutral-300);
                color: var(--neutral-900);
                text-decoration: none;
                transition: border-color 0.2s ease-in-out;

                &:hover,
                &:focus-visible {
                    border-color: var(--primary-500);
                }

                &:first-child {
                    justify-self: start;
                }

                &:last-child {
                    justify-self: end;
                }
            }
        }
    }
</style>
