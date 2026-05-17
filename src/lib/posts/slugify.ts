export function slugify(title: string): string {
    const slug = title
        .normalize('NFKD')
        .replace(/[\u0300-\u036F]/g, '')
        .toLowerCase()
        .replace(/['\u2018\u2019]/g, '')
        .replace(/[^a-z0-9\s-]/g, ' ')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (!slug) {
        throw new Error(`slugify produced empty result for input: ${JSON.stringify(title)}`);
    }

    return slug;
}
