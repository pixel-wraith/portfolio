/**
 * Phase C of the dev.to migration: apply R2 URLs from image-uploads.json
 * back into post frontmatter (`cover:`) and body (find/replace
 * originalUrl → r2Url).
 *
 * Run: npm run apply:image-uploads
 *
 * Validates first: errors out if any cover or body entry still has a null
 * r2Url, listing which ones, so we never half-apply a migration.
 */

import { existsSync, readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

// ---------- paths ----------

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const POSTS_DIR = resolve(REPO_ROOT, 'src/posts');
const MAPPING_PATH = resolve(REPO_ROOT, 'image-uploads.json');

// ---------- types ----------

interface IImageEntry {
    originalUrl: string;
    localPath: string;
    r2Url: string | null;
}

interface IPostImages {
    cover: IImageEntry | null;
    body: IImageEntry[];
}

type ImageMapping = Record<string, IPostImages>;

interface IFrontmatter {
    title: string;
    description: string;
    date: string;
    tags: string[];
    slug: string;
    cover?: string;
    published: boolean;
    devto_id?: number;
}

// ---------- frontmatter ----------

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

// Matches the import script's emitted format so a re-run of either produces
// identical text. Kept separate from `src/lib/posts/frontmatter.ts` because
// that module parses and validates, not writes.
function stringifyFrontmatter(fm: IFrontmatter): string {
    const lines = [
        `title: ${JSON.stringify(fm.title)}`,
        `description: ${JSON.stringify(fm.description)}`,
        `date: ${JSON.stringify(fm.date)}`,
        `tags: [${fm.tags.map(t => JSON.stringify(t)).join(', ')}]`,
        `slug: ${JSON.stringify(fm.slug)}`,
    ];
    if (fm.cover) {
        lines.push(`cover: ${JSON.stringify(fm.cover)}`);
    }
    lines.push(`published: ${fm.published}`);
    if (fm.devto_id != null) {
        lines.push(`devto_id: ${fm.devto_id}`);
    }
    return `---\n${lines.join('\n')}\n---`;
}

// ---------- validation ----------

function validateMapping(mapping: ImageMapping): string[] {
    const errors: string[] = [];
    for (const [slug, entry] of Object.entries(mapping)) {
        if (entry.cover && !entry.cover.r2Url) {
            errors.push(`${slug}: cover r2Url is null (originalUrl: ${entry.cover.originalUrl})`);
        }
        for (let i = 0; i < entry.body.length; i++) {
            const img = entry.body[i];
            if (!img.r2Url) {
                errors.push(`${slug}: body img ${i + 1} r2Url is null (originalUrl: ${img.originalUrl})`);
            }
        }
    }
    return errors;
}

// ---------- main ----------

async function main(): Promise<void> {
    if (!existsSync(MAPPING_PATH)) {
        throw new Error(`mapping not found at ${MAPPING_PATH}`);
    }

    const mapping = JSON.parse(readFileSync(MAPPING_PATH, 'utf-8')) as ImageMapping;

    const errors = validateMapping(mapping);
    if (errors.length > 0) {
        console.error(`\n${errors.length} entries are missing r2Url; nothing applied.\n`);
        for (const e of errors) {
            console.error(`  - ${e}`);
        }
        console.error('\nFill every r2Url in image-uploads.json before running this script.');
        process.exit(1);
    }

    let postsUpdated = 0;
    let coversSet = 0;
    let bodyReplacements = 0;
    const skipped: string[] = [];

    for (const [slug, entry] of Object.entries(mapping)) {
        const postPath = resolve(POSTS_DIR, `${slug}.md`);
        if (!existsSync(postPath)) {
            skipped.push(`${slug}: post file not found at ${postPath}`);
            continue;
        }

        const text = await readFile(postPath, 'utf-8');
        const match = text.match(FRONTMATTER_PATTERN);
        if (!match) {
            skipped.push(`${slug}: no frontmatter block`);
            continue;
        }
        const [, yamlBlock, capturedBody] = match;
        const fm = parseYaml(yamlBlock) as IFrontmatter;

        let changed = false;

        if (entry.cover?.r2Url && fm.cover !== entry.cover.r2Url) {
            fm.cover = entry.cover.r2Url;
            coversSet++;
            changed = true;
        }

        let body = capturedBody;
        for (const img of entry.body) {
            if (img.r2Url && body.includes(img.originalUrl)) {
                body = body.replaceAll(img.originalUrl, img.r2Url);
                bodyReplacements++;
                changed = true;
            }
        }

        if (changed) {
            const newContent = `${stringifyFrontmatter(fm)}\n\n${body.trim()}\n`;
            await writeFile(postPath, newContent, 'utf-8');
            console.log(`✓ ${slug}`);
            postsUpdated++;
        }
    }

    console.log(`\nDone. Updated ${postsUpdated} posts. Covers set: ${coversSet}. Body URL replacements: ${bodyReplacements}.`);
    if (skipped.length > 0) {
        console.warn(`\n${skipped.length} skipped:`);
        for (const s of skipped) {
            console.warn(`  - ${s}`);
        }
    }
}

main().catch((err) => {
    console.error('FATAL:', err instanceof Error ? err.message : err);
    process.exit(1);
});
