<script lang="ts">
    import type { ITab } from "$lib/types/tabs";
    import type { z } from "zod";

    import { favoriteSchema, FavoriteType } from "$lib/schemas/me.schema";
    import { onMount } from "svelte";

    import Tabs from "./Tabs.svelte";

    let category = FavoriteType.Movie as typeof FavoriteType[keyof typeof FavoriteType];
    let pluralCategory = '';
    let favorites: z.infer<typeof favoriteSchema>[] = [];
    let error = '';
    let loading = true;

    let tabs: ITab[] = [];

    onMount(() => {
        reset();
    });

    const loadFavorites = async () => {
        loading = true;

        if (!pluralCategory) {
            error = `Invalid category: ${category}`;
            return;
        }

        try {
            const res = await fetch(`/favorites/${pluralCategory}`);

            if (res.ok) {
                favorites = await res.json();
            } else {
                error = await res.text();

                if (!error || error.toLowerCase().includes('<!doctype')) {
                    throw new Error('unknown error');
                }
            }
        } catch {
            error = 'It looks like something went wrong. Please try again later.';
        }

        loading = false;
    };

    function reset() {
        loading = true;
        favorites = [];
        error = '';
        pluralCategory = '';
        setTabs();
        setPluralCategory();
        loadFavorites();
    }

    function setCategory(id: typeof FavoriteType[keyof typeof FavoriteType]) {
        category = id;
        reset();
    };

    function setPluralCategory() {
        pluralCategory = '';

        if (category === FavoriteType.Movie) {
            pluralCategory = 'movies';
        } else if (category === FavoriteType.Show) {
            pluralCategory = 'shows';
        } else if (category === FavoriteType.Game) {
            pluralCategory = 'games';
        }
    }

    function setTabs() {
        tabs = [
            {
                icon: 'fa-regular fa-camera-movie',
                id: FavoriteType.Movie,
                label: 'Movies',
                selected: category === FavoriteType.Movie,
            },
            {
                icon: 'fa-regular fa-tv',
                id: FavoriteType.Show,
                label: 'Shows',
                selected: category === FavoriteType.Show,
            },
            {
                icon: 'fa-regular fa-gamepad-modern',
                id: FavoriteType.Game,
                label: 'Games',
                selected: category === FavoriteType.Game,
            },
        ]
    }
</script>

<div class="favorites-container">
    <div class="tabs-container">
        <Tabs tabs={tabs} onTabClick={setCategory} />
    </div>

    {#if error}
        <div class="center">
            <p class="h6">Well this is awkward...</p>
            <p>{error}</p>
        </div>
    {:else}
        {#if loading}
            <div class="center">
                <p>Loading favorite {pluralCategory}...</p>
            </div>
        {:else}
            <ol class="favorites">
                {#each favorites as favorite (favorite.id)}
                    <li class="favorite">
                        <a href="{favorite.url}" target="_blank">
                            <div class="rank">
                                {favorite.rank}
                            </div>

                            <img
                                src={favorite.image || ''}
                                alt="{favorite.title} movie cover"
                                aria-labelledby="fav-title"
                            />

                            <div id="fav-title" class="screen-reader-only">
                                <p>{favorite.title}</p>
                            </div>
                        </a>
                    </li>
                {:else}
                    <div class="center">
                        <p>No favorites found for category: {category}</p>
                    </div>
                {/each}
            </ol>
        {/if}
    {/if}
</div>

<style>
    .favorites-container {
        display: flex;
        flex-direction: column;
        min-height: 550px;
    }

    .tabs-container {
        position: relative;
        margin-bottom: 1rem;
    }

    .favorites {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        width: 100%;
        list-style: none;
    }

    .favorite {
        display: flex;
        justify-content: center;
        align-items: center;

        & a {
            position: relative;
            width: 8rem;
            height: 100%;
            min-height: 5rem;
            transition: transform 0.15s ease-in-out;
            transform: scale(1);

            &:hover,
            &:focus-visible {
                transition: transform 0.15s ease-in-out;
                transform: scale(1.05);
            }
        }

        & .rank {
            position: absolute;
            top: -0.5rem;
            left: -0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background-color: var(--primary-500);
            color: var(--neutral-100);
            font-family: var(--header-font);
            font-size: 1.5rem;
            font-weight: bold;
            line-height: 1rem;
            z-index: 1;
        }

        & img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        @media (min-width: 500px) {
            & a {
                width: 10rem;
            }
        }
    }

    .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        width: 100%;
        height: 100%;
        padding: 2rem 1rem 1rem;

        & p {
            margin: 0;
            color: var(--neutral-500);
        }
    }
</style>