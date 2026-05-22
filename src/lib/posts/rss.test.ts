import type { PostMeta } from '$lib/schemas/post.schema';

import { describe, expect, it } from 'vitest';

import { buildRssXml } from './rss';

const SITE = 'https://jakelundberg.dev';

function post(overrides: Partial<PostMeta> = {}): PostMeta {
    return {
        title: 'A Post',
        description: 'Short summary.',
        date: '2024-09-15',
        tags: [],
        slug: 'a-post',
        published: true,
        readingTimeMinutes: 1,
        ...overrides,
    };
}

describe('buildRssXml', () => {
    it('emits a valid RSS 2.0 channel skeleton with no items when given an empty list', () => {
        const xml = buildRssXml([], SITE);

        expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(xml).toContain('<rss version="2.0"');
        expect(xml).toContain('<channel>');
        expect(xml).toContain('</channel>');
        expect(xml).toContain('</rss>');
        // RSS 2.0 requires <title>, <link>, and <description> on the channel.
        expect(xml).toContain('<title>');
        expect(xml).toContain(`<link>${SITE}</link>`);
        expect(xml).toContain('<description>');
        expect(xml).not.toContain('<item>');
    });

    it('includes the atom:self link pointing at /rss.xml on the site URL', () => {
        const xml = buildRssXml([], SITE);

        expect(xml).toContain(`<atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>`);
        expect(xml).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
    });

    it('emits one <item> per post with title, absolute link, guid, pubDate, description', () => {
        const xml = buildRssXml([post()], SITE);

        expect(xml).toContain('<item>');
        expect(xml).toContain('<title><![CDATA[A Post]]></title>');
        expect(xml).toContain(`<link>${SITE}/blog/a-post</link>`);
        expect(xml).toContain(`<guid isPermaLink="true">${SITE}/blog/a-post</guid>`);
        expect(xml).toContain('<pubDate>Sun, 15 Sep 2024 00:00:00 GMT</pubDate>');
        expect(xml).toContain('<description><![CDATA[Short summary.]]></description>');
    });

    it('preserves the input order of posts (caller is responsible for sorting)', () => {
        const xml = buildRssXml(
            [
                post({ slug: 'first', title: 'First' }),
                post({ slug: 'second', title: 'Second' }),
                post({ slug: 'third', title: 'Third' }),
            ],
            SITE,
        );

        const firstIndex = xml.indexOf('First');
        const secondIndex = xml.indexOf('Second');
        const thirdIndex = xml.indexOf('Third');
        expect(firstIndex).toBeGreaterThan(-1);
        expect(firstIndex).toBeLessThan(secondIndex);
        expect(secondIndex).toBeLessThan(thirdIndex);
    });

    it('escapes literal `]]>` sequences inside CDATA blocks', () => {
        const xml = buildRssXml([post({ description: 'hostile ]]> sequence' })], SITE);

        // The literal closing of the post's CDATA must not appear in the body of
        // an open CDATA block. The escape splits it: `]]]]><![CDATA[>`.
        expect(xml).toContain(']]]]><![CDATA[>');
        // Both halves of the original content survive the split: the prose before
        // the hostile sequence, and the prose after it. Asserting both prevents
        // a truncation regression from passing the test.
        expect(xml).toContain('hostile ');
        expect(xml).toContain(' sequence');
    });

    it('formats pubDate as RFC 822 in UTC at the start of the day', () => {
        const xml = buildRssXml([post({ date: '2025-12-05' })], SITE);

        expect(xml).toContain('<pubDate>Fri, 05 Dec 2025 00:00:00 GMT</pubDate>');
    });

    it('builds absolute item links from the given siteUrl', () => {
        const xml = buildRssXml([post({ slug: 'foo' })], 'https://example.com');

        expect(xml).toContain('<link>https://example.com/blog/foo</link>');
        expect(xml).toContain('<guid isPermaLink="true">https://example.com/blog/foo</guid>');
    });
});
