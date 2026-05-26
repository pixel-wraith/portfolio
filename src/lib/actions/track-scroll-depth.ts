declare const umami: { track: (event: string, data?: Record<string, unknown>) => void } | undefined;

const THRESHOLDS = [25, 50, 75, 100] as const;

export function trackScrollDepth(node: HTMLElement, slug: string) {
    const fired = new Set<number>();

    function handleScroll() {
        if (typeof umami === 'undefined')
            return;

        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrolledPast = viewportHeight - rect.top;
        const percent = Math.min(100, Math.round((scrolledPast / rect.height) * 100));

        for (const threshold of THRESHOLDS) {
            if (percent >= threshold && !fired.has(threshold)) {
                fired.add(threshold);
                umami.track('scroll-depth', { slug, depth: threshold });
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return {
        destroy() {
            window.removeEventListener('scroll', handleScroll);
        },
    };
}
