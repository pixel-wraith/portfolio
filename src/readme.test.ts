import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// This file lives in src/; one directory up is the repo root.
const README_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'README.md');

// Anchors into the stock `sv` template that the README still carries. The
// personal-portfolio note is appended after ORIGINAL_LAST_LINE. If the README
// is ever rewritten (e.g. the template text is replaced), update these anchors.
const ORIGINAL_FIRST_LINE = '# sv';
const ORIGINAL_LAST_LINE = '> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.';

const readme = readFileSync(README_PATH, 'utf8');
const lastLineIndex = readme.indexOf(ORIGINAL_LAST_LINE);
const note = lastLineIndex === -1
    ? ''
    : readme.slice(lastLineIndex + ORIGINAL_LAST_LINE.length).trim();

describe('readme (README.md at the repo root)', () => {
    it('ends with a personal portfolio note', () => {
        expect(note).not.toBe('');
        expect(note).toMatch(/personal portfolio/i);
        expect(readme.trimEnd().endsWith(note)).toBe(true);
    });

    it('mentions experiences and opinions', () => {
        expect(note).toMatch(/experiences/i);
        expect(note).toMatch(/opinions/i);
    });

    it('is visible, not an HTML comment', () => {
        expect(note).not.toBe('');
        expect(note).not.toContain('<!--');
    });

    it('preserves the original template content', () => {
        expect(readme.startsWith(`${ORIGINAL_FIRST_LINE}\n`)).toBe(true);
        expect(lastLineIndex).toBeGreaterThan(0);
        // The original final line appears exactly once, so the note cannot
        // have been placed above it.
        expect(readme.indexOf(ORIGINAL_LAST_LINE, lastLineIndex + 1)).toBe(-1);
        expect(readme.indexOf(note, lastLineIndex)).toBeGreaterThan(lastLineIndex);
    });
});
