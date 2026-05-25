import { describe, expect, it } from 'vitest';

import { paginate } from './paginate';

describe('paginate', () => {
    it('returns the first page when called with no overrides', () => {
        const items = Array.from({ length: 25 }, (_, i) => i + 1);
        const result = paginate(items, 1, 10);

        expect(result).toEqual({
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            page: 1,
            perPage: 10,
            totalItems: 25,
            totalPages: 3,
        });
    });

    it('returns the requested middle page', () => {
        const items = Array.from({ length: 25 }, (_, i) => i + 1);
        const result = paginate(items, 2, 10);

        expect(result.items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        expect(result.page).toBe(2);
        expect(result.totalPages).toBe(3);
    });

    it('returns the partial last page', () => {
        const items = Array.from({ length: 25 }, (_, i) => i + 1);
        const result = paginate(items, 3, 10);

        expect(result.items).toEqual([21, 22, 23, 24, 25]);
        expect(result.page).toBe(3);
    });

    it('computes totalPages without an off-by-one when the total is an exact multiple', () => {
        const items = Array.from({ length: 24 }, (_, i) => i);
        expect(paginate(items, 1, 12).totalPages).toBe(2);
    });

    it('treats an empty list with page 1 as a valid empty result', () => {
        const result = paginate([], 1, 12);

        expect(result).toEqual({
            items: [],
            page: 1,
            perPage: 12,
            totalItems: 0,
            totalPages: 0,
        });
    });

    it('throws when asking for any page beyond 1 on an empty list', () => {
        expect(() => paginate([], 2, 12)).toThrow();
    });

    it('throws when the page is greater than totalPages', () => {
        const items = Array.from({ length: 25 }, (_, i) => i);
        expect(() => paginate(items, 4, 10)).toThrow();
    });

    it('throws when page is less than 1', () => {
        expect(() => paginate([1, 2, 3], 0, 10)).toThrow();
    });

    it('throws when perPage is less than 1', () => {
        expect(() => paginate([1, 2, 3], 1, 0)).toThrow();
    });
});
