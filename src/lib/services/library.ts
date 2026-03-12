import type { z } from 'zod';

import { bookSchema } from '$lib/schemas/book.schema';

const books = [
    bookSchema.parse({
        id: 'atomic-habits-workbook',
        title: 'Atomic Habits Workbook',
        url: 'https://jamesclear.com/atomic-habits-workbook',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1773326793/atomic-habits-workbook_jqrnct.jpg',
        favorite: false,
        currentlyReading: true,
        read: false,
    }),
    bookSchema.parse({
        id: 'supercommunicators',
        title: 'Supercommunicators',
        url: 'https://charlesduhigg.com/supercommunicators/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1741145256/supercommunicators_xlgfaz.png',
        favorite: false,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'the-10x-rule',
        title: 'The 10x Rule',
        url: 'https://jamesclear.com/book-summaries/10x-rule',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1741144842/the_10x_rule_a0gsuo.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'ego-is-the-enemy',
        title: 'Ego is the Enemy',
        url: 'https://amzn.to/3YVWmfs',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1730987544/ego-is-the-enemy_jbroek.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'building-a-second-brain',
        title: 'Building a Second Brain',
        url: 'https://www.buildingasecondbrain.com/book',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720373312/building-a-second-brain_xlrsvj.jpg',
        favorite: false,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'ready-player-one',
        title: 'Ready Player One',
        url: 'https://www.goodreads.com/book/show/9969571-ready-player-one',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231688/ready-player-one_zawz7n.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'engineering-management-for-the-rest-of-us',
        title: 'Engineering Management for the Rest of Us',
        url: 'https://www.goodreads.com/book/show/58502800-engineering-management-for-the-rest-of-us',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231677/engineering-managment-for-the-rest-of-us_mhzsei.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'measure-what-matters',
        title: 'Measure What Matters',
        url: 'https://www.whatmatters.com/the-book',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231691/measure-what-matters_bunpzy.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'atomic-habits',
        title: 'Atomic Habits',
        url: 'https://jamesclear.com/atomic-habits',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231675/atomic-habits_u30l2a.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'how-to-take-smart-notes',
        title: 'How to Take Smart Notes',
        url: 'https://www.amazon.com/How-Take-Smart-Notes-Technique-ebook/dp/B09V5M8FR5',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231685/how-to-take-smart-notes_gopdpp.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'getting-things-done',
        title: 'Getting Things Done',
        url: 'https://gettingthingsdone.com/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231683/getting-things-done_r6qlng.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'dragon-lance-chronicles',
        title: 'Dragon Lance Chronicles',
        url: 'https://en.wikipedia.org/wiki/Dragonlance_Chronicles',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231680/dragonlance-chronicles_g0kb37.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'arena',
        title: 'Arena (Magic - The Gathering, No. 1)',
        url: 'https://mtg.fandom.com/wiki/Arena_(novel)',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720231672/arena_nwk22z.jpg',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
];

export class LibraryService {
    async getBooksRead(): Promise<z.infer<typeof bookSchema>[]> {
        return books.filter(book => book.read);
    }

    async getCurrentlyReading(): Promise<z.infer<typeof bookSchema>[]> {
        return books.filter(book => book.currentlyReading);
    }

    async getFavoriteBooks(): Promise<z.infer<typeof bookSchema>[]> {
        return books.filter(book => book.favorite);
    }
}
