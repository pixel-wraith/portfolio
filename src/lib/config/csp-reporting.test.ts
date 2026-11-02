import type { RequestEvent } from '@sveltejs/kit';

import { describe, expect, it } from 'vitest';

import { stripCspReportDirectives, stripCspReportingHandle } from './csp-reporting';

describe('stripCspReportDirectives', () => {
    it('removes report-uri and report-to and keeps the other directives in order', () => {
        const policy = 'default-src \'self\'; report-uri https://example.ingest.us.sentry.io/api/1/security/?sentry_key=abc; img-src \'self\' data:; report-to csp-endpoint';
        expect(stripCspReportDirectives(policy)).toBe('default-src \'self\'; img-src \'self\' data:');
    });

    it('returns a policy without report directives unchanged', () => {
        const policy = 'default-src \'self\'; object-src \'none\'';
        expect(stripCspReportDirectives(policy)).toBe(policy);
    });

    it('matches directive names case-insensitively', () => {
        expect(stripCspReportDirectives('Report-URI https://example.test/r; default-src \'self\'')).toBe('default-src \'self\'');
    });
});

describe('stripCspReportingHandle', () => {
    const event = {} as RequestEvent;

    it('rewrites both CSP headers', async () => {
        const response = await stripCspReportingHandle({
            event,
            resolve: () => new Response('', {
                headers: {
                    'content-security-policy': 'default-src \'self\'; report-uri https://example.test/r',
                    'content-security-policy-report-only': 'script-src \'self\'; report-to csp',
                },
            }),
        });

        expect(response.headers.get('content-security-policy')).toBe('default-src \'self\'');
        expect(response.headers.get('content-security-policy-report-only')).toBe('script-src \'self\'');
    });

    it('returns the response untouched when no CSP header is present', async () => {
        const original = new Response('body');
        const response = await stripCspReportingHandle({ event, resolve: () => original });
        expect(response).toBe(original);
    });

    it('does not throw on a response with immutable headers', async () => {
        // Simulate a `fetch` response, whose headers throw on mutation.
        const original = new Response('body', { headers: { 'content-security-policy': 'default-src \'self\'; report-uri https://example.test/r' } });
        Object.defineProperty(original.headers, 'set', {
            value: () => {
                throw new TypeError('immutable');
            },
        });

        const response = await stripCspReportingHandle({ event, resolve: () => original });
        expect(response.headers.get('content-security-policy')).toBe('default-src \'self\'');
    });
});
