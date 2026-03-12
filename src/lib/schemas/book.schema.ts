import { z } from 'zod';

export const bookSchema = z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().optional(),
    image: z.string().optional(),
    favorite: z.boolean(),
    currentlyReading: z.boolean(),
    read: z.boolean(),
});