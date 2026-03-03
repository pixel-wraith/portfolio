import type { projectSchema } from '$lib/schemas/project.schema';
import type { jobSchema } from '$lib/schemas/work.schema';
import type { z } from 'zod';

import { logger } from '$lib/logger';
import { ProjectsService } from '$lib/services/projects';
import { WorkService } from '$lib/services/work';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import type { PageServerLoad } from './$types';

dayjs.extend(utc);

export const load: PageServerLoad = async () => {
    const projectsService = new ProjectsService();
    const workService = new WorkService();

    let projects: z.infer<typeof projectSchema>[] = [];
    let projectError: string = '';

    let jobs: z.infer<typeof jobSchema>[] = [];
    let jobsError: string = '';

    try {
        projects = await projectsService.getProjects();
    } catch (err: unknown) {
        logger.error('Failed to get projects', { error: (err as Error).message });
        projectError = 'Uh oh, something went wrong getting the projects. Come back in a little bit.';
    }

    try {
        jobs = await workService.getJobs();
    } catch (err: unknown) {
        logger.error('Failed to get jobs', { error: (err as Error).message });
        jobsError = 'Uh oh, something went wrong getting the work stuff. Come back in a little bit.';
    }

    return {
        projects: {
            data: projects,
            error: projectError,
        },
        jobs: {
            data: jobs,
            error: jobsError,
        },
    };
};