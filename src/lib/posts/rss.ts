import type { PostMeta } from '$lib/schemas/post.schema';

const SITE_TITLE = 'Jake Lundberg\'s Blog';
const SITE_DESCRIPTION = 'Engineering, leadership, productivity, and the craft of shipping software.';

// Splits any literal `]]>` so it doesn't close the surrounding CDATA early.
function wrapCdata(s: string): string {
    return `<![CDATA[${s.replace(/\]\]>/g, ']]]]><![CDATA[>')}]]>`;
}

// Date-only frontmatter (YYYY-MM-DD) → RFC 822 datetime at UTC midnight.
function toRfc822(date: string): string {
    return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function buildRssXml(posts: PostMeta[], siteUrl: string): string {
    const items = posts
        .map(p => `
    <item>
      <title>${wrapCdata(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
      <pubDate>${toRfc822(p.date)}</pubDate>
      <description>${wrapCdata(p.description)}</description>
    </item>`)
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${wrapCdata(SITE_TITLE)}</title>
    <link>${siteUrl}</link>
    <description>${wrapCdata(SITE_DESCRIPTION)}</description>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>
`;
}
