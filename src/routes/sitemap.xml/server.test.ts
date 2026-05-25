import { getAllTags } from '$lib/posts/loader';
import { describe, expect, it } from 'vitest';

import { GET } from './+server';

// Regression guard: if the tag URL loop is ever accidentally deleted or
// short-circuited, this fires. The drift guard in static-routes.test.ts
// only covers STATIC_ROUTES; tag URLs are a separate emission path.
describe('sitemap GET response', () => {
    it('includes a /blog/tag/{tag} url for every tag in the corpus', async () => {
        const xml = await GET().text();
        const tags = getAllTags();

        expect(tags.length).toBeGreaterThan(0);
        for (const tag of tags) {
            expect(xml).toContain(`<loc>https://jakelundberg.dev/blog/tag/${encodeURIComponent(tag)}</loc>`);
        }
    });
});
