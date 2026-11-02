import { expect, test } from '@playwright/test';

// The Playwright webServer serves a local production build without
// VITE_DEPLOYED_BUILD, so nothing may reach the production Sentry project.

test('SSR responses carry no CSP report directive', async ({ page }) => {
    const response = await page.goto('/');
    expect(response).not.toBeNull();

    const csp = (await response!.allHeaders())['content-security-policy'];
    expect(csp).toContain('default-src \'self\'');
    expect(csp).not.toContain('report-uri');
    expect(csp).not.toContain('report-to');

    // `connect-src` keeps its `*.ingest.us.sentry.io` allowlist entry (CSP
    // directives other than the report ones stay intact). An allowlist sends
    // nothing, so no other directive may mention Sentry.
    const sentryDirectives = csp
        .split(';')
        .map(directive => directive.trim())
        .filter(directive => directive.includes('sentry.io') && !directive.startsWith('connect-src '));
    expect(sentryDirectives).toEqual([]);
});

test('the browser makes no requests to Sentry', async ({ page }) => {
    const urls: string[] = [];
    page.on('request', request => urls.push(request.url()));

    await page.goto('/');
    await page.goto('/about');
    await page.evaluate(() => {
        setTimeout(() => {
            throw new Error('sentry e2e probe');
        });
    });
    // Long enough for a session or error envelope to fire if the SDK were enabled.
    await page.waitForTimeout(2000);

    expect(urls.length).toBeGreaterThan(0);
    const sentryRequests = urls.filter(url => new URL(url).hostname.endsWith('sentry.io'));
    expect(sentryRequests).toEqual([]);
});
