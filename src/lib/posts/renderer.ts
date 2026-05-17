import type { Tokens } from 'marked';
import type { Highlighter } from 'shiki';

import { Marked } from 'marked';
import { createHighlighter } from 'shiki';

import { slugify } from './slugify.ts';

const LANGS = [
    'bash',
    'css',
    'diff',
    'html',
    'js',
    'json',
    'jsx',
    'markdown',
    'md',
    'sh',
    'shell',
    'svelte',
    'text',
    'ts',
    'tsx',
    'yaml',
] as const;

const THEME = 'github-dark';

let highlighterPromise: Promise<Highlighter> | undefined;
let mdInstance: Marked | undefined;

async function getHighlighter(): Promise<Highlighter> {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({ themes: [THEME], langs: [...LANGS] });
    }

    return highlighterPromise;
}

function escapeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function getMarked(): Promise<Marked> {
    if (!mdInstance) {
        const highlighter = await getHighlighter();

        mdInstance = new Marked({
            renderer: {
                code({ text, lang }: { text: string; lang?: string }): string {
                    if (lang && (LANGS as readonly string[]).includes(lang)) {
                        return highlighter.codeToHtml(text, { lang, theme: THEME });
                    }

                    return `<pre><code>${escapeHtml(text)}</code></pre>`;
                },
                heading(this: { parser: { parseInline: (tokens: Tokens.Heading['tokens']) => string } }, { tokens, text, depth }: Tokens.Heading): string {
                    const inner = this.parser.parseInline(tokens);
                    let id: string | undefined;
                    try {
                        id = slugify(text);
                    } catch {
                        id = undefined;
                    }
                    return id
                        ? `<h${depth} id="${id}">${inner}</h${depth}>\n`
                        : `<h${depth}>${inner}</h${depth}>\n`;
                },
            },
        });
    }

    return mdInstance;
}

export async function renderMarkdown(body: string): Promise<string> {
    const md = await getMarked();
    const html = md.parse(body);

    return typeof html === 'string' ? html : await html;
}
