import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// This file lives in src/; one directory up is the repo root.
const README_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'README.md');

// Anchors into the stock `sv` template the README carries. The README is the
// template verbatim, followed by one blank line and TEST_COMMENT, then one
// blank line and NEW_COMMENT (both HTML comments, so they do not render), then
// a single trailing newline. Nothing else (such as a personal portfolio note)
// follows ORIGINAL_LAST_LINE. If the README is ever rewritten (e.g. the
// template text is replaced), update these anchors.
const ORIGINAL_FIRST_LINE = '# sv';
const ORIGINAL_LAST_LINE = '> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.';
const TEST_COMMENT = '<!-- this is just a test -->';
const NEW_COMMENT = '<!-- this is another test -->';

const readme = readFileSync(README_PATH, 'utf8');
const lastLineIndex = readme.indexOf(ORIGINAL_LAST_LINE);

describe('readme (README.md at the repo root)', () => {
    it('does not contain the personal portfolio note', () => {
        expect(readme).not.toMatch(/about this repository/i);
        expect(readme).not.toMatch(/personal portfolio/i);
    });

    it('ends with the new comment after the test comment', () => {
        // Exactly one trailing newline after the new comment.
        expect(readme.endsWith(`${NEW_COMMENT}\n`)).toBe(true);
        expect(readme.endsWith('\n\n')).toBe(false);
        // One blank line separates each comment from the line before it.
        expect(readme.endsWith(`${ORIGINAL_LAST_LINE}\n\n${TEST_COMMENT}\n\n${NEW_COMMENT}\n`)).toBe(true);
    });

    it('contains the test comment text exactly once', () => {
        expect(readme.split('this is just a test').length - 1).toBe(1);
    });

    it('contains the new comment text exactly once', () => {
        expect(readme.split('this is another test').length - 1).toBe(1);
    });

    it('preserves the original template content', () => {
        expect(readme.startsWith(`${ORIGINAL_FIRST_LINE}\n`)).toBe(true);
        expect(lastLineIndex).toBeGreaterThan(0);
        // The original final line appears exactly once.
        expect(readme.indexOf(ORIGINAL_LAST_LINE, lastLineIndex + 1)).toBe(-1);
    });
});
