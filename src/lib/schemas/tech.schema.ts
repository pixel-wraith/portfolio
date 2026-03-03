import { z } from 'zod';

export const techSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
});