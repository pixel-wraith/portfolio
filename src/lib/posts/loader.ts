import type { Post, PostMeta } from '$lib/schemas/post.schema';

import type { IPaginated } from './paginate';

import { parseFrontmatter } from './frontmatter';
import { paginate } from './paginate';
import { readingTimeMinutes } from './reading-time';
import { renderMarkdown } from './renderer';

interface IPostEntry {
    meta: PostMeta;
    body: string;
}

function buildRegistry(): IPostEntry[] {
    const modules = import.meta.glob('/src/posts/*.md', {
        query: '?raw',
        import: 'default',
        eager: true,
    }) as Record<string, string>;

    const slugToPath = new Map<string, string>();
    const entries: IPostEntry[] = [];

    for (const [path, raw] of Object.entries(modules)) {
        const { frontmatter, body } = parseFrontmatter(raw);

        const existing = slugToPath.get(frontmatter.slug);
        if (existing) {
            throw new Error(`buildRegistry: duplicate slug ${JSON.stringify(frontmatter.slug)} in ${path} (already declared by ${existing})`);
        }
        slugToPath.set(frontmatter.slug, path);

        entries.push({
            meta: { ...frontmatter, readingTimeMinutes: readingTimeMinutes(body) },
            body,
        });
    }

    return entries;
}

function isVisible(entry: IPostEntry): boolean {
    return import.meta.env.DEV ? true : entry.meta.published;
}

const POSTS: IPostEntry[] = buildRegistry()
    .filter(isVisible)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));

export interface IPostBySlugResult {
    post: Post;
    // prev = chronologically older, next = chronologically newer.
    // Naming prev/next instead of older/newer to match the issue contract.
    prev: PostMeta | null;
    next: PostMeta | null;
}

export function getAllPosts({ page = 1, perPage = 12 }: { page?: number; perPage?: number } = {}): IPaginated<PostMeta> {
    return paginate(POSTS.map(e => e.meta), page, perPage);
}

export function getRecentPosts(n: number): PostMeta[] {
    return POSTS.slice(0, n).map(e => e.meta);
}

export function getPostsByTag(tag: string): PostMeta[] {
    return POSTS.filter(e => e.meta.tags.includes(tag)).map(e => e.meta);
}

export async function getPostBySlug(slug: string): Promise<IPostBySlugResult | null> {
    const index = POSTS.findIndex(e => e.meta.slug === slug);
    if (index === -1) {
        return null;
    }

    const entry = POSTS[index];
    const renderedBody = await renderMarkdown(entry.body);
    const post: Post = { ...entry.meta, renderedBody };

    return {
        post,
        prev: index < POSTS.length - 1 ? POSTS[index + 1].meta : null,
        next: index > 0 ? POSTS[index - 1].meta : null,
    };
}

export function getAllSlugs(): string[] {
    return POSTS.map(e => e.meta.slug);
}

export function getAllTags(): string[] {
    const tags = new Set<string>();
    for (const entry of POSTS) {
        for (const tag of entry.meta.tags) {
            tags.add(tag);
        }
    }

    return [...tags].sort();
}
