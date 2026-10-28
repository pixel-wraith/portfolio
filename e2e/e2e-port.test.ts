import { expect, test } from '@playwright/test';
import net from 'node:net';

import config from '../playwright.config';
import { resolveE2ePort } from './support/e2e-port';

function listenOnce(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.once('error', reject);
        server.listen(port, () => {
            server.close(error => (error ? reject(error) : resolve()));
        });
    });
}

function expectPortInRange(port: number): void {
    expect(Number.isInteger(port)).toBe(true);
    expect(port).toBeGreaterThanOrEqual(1);
    expect(port).toBeLessThanOrEqual(65535);
}

test('resolveE2ePort picks a free port when E2E_PORT is unset', async () => {
    const port = await resolveE2ePort(undefined);
    expectPortInRange(port);
    await expect(listenOnce(port)).resolves.toBeUndefined();
});

test('resolveE2ePort uses a valid E2E_PORT as-is', async () => {
    expect(await resolveE2ePort('5005')).toBe(5005);
});

for (const blank of ['', '   ']) {
    test(`resolveE2ePort treats ${JSON.stringify(blank)} as unset`, async () => {
        const port = await resolveE2ePort(blank);
        expectPortInRange(port);
        await expect(listenOnce(port)).resolves.toBeUndefined();
    });
}

for (const invalid of ['abc', '0', '65536', '12.5', '-1', '80abc']) {
    test(`resolveE2ePort rejects E2E_PORT=${JSON.stringify(invalid)}`, async () => {
        const error = await resolveE2ePort(invalid).then(
            () => undefined,
            (error_: unknown) => error_,
        );
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('E2E_PORT');
        expect((error as Error).message).toContain(invalid);
    });
}

test('serves on the resolved port', async ({ page, baseURL }) => {
    expect(baseURL).toBeDefined();
    expect(process.env.E2E_PORT).toBeDefined();
    expect(new URL(baseURL!).port).toBe(process.env.E2E_PORT);
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
});

test('webServer config uses the resolved port with --strictPort', () => {
    const { webServer } = config;
    expect(webServer).toBeDefined();
    expect(Array.isArray(webServer)).toBe(false);
    const server = webServer as Exclude<typeof webServer, unknown[] | undefined>;
    expect(server.port).toBe(Number(process.env.E2E_PORT));
    expect(server.command).toContain(`--port ${process.env.E2E_PORT}`);
    expect(server.command).toContain('--strictPort');
    expect(server.reuseExistingServer).not.toBe(true);
});
