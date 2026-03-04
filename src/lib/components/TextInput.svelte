<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    interface ITextInputProps extends HTMLInputAttributes {
        id: string;
        name: string;
        value: string;
        label: string;
        text?: string;
        error: string;
        maxLength: number;
        required: boolean;
        theme?: 'neutral' | 'light';
    }

    const {
        id,
        name,
        value = $bindable(''),
        label,
        text,
        error,
        maxLength,
        required,
        type = 'text',
        theme = 'neutral',
        ...restProps
    }: ITextInputProps = $props();

    let ref: HTMLInputElement;
</script>

<div class="input-container">
    {#if label}
        <label for={id}>
            {label}
            {#if !required}
                <span>optional</span>
            {/if}
        </label>
    {/if}

    <input
        {id}
        {required}
        {name}
        {value}
        {type}
        class="{theme} {error ? 'error' : ''}"
        {...restProps}
        bind:this={ref}
    />

    <div class="metadata-container">
        <div>
            {#if text && !error}
                <p class="input-text">{text}</p>
            {/if}

            {#if error}
                <p class="error">{error}</p>
            {/if}
        </div>

        {#if maxLength}
            <p class="char-count">{value.length} / {maxLength}</p>
        {/if}
    </div>
</div>

<style>
    .input-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: var(--outline-offset);
    }

    label {
        & span {
            color: var(--neutral-900);
        }
    }

    .metadata-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 0.25rem;
    }

    p {
        margin: 0;

        &.input-text,
        &.error {
            font-size: 0.75rem;
            line-height: 1rem;
            text-align: left;
        }

        &.input-text {
            color: var(--neutral-700);
        }
    }

    p.char-count {
        font-size: 0.75rem;
        line-height: 1rem;
        text-align: right;
        color: var(--neutral-700);
        white-space: nowrap;
    }

    input {
        width: 100%;
        padding: 0.3rem 0.7rem;
        color: var(--neutral-900);
        background-color: var(--neutral-100);

        &.neutral {
            border: 1px solid var(--neutral-300);

            &::placeholder {
                color: var(--neutral-350);
            }
        }

        &.light {
            border: 1px solid var(--neutral-800);

            &::placeholder {
                color: var(--neutral-450);
            }
        }

        &:disabled {
            border: 1px solid var(--neutral-200);
            color: var(--neutral-450);
        }

        &.error {
            font-size: 0.875rem;
            border-color: var(--danger-500);
        }
    }
</style>