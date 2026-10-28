export const SENTRY_DSN = 'https://7393de73335ad3c189db8d8d7bfe824e@o4505018196295680.ingest.us.sentry.io/4510989810401280';

export const DEPLOYED_BUILD_ENV_VAR = 'VITE_DEPLOYED_BUILD';

const ENABLED_VALUES = new Set(['true', '1']);

export interface ISentryRuntimeOptions {
    dsn?: string;
    enabled: boolean;
    tracesSampleRate?: number;
    enableLogs?: boolean;
}

/**
 * Whether this bundle was built as the deployed (production) build.
 *
 * Callers must pass the literal `import.meta.env.VITE_DEPLOYED_BUILD` so Vite
 * inlines the value into both the client and the server bundle at build time.
 * Only the Dockerfile builder stage sets it, and only exactly `true` or `1`
 * counts as set.
 */
export function isDeployedBuild(value: string | undefined): boolean {
    return ENABLED_VALUES.has(value ?? '');
}

/**
 * Sentry runtime options shared by the server and client SDKs.
 *
 * The DSN points at the production Sentry project, so local runs
 * (`npm run dev`, `npm run preview`, the e2e build inside `npm test`) must not
 * report: they would pollute production errors, traces, logs and replays.
 * Outside the deployed build the SDK is initialised disabled and without a
 * DSN, so it sends nothing. The Dockerfile sets `VITE_DEPLOYED_BUILD=true`
 * before `npm run build`, which turns reporting on for the deployed site only.
 */
export function getSentryRuntimeOptions(deployed: boolean): ISentryRuntimeOptions {
    if (!deployed) {
        return { enabled: false };
    }

    return {
        dsn: SENTRY_DSN,
        enabled: true,
        tracesSampleRate: 1.0,
        enableLogs: true,
    };
}
