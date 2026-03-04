<script lang="ts">
    import type { FavoriteType } from "$lib/schemas/me.schema";
    import type { ITab } from "$lib/types/tabs";

    interface ITabsProps {
        onTabClick: (id: typeof FavoriteType[keyof typeof FavoriteType]) => void;
        tabs: ITab[];
    }

    const { onTabClick, tabs }: ITabsProps = $props();
</script>

<div class="tabs">
    {#each tabs as tab}
        <button
            class="tab"
            class:selected={tab.selected}
            disabled={tab.selected}
            onclick={() => onTabClick(tab.id)}
        >
            {#if tab.icon && (!tab.iconPosition || tab.iconPosition === 'start')}
                <i class={tab.icon}></i>
            {/if}

            {tab.label}

            {#if tab.icon && tab.iconPosition === 'end'}
                <i class={tab.icon}></i>
            {/if}
        </button>
    {/each}
</div>

<style>
    .tabs {
        display: flex;
        justify-content: flex-start;
        gap: 0.5rem;
        padding: 0.5rem 0.5rem 0;
        overflow: hidden;
    }

    .tab {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: transparent;
        border: 1px solid transparent;
        border-bottom: none;
        color: var(--neutral-900);
        transition: 0.25s ease-in-out;

        &:not(.selected) {
            cursor: pointer;

            &:hover,
            &:focus-visible,
            &:hover i,
            &:focus-visible i {
                color: var(--primary-500);
                transition: 0.25s ease-in-out;
            }
        }

        &.selected {
            border: 1px solid var(--neutral-300);
            border-bottom: none;

            &:before,
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                width: 100vw;
                height: 1px;
                background-color: var(--neutral-300);
            }

            &:before {
                right: 100%;
            }

            &:after {
                left: 100%;
            }
        }

        & i {
            color: var(--neutral-900);
            transition: 0.25s ease-in-out;
        }
    }

    button.selected {
        color: var(--accent-color);
    }
</style>