// This site's own content schemas: site-local section types and the site's
// collections. The kit combines them with its own.
//
// public/admin/config.site.yml mirrors these fields by hand: change both files
// in the same commit, then run `npm run decap-config`. Every object is strict,
// so a key that isn't defined here fails the build.
import { isoDate, itemList, labeledLink, mediaPath, requireAlt, section, uiString, type UiString } from "@hostsmith/site-kit-astro/schema";
import { z } from "astro/zod";

// Site-local section types, built with `section` from the kit's schema
// helpers: the old Webflow sections that no library type fits. Each one also
// has a component in src/components/sections/site/<type>.astro and a Decap
// type under `section_types` in config.site.yml.
export const siteSectionSchemas = {
  // An image beside figures on the dark band: the home page's "By the numbers".
  "stats-band": section("stats-band", {
    eyebrow: z.string().min(1).optional(),
    title: z.string().min(1),
    text: z.string().min(1).optional(),
    image: mediaPath,
    imageAlt: z.string().min(1).optional(),
    stats: itemList(z.strictObject({ value: z.string().min(1), label: z.string().min(1) })),
  }).superRefine(requireAlt("image", "imageAlt")),

  // Membership plans as cards: a name, a price and its period, the features
  // and a button.
  "plan-cards": section("plan-cards", {
    eyebrow: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    items: itemList(
      z.strictObject({
        name: z.string().min(1),
        price: z.string().min(1),
        period: z.string().min(1).optional(),
        features: z.array(z.string().min(1)).optional(),
        button: labeledLink.optional(),
      }),
    ),
  }),

  // Questions and answers beside a heading group with an intro and a button:
  // the membership page's FAQ.
  "questions-aside": section("questions-aside", {
    eyebrow: z.string().min(1).optional(),
    title: z.string().min(1),
    intro: z.string().min(1).optional(),
    link: labeledLink.optional(),
    items: itemList(z.strictObject({ question: z.string().min(1), answer: z.string().min(1) })),
  }),

  // Contact details in titled blocks: an address, opening hours, an email
  // address and a phone number, each block with an optional note.
  "contact-info": section("contact-info", {
    blocks: itemList(
      z.strictObject({
        title: z.string().min(1),
        address: z.string().min(1).optional(),
        hours: itemList(z.strictObject({ days: z.string().min(1), time: z.string().min(1) })).optional(),
        email: z.email().optional(),
        phone: z.string().min(1).optional(),
        note: z.string().min(1).optional(),
      }),
    ),
  }),
};

// The labels the site's own templates show, declared with uiString() from the
// kit's schema helpers. Their text is under `ui` in each locale's settings,
// and each has a field under `ui` in config.site.yml. Templates read them
// with getUi() from "@hostsmith/site-kit-astro/ui".
export const siteUi: Record<string, UiString> = {
  // The SEO title patterns of the collections' pages.
  postsPageTitle: uiString({ params: ["title"] }),
  teamPageTitle: uiString({ params: ["title"] }),
  // The blog post template.
  postsBack: uiString(),
  postsBy: uiString(),
  postsCtaTitle: uiString(),
  postsCtaText: uiString(),
  postsCtaButton: uiString(),
  // The team member template.
  teamBack: uiString(),
  teamButton: uiString(),
};

// The site's collections, each declared by its schema, as a Webflow CMS
// collection maps onto one. The kit loads it from src/content/<name>/, one
// file per entry and locale, such as src/content/posts/<slug>.en.md. Each one
// also has a base path in src/site.config.ts, a detail template in
// src/components/collections/ and a Decap folder collection in
// config.site.yml.
export const siteCollections = {
  // Webflow's Blog Posts, at /blog.
  posts: {
    schema: z
      .strictObject({
        title: z.string().min(1),
        // Published Date
        date: isoDate,
        // Summary
        description: z.string().min(1),
        // Main Image and Main Image Alt
        image: mediaPath.optional(),
        imageAlt: z.string().min(1).optional(),
        // A team member's slug
        author: z.string().min(1).optional(),
        draft: z.boolean().optional(),
      })
      .superRefine(requireAlt("image", "imageAlt")),
  },
  // Webflow's Team, at /team.
  team: {
    schema: z
      .strictObject({
        title: z.string().min(1),
        // Role: named `category`, so the collection list's cards show it.
        category: z.string().min(1).optional(),
        // Short Bio
        description: z.string().min(1).optional(),
        // Photo
        image: mediaPath.optional(),
        imageAlt: z.string().min(1).optional(),
      })
      .superRefine(requireAlt("image", "imageAlt")),
  },
  news: {
    schema: z
      .strictObject({
        title: z.string().min(1),
        date: isoDate,
        description: z.string().min(1).optional(),
        image: mediaPath.optional(),
        imageAlt: z.string().min(1).optional(),
        draft: z.boolean().optional(),
      })
      .superRefine(requireAlt("image", "imageAlt")),
  },
};
