import type { Plugin, PluginOption } from 'vite';

import { sentrySvelteKit } from '@sentry/sveltekit';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getSentryPluginOptions, SENTRY_UPLOAD_ENV_VAR } from './sentry-build';

const UPLOAD_PLUGIN = 'sentry-sveltekit-debug-id-upload-plugin';
const AUTO_INSTRUMENT_PLUGIN = 'sentry-auto-instrumentation';

async function flattenPlugins(options: PluginOption | PluginOption[] | undefined): Promise<Plugin[]> {
    const resolved = await options;
    if (Array.isArray(resolved)) {
        const nested = await Promise.all(resolved.map(flattenPlugins));
        return nested.flat();
    }
    return resolved ? [resolved as Plugin] : [];
}

describe('getSentryPluginOptions', () => {
    it('uses the SENTRY_UPLOAD_SOURCEMAPS variable name', () => {
        expect(SENTRY_UPLOAD_ENV_VAR).toBe('SENTRY_UPLOAD_SOURCEMAPS');
    });

    it('disables upload for an empty env', () => {
        expect(getSentryPluginOptions({}).autoUploadSourceMaps).toBe(false);
    });

    it('enables upload with the existing org and project when the variable is "true"', () => {
        expect(getSentryPluginOptions({ SENTRY_UPLOAD_SOURCEMAPS: 'true' })).toMatchObject({
            org: 'wraith',
            project: 'portfolio',
            autoUploadSourceMaps: true,
        });
    });

    it('enables upload when the variable is "1"', () => {
        expect(getSentryPluginOptions({ SENTRY_UPLOAD_SOURCEMAPS: '1' }).autoUploadSourceMaps).toBe(true);
    });

    it.each(['false', '0', '', 'yes', 'TRUE'])('disables upload when the variable is %j', (value) => {
        expect(getSentryPluginOptions({ SENTRY_UPLOAD_SOURCEMAPS: value }).autoUploadSourceMaps).toBe(false);
    });

    it('does not enable upload from CI or SENTRY_AUTH_TOKEN alone', () => {
        expect(getSentryPluginOptions({ CI: '1', SENTRY_AUTH_TOKEN: 'dummy' }).autoUploadSourceMaps).toBe(false);
    });
});

describe('sentrySvelteKit with the default options', () => {
    it('returns only the auto-instrumentation plugin', async () => {
        const plugins = await sentrySvelteKit(getSentryPluginOptions({}));
        expect(plugins.map(plugin => plugin.name)).toEqual([AUTO_INSTRUMENT_PLUGIN]);
    });
});

describe('vite.config.ts', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.resetModules();
    });

    it('does not register the upload plugin when SENTRY_UPLOAD_SOURCEMAPS is unset', async () => {
        vi.stubEnv(SENTRY_UPLOAD_ENV_VAR, undefined);
        vi.resetModules();

        const { default: config } = await import('../../../vite.config');
        const names = (await flattenPlugins(config.plugins)).map(plugin => plugin.name);

        expect(names).toContain(AUTO_INSTRUMENT_PLUGIN);
        expect(names).not.toContain(UPLOAD_PLUGIN);
    });
});
