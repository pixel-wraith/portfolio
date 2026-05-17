/**
 * Bulk-import published dev.to articles into src/posts/ as Markdown.
 * Downloads cover + body images to src/lib/assets/images/blog/ and writes
 * a mapping at ./image-uploads.json so the user can upload to R2 and then
 * run scripts/apply-image-uploads.ts (Phase C) to rewrite URLs.
 *
 * Run: npm run import:devto    (or: npx tsx scripts/import-from-devto.ts)
 * Requires: DEV_TO_API_KEY in .env at the repo root.
 */

import { Buffer } from 'node:buffer';
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { slugify } from '../src/lib/posts/slugify.ts';

// ---------- paths ----------

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const POSTS_DIR = resolve(REPO_ROOT, 'src/posts');
const IMAGES_DIR = resolve(REPO_ROOT, 'src/lib/assets/images/blog');
const MAPPING_PATH = resolve(REPO_ROOT, 'image-uploads.json');
const ENV_PATH = resolve(REPO_ROOT, '.env');

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB sanity cap
const FETCH_TIMEOUT_MS = 30_000;

// ---------- types ----------

interface IDevtoArticle {
    id: number;
    title: string;
    description: string;
    body_markdown: string;
    cover_image: string | null;
    tag_list: string[];
    published_at: string;
    slug: string;
    type_of: string;
}

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

// ---------- env loading (no dotenv dep) ----------

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

// ---------- dev.to API ----------

async function fetchAllArticles(apiKey: string): Promise<IDevtoArticle[]> {
    const articles: IDevtoArticle[] = [];
    let page = 1;
    const perPage = 1000;

    while (true) {
        const url = `https://dev.to/api/articles/me?page=${page}&per_page=${perPage}`;
        const res = await fetch(url, { headers: { 'api-key': apiKey } });
        if (!res.ok) {
            throw new Error(`dev.to API error ${res.status}: ${await res.text()}`);
        }
        const batch = (await res.json()) as IDevtoArticle[];
        articles.push(...batch.filter(a => a.type_of === 'article'));
        if (batch.length < perPage)
            break;
        page++;
    }

    return articles;
}

// ---------- image discovery ----------

const MD_IMAGE = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const HTML_IMAGE = /<img\s[^>]*?src=["']([^"']+)["']/gi;

function extractImageUrls(markdown: string): string[] {
    const urls = new Set<string>();
    for (const match of markdown.matchAll(MD_IMAGE)) urls.add(match[1]);
    for (const match of markdown.matchAll(HTML_IMAGE)) urls.add(match[1]);
    return [...urls].filter(u => /^https?:\/\//i.test(u));
}

// ---------- image download ----------

function guessExtension(url: string, contentType: string | null): string {
    const fromCt = contentType?.split(';')[0].trim().toLowerCase();
    const ctMap: Record<string, string> = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/gif': 'gif',
        'image/webp': 'webp',
        'image/svg+xml': 'svg',
        'image/avif': 'avif',
    };
    if (fromCt && ctMap[fromCt])
        return ctMap[fromCt];

    const pathPart = url.split('?')[0].split('#')[0];
    const ext = extname(pathPart).slice(1).toLowerCase();
    if (ext && /^[a-z0-9]{2,5}$/.test(ext))
        return ext;

    return 'bin';
}

async function downloadImage(url: string, destBase: string): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        // Two-layer guard: the Content-Length check rejects oversized images
        // before reading the body when the server advertises a length.
        // Servers that omit the header (chunked transfer, CDN proxies) bypass
        // this layer; the post-download buffer.length check catches them.
        const contentLength = Number(res.headers.get('content-length') ?? 0);
        if (contentLength > MAX_IMAGE_BYTES) {
            throw new Error(`image is ${contentLength} bytes, exceeds ${MAX_IMAGE_BYTES} limit`);
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > MAX_IMAGE_BYTES) {
            throw new Error(`downloaded ${buffer.length} bytes, exceeds ${MAX_IMAGE_BYTES} limit`);
        }
        const ext = guessExtension(url, res.headers.get('content-type'));
        const destPath = `${destBase}.${ext}`;
        await writeFile(destPath, buffer);
        return destPath;
    } finally {
        clearTimeout(timer);
    }
}

// ---------- idempotency ----------

async function existingDevtoIds(): Promise<Set<number>> {
    const ids = new Set<number>();
    if (!existsSync(POSTS_DIR))
        return ids;
    const files = await readdir(POSTS_DIR);
    for (const file of files) {
        if (!file.endsWith('.md'))
            continue;
        const text = await readFile(resolve(POSTS_DIR, file), 'utf-8');
        const match = text.match(/^devto_id:\s*(\d+)/m);
        if (match)
            ids.add(Number(match[1]));
    }
    return ids;
}

async function loadExistingMapping(): Promise<ImageMapping> {
    if (!existsSync(MAPPING_PATH))
        return {};
    return JSON.parse(await readFile(MAPPING_PATH, 'utf-8')) as ImageMapping;
}

// ---------- frontmatter writer ----------

interface IFrontmatter {
    title: string;
    description: string;
    date: string;
    tags: string[];
    slug: string;
    published: boolean;
    devto_id: number;
}

function stringifyFrontmatter(fm: IFrontmatter): string {
    const lines = [
        `title: ${JSON.stringify(fm.title)}`,
        `description: ${JSON.stringify(fm.description)}`,
        `date: ${JSON.stringify(fm.date)}`,
        `tags: [${fm.tags.map(t => JSON.stringify(t)).join(', ')}]`,
        `slug: ${JSON.stringify(fm.slug)}`,
        `published: ${fm.published}`,
        `devto_id: ${fm.devto_id}`,
    ];
    return `---\n${lines.join('\n')}\n---`;
}

