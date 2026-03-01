import { z } from "zod";
import { bookSchema } from "$lib/schemas/book.schema";

const books = [
    bookSchema.parse({
        id: 1,
        title: "The Great Gatsby",
        url: "https://www.goodreads.com/book/show/4671.The_Great_Gatsby",
        image: "https://images.gr-assets.com/books/1327924005l/4671.jpg",
        favorite: false,
        currentlyReading: false,
        read: true,
    }),
    bookSchema.parse({
        id: 2,
        title: "The Catcher in the Rye",
        url: "https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye",
        image: "https://images.gr-assets.com/books/1361072369l/5107.jpg",
        favorite: false,
        currentlyReading: false,
        read: false,
    }),
]

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
