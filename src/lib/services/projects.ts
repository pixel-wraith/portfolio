import type { z } from 'zod';

import { projectLinkSchema, projectSchema } from '$lib/schemas/project.schema';
import { techSchema } from '$lib/schemas/tech.schema';

const projects: z.infer<typeof projectSchema>[] = [
    projectSchema.parse({
        id: '1',
        name: 'BuzyBee',
        url: 'https://buzybee.buzz',
        image: 'https://images.wraithcode.io/2026-05/chester-without-shadow-800.png',
        published: true,
        links: [],
        summary: `A personal productivity app built around David Allen's Getting Things Done method — designed, built, and shipped entirely solo.

- Launched to the public on **1 Nov, 2024** — my first released product
- Pairs task and project management with a little AI help and habit tracking
- Still my own #1 tool for staying on top of everything, with new features shipping all the time

Big things are planned, so bee on the lookout. (I couldn't help myself.)`,
        description: `Several years ago, I adopted the [Getting Things Done](https://gettingthingsdone.com/) system to help manage all the things going on in my life. For a long time, I was able to make due with just using a note taking app. But after a while I outgrew that system and needed something a bit more. I spent a few months checking out different tools to replace it, but none really fit. So, like a true engineer, I dove in and decided to build the tool I was looking for...and so BuzyBee was born!

From managing all the tasks and projects going on (and throwing in a little AI to help), to tracking and building habits, BuzyBee has become my #1 place to keep a handle on my personal productivity.`,
        tech: [
            techSchema.parse({
                id: 'sveltekit',
                name: 'Sveltekit',
                url: 'https://kit.svelte.dev',
            }),
            techSchema.parse({
                id: 'nodejs',
                name: 'Node.js',
                url: 'https://nodejs.org/en',
            }),
            techSchema.parse({
                id: 'postgres',
                name: 'Postgres',
                url: 'https://www.postgresql.org/',
            }),
            techSchema.parse({
                id: 'prisma',
                name: 'Prisma',
                url: 'https://www.prisma.io/',
            }),
            techSchema.parse({
                id: 'redis',
                name: 'Redis',
                url: 'https://redis.io/',
            }),
            techSchema.parse({
                id: 'css',
                name: 'CSS',
                url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
            }),
            techSchema.parse({
                id: 'docker',
                name: 'Docker',
                url: 'https://www.docker.com/',
            }),
            techSchema.parse({
                id: 'playwright',
                name: 'Playwright',
                url: 'https://playwright.dev/',
            }),
            techSchema.parse({
                id: 'vitest',
                name: 'Vitest',
                url: 'https://vitest.dev/',
            }),
            techSchema.parse({
                id: 'vite',
                name: 'Vite',
                url: 'https://vitejs.dev/',
            }),
        ],
    }),
    projectSchema.parse({
        id: '2',
        name: 'Kraken',
        url: 'https://github.com/iamthe-Wraith/kraken',
        image: 'https://images.wraithcode.io/2026-05/kraken-800.png',
        published: true,
        links: [
            projectLinkSchema.parse({
                label: 'View on GitHub',
                url: 'https://github.com/iamthe-Wraith/kraken',
            }),
        ],
        summary: `A CLI tool that automates the tedious, error-prone code release process.

- Cut release time from **45+ minutes** down to **under 5**
- Eliminates human error and keeps the whole team releasing the same way
- Built to take the pain out of frequent, repetitive releases

So if you're tired of long, frustrating releases...maybe it's time to Release the Kraken!`,
        description: ``,
        tech: [
            techSchema.parse({
                id: 'nodejs',
                name: 'Node.js',
                url: 'https://nodejs.org/en',
            }),
        ],
    }),
    projectSchema.parse({
        id: '3',
        name: 'Igor',
        url: 'https://github.com/iamthe-Wraith/igor',
        image: 'https://www.google.com',
        published: false,
        links: [
            projectLinkSchema.parse({
                label: 'View on GitHub',
                url: 'https://github.com/iamthe-Wraith/igor',
            }),
        ],
        summary: 'A Command Line Interface (CLI) for automating the building and maintaining of A/B and Multivariant tests from multiple internal and client libraries.',
        description: `Igor was one of my earliest projects, but also one of the most successful. It was an internal Command Line Interface (CLI) build tool used to automate the creation and management of different types of A/B and Multivariant tests across different tech stacks and enterprise clients.

When I started working at Brooks Bell I noticed some inefficiencies in the existing development workflow. So I decided to build a solution on my own time that could automate those problems away. Node was new to me at the time, so I took it as an opportunity to learn a new technology and solve some problems at the same time. The tool was a hit and was quickly adopted by the team. I continued to maintain and improve Igor for more than 3 years until I eventually left the company, at which time they forked the project and I laid Igor to rest.

Why was it called Igor, you ask?

Tests were often called "experiments" at Brooks Bell, because they were experimenting with different ideas and solutions on their client's webpages. And just like Igor assisted Dr. Frankenstein in his experiments, this build tool assisted us in building our own experiments. So we named it after the assistant to the mad scientist!`,
        tech: [
            techSchema.parse({
                id: 'nodejs',
                name: 'Node.js',
                url: 'https://nodejs.org/en',
            }),
            techSchema.parse({
                id: 'javascript',
                name: 'JavaScript',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            }),
        ],
    }),
];

export class ProjectsService {
    public getProjects = async (): Promise<z.infer<typeof projectSchema>[]> => {
        return projectSchema.array().parse(projects.filter(project => project.published));
    };
}
