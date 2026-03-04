import type { FavoriteType } from '$lib/schemas/me.schema';

export interface ITab {
    icon?: string; // the font-awesome icon to display
    iconPosition?: 'start' | 'end';
    id: typeof FavoriteType[keyof typeof FavoriteType];
    label: string;
    selected: boolean;
}