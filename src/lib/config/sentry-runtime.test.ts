import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { DEPLOYED_BUILD_ENV_VAR, getSentryRuntimeOptions, isDeployedBuild, SENTRY_DSN } from './sentry-runtime';

const PRODUCTION_DSN = 'https://7393de73335ad3c189db8d8d7bfe824e@o4505018196295680.ingest.us.sentry.io/4510989810401280';

const REPO_ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const SRC_DIR = join(REPO_ROOT, 'src');

function listSourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) {
            return path === join(SRC_DIR, 'posts') ? [] : listSourceFiles(path);
        }
        if (!/\.(?:ts|js|svelte)$/.test(entry) || /\.(?:test|spec)\.ts$/.test(entry)) {
            return [];
        }
        return [path];
    });
}

function readRepoFile(path: string): string {
    return readFileSync(join(REPO_ROOT, path), 'utf8');
}

describe('isDeployedBuild', () => {
    it('uses the VITE_DEPLOYED_BUILD variable name', () => {
        expect(DEPLOYED_BUILD_ENV_VAR).toBe('VITE_DEPLOYED_BUILD');
    });

    it.each(['true', '1'])('returns true for %j', (value) => {
        expect(isDeployedBuild(value)).toBe(true);
    });

    it.each([undefined, '', 'false', '0', 'yes', 'TRUE'])('returns false for %j', (value) => {
        expect(isDeployedBuild(value)).toBe(false);
    });
});

describe('getSentryRuntimeOptions', () => {
    it('disables the SDK without a DSN outside the deployed build', () => {
        const options = getSentryRuntimeOptions(false);
        expect(options.enabled).toBe(false);
        expect(options.dsn).toBeUndefined();
    });

    it('keeps the production options in the deployed build', () => {
        const options = getSentryRuntimeOptions(true);
        expect(options.enabled).toBe(true);
        expect(options.dsn).toBe(PRODUCTION_DSN);
        expect(options.tracesSampleRate).toBe(1);
        expect(options.enableLogs).toBe(true);
        expect(SENTRY_DSN).toBe(PRODUCTION_DSN);
    });
});

describe('sentry DSN location', () => {
    it('appears only in src/lib/config/sentry-runtime.ts', () => {
        const matches = listSourceFiles(SRC_DIR)
            .filter(path => readFileSync(path, 'utf8').includes('ingest.us.sentry.io'))
            .map(path => relative(REPO_ROOT, path).split(sep).join('/'));

        expect(matches).toEqual(['src/lib/config/sentry-runtime.ts']);
    });
});

describe('deployed build flag', () => {
    it('is set to true in the Dockerfile builder stage before npm run build', () => {
        const lines = readRepoFile('Dockerfile').split(/\r?\n/).map(line => line.trim());
        const start = lines.findIndex(line => /^FROM\s.+\sAS\s+builder$/i.test(line));
        expect(start).toBeGreaterThanOrEqual(0);

        const next = lines.findIndex((line, index) => index > start && /^FROM\s/i.test(line));
        const builder = lines.slice(start, next === -1 ? undefined : next);

        const envIndex = builder.findIndex(line => /^ENV\s+VITE_DEPLOYED_BUILD(?:=|\s+)(["']?)true\1$/.test(line));
        const buildIndex = builder.findIndex(line => /^RUN\s+npm\s+run\s+build$/.test(line));

        expect(envIndex).toBeGreaterThanOrEqual(0);
        expect(buildIndex).toBeGreaterThanOrEqual(0);
        expect(envIndex).toBeLessThan(buildIndex);
    });

    it.each(['.github/workflows/deploy.yaml', 'docker-compose.yml', '.env.example'])('is not set in %s', (path) => {
        expect(readRepoFile(path)).not.toContain('VITE_DEPLOYED_BUILD');
    });
});
