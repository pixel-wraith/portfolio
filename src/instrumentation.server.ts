import * as Sentry from '@sentry/sveltekit';
import { getSentryRuntimeOptions, isDeployedBuild } from '$lib/config/sentry-runtime';

// Reporting is on only in the deployed build (see `$lib/config/sentry-runtime`).
// Keep the literal `import.meta.env.VITE_DEPLOYED_BUILD` so Vite inlines it.
Sentry.init({
    ...getSentryRuntimeOptions(isDeployedBuild(import.meta.env.VITE_DEPLOYED_BUILD)),

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: import.meta.env.DEV,
});
