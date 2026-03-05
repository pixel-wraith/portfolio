// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    interface TurnstileOptions {
        'sitekey': string;
        'callback'?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        'theme'?: 'light' | 'dark' | 'auto';
        'size'?: 'normal' | 'compact';
    }

    interface Turnstile {
        render: (element: HTMLElement, options: TurnstileOptions) => string;
        reset: (element: HTMLElement | string) => void;
        remove: (element: HTMLElement | string) => void;
    }

    interface Window {
        turnstile: Turnstile;
    }
}

export {};
