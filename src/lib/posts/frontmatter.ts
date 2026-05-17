import type { PostFrontmatter } from '$lib/schemas/post.schema';

import { postFrontmatterSchema } from '$lib/schemas/post.schema';
import { parse as parseYaml } from 'yaml';

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export interface IParsedPost {
    frontmatter: PostFrontmatter;
    body: string;
}

export function parseFrontmatter(raw: string): IParsedPost {
    const match = raw.match(FRONTMATTER_PATTERN);
    if (!match) {
        throw new Error('parseFrontmatter: missing or unterminated frontmatter block');
    }

    const [, yamlBlock, body] = match;

    let parsed: unknown;
    try {
        parsed = parseYaml(yamlBlock);
    } catch (err) {
        throw new Error(`parseFrontmatter: invalid YAML — ${(err as Error).message}`);
    }

    const result = postFrontmatterSchema.safeParse(parsed);
    if (!result.success) {
        throw new Error(`parseFrontmatter: frontmatter does not match schema — ${result.error.message}`);
    }

    return { frontmatter: result.data, body };
}
