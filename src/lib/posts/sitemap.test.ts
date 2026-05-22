import { describe, expect, it } from 'vitest';

import { buildSitemapXml } from './sitemap';

describe('buildSitemapXml', () => {
    it('emits a valid sitemap skeleton with no urls when given an empty list', () => {
        const xml = buildSitemapXml([]);

        expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
        expect(xml).toContain('</urlset>');
        expect(xml).not.toContain('<url>');
    });

    it('emits one <url> per entry with its <loc>', () => {
        const xml = buildSitemapXml([{ loc: 'https://example.com/' }]);

        expect(xml).toContain('<url>');
        expect(xml).toContain('<loc>https://example.com/</loc>');
        expect(xml).toContain('</url>');
    });

    it('includes <lastmod> only when the entry provides one', () => {
        const xml = buildSitemapXml([
            { loc: 'https://example.com/no-mod' },
            { loc: 'https://example.com/with-mod', lastmod: '2024-09-15' },
        ]);

        expect(xml).toContain('<loc>https://example.com/with-mod</loc>');
        expect(xml).toContain('<lastmod>2024-09-15</lastmod>');

        // The no-lastmod URL should appear without a <lastmod> sibling between
        // its <loc> and the closing </url>.
        const noModSegment = xml.slice(xml.indexOf('https://example.com/no-mod'));
        const closeUrlIndex = noModSegment.indexOf('</url>');
        const segmentBeforeClose = noModSegment.slice(0, closeUrlIndex);
        expect(segmentBeforeClose).not.toContain('<lastmod>');
    });

    it('escapes XML entity characters in loc (&, <, > etc.)', () => {
        const xml = buildSitemapXml([
            { loc: 'https://example.com/path?a=1&b=2' },
            { loc: 'https://example.com/tag/<weird>' },
        ]);

        expect(xml).toContain('<loc>https://example.com/path?a=1&amp;b=2</loc>');
        expect(xml).toContain('<loc>https://example.com/tag/&lt;weird&gt;</loc>');
        // The raw `&` and `<` must not appear unescaped inside a <loc>.
        expect(xml).not.toContain('a=1&b=2');
        expect(xml).not.toContain('tag/<weird>');
    });

    it('preserves the input order of urls', () => {
        const xml = buildSitemapXml([
            { loc: 'https://example.com/a' },
            { loc: 'https://example.com/b' },
            { loc: 'https://example.com/c' },
        ]);

        const a = xml.indexOf('/a</loc>');
        const b = xml.indexOf('/b</loc>');
        const c = xml.indexOf('/c</loc>');
        expect(a).toBeGreaterThan(-1);
        expect(a).toBeLessThan(b);
        expect(b).toBeLessThan(c);
    });
});
