<script lang="ts">
    const socialItems = [
        {
            text: 'GitHub',
            route: 'https://github.com/iamthe-Wraith',
            icon: 'fa-brands fa-github',
        },
        {
            text: 'LinkedIn',
            route: 'https://www.linkedin.com/in/jake-lundberg/',
            icon: 'fa-brands fa-linkedin',
        },
        {
            text: 'Dev.to',
            route: 'https://dev.to/wraith',
            icon: 'fa-brands fa-dev',
        },
        {
            text: 'Bluesky',
            route: 'https://bsky.app/profile/wraithcode.io',
            icon: 'fa-brands fa-square-bluesky',
        }
    ];
</script>

<div class="social-links">
    {#each socialItems as { text, route, icon }}
        <a
            href={route}
            target="_blank"
            class="social-item"
            aria-label={text}
        >
            <i class={icon}></i>
        </a>
    {/each}
</div>

<style>
    .social-links {
        display: flex;
        gap: 0.5rem;
    }

    .social-item {
        color: var(--neutral-600);

        &:hover {
            color: var(--accent1-500);
        }

        & i {
            font-size: 1.25rem;
        }
    }
</style>