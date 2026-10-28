import { defineConfig } from '@playwright/test';

import { resolveE2ePort } from './e2e/support/e2e-port';

// Resolve once in the runner. Workers re-evaluate this file but inherit
// process.env, so they reuse the runner's port instead of probing again.
const port = await resolveE2ePort(process.env.E2E_PORT);
process.env.E2E_PORT = String(port);

export default defineConfig({
    // `reuseExistingServer` stays unset so a run never attaches to a server
    // owned by another job.
    webServer: {
        command: `npm run build && npm run preview -- --port ${port} --strictPort`,
        port,
    },
    testDir: 'e2e',
});
