import type { Handle } from '@sveltejs/kit';

import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

const csp: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    response.headers.set('Content-Security-Policy', [
        'default-src \'self\'',
        'script-src \'self\' https://kit.fontawesome.com https://ka-f.fontawesome.com https://ka-p.fontawesome.com https://cloud.umami.is https://challenges.cloudflare.com',
        'style-src \'self\' \'unsafe-inline\' https://ka-f.fontawesome.com https://ka-p.fontawesome.com',
        'font-src \'self\' https://ka-f.fontawesome.com https://ka-p.fontawesome.com',
        'img-src \'self\' data: https://images.wraithcode.io',
        'connect-src \'self\' https://cloud.umami.is https://ka-f.fontawesome.com https://ka-p.fontawesome.com https://*.ingest.us.sentry.io',
        'frame-src https://challenges.cloudflare.com',
    ].join('; '));

    return response;
};

export const handle = sequence(sentryHandle(), csp);

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
