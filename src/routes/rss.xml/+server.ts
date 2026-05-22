import { SITE_URL } from '$lib/constants/site';
import { getRecentPosts } from '$lib/posts/loader';
import { buildRssXml } from '$lib/posts/rss';

export const prerender = true;

const FEED_LIMIT = 20;

export function GET(): Response {
    const xml = buildRssXml(getRecentPosts(FEED_LIMIT), SITE_URL);

    return new Response(xml, {
        // application/rss+xml is the registered MIME type for RSS 2.0;
        // bare application/xml works but some feed readers and the dev.to
        // RSS auto-importer (used in #12) are stricter about it.
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
}
