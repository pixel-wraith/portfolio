declare const umami: { track: (event: string, data?: Record<string, unknown>) => void } | undefined;

const THRESHOLDS = [25, 50, 75, 100] as const;

export function trackScrollDepth(node: HTMLElement, slug: string) {
    let currentSlug = slug;
    let fired = new Set<number>();

    function handleScroll() {
        if (typeof umami === 'undefined')
            return;

        const rect = node.getBoundingClientRect();
        const nodeTop = rect.top + window.scrollY;
        const scrollBottom = window.scrollY + window.innerHeight;
        const scrolled = Math.max(0, scrollBottom - nodeTop);
        const percent = Math.min(100, Math.round((scrolled / rect.height) * 100));

        for (const threshold of THRESHOLDS) {
            if (percent >= threshold && !fired.has(threshold)) {
                fired.add(threshold);
                umami.track('scroll-depth', { slug: currentSlug, depth: threshold });
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return {
        update(newSlug: string) {
            currentSlug = newSlug;
            fired = new Set<number>();
        },
        destroy() {
            window.removeEventListener('scroll', handleScroll);
        },
    };
}
