export interface ISitemapEntry {
    loc: string;
    lastmod?: string;
}

// Sitemap-protocol requires entity-escaping the five XML predefined entities
// inside <loc> and other text values. URLs in real-world use frequently
// contain `&` (query strings, UTM params) which would otherwise produce
// XML that strict parsers (including Google's sitemap indexer) reject.
function escapeXml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export function buildSitemapXml(entries: ISitemapEntry[]): string {
    const urls = entries
        .map(e => `
  <url>
    <loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `\n    <lastmod>${escapeXml(e.lastmod)}</lastmod>` : ''}
  </url>`)
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;
}
