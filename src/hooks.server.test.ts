import type { RequestEvent } from '@sveltejs/kit';

// Internal SvelteKit export with no public types; used only to give `sequence()` a request store.
// @ts-expect-error -- `@sveltejs/kit/internal/server` ships no type declarations
import { with_request_store } from '@sveltejs/kit/internal/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@sentry/sveltekit', () => ({
    sentryHandle: () => ({ event, resolve }: { event: RequestEvent; resolve: (event: RequestEvent) => Response | Promise<Response> }) => resolve(event),
    handleErrorWithSentry: () => () => {},
}));

const POLICY = 'default-src \'self\'; report-uri https://example.test/r';

afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    vi.clearAllMocks();
});

async function callHandle(): Promise<Response> {
    vi.resetModules();
    const { handle } = await import('./hooks.server');
    // `sequence()` reads SvelteKit's per-request store, which the server runtime
    // normally sets up. Provide a minimal one so the real `sequence` runs.
    const event = {} as RequestEvent;
    const state = { tracing: { record_span: ({ fn }: { fn: (span: unknown) => unknown }) => fn(undefined) } };
    return with_request_store({ event, state } as never, () => handle({
        event,
        resolve: () => new Response('', { headers: { 'content-security-policy': POLICY } }),
    }));
}

describe('hooks.server handle', () => {
    it('strips CSP report directives outside the deployed build', async () => {
        vi.stubEnv('VITE_DEPLOYED_BUILD', undefined);

        const response = await callHandle();

        expect(response.headers.get('content-security-policy')).toBe('default-src \'self\'');
    });

    it('leaves the CSP header untouched in the deployed build', async () => {
        vi.stubEnv('VITE_DEPLOYED_BUILD', 'true');

        const response = await callHandle();

        expect(response.headers.get('content-security-policy')).toBe(POLICY);
    });
});
