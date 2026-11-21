import { error } from '@sveltejs/kit';

import type { Motivation } from '../../../data/motivation';
import type { RequestHandler } from './$types';

import { motivation } from '../../../data/motivation';

export const GET: RequestHandler = ({ url }) => {
    let count = Number(url.searchParams.get('count') ?? '5');

    if (!Number.isInteger(count) || count < 1) {
        error(400, 'count must be a positive integer.');
    }

    // Never ask for more unique quotes than exist, or the loop below never ends.
    count = Math.min(count, 100, motivation.length);

    const m: Motivation[] = [];
    const used: Set<number> = new Set();

    for (let i = 0; i < count; i++) {
        const rand = Math.floor(Math.random() * motivation.length);
        if (used.has(rand)) {
            i -= 1;
            continue;
        }
        m.push(motivation[rand]);
        used.add(rand);
    }

    return Response.json(m);
};
