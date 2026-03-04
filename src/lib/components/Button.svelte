<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    type ButtonKind = 'primary'
        | 'primary-transparent'
        | 'accent1'
        | 'accept1-transparent'
        | 'accept2'
        | 'accept2-transparent'
        | 'accept3'
        | 'accept3-transparent'
        | 'neutral'
        | 'danger'
        | 'danger-transparent'
        | 'transparent';

    interface IButtonProps extends HTMLButtonAttributes {
        kind: ButtonKind;
        processing?: boolean;
        children: Snippet;
    }

    const { type, kind, processing, children, ...restProps }: IButtonProps = $props();
</script>

<button
    {type}
    class={`primary-font ${kind} ${processing ? 'processing' : ''}`}
    {...restProps}
>
    {#if processing}
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    {:else}
        {@render children()}
    {/if}
</button>

<style>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 1rem;
        font-weight: 400;

        &:not(:disabled):not(.processing):hover {
            cursor: pointer;
        }

        &:not(.processing):disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &.primary {
            background-color: var(--primary-100);
            border: 1px solid var(--primary-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--primary-300);
                border: 1px solid var(--primary-700);
            }
        }

        &.primary-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--primary-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--primary-700);
            }
        }

        &.accent1 {
            background-color: var(--flower1-100);
            border: 1px solid var(--flower1-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--flower1-200);
                border: 1px solid var(--flower1-700);
            }
        }

        &.accent1-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--flower1-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--flower1-700);
            }
        }

        &.accent2 {
            background-color: var(--flower2-100);
            border: 1px solid var(--flower2-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--flower2-300);
                border: 1px solid var(--flower2-700);
            }
        }

        &.accent2-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--flower2-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--flower2-700);
            }
        }

        &.accent3 {
            background-color: var(--flower3-100);
            border: 1px solid var(--flower3-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--flower3-300);
                border: 1px solid var(--flower3-700);
            }
        }

        &.accent3-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--flower3-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--flower3-700);
            }
        }

        &.accent4 {
            background-color: var(--flower4-100);
            border: 1px solid var(--flower4-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--flower4-300);
                border: 1px solid var(--flower4-700);
            }
        }

        &.accent4-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--flower4-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--flower4-700);
            }
        }

        &.neutral {
            background-color: var(--neutral-150);
            border: 1px solid var(--neutral-350);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--neutral-200);
                border: 1px solid var(--neutral-300);
            }
        }

        &.danger {
            background-color: var(--danger-100);
            border: 1px solid var(--danger-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--danger-300);
                border: 1px solid var(--danger-700);
            }
        }

        &.danger-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--danger-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--danger-700);
            }
        }

        &.transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--neutral-550);
            }
        }
    }

    .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 3rem;
        width: 100%;
        min-height: 1rem;
        height: 100%;
    }

    .spinner {
        width: 1rem;;
        height: 1rem;
        border: 2px solid var(--neutral-900);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>