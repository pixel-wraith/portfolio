import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// This file lives in src/; one directory up is the repo root.
const README_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'README.md');

// Anchors into the stock `sv` template the README carries. The README is the
// template verbatim: nothing (such as a personal portfolio note) follows
// ORIGINAL_LAST_LINE. If the README is ever rewritten (e.g. the template text
// is replaced), update these anchors.
const ORIGINAL_FIRST_LINE = '# sv';
const ORIGINAL_LAST_LINE = '> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.';

const readme = readFileSync(README_PATH, 'utf8');
const lastLineIndex = readme.indexOf(ORIGINAL_LAST_LINE);

describe('readme (README.md at the repo root)', () => {
    it('does not contain the personal portfolio note', () => {
        expect(readme).not.toMatch(/about this repository/i);
        expect(readme).not.toMatch(/personal portfolio/i);
    });

    it('ends with the original template\'s last line', () => {
        expect(readme.trimEnd().endsWith(ORIGINAL_LAST_LINE)).toBe(true);
        // Exactly one trailing newline, matching the stock template bytes.
        expect(readme.endsWith(`${ORIGINAL_LAST_LINE}\n`)).toBe(true);
    });

    it('preserves the original template content', () => {
        expect(readme.startsWith(`${ORIGINAL_FIRST_LINE}\n`)).toBe(true);
        expect(lastLineIndex).toBeGreaterThan(0);
        // The original final line appears exactly once.
        expect(readme.indexOf(ORIGINAL_LAST_LINE, lastLineIndex + 1)).toBe(-1);
    });
});
