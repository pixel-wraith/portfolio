import type { z } from 'zod';

import { bookSchema } from '$lib/schemas/book.schema';

const books = [
    bookSchema.parse({
        id: 'getting-to-yes',
        title: 'Getting to Yes',
        url: 'https://www.amazon.com/Roger-Fisher-Getting-Yes-Negotiating/dp/B07VDDX39Q/ref=sr_1_14',
        image: 'https://images.wraithcode.io/2026-05/getting-to-yes-1600.webp',
        favorite: false,
        currentlyReading: true,
        read: false,
    }),
    // bookSchema.parse({
    //     id: 'atomic-habits-workbook',
    //     title: 'Atomic Habits Workbook',
    //     url: 'https://jamesclear.com/atomic-habits-workbook',
    //     image: 'https://images.wraithcode.io/2026-05/atomic-habits-workbook-400.png',
    //     favorite: false,
    //     currentlyReading: false,
    //     read: false,
    // }),
    bookSchema.parse({
        id: 'supercommunicators',
        title: 'Supercommunicators',
        url: 'https://charlesduhigg.com/supercommunicators/',
        image: 'https://images.wraithcode.io/2026-05/supercommunicators-400.png',
        favorite: false,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'the-10x-rule',
        title: 'The 10x Rule',
        url: 'https://jamesclear.com/book-summaries/10x-rule',
        image: 'https://images.wraithcode.io/2026-05/the-10x-rule-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'ego-is-the-enemy',
        title: 'Ego is the Enemy',
        url: 'https://amzn.to/3YVWmfs',
        image: 'https://images.wraithcode.io/2026-05/ego-is-the-enemy-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'building-a-second-brain',
        title: 'Building a Second Brain',
        url: 'https://www.buildingasecondbrain.com/book',
        image: 'https://images.wraithcode.io/2026-05/building-a-second-brain-400.png',
        favorite: false,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'ready-player-one',
        title: 'Ready Player One',
        url: 'https://www.goodreads.com/book/show/9969571-ready-player-one',
        image: 'https://images.wraithcode.io/2026-05/ready-player-one-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'engineering-management-for-the-rest-of-us',
        title: 'Engineering Management for the Rest of Us',
        url: 'https://www.goodreads.com/book/show/58502800-engineering-management-for-the-rest-of-us',
        image: 'https://images.wraithcode.io/2026-05/engineering-managment-for-the-rest-of-us-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'measure-what-matters',
        title: 'Measure What Matters',
        url: 'https://www.whatmatters.com/the-book',
        image: 'https://images.wraithcode.io/2026-05/measure-what-matters-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'atomic-habits',
        title: 'Atomic Habits',
        url: 'https://jamesclear.com/atomic-habits',
        image: 'https://images.wraithcode.io/2026-05/atomic-habits-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'how-to-take-smart-notes',
        title: 'How to Take Smart Notes',
        url: 'https://www.amazon.com/How-Take-Smart-Notes-Technique-ebook/dp/B09V5M8FR5',
        image: 'https://images.wraithcode.io/2026-05/how-to-take-smart-notes-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'getting-things-done',
        title: 'Getting Things Done',
        url: 'https://gettingthingsdone.com/',
        image: 'https://images.wraithcode.io/2026-05/getting-things-done-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'dragon-lance-chronicles',
        title: 'Dragon Lance Chronicles',
        url: 'https://en.wikipedia.org/wiki/Dragonlance_Chronicles',
        image: 'https://images.wraithcode.io/2026-05/dragonlance-chronicles-400.png',
        favorite: true,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 'arena',
        title: 'Arena (Magic - The Gathering, No. 1)',
        url: 'https://mtg.fandom.com/wiki/Arena_(novel)',
        image: 'https://images.wraithcode.io/2026-05/arena-400.png',
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
