import net from 'node:net';

const MIN_PORT = 1;
const MAX_PORT = 65535;

// Ask the OS for a free TCP port. Listening with no host binds dual-stack
// (`::`), which covers both the 127.0.0.1 and ::1 probes Playwright makes
// and the `localhost` bind Vite uses.
function findFreePort(): Promise<number> {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.unref();
        server.on('error', reject);
        server.listen(0, () => {
            const address = server.address();
            if (address === null || typeof address === 'string') {
                server.close();
                reject(new Error('Could not determine a free port for E2E_PORT'));
                return;
            }
            const { port } = address;
            server.close(error => (error ? reject(error) : resolve(port)));
        });
    });
}

/**
 * Resolve the port the e2e web server should listen on.
 *
 * `playwright.config.ts` calls this once in the runner and writes the result
 * back to `process.env.E2E_PORT`. Playwright re-evaluates the config in every
 * worker, and workers inherit the runner's env, so they get the pinned value
 * here instead of probing for a different free port.
 *
 * The free port is released before `vite preview` binds it, so there is a
 * small race window where another process could take it. `--strictPort` turns
 * that into a loud failure instead of a run against the wrong server.
 */
export async function resolveE2ePort(raw: string | undefined): Promise<number> {
    const value = raw?.trim() ?? '';
    if (value === '') {
        return findFreePort();
    }

    const port = Number(value);
    if (!/^\d+$/.test(value) || port < MIN_PORT || port > MAX_PORT) {
        throw new Error(`Invalid E2E_PORT "${raw}": expected an integer between ${MIN_PORT} and ${MAX_PORT}`);
    }

    return port;
}
