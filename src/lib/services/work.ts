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
        logo: 'https://res.cloudinary.com/dxpwpno1e/image/upload/v1725412627/brooksbell_yndorr.jpg',
        location: 'Raleigh, NC',
        positions: [
            jobPositionSchema.parse({
                title: 'Senior Optimization Engineer',
                startDate: dayjs('2016-05-02').toDate(),
                endDate: dayjs('2020-06-01').toDate(),
                summary: `Brooks Bell was my first professional development job after graduating college. There, I  built A/B tests for enterprise client. Within my first 6 months I took the initiative to built a custom command line tool to automate large portions of work, and to align the entire team around a single set of standards for all clients. I maintained that tool for the next 3(ish) years and it allowed us to increase the number of A/B tests we were able to output by more than 400%!`,
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
        logo: 'https://res.cloudinary.com/dxpwpno1e/image/upload/v1725413376/levitate_nxe2xg.svg',
        location: 'Raleigh, NC (Hybrid)',
        positions: [
            jobPositionSchema.parse({
                title: 'Software Developer 2',
                startDate: dayjs('2020-07-01').toDate(),
                endDate: dayjs('2021-11-01').toDate(),
                summary: `I landed at Levitate just days after being laid off at the very beginning of the Covid pandemic. While there, I went from having zero React experience to becoming the lead frontend developer of a new gamified sales tool the company was building. As an advocate for knowledge sharing, I led the initiative of building an internal knowledge-base for other teams to use to solve customer problems. Not only that, but I regularly joined client calls to help provide technical support, and in addition to my normal responsibilities, I also oversaw development for the companies marketing website.`,
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
        logo: 'https://res.cloudinary.com/dxpwpno1e/image/upload/v1725412627/karmawallet_m0fkqh.svg',
        location: 'Raleigh, NC (Remote)',
        positions: [
            jobPositionSchema.parse({
                title: 'Software Engineer',
                startDate: dayjs('2021-11-01').toDate(),
                endDate: dayjs('2022-08-01').toDate(),
                summary: `I joined Karma Wallet very early on, so I was one of only three developers. But that didn't hinder me from building out a custom integration with external financial software, implementing a new automated continuous integration and continuous deployment (or CI/CD for short) pipeline, and also building an entirely new admin portal for internal employees to monitor business reporting and manage the company's users. While doing all this, I was still able to lead the team in migrating to Mobx and Typescript, which were new technologies for them, in an effort to solve some of their existing pain points.`,
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
        logo: 'https://res.cloudinary.com/dxpwpno1e/image/upload/v1725412627/kickfin_vyww9u.svg',
        location: 'Austin, TX (Remote)',
        positions: [
            jobPositionSchema.parse({
                title: 'Software Engineer',
                startDate: dayjs('2022-08-01').toDate(),
                endDate: dayjs('2023-07-01').toDate(),
                summary: `When I was at Kickfin, I headed up the frontend development of their latest (at the time) product, taking it from it's inception through to launch and beyond. I also lead development of lots of different features both for their internal tools used to manage the business, and for their external clients. So I got to experience solving problems for different kinds of users, which I really enjoyed!`,
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
        logo: 'https://res.cloudinary.com/dxpwpno1e/image/upload/v1725412627/greenplaces_n7xpmt.png',
        location: 'Raleigh, NC (Remote)',
        positions: [
            jobPositionSchema.parse({
                title: 'Senior Software Engineer',
                startDate: dayjs('2023-10-01').toDate(),
                endDate: dayjs('2025-02-01').toDate(),
                summary: `While working as a Senior Software Engineer at Greenplaces, I lead a major overhaul of the application. The project was a huge undertaking, handling redesigning the UI, building out a new component library, refactoring and consolidating large portions of the backend, and implementing their first automated testing program to keep it all dependable and easy to maintain. During this whole process I administered standards across the team, assumed the management of the release process, and even reduced cycle time by more than 40%!`,
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
                summary: `I'm an Engineering Manager and Technical Architect who ships at slightly-illegal speeds by pairing sharp architecture with AI-powered workflows. I lead engineers across the stack, run crisp sprints, and keep code quality high with friendly-but-firm guardrails (review SLAs, PR size limits, and real tests). I modernize platforms from monolith to TypeScript microservices, design scalable Postgres with RLS, build sane RBAC for multi-tenant apps, and wire the hard bits—auth/MFA, data sync, job queues, CDC—so legacy and modern systems play nice. Releases flow through AWS with feature flags, while Sentry and CloudWatch keep us humble. I partner with Product and Design to turn ambitious ideas into shippable reality, balancing speed with reliability and leading with technical excellence, empathy, and just enough sarcasm to keep retros interesting.`,
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
