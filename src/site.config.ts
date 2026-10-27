// Per-site routing settings (design D1).
//
// `url` is the production site URL. Canonical links, Open Graph URLs, the
// sitemap and robots.txt are built from it, and astro.config.mjs reads it.
//
// `locales` lists the site's languages, the default first. Each content file
// names its code before the extension, such as src/content/pages/about.en.md,
// and its tag sets the pages' language.
//
// Each collection's base path is part of every entry URL, every link to an
// entry and the sitemap. Hostsmith has no redirects, so a ported Webflow site
// keeps its collection's path, such as Webflow's "/post" or the site's own
// "/blog". A base path starts with "/", has no trailing slash and may have
// several segments.
export const siteConfig = {
  url: "https://cobbleford.us.hostsmith.link",
  locales: [{ code: "en", tag: "en-US" }],
  collections: {
    // Webflow's Blog Posts and Team. Their templates have only a back link,
    // no trail of links home, so neither shows the breadcrumb.
    posts: { basePath: "/blog", breadcrumb: false },
    team: { basePath: "/team", breadcrumb: false },
  },
  // Webflow has no breadcrumb element, and no page of the old site showed a
  // trail of links home.
  breadcrumb: false,
} as const;

export type CollectionName = keyof typeof siteConfig.collections;
