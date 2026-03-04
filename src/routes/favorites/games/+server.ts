import { json } from '@sveltejs/kit';
import { MeService } from '$lib/services/me.js';
import { ApiError } from '$lib/utils/api-error';
import { ApiResponse } from '$lib/utils/api-response';

export const GET = async () => {
    try {
        const meService = new MeService();
        const games = await meService.getFavoriteGames();
        return json(games);
    } catch (err) {
        const response = new ApiResponse({ errors: ApiError.parse(err) });
        const message = response.errors?.[0].message || 'Uh oh, something went wrong.';
        return new Response(message, { status: response.statusCode });
    }
};