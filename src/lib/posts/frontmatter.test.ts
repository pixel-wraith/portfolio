import { describe, expect, it } from 'vitest';

import { parseFrontmatter } from './frontmatter';

describe('parseFrontmatter', () => {
    it('extracts the frontmatter and body from a valid post', () => {
        const raw = `---
title: Hello
description: World
date: 2024-09-15
tags: [a, b]
slug: hello
published: true
---
# Hello

Body text.`;

        const result = parseFrontmatter(raw);

        expect(result.frontmatter).toEqual({
            title: 'Hello',
            description: 'World',
            date: '2024-09-15',
            tags: ['a', 'b'],
            slug: 'hello',
            published: true,
        });
        expect(result.body).toBe('# Hello\n\nBody text.');
    });

    it('preserves optional fields when present', () => {
        const raw = `---
title: Hello
description: World
date: 2024-09-15
tags: []
slug: hello
published: true
cover: https://example.com/img.png
devto_id: 12345
---
Body.`;

        const { frontmatter } = parseFrontmatter(raw);

        expect(frontmatter.cover).toBe('https://example.com/img.png');
        expect(frontmatter.devto_id).toBe(12345);
    });

    it('defaults tags to an empty array when the field is omitted', () => {
        const raw = `---
title: Hello
description: World
date: 2024-09-15
slug: hello
published: true
---
Body.`;

        const { frontmatter } = parseFrontmatter(raw);

        expect(frontmatter.tags).toEqual([]);
    });

    it('throws when there is no opening frontmatter fence', () => {
        const raw = `# No frontmatter here.

Body text.`;

        expect(() => parseFrontmatter(raw)).toThrow(/missing or unterminated frontmatter/);
    });

    it('throws when the frontmatter block is unterminated', () => {
        const raw = `---
title: Hello
description: still going...`;

        expect(() => parseFrontmatter(raw)).toThrow(/missing or unterminated frontmatter/);
    });

    it('throws when required frontmatter fields are missing', () => {
        const raw = `---
title: Hello
---
Body.`;

        expect(() => parseFrontmatter(raw)).toThrow(/does not match schema/);
    });

    it('throws when the frontmatter is not valid YAML', () => {
        const raw = `---
title: Hello
tags: [a, b
description: still going...
---
Body.`;

        expect(() => parseFrontmatter(raw)).toThrow(/invalid YAML/);
    });
});
