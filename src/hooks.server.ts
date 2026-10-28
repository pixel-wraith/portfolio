import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { stripCspReportingHandle } from '$lib/config/csp-reporting';
import { isDeployedBuild } from '$lib/config/sentry-runtime';

const deployed = isDeployedBuild(import.meta.env.VITE_DEPLOYED_BUILD);

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
// Outside the deployed build, strip CSP report directives so browsers never send violation reports to production Sentry.
export const handle = deployed
    ? sequence(sentryHandle())
    : sequence(sentryHandle(), stripCspReportingHandle);

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
