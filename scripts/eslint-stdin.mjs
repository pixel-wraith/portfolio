#!/usr/bin/env node
/**
 * Formats a file's contents with `eslint --fix` over stdin/stdout.
 *
 * Zed's bundled ESLint language server only attaches to JavaScript, TypeScript,
 * TSX, Vue and Svelte, so file types this project lints through ESLint but Zed
 * cannot reach that way (JSON, JSONC, CSS, HTML) are formatted by pointing
 * Zed's `external` formatter at this script instead. See .zed/settings.json.
 *
 * Usage: node scripts/eslint-stdin.mjs <file-path> < input > output
 */

import { ESLint } from 'eslint';
import { Buffer } from 'node:buffer';
import process from 'node:process';

async function readStdin() {
    const chunks = [];
    for await (const chunk of process.stdin)
        chunks.push(chunk);

    return Buffer.concat(chunks).toString('utf8');
}

const filePath = process.argv[2];
const source = await readStdin();

if (!filePath) {
    process.stderr.write('eslint-stdin: no file path given; leaving buffer unchanged\n');
    process.stdout.write(source);
    process.exit(0);
}

try {
    const eslint = new ESLint({ fix: true });
    const [result] = await eslint.lintText(source, { filePath, warnIgnored: false });
    process.stdout.write(result?.output ?? source);
}
catch (error) {
    // Never hand Zed a truncated buffer: fall back to the original text.
    process.stderr.write(`eslint-stdin: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stdout.write(source);
}
