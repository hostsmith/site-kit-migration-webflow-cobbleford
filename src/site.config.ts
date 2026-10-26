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
// entry and the sitemap. Hostsmith has no redirects, so the ported Webflow
// site keeps its collections' paths: Blog Posts at "/blog" and Team at
// "/team". A base path starts with "/", has no trailing slash and may have
// several segments.
//
// The Webflow site had no breadcrumb, only "Back" links on its templates, so
// the kit's breadcrumb is off for the pages and for each collection.
export const siteConfig = {
  url: "https://cobbleford.us.hostsmith.link",
  locales: [{ code: "en", tag: "en-US" }],
  breadcrumb: false,
  collections: {
    posts: { basePath: "/blog", breadcrumb: false },
    team: { basePath: "/team", breadcrumb: false },
  },
} as const;

export type CollectionName = keyof typeof siteConfig.collections;
