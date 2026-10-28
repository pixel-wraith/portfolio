import type { sentrySvelteKit } from '@sentry/sveltekit';

export type SentrySvelteKitPluginOptions = NonNullable<Parameters<typeof sentrySvelteKit>[0]>;

export const SENTRY_UPLOAD_ENV_VAR = 'SENTRY_UPLOAD_SOURCEMAPS';

const ENABLED_VALUES = new Set(['true', '1']);

/**
 * Build-time options for the Sentry SvelteKit Vite plugin.
 *
 * Source map upload is opt-in: the main checkout holds a gitignored
 * `.env.sentry-build-plugin` auth token, and `npm test` runs a production build
 * for e2e, so leaving the plugin default (`autoUploadSourceMaps: true`) would
 * create a Sentry release and upload source maps on every test run. With upload
 * disabled the plugin only adds load-function auto-instrumentation; no bundler
 * plugin is constructed, so the token file is never read and no telemetry is
 * sent. Set `SENTRY_UPLOAD_SOURCEMAPS=true` (or `1`) in the process environment
 * to upload deliberately. `CI` or `SENTRY_AUTH_TOKEN` alone never enable it.
 */
export function getSentryPluginOptions(env: Record<string, string | undefined>): SentrySvelteKitPluginOptions {
    return {
        org: 'wraith',
        project: 'portfolio',
        autoUploadSourceMaps: ENABLED_VALUES.has(env[SENTRY_UPLOAD_ENV_VAR] ?? ''),
    };
}
