import type { favoriteSchema, goalSchema, hobbySchema } from '$lib/schemas/me.schema';
import type { z } from 'zod';

import { MeService } from '$lib/services/me';

import type { PageServerLoad } from './$types';

interface IFavorites {
    movies: z.infer<typeof favoriteSchema>[];
    shows: z.infer<typeof favoriteSchema>[];
    games: z.infer<typeof favoriteSchema>[];
}

export const load: PageServerLoad = async () => {
    const favorites: IFavorites = {
        movies: [],
        shows: [],
        games: [],
    };
    let goals: z.infer<typeof goalSchema>[] = [];
    let hobbies: z.infer<typeof hobbySchema>[] = [];

    try {
        const meService = new MeService();

        const [movies, shows, games, _goals, _hobbies] = await Promise.allSettled([
            meService.getFavoriteMovies(),
            meService.getFavoriteShows(),
            meService.getFavoriteGames(),
            meService.getGoals(),
            meService.getHobbies(),
        ]);

        if (movies.status === 'fulfilled') {
            favorites.movies = movies.value;
        }

        if (shows.status === 'fulfilled') {
            favorites.shows = shows.value;
        }

        if (games.status === 'fulfilled') {
            favorites.games = games.value;
        }

        if (_goals.status === 'fulfilled') {
            goals = _goals.value;
        }

        if (_hobbies.status === 'fulfilled') {
            hobbies = _hobbies.value;
        }
    } catch {
        // swallowing error
    }

    return {
        favorites,
        goals,
        hobbies,
    };
};