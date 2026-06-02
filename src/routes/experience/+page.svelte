<script lang="ts">
    import Intro from "$lib/components/Intro.svelte";
    import IntroContent from "$lib/components/IntroContent.svelte";
    import Section from "$lib/components/Section.svelte";
    import dayjs from "dayjs";
    import utc from "dayjs/plugin/utc";
    import { marked } from 'marked';

    import type { PageData } from "./$types";

    dayjs.extend(utc);

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const projects = $derived(data.projects);
    const jobs = $derived(data.jobs);

    const onReadMoreToggle = (projectId: string) => {
        return () => {
            const container: HTMLDivElement | null = document.querySelector(`#project-${projectId} .description-container`);

            if (container) {
                const desc: HTMLDivElement | null = container.querySelector('.description');
                if (desc) {
                    const computedStyle = window.getComputedStyle(desc);
                    container.style.height = !container.style.height || container.style.height === '0px' ? computedStyle.height : '0';
                }
            }
        }
    }
</script>

<div class="container">
    <Intro header="Experience">
        <IntroContent>
            <p>
                I've spent over a decade turning messy problems into software people actually want to use — wearing just
                about every hat along the way: engineer, lead, architect, and manager.
            </p>

            <p>
                What ties it all together is simple: I like making things better. Faster releases, cleaner architecture,
                happier teams, less tedious busywork. Here's where I've done it — and a hint at what I could do next.
            </p>
        </IntroContent>
    </Intro>

    <Section>
        <div class="work">
            <h2>Work Stuff</h2>

            <div class="section-intro">
                {#if jobs.error}
                    <p class="error">
                        {jobs.error}
                    </p>
                {:else}
                    <p>
                        From A/B testing platforms to financial services to climate tech, I've shipped across a wide range
                        of industries and team sizes — early startups where I was one of three engineers, and established
                        teams I helped level up.
                    </p>

                    <p>
                        Here's where I've worked and what I accomplished at each stop.
                    </p>
                {/if}
            </div>

            {#if jobs.data.length && !jobs.error}
                <div class="list-container">
                    {#each jobs.data as job, i (job.id)}
                        <article class="{(i % 2) ? 'reverse' : ''}">
                            <a
                                href="{job.url}"
                                target="_blank"
                                class="img-container company-logo-container"
                            >
                                <img
                                    class="company-logo"
                                    src="{job.logo}"
                                    alt="{job.companyName} logo"
                                />
                            </a>

                            <div class="content">
                                <h3 class="h5 company-name">{job.companyName}</h3>

                                {#each job.positions as position, i}
                                    <div class="header">
                                        <h4 class="h6 title" class:mt="{i !== 0}">
                                            {position.title}
                                        </h4>
                                    </div>

                                    <div class="metadata">
                                        <p>
                                            {dayjs(position.startDate).local().format('MMM, YYYY')} - {position.endDate ? dayjs(position.endDate).local().format('MMM, YYYY') : 'Present'}
                                        </p>
                                    </div>

                                    {#if position.summary}
                                        <div class="summary">
                                            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                                            {@html marked.parse(position.summary)}
                                        </div>
                                    {/if}

                                    <div class="techs">
                                        {#each position.tech as tech}
                                            <a
                                                href="{tech.url}"
                                                target="_blank"
                                                class="tech"
                                            >
                                                {tech.name}
                                            </a>
                                        {/each}
                                    </div>
                                {/each}
                            </div>
                        </article>
                    {/each}
                </div>
            {/if}
        </div>
    </Section>

    <Section>
        <div class="projects">
            <h2>Projects</h2>

            <div class="section-intro">
                {#if projects.error}
                    <p class="error">
                        {projects.error}
                    </p>
                {:else}
                    <p>
                        I honestly love what I do. Building software and solving problems just feels like something I was
                        born to do — so even when I'm off the clock, you'll usually find me hacking on a personal project.
                    </p>

                    <p>
                        Here are a few I've built — and actually shipped.
                    </p>
                {/if}
            </div>

            {#if projects.data.length && !projects.error}
                <div class="list-container">
                    {#each projects.data as project, i (project.id)}
                        <article class="{(i % 2) ? 'reverse' : ''}" id="project-{project.id}">
                            <div class="img-container project-img-container">
                                <img
                                    class="project-img"
                                    src="{project.image}"
                                    alt="project preview"
                                />
                            </div>

                            <div class="content">
                                <div class="header">
                                    <h3 class="h5 title">
                                        {project.name}
                                    </h3>

                                    {#if project.url || project.links?.length}
                                        <div class="links">
                                            {#if project.url && !(project.links ?? []).find(link => link.url === project.url)}
                                                <a
                                                    href="{project.url}"
                                                    target="_blank"
                                                    class="link"
                                                >
                                                    View Project
                                                </a>
                                            {/if}

                                            {#each (project.links ?? []) as link}
                                                <a
                                                    href="{link.url}"
                                                    target="_blank"
                                                    class="link"
                                                >
                                                    {link.label}
                                                </a>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                {#if project.summary}
                                    <div class="summary">
                                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                                        {@html marked.parse(project.summary)}
                                    </div>
                                {/if}

                                {#if project.description}
                                    <div>
                                        <div class="description-container">
                                            <div class="description">
                                                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                                                {@html marked.parse(project.description)}
                                            </div>
                                        </div>

                                        <div class="read-more-toggle">
                                            <input
                                                type="checkbox"
                                                id="description-toggle-{project.id}"
                                                onchange={onReadMoreToggle(project.id)}
                                            />
                                            <label for="description-toggle-{project.id}">
                                                <span class="read-more">Read More</span>
                                                <span class="read-less">Read Less</span>
                                            </label>
                                        </div>
                                    </div>
                                {/if}

                                <div class="techs">
                                    {#each project.tech as tech}
                                        <a
                                            href="{tech.url}"
                                            target="_blank"
                                            class="tech"
                                        >
                                            {tech.name}
                                        </a>
                                    {/each}
                                </div>
                            </div>
                        </article>
                    {/each}
                </div>
            {/if}
        </div>
    </Section>
</div>

<style>
    .container {
		width: 96%;
		margin: 0 auto;
	}

	.section-intro {
		margin-bottom: 2rem;
		padding: 0 0.5rem;
	}

	.list-container {
		padding-top: 3rem;

		@media (min-width: 768px) {
			padding-top: 0;
		}
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 1rem 1rem 0.5rem;
		border: 5px solid var(--neutral-300);
		transition: 0.2s ease-in-out;

		&:has(a:not(.tech):not(.link):hover) {
			border: 5px solid var(--neutral-400);

			& img {
				transform: scale(1.05) rotateZ(-6deg);
			}
		}

		&:not(:last-of-type) {
			margin-bottom: 3rem;
		}
	}

	.img-container {
		display: flex;
		justify-content: center;
		margin: 0 auto 1rem;
		padding: 1rem;

		& img {
			display: block;
			width: 100%;
			max-width: 20rem;
			height: auto;
			object-fit: contain;
			object-position: center;
			transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
		}
	}

	.company-logo-container {
		align-items: center;
	}

	.project-img-container {
		align-items: flex-start;
	}

	.metadata {
		margin-bottom: 0.5rem;
		text-align: center;

		& p {
			margin: 0;
			font-size: 0.75rem;
			color: var(--neutral-700);
		}
	}

	.links {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;

		& a {
			padding: 0 0.5rem;
			font-size: 0.875rem;
			color: var(--accent1-500);
			text-decoration: none;
			line-height: 1.2rem;

			&:not(:last-of-type) {
				border-right: 1px solid var(--neutral-300);
			}

			&:hover {
				color: var(--accent1-600);
			}
		}
	}

	.company-name {
		display: block;
		margin: 0;
        color: var(--accent2-500);
		text-align: center;
		text-decoration: none;
	}

	.title {
        display: block;
		margin: 0;
        text-align: center;
		text-decoration: none;
	}

	.mt {
        margin-top: 3rem;
    }

	.description-container {
		height: 0;
		transition: height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		overflow: hidden;
	}

	.description {
		padding: 1rem 0;
	}

	.read-more-toggle {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem 0;

		&:hover {
			cursor: pointer;

			& .read-more,
			& .read-less {
				color: var(--neutral-600);
				cursor: pointer;
			}
		}

		&:has(input:checked) {
			& .read-less {
				display: block;
			}

			& .read-more {
				display: none;
			}
		}

		& input {
			width: 0;
			height: 0;
			opacity: 0;
		}

		& input:focus-visible ~ label {
			outline: 1px dashed var(--neutral-800);
			outline-offset: calc(var(--outline-offset) - 1px);
		}

		& .read-more,
		& .read-less {
			color: var(--neutral-500);
		}

		& .read-less {
			display: none;
		}

		& .read-more {
			display: block;
		}
	}

	.techs {
		display: flex;
		justify-content: flex-end;
		gap: 0.25rem;
		flex-wrap: wrap;
		margin-top: 1rem;

		& .tech {
			margin-bottom: 0.25rem;
			padding: 0 0.5rem;
			font-size: 0.85rem;
			background: var(--neutral-900);
			color: var(--neutral-100);
			font-size: 0.8rem;
			line-height: 1.3rem;
			text-decoration: none;

			&:hover,
			&:focus-visible {
				background-color: var(--accent2-500);
				color: var(--neutral-900);
			}
		}

		& .tech:nth-child(1n) {
			transform: rotate(-3deg);
		}

		& .tech:nth-child(2n) {
			transform: rotate(-1deg);
		}

		& .tech:nth-child(3n) {
			transform: rotate(2deg);
		}
	}

	@media (min-width: 768px) {
		article {
			flex-direction: row;
			align-items: stretch;
			gap: 1rem;
			padding: 0.5rem 1rem;
		}

		article:not(:last-of-type) {
			margin-bottom: 4rem;
		}

		article.reverse {
			flex-direction: row-reverse;
		}
		.img-container img {
			min-width: 15rem;
			max-width: 15rem;
		}

		.company-logo-container {
			margin: 0;
		}

		.content {
			flex-grow: 1;
		}

		.techs {
			margin: 1rem 0 -1.5rem 0;
		}
	}
</style>