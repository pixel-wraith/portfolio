/**
 * Patches every dev.to article in src/posts/ with a canonical_url pointing
 * back to its jakelundberg.dev/blog/{slug} equivalent. This is the SEO
 * leg of the migration — once applied, dev.to view-source shows
 * `<link rel="canonical">` to the portfolio domain and the post visibly
 * renders an "Originally published at jakelundberg.dev" callout.
 *
 * Usage:
 *   npm run patch:devto-canonicals             — dry-run (default; no PATCH)
 *   npm run patch:devto-canonicals -- --apply  — actually PATCH dev.to
 *
 * Requires: DEV_TO_API_KEY in .env at the repo root.
 *
 * Idempotent: GETs each article first and skips ones whose canonical_url
 * already matches. Rate-limited at ~1s between requests so 50+ posts
 * stay well under dev.to's API rate cap.
 */

import { existsSync, readFileSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

// ---------- paths + constants ----------

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const POSTS_DIR = resolve(REPO_ROOT, 'src/posts');
const ENV_PATH = resolve(REPO_ROOT, '.env');

const CANONICAL_BASE = 'https://jakelundberg.dev/blog';
const THROTTLE_MS = 1100;
const APPLY = process.argv.includes('--apply');

// ---------- types ----------

interface IPostInfo {
    file: string;
    devtoId: number;
    slug: string;
    expectedCanonical: string;
}

interface IDevtoArticle {
    id: number;
    title: string;
    canonical_url: string | null;
}

// ---------- env loading ----------

function loadEnv(): void {
    if (!existsSync(ENV_PATH))
        return;
    const text = readFileSync(ENV_PATH, 'utf-8');
    for (const rawLine of text.split('\n')) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#'))
            continue;
        const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
        if (!match)
            continue;
        const [, key, rawValue] = match;
        if (process.env[key] !== undefined)
            continue;
        process.env[key] = rawValue.replace(/^["']|["']$/g, '');
    }
}

// ---------- post reading ----------

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

async function readPosts(): Promise<IPostInfo[]> {
    const files = await readdir(POSTS_DIR);
    const posts: IPostInfo[] = [];

    for (const file of files.sort()) {
        if (!file.endsWith('.md'))
            continue;
        const text = await readFile(resolve(POSTS_DIR, file), 'utf-8');
        const match = text.match(FRONTMATTER_PATTERN);
        if (!match) {
            console.warn(`SKIP ${file}: no frontmatter block`);
            continue;
        }
        const fm = parseYaml(match[1]) as { devto_id?: number; slug?: string };
        if (typeof fm.devto_id !== 'number') {
            console.log(`SKIP ${file}: no devto_id`);
            continue;
        }
        if (typeof fm.slug !== 'string' || !fm.slug) {
            console.warn(`SKIP ${file}: devto_id present but slug missing`);
            continue;
        }
        posts.push({
            file,
            devtoId: fm.devto_id,
            slug: fm.slug,
            expectedCanonical: `${CANONICAL_BASE}/${fm.slug}`,
        });
    }

    return posts;
}

// ---------- dev.to API ----------

async function getArticle(id: number, apiKey: string): Promise<IDevtoArticle> {
    const res = await fetch(`https://dev.to/api/articles/${id}`, {
        headers: { 'api-key': apiKey },
    });
    if (!res.ok) {
        throw new Error(`GET ${id} HTTP ${res.status}: ${await res.text()}`);
    }
    return (await res.json()) as IDevtoArticle;
}

async function patchCanonical(id: number, canonical: string, apiKey: string): Promise<void> {
    const res = await fetch(`https://dev.to/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({ article: { canonical_url: canonical } }),
    });
    if (!res.ok) {
        throw new Error(`PUT ${id} HTTP ${res.status}: ${await res.text()}`);
    }
}

// ---------- main ----------

async function sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
}

async function main(): Promise<void> {
    loadEnv();
    const apiKey = process.env.DEV_TO_API_KEY;
    if (!apiKey) {
        throw new Error('DEV_TO_API_KEY is required in .env or the environment');
    }

    console.log(`Mode: ${APPLY ? 'APPLY — will PATCH dev.to articles' : 'DRY RUN — no PATCH; rerun with --apply to mutate dev.to'}\n`);

    const posts = await readPosts();
    console.log(`${posts.length} posts have a devto_id\n`);

    let upToDate = 0;
    let needsUpdate = 0;
    let patched = 0;
    let failed = 0;

    for (let i = 0; i < posts.length; i++) {
        const p = posts[i];
        const tag = `[${i + 1}/${posts.length}]`;

        try {
            const remote = await getArticle(p.devtoId, apiKey);

            if (remote.canonical_url === p.expectedCanonical) {
                console.log(`${tag} OK    ${p.slug}`);
                upToDate++;
            } else {
                console.log(`${tag} DIFF  ${p.slug}`);
                console.log(`     current:  ${remote.canonical_url ?? '(none)'}`);
                console.log(`     expected: ${p.expectedCanonical}`);
                needsUpdate++;

                if (APPLY) {
                    await sleep(THROTTLE_MS);
                    await patchCanonical(p.devtoId, p.expectedCanonical, apiKey);
                    console.log(`     ✓ patched`);
                    patched++;
                }
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error(`${tag} FAIL  ${p.slug}: ${msg}`);
            failed++;
        }

        if (i < posts.length - 1) {
            await sleep(THROTTLE_MS);
        }
    }

    console.log('\n— Summary —');
    console.log(`already correct: ${upToDate}`);
    if (APPLY) {
        console.log(`needed update:   ${needsUpdate} (patched: ${patched})`);
    } else {
        console.log(`would update:    ${needsUpdate}`);
    }
    console.log(`failed:          ${failed}`);
    if (!APPLY && needsUpdate > 0) {
        console.log('\nRe-run with `--apply` to actually PATCH dev.to.');
    }
}

main().catch((err) => {
    console.error('FATAL:', err instanceof Error ? err.message : err);
    process.exit(1);
});
