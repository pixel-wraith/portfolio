import { describe, expect, it } from 'vitest';

import { slugify } from './slugify';

describe('slugify', () => {
    it('lowercases and joins words with hyphens', () => {
        expect(slugify('Hello World')).toBe('hello-world');
    });

    it('collapses repeated whitespace into a single hyphen', () => {
        expect(slugify('Hello   World')).toBe('hello-world');
    });

    it('trims leading and trailing whitespace', () => {
        expect(slugify('  Hello World  ')).toBe('hello-world');
    });

    it('replaces non-alphanumeric characters with a hyphen', () => {
        expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('strips apostrophes without creating extra hyphens', () => {
        expect(slugify("Don't Panic")).toBe('dont-panic');
        expect(slugify('Don’t Panic')).toBe('dont-panic');
    });

    it('collapses repeated hyphens', () => {
        expect(slugify('Hello---World')).toBe('hello-world');
    });

    it('strips leading and trailing hyphens', () => {
        expect(slugify('---Hello World---')).toBe('hello-world');
    });

    it('normalizes accented characters to ASCII equivalents', () => {
        expect(slugify('Café résumé')).toBe('cafe-resume');
    });

    it('throws on empty input', () => {
        expect(() => slugify('')).toThrow();
    });

    it('throws when the result would be empty after stripping', () => {
        expect(() => slugify('!@#$%')).toThrow();
    });
});
