import { z } from 'zod';

import { techSchema } from './tech.schema';

export const jobPositionSchema = z.object({
    title: z.string(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    summary: z.string(),
    tech: z.array(techSchema),
});

export const jobSchema = z.object({
    id: z.string(),
    companyName: z.string(),
    url: z.string(),
    logo: z.string(),
    location: z.string(),
    positions: z.array(jobPositionSchema),
});