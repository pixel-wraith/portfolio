import type { Handle } from '@sveltejs/kit';

const REPORT_DIRECTIVES = new Set(['report-uri', 'report-to']);

const CSP_HEADERS = ['content-security-policy', 'content-security-policy-report-only'] as const;

/**
 * Removes the `report-uri` and `report-to` directives from a CSP policy string,
 * keeping every other directive in its original order. Returns the input
 * unchanged when it has no report directive.
 */
export function stripCspReportDirectives(policy: string): string {
    const directives = policy.split(';').map(directive => directive.trim()).filter(Boolean);
    const kept = directives.filter((directive) => {
        const name = directive.split(/\s+/, 1)[0].toLowerCase();
        return !REPORT_DIRECTIVES.has(name);
    });

    if (kept.length === directives.length) {
        return policy;
    }

    return kept.join('; ');
}

/**
 * Strips CSP report directives from the response headers. `svelte.config.js`
 * points `report-uri` at the production Sentry project, and SvelteKit applies
 * it to SSR responses in dev and preview too, so non-deployed builds use this
 * handle to keep browsers from sending CSP violation reports to production.
 */
export const stripCspReportingHandle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    if (!CSP_HEADERS.some(header => response.headers.has(header))) {
        return response;
    }

    // Copy first: responses from `fetch` have immutable headers.
    const copy = new Response(response.body, response);
    for (const header of CSP_HEADERS) {
        const policy = copy.headers.get(header);
        if (policy !== null) {
            copy.headers.set(header, stripCspReportDirectives(policy));
        }
    }

    return copy;
};
