import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { STATIC_ROUTES } from './+server';

// The sitemap endpoint lives at src/routes/sitemap.xml/; one directory up is
// src/routes/. This drift guard fires when someone adds a new top-level page
// route (e.g. /resume) but forgets to register it in STATIC_ROUTES.
const ROUTES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');

function discoverTopLevelPageRoutes(): string[] {
    const routes: string[] = [];

    if (existsSync(join(ROUTES_DIR, '+page.svelte'))) {
        routes.push('/');
    }

    for (const entry of readdirSync(ROUTES_DIR, { withFileTypes: true })) {
        if (!entry.isDirectory()) {
            continue;
        }
        // Skip dynamic segments (/[slug]) and route groups (/(group)) — those
        // are never top-level static pages.
        if (entry.name.startsWith('[') || entry.name.startsWith('(')) {
            continue;
        }
        if (existsSync(join(ROUTES_DIR, entry.name, '+page.svelte'))) {
            routes.push(`/${entry.name}`);
        }
    }

    return routes.sort();
}

describe('sitemap STATIC_ROUTES drift guard', () => {
    it('matches the set of top-level page routes on disk in src/routes/', () => {
        expect([...STATIC_ROUTES].sort()).toEqual(discoverTopLevelPageRoutes());
    });
});
