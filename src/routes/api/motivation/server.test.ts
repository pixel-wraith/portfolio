import { isHttpError } from '@sveltejs/kit';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Motivation } from '../../../data/motivation';

import { motivation } from '../../../data/motivation';
import { GET } from './+server';

type Event = Parameters<typeof GET>[0];

async function get(query = ''): Promise<Motivation[]> {
    const res = await GET({ url: new URL(`http://localhost/api/motivation${query}`) } as Event);

    return res.json();
}

async function getStatus(query: string): Promise<number> {
    try {
        await GET({ url: new URL(`http://localhost/api/motivation${query}`) } as Event);
    } catch (err) {
        if (isHttpError(err)) {
            return err.status;
        }
        throw err;
    }

    return 200;
}

describe('motivation API GET', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns 5 unique quotes by default', async () => {
        const quotes = await get();

        expect(quotes).toHaveLength(5);
        expect(new Set(quotes).size).toBe(5);
    });

    it('returns the requested number of quotes', async () => {
        expect(await get('?count=12')).toHaveLength(12);
    });

    it('caps the count at 100', async () => {
        expect(await get('?count=500')).toHaveLength(100);
    });

    // Regression: the index used to be computed with `length + 1`, so a
    // random value near 1 picked one past the end and returned `undefined`.
    it('never returns an undefined quote, even at the top of the random range', async () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.999999);

        const quotes = await get('?count=1');

        expect(quotes).toEqual([motivation[motivation.length - 1]]);
    });

    it.each(['0', '-1', '2.5', 'abc', ''])('rejects count=%s with a 400', async (count) => {
        expect(await getStatus(`?count=${count}`)).toBe(400);
    });
});
