import * as Sentry from '@sentry/sveltekit';

Sentry.init({
    dsn: 'https://7393de73335ad3c189db8d8d7bfe824e@o4505018196295680.ingest.us.sentry.io/4510989810401280',

    tracesSampleRate: 1.0,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: import.meta.env.DEV,
});