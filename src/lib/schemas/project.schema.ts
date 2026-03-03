import { z } from 'zod';

import { techSchema } from './tech.schema';

export const projectLinkSchema = z.object({
    label: z.string(),
    url: z.string(),
});

export const projectSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    image: z.string(),
    published: z.boolean(),
    links: z.array(projectLinkSchema),
    summary: z.string(),
    description: z.string(),
    tech: z.array(techSchema),
});