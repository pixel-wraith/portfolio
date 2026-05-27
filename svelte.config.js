import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = { kit: {
    adapter: adapter(),

    csp: {
        mode: 'auto',
        directives: {
            'default-src': ['self'],
            'script-src': ['self', 'https://kit.fontawesome.com', 'https://ka-f.fontawesome.com', 'https://ka-p.fontawesome.com', 'https://cloud.umami.is', 'https://challenges.cloudflare.com'],
            'style-src': ['self', 'unsafe-inline', 'https://ka-f.fontawesome.com', 'https://ka-p.fontawesome.com'],
            'font-src': ['self', 'https://ka-f.fontawesome.com', 'https://ka-p.fontawesome.com'],
            'img-src': ['self', 'data:', 'https://images.wraithcode.io'],
            'connect-src': ['self', 'https://cloud.umami.is', 'https://api-gateway.umami.dev', 'https://ka-f.fontawesome.com', 'https://ka-p.fontawesome.com', 'https://*.ingest.us.sentry.io'],
            'frame-src': ['https://challenges.cloudflare.com'],
            'frame-ancestors': ['none'],
            'object-src': ['none'],
            'base-uri': ['self'],
            'worker-src': ['self', 'blob:'],
            'report-uri': ['https://o4505018196295680.ingest.us.sentry.io/api/4510989810401280/security/?sentry_key=7393de73335ad3c189db8d8d7bfe824e'],
        },
    },

    experimental: {
        tracing: {
            server: true,
        },

        instrumentation: {
            server: true,
        },
    },
} };

export default config;