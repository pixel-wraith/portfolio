import { handleErrorWithSentry, replayIntegration } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { getSentryRuntimeOptions, isDeployedBuild } from '$lib/config/sentry-runtime';

Sentry.init({
    // DSN, `enabled`, tracing and logs come from the shared runtime options:
    // reporting is on only in the deployed build (see `$lib/config/sentry-runtime`).
    // Keep the literal `import.meta.env.VITE_DEPLOYED_BUILD` so Vite inlines it.
    ...getSentryRuntimeOptions(isDeployedBuild(import.meta.env.VITE_DEPLOYED_BUILD)),

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // If you don't want to use Session Replay, just remove the line below:
    integrations: [replayIntegration()],

    // Enable sending user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/sveltekit/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