// ---------- main ----------

async function main(): Promise<void> {
    loadEnv();

    const apiKey = process.env.DEV_TO_API_KEY;
    if (!apiKey) {
        throw new Error('DEV_TO_API_KEY is required in .env or the environment');
    }

    await mkdir(POSTS_DIR, { recursive: true });
    await mkdir(IMAGES_DIR, { recursive: true });

    console.log('Fetching articles from dev.to...');
    const articles = await fetchAllArticles(apiKey);
    console.log(`Found ${articles.length} published articles.\n`);

    // Two-pass: pass 1 builds the devto-slug → our-slug map for internal link
    // rewriting in pass 2. Same-titled posts (dev.to allows it) get a counter
    // suffix so the API order winner keeps the bare slug.
    const slugMap = new Map<string, string>();
    const ourSlugUsage = new Map<string, string>();
    for (const article of articles) {
        const base = slugify(article.title);
        let ourSlug = base;
        if (ourSlugUsage.has(ourSlug)) {
            let counter = 2;
            while (ourSlugUsage.has(`${base}-${counter}`)) counter++;
            ourSlug = `${base}-${counter}`;
            console.warn(`     ⚠ slug collision: "${article.title}" — disambiguated to "${ourSlug}" (other holder: "${ourSlugUsage.get(base)}")`);
        }
        ourSlugUsage.set(ourSlug, article.title);
        slugMap.set(article.slug, ourSlug);
    }

    function rewriteInternalLinks(body: string): string {
        // The negative lookahead skips non-article paths on the same handle
        // (e.g. https://dev.to/wraith/series/24431) so we don't treat
        // 'series' as a candidate slug.
        return body.replace(/https:\/\/dev\.to\/wraith\/(?!series\/)([a-z0-9-]+)/g, (match, devSlug: string) => {
            const ourSlug = slugMap.get(devSlug);
            return ourSlug ? `/blog/${ourSlug}` : match;
        });
    }

    const skipIds = await existingDevtoIds();
    const mapping = await loadExistingMapping();
    const downloadFailures: { slug: string; url: string; error: string }[] = [];

    let imported = 0;
    let skipped = 0;

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const slug = slugMap.get(article.slug)!;
        const tag = `[${i + 1}/${articles.length}]`;

        if (skipIds.has(article.id)) {
            console.log(`${tag} SKIP devto_id ${article.id} ("${article.title}") — already imported`);
            skipped++;
            continue;
        }

        console.log(`${tag} IMPORT "${article.title}" → ${slug}`);

        // Cover image
        let coverEntry: IImageEntry | null = null;
        if (article.cover_image) {
            try {
                const destPath = await downloadImage(article.cover_image, resolve(IMAGES_DIR, `${slug}-cover`));
                const localPath = relative(REPO_ROOT, destPath);
                coverEntry = { originalUrl: article.cover_image, localPath, r2Url: null };
                console.log(`     ✓ cover → ${localPath}`);
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                console.warn(`     ✗ cover download failed: ${message}`);
                downloadFailures.push({ slug, url: article.cover_image, error: message });
            }
        }

        // Body images
        const bodyEntries: IImageEntry[] = [];
        const bodyUrls = extractImageUrls(article.body_markdown);
        for (let j = 0; j < bodyUrls.length; j++) {
            const url = bodyUrls[j];
            const idx = String(j + 1).padStart(2, '0');
            try {
                const destPath = await downloadImage(url, resolve(IMAGES_DIR, `${slug}-img-${idx}`));
                const localPath = relative(REPO_ROOT, destPath);
                bodyEntries.push({ originalUrl: url, localPath, r2Url: null });
                console.log(`     ✓ body img ${idx} → ${localPath}`);
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                console.warn(`     ✗ body img ${idx} download failed (${url}): ${message}`);
                downloadFailures.push({ slug, url, error: message });
            }
        }

        // Frontmatter (cover field added in Phase C)
        const frontmatter: IFrontmatter = {
            title: article.title,
            description: article.description,
            date: article.published_at.slice(0, 10),
            tags: article.tag_list,
            slug,
            published: true,
            devto_id: article.id,
        };

        const body = rewriteInternalLinks(article.body_markdown).trim();
        const content = `${stringifyFrontmatter(frontmatter)}\n\n${body}\n`;
        await writeFile(resolve(POSTS_DIR, `${slug}.md`), content, 'utf-8');

        mapping[slug] = { cover: coverEntry, body: bodyEntries };
        imported++;
    }

    await writeFile(MAPPING_PATH, `${JSON.stringify(mapping, null, 4)}\n`, 'utf-8');

    console.log(`\nDone. ${imported} imported, ${skipped} skipped.`);
    console.log(`Mapping written: ${relative(REPO_ROOT, MAPPING_PATH)}`);
    if (downloadFailures.length > 0) {
        console.warn(`\n${downloadFailures.length} image download failure(s):`);
        for (const f of downloadFailures) {
            console.warn(`  - ${f.slug}: ${f.url} (${f.error})`);
        }
        console.warn('Posts were still written; affected images are not in the mapping.');
    }
}

main().catch((err) => {
    console.error('FATAL:', err instanceof Error ? err.message : err);
    process.exit(1);
});
