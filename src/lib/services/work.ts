import type { z } from 'zod';

import { techSchema } from '$lib/schemas/tech.schema';
import { jobPositionSchema, jobSchema } from '$lib/schemas/work.schema';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const jobs: z.infer<typeof jobSchema>[] = [
    jobSchema.parse({
        id: '1',
        companyName: 'Brooks Bell (now Blazer)',
        url: 'https://www.linkedin.com/company/blazerconsulting/',
        logo: 'https://images.wraithcode.io/2026-05/brooksbell-800.png',
        location: 'Raleigh, NC',
        positions: [
            jobPositionSchema.parse({
                title: 'Senior Optimization Engineer',
                startDate: dayjs('2016-05-02').toDate(),
                endDate: dayjs('2020-06-01').toDate(),
                summary: `Took an enterprise A/B testing program from manual to machine — building the tooling that let the whole team move faster.

- Built a custom command-line tool that automated large portions of test development and lifted the team's A/B test output by **over 400%**
- Unified the entire team around a single set of standards across every client
- Owned and maintained that tooling as core team infrastructure for 3+ years`,
                tech: [
                    techSchema.parse({
                        id: 'nodejs',
                        name: 'Node.js',
                        url: 'https://nodejs.org/en',
                    }),
                    techSchema.parse({
                        id: 'javascript',
                        name: 'Javascript',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                    }),
                    techSchema.parse({
                        id: 'html',
                        name: 'HTML',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
                    }),
                    techSchema.parse({
                        id: 'css',
                        name: 'CSS',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                    }),
                    techSchema.parse({
                        id: 'adobe-target',
                        name: 'Adobe Target',
                        url: 'https://business.adobe.com/products/target/adobe-target.html',
                    }),
                    techSchema.parse({
                        id: 'optimizely',
                        name: 'Optimizely',
                        url: 'https://www.optimizely.com/',
                    }),
                    techSchema.parse({
                        id: 'dynamic-yield',
                        name: 'Dynamic Yield',
                        url: 'https://www.dynamicyield.com/',
                    }),
                ],
            }),
        ],
    }),
    jobSchema.parse({
        id: '2',
        companyName: 'Levitate',
        url: 'https://levitate.ai/',
        logo: 'https://images.wraithcode.io/2026-05/levitate-800.png',
        location: 'Raleigh, NC (Hybrid)',
        positions: [
            jobPositionSchema.parse({
                title: 'Software Developer 2',
                startDate: dayjs('2020-07-01').toDate(),
                endDate: dayjs('2021-11-01').toDate(),
                summary: `Went from zero React experience to leading the frontend of a brand-new product.

- Became lead frontend developer on a new gamified sales tool — starting with no prior React experience
- Built an internal knowledge base that helped other teams solve customer problems faster
- Owned development of the company's marketing website
- Jumped on client calls to provide hands-on technical support`,
                tech: [
                    techSchema.parse({
                        id: 'typescript',
                        name: 'Typescript',
                        url: 'https://www.typescriptlang.org/',
                    }),
                    techSchema.parse({
                        id: 'react',
                        name: 'React',
                        url: 'https://react.dev/',
                    }),
                    techSchema.parse({
                        id: 'mobx',
                        name: 'Mobx',
                        url: 'https://mobx.js.org/README.html',
                    }),
                    techSchema.parse({
                        id: 'css',
                        name: 'CSS',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                    }),
                    techSchema.parse({
                        id: 'csharp',
                        name: 'C#',
                        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
                    }),
                ],
            }),
        ],
    }),
    jobSchema.parse({
        id: '3',
        companyName: 'Karma Wallet',
        url: 'https://karmawallet.io/',
        logo: 'https://images.wraithcode.io/2026-05/karmawallet-800.png',
        location: 'Raleigh, NC (Remote)',
        positions: [
            jobPositionSchema.parse({
                title: 'Software Engineer',
                startDate: dayjs('2021-11-01').toDate(),
                endDate: dayjs('2022-08-01').toDate(),
                summary: `One of the first three engineers, helping build an early-stage fintech from the ground up.

- Built a custom integration with external financial software
- Stood up the company's first automated CI/CD pipeline
- Built a brand-new admin portal for internal teams to monitor business reporting and manage users
- Led the team's migration to TypeScript and MobX to solve long-standing pain points`,
                tech: [
                    techSchema.parse({
                        id: 'nodejs',
                        name: 'Node',
                        url: 'https://nodejs.org/en',
                    }),
                    techSchema.parse({
                        id: 'mongodb',
                        name: 'MongoDB',
                        url: 'https://www.mongodb.com/',
                    }),
                    techSchema.parse({
                        id: 'typescript',
                        name: 'Typescript',
                        url: 'https://www.typescriptlang.org/',
                    }),
                    techSchema.parse({
                        id: 'react',
                        name: 'React',
                        url: 'https://react.dev/',
                    }),
                    techSchema.parse({
                        id: 'mobx',
                        name: 'Mobx',
                        url: 'https://mobx.js.org/README.html',
                    }),
                    techSchema.parse({
                        id: 'css',
                        name: 'CSS',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                    }),
                ],
            }),
        ],
    }),
    jobSchema.parse({
        id: '4',
        companyName: 'Kickfin',
        url: 'https://kickfin.com/',
        logo: 'https://images.wraithcode.io/2026-05/kickfin-800.png',
        location: 'Austin, TX (Remote)',
        positions: [
            jobPositionSchema.parse({
                title: 'Software Engineer',
                startDate: dayjs('2022-08-01').toDate(),
                endDate: dayjs('2023-07-01').toDate(),
                summary: `Owned the frontend of a new product from first commit through launch and beyond.

- Led frontend development of their newest product, taking it from inception all the way to launch
- Shipped features across both internal business tools and customer-facing apps
- Built for two very different audiences — internal teams and external clients`,
                tech: [
                    techSchema.parse({
                        id: 'nodejs',
                        name: 'Node',
                        url: 'https://nodejs.org/en',
                    }),
                    techSchema.parse({
                        id: 'typescript',
                        name: 'Typescript',
                        url: 'https://www.typescriptlang.org/',
                    }),
                    techSchema.parse({
                        id: 'react',
                        name: 'React',
                        url: 'https://react.dev/',
                    }),
                    techSchema.parse({
                        id: 'redux',
                        name: 'Redux',
                        url: 'https://redux.js.org/',
                    }),
                    techSchema.parse({
                        id: 'css',
                        name: 'CSS',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                    }),
                    techSchema.parse({
                        id: 'cypress',
                        name: 'Cypress',
                        url: 'https://www.cypress.io/',
                    }),
                    techSchema.parse({
                        id: 'jest',
                        name: 'Jest',
                        url: 'https://jestjs.io/',
                    }),
                ],
            }),
        ],
    }),
    jobSchema.parse({
        id: '5',
        companyName: 'Greenplaces',
        url: 'https://greenplaces.com/',
        logo: 'https://images.wraithcode.io/2026-05/greenplaces-800.png',
        location: 'Raleigh, NC (Remote)',
        positions: [
            jobPositionSchema.parse({
                title: 'Senior Software Engineer',
                startDate: dayjs('2023-10-01').toDate(),
                endDate: dayjs('2025-02-01').toDate(),
                summary: `Led a top-to-bottom overhaul of the core application — and the process around shipping it.

- Spearheaded a full UI redesign and built a new component library from scratch
- Refactored and consolidated large portions of the backend
- Stood up the company's first automated testing program to keep it all dependable and maintainable
- Took over the release process and cut cycle time by **more than 40%**
- Set and enforced engineering standards across the team`,
                tech: [
                    techSchema.parse({
                        id: 'php',
                        name: 'PHP',
                        url: 'https://www.php.net/',
                    }),
                    techSchema.parse({
                        id: 'laravel',
                        name: 'Laravel',
                        url: 'https://laravel.com/',
                    }),
                    techSchema.parse({
                        id: 'livewire',
                        name: 'Livewire',
                        url: 'https://laravel-livewire.com/',
                    }),
                    techSchema.parse({
                        id: 'dusk',
                        name: 'Dusk',
                        url: 'https://laravel.com/docs/11.x/dusk',
                    }),
                    techSchema.parse({
                        id: 'phpunit',
                        name: 'PHPUnit',
                        url: 'https://phpunit.de/index.html',
                    }),
                ],
            }),
            jobPositionSchema.parse({
                title: 'Engineering Manager',
                startDate: dayjs('2025-02-01').toDate(),
                endDate: null,
                summary: `Leading engineers to ship fast without sacrificing quality — pairing sharp architecture with AI-powered workflows.

- Lead engineers across the stack with crisp sprints and friendly-but-firm guardrails: review SLAs, PR size limits, and real tests
- Driving the modernization from legacy monolith to TypeScript microservices
- Architect scalable, multi-tenant systems — Postgres with row-level security, sane RBAC, and the hard plumbing (auth/MFA, data sync, job queues, CDC)
- Own reliable releases through AWS with feature flags, while Sentry and CloudWatch keep us honest
- Partner with Product and Design to turn ambitious ideas into shippable reality`,
                tech: [
                    techSchema.parse({
                        id: 'nodejs',
                        name: 'Node',
                        url: 'https://nodejs.org/en',
                    }),
                    techSchema.parse({
                        id: 'typescript',
                        name: 'Typescript',
                        url: 'https://www.typescriptlang.org/',
                    }),
                    techSchema.parse({
                        id: 'hono',
                        name: 'Hono',
                        url: 'https://hono.dev',
                    }),
                    techSchema.parse({
                        id: 'openapi',
                        name: 'OpenAPI',
                        url: 'https://www.openapis.org',
                    }),
                    techSchema.parse({
                        id: 'docker',
                        name: 'Docker',
                        url: 'https://www.docker.com/',
                    }),
                    techSchema.parse({
                        id: 'postgres',
                        name: 'Postgres',
                        url: 'https://www.postgresql.org',
                    }),
                    techSchema.parse({
                        id: 'redis',
                        name: 'Redis',
                        url: 'https://redis.io',
                    }),
                    techSchema.parse({
                        id: 'bullmq',
                        name: 'BullMQ',
                        url: 'https://bullmq.io',
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
                    techSchema.parse({
                        id: 'nuxt',
                        name: 'Nuxt',
                        url: 'https://nuxt.com/',
                    }),
                    techSchema.parse({
                        id: 'playwright',
                        name: 'Playwright',
                        url: 'https://playwright.dev/',
                    }),
                ],
            }),
        ],
    }),
];

export class WorkService {
    public getJobs = async (): Promise<z.infer<typeof jobSchema>[]> => {
        const orderedJobs = structuredClone(jobs)
            .reverse()
            .map(job => ({
                ...job,
                positions: job.positions.reverse(),
            }));
        return jobSchema.array().parse(orderedJobs);
    };
}
