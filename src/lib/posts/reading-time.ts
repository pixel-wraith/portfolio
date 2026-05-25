const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(text: string): number {
    const stripped = text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]*`/g, '')
        .replace(/<[^>]*>/g, '');

    const words = stripped.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return 1;
    }

    return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}
