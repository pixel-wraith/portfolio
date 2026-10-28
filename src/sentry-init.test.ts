import { afterEach, describe, expect, it, vi } from 'vitest';

const PRODUCTION_DSN = 'https://7393de73335ad3c189db8d8d7bfe824e@o4505018196295680.ingest.us.sentry.io/4510989810401280';

const { init, REPLAY_SENTINEL } = vi.hoisted(() => ({
    init: vi.fn(),
    REPLAY_SENTINEL: { name: 'replay-sentinel' },
}));

vi.mock('@sentry/sveltekit', () => ({
    init,
    replayIntegration: () => REPLAY_SENTINEL,
    handleErrorWithSentry: () => () => {},
}));

afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    vi.clearAllMocks();
});

async function importFresh(path: './instrumentation.server' | './hooks.client'): Promise<Record<string, unknown>> {
    vi.resetModules();
    if (path === './instrumentation.server') {
        await import('./instrumentation.server');
    }
    else {
        await import('./hooks.client');
    }
    expect(init).toHaveBeenCalledTimes(1);
    return init.mock.calls[0][0] as Record<string, unknown>;
}

describe.each(['./instrumentation.server', './hooks.client'] as const)('%s', (path) => {
    it.each([true, false])('does not report outside the deployed build (DEV=%s)', async (dev) => {
        vi.stubEnv('VITE_DEPLOYED_BUILD', undefined);
        vi.stubEnv('DEV', dev);

        const options = await importFresh(path);

        expect(options.enabled).toBe(false);
        expect(options.dsn).toBeUndefined();
    });

    it('reports with the production options in the deployed build', async () => {
        vi.stubEnv('VITE_DEPLOYED_BUILD', 'true');

        const options = await importFresh(path);

        expect(options).toMatchObject({
            dsn: PRODUCTION_DSN,
            enabled: true,
            tracesSampleRate: 1,
            enableLogs: true,
        });
    });
});

describe('./hooks.client client-only options', () => {
    it('keeps replay, integrations and PII settings in the deployed build', async () => {
        vi.stubEnv('VITE_DEPLOYED_BUILD', 'true');

        const options = await importFresh('./hooks.client');

        expect(options).toMatchObject({
            dsn: PRODUCTION_DSN,
            enabled: true,
            tracesSampleRate: 1,
            enableLogs: true,
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1,
            sendDefaultPii: true,
        });
        expect(options.integrations).toContain(REPLAY_SENTINEL);
    });
});
