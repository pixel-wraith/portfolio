import { getPostsByTag } from '$lib/posts/loader';

import type { PageServerLoad } from './$types';

// SSR per-request rather than prerender. With prerender + entries(), SvelteKit
// would 404 any path not in the enumerated tag list before load() runs — even
// after removing error(404) here — which would surface the default "Page Not
// Found" page for typo URLs. SSR mode lets load() return an empty posts list
// for unknown tags so +page.svelte can render its friendly empty state.
export const load: PageServerLoad = ({ params }) => {
    return { tag: params.tag, posts: getPostsByTag(params.tag) };
};
