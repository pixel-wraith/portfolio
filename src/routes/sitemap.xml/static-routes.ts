// Authoritative list of top-level static routes for the sitemap. Not derived
// from the route tree (SvelteKit has no runtime introspection for that), so
// when you add a new top-level page (e.g. /resume), add it here too or it
// will be silently omitted from the sitemap. `static-routes.test.ts` is a
// filesystem-scan drift guard that fails when this list and src/routes/ disagree.
//
// Lives in a sibling module rather than +server.ts because SvelteKit's
// production build rejects any +server.ts export outside its allowlist
// (GET/POST/.../prerender/entries/_-prefixed).
export const STATIC_ROUTES = ['/', '/about', '/experience', '/uses', '/blog'];
