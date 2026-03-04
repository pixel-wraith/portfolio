import { z } from 'zod';

export const FavoriteType = {
    Movie: 'movie',
    Show: 'show',
    Game: 'game',
} as const;

export const favoriteSchema = z.object({
    id: z.string(),
    rank: z.number(),
    title: z.string(),
    url: z.string().nullable(),
    image: z.string().nullable(),
    favoriteType: z.enum(FavoriteType),
});

export const goalSchema = z.object({
    id: z.string(),
    name: z.string(),
    completed: z.boolean(),
    description: z.string(),
});

export const hobbySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});