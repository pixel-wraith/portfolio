export interface IPaginated<T> {
    items: T[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}

export function paginate<T>(items: T[], page: number, perPage: number): IPaginated<T> {
    if (perPage < 1) {
        throw new Error(`paginate: perPage must be >= 1 (got ${perPage})`);
    }

    if (page < 1) {
        throw new Error(`paginate: page must be >= 1 (got ${page})`);
    }

    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / perPage);

    if (page > totalPages && !(page === 1 && totalItems === 0)) {
        throw new Error(`paginate: page ${page} exceeds totalPages ${totalPages}`);
    }

    const start = (page - 1) * perPage;
    const end = start + perPage;

    return {
        items: items.slice(start, end),
        page,
        perPage,
        totalItems,
        totalPages,
    };
}
