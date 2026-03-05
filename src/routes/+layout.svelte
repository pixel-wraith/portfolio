<script lang="ts">
    import '$lib/assets/css/styles.css';
    import type { Snippet } from 'svelte';

    import { page } from '$app/stores';
    import favicon from '$lib/assets/favicon.svg';
    import CareerExp from '$lib/components/CareerExp.svelte';
    import Logo from '$lib/components/Logo.svelte';
    import Toast from '$lib/components/modals/Toast.svelte';
    import SocialLinks from '$lib/components/SocialLinks.svelte';
    import { onMount } from 'svelte';

    interface ILayoutProps {
        children: Snippet;
    }

    interface INavItem {
        text: string;
        subText?: string;
        route: string;
        icon: string;
        iconStyles?: string;
    }

    const { children }: ILayoutProps = $props();

    const navItems: INavItem[] = [
        {
            text: 'Experience',
            subText: 'Work and projects',
            route: '/experience',
            icon: 'fa-regular fa-code',
            iconStyles: 'transform: rotate(2deg);',
        },
        {
            text: 'About',
            subText: 'Beyond the code',
            route: '/about',
            icon: 'fa-regular fa-circle-info',
            iconStyles: 'transform: rotate(0deg);',
        },
        {
            text: 'Blog',
            subText: 'Learn then share',
            route: 'https://dev.to/wraith',
            icon: 'fa-regular fa-blog',
            iconStyles: 'transform: rotate(2deg);',
        },
        {
            text: 'Uses',
            subText: 'Tools and gear',
            route: '/uses',
            icon: 'fa-regular fa-gear-complex-code',
            iconStyles: 'transform: rotate(-4deg);',
        },
        {
            text: 'Contact',
            subText: 'Get in touch',
            route: '/contact',
            icon: 'fa-regular fa-mailbox-flag-up',
            iconStyles: 'transform: rotate(5deg);',
        },
    ];

    let navRef: HTMLElement;
    let bottomRowNavRef: HTMLElement;

    onMount(() => {
        setTimeout(resizeNav, 10);

        window.addEventListener('resize', resizeNav);

        return () => {
            window.removeEventListener('resize', resizeNav);
        }
    })

    function resizeNav() {
        const navItems = navRef.querySelectorAll('.nav-item');
        const navWidth = navRef.getBoundingClientRect().width;

        if (navWidth <= 590) {
            for (let i = 0; i < navItems.length; i++) {
                bottomRowNavRef.appendChild(navItems[i]);
            }

            return;
        }

        for (let i = 0; i < navItems.length; i++) {
            navRef.insertBefore(navItems[i], bottomRowNavRef);
        }

        let totalItemsWidth = 0;

        for (let i = 0; i < navItems.length; i++) {
            if (totalItemsWidth < 0) {
                bottomRowNavRef.appendChild(navItems[i]);
                continue;
            }

            const navItemWidth = (navItems[i] as HTMLAnchorElement).offsetWidth;
            totalItemsWidth += navItemWidth;

            if (totalItemsWidth > navWidth || navItemWidth < 0) {
                totalItemsWidth = -1;
                bottomRowNavRef.appendChild(navItems[i]);
            } else {
                navRef.insertBefore(navItems[i], bottomRowNavRef);
            }
        }
    }
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
    <header>
        <CareerExp />

        <div class="nav-container">
            <div class="top">
                <div class="side left"></div>

                <Logo />

                <div class="side right">
                    <SocialLinks />
                </div>
            </div>

            <nav bind:this={navRef}>
                {#each navItems as { text, subText, route, icon, iconStyles }}
                    <a
                        href={route}
                        class="nav-item {$page.url.pathname === route ? 'active' : ''}"
                        target={route.startsWith('http') ? '_blank' : ''}
                    >
                        <div class="nav-item-icon">
                            <i class={icon} style={iconStyles ?? ''}></i>
                        </div>

                        <div class="nav-item-text-container">
                            <span class="nav-item-text h4">{text}</span>
                            {#if subText}
                                <span class="nav-item-subtext">{subText}</span>
                            {/if}
                        </div>
                    </a>
                {/each}

                <div class="bottom-row" bind:this={bottomRowNavRef}></div>
            </nav>
        </div>
    </header>

    <main>
        {@render children()}
    </main>

    <footer>
        <div class="side left">
            <p class="copywrite">&copy; {new Date().getFullYear()} Jake Lundberg</p>
        </div>

        <Logo />

        <div class="side right">
            <SocialLinks />
        </div>
    </footer>

    <Toast />
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100vw;
        min-height: 100vh;
        overflow: auto;
    }

    header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
        background: var(--neutral-100);
    }

    .nav-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding-bottom: 1.5rem;

        @media(min-width: 590px) {
            gap: 1rem;
        }

        @media(min-width: 768px) {
            gap: 2rem;
        }
    }

    .top {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 1rem 1.5rem;

        &:before {
            content: '';
            position: absolute;
            top: 100%;
            left: 20%;
            right: 20%;
            height: 5px;
            background: var(--neutral-300);
        }

        & .side {
            display: flex;
            gap: 1rem;
            width: calc(50% - 3rem);

            &.right {
                justify-content: flex-end;
                align-items: flex-start;

                & a {
                    line-height: 1.1rem;
                }
            }

            &.left {
                justify-content: flex-start;
            }
        }
    }

    nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 96%;
        margin: 0 auto;
        padding: 0;

        & .nav-item {
            position: relative;
            display: flex;
            padding: 0 1rem;
            border-bottom: 2px solid transparent;
            text-decoration: none;
            transition: all 0.25s ease-in-out;

            &.active {
                &:after {
                    content: ' ';
                    position: absolute;
                    top: calc(100% + 5px);
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--accent1-500);
                }

                & .nav-item-text {
                    color: var(--accent1-500);
                }
            }

            &:hover:not(.active) {
                & .nav-item-text {
                    color: var(--primary-100);
                }
            }
        }

        & .bottom-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            min-width: 100%;
            max-width: 100%;

            @media(min-width: 590px) {
                display: flex;
                justify-content: center;
            }
        }

        & .nav-item-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.5rem;

            & i {
                font-size: 2rem;
            }
        }

        & .nav-item-text-container {
            display: flex;
            flex-direction: column;
        }

        & .nav-item-text {
            margin-bottom: 0;
            line-height: 2rem;
            transition: all 0.25s ease-in-out;
            text-align: left;
            white-space: nowrap;
        }

        & .nav-item-subtext {
            font-size: 0.75rem;
            line-height: 1rem;
            white-space: nowrap;
        }

        & .nav-item-active {
            position: absolute;
            top: calc(100% + 0.3rem);
            left: 50%;
            transform: translateX(-50%);
        }
    }

    main {
        flex-grow: 1;
    }

    footer {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        margin-top: 2rem;
        gap: 1rem;
        padding: 1rem;
        background: var(--neutral-100);

        & > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            justify-content: space-between;
        }

        & .copywrite {
            margin: 0;
            font-size: 0.75rem;
            color: var(--neutral-600);
            line-height: 0.9rem;
        }

        @media (min-width: 500px) {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 1rem 3rem;
        }
    }
</style>