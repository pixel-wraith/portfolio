import { describe, expect, it } from 'vitest';

import { readingTimeMinutes } from './reading-time';

describe('readingTimeMinutes', () => {
    it('returns 1 minute as the floor for very short content', () => {
        expect(readingTimeMinutes('Hello world')).toBe(1);
    });

    it('returns 1 minute for empty input', () => {
        expect(readingTimeMinutes('')).toBe(1);
    });

    it('returns 1 minute for exactly 200 words', () => {
        const text = 'word '.repeat(200).trim();
        expect(readingTimeMinutes(text)).toBe(1);
    });

    it('rounds up at the page boundary (201 words rounds to 2 minutes)', () => {
        const text = 'word '.repeat(201).trim();
        expect(readingTimeMinutes(text)).toBe(2);
    });

    it('returns 2 minutes for 400 words', () => {
        const text = 'word '.repeat(400).trim();
        expect(readingTimeMinutes(text)).toBe(2);
    });

    it('does not inflate count from fenced code blocks', () => {
        const prose = 'hello '.repeat(50).trim();
        const codeWords = 'someIdentifier '.repeat(2000).trim();
        const md = `${prose}\n\n\`\`\`ts\n${codeWords}\n\`\`\`\n`;
        expect(readingTimeMinutes(md)).toBe(1);
    });

    it('does not inflate count from inline code', () => {
        const text = `hello ${'`token` '.repeat(2000)}`;
        expect(readingTimeMinutes(text)).toBe(1);
    });

    it('does not inflate count from raw HTML tags', () => {
        const text = `hello world ${'<span class="foo">'.repeat(2000)}`;
        expect(readingTimeMinutes(text)).toBe(1);
    });
});
