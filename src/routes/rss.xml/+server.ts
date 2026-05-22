import { getRecentPosts } from '$lib/posts/loader';
import { buildRssXml } from '$lib/posts/rss';

export const prerender = true;

const SITE_URL = 'https://jakelundberg.dev';
const FEED_LIMIT = 20;

export function GET(): Response {
    const xml = buildRssXml(getRecentPosts(FEED_LIMIT), SITE_URL);

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
