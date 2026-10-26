// This site's own content schemas: site-local section types and the site's
// collections. The kit combines them with its own.
//
// public/admin/config.site.yml mirrors these fields by hand: change both files
// in the same commit, then run `npm run decap-config`. Every object is strict,
// so a key that isn't defined here fails the build.
import { isoDate, itemList, labeledLink, mediaPath, requireAlt, section, uiString, type UiString } from "@hostsmith/site-kit-astro/schema";
import { z } from "astro/zod";

// Site-local section types, built with `section` from the kit's schema
// helpers. A ported Webflow section that no library type fits becomes one.
// Each one also needs a component in src/components/sections/site/<type>.astro
// and a Decap type under `section_types` in config.site.yml:
//
//   "menu-board": section("menu-board", { title: z.string().min(1) }),
export const siteSectionSchemas = {
  // A photo beside a dark panel of text and figures: the home page's "By the
  // numbers". The kit's split, on a dark tone.
  "photo-figures": section("photo-figures", {
    eyebrow: z.string().min(1).optional(),
    title: z.string().min(1),
    body: z.string().min(1).optional(),
    image: mediaPath,
    imageAlt: z.string().min(1).optional(),
    stats: z
      .array(z.strictObject({ value: z.string().min(1), label: z.string().min(1) }))
      .min(2, { error: "needs at least 2 items" })
      .max(4, { error: "has at most 4 items" }),
  }).superRefine(requireAlt("image", "imageAlt")),

  // Membership plans as cards: name, price, period, what's included, button.
  "plan-cards": section("plan-cards", {
    items: itemList(
      z.strictObject({
        name: z.string().min(1),
        price: z.string().min(1),
        period: z.string().min(1).optional(),
        features: z.string().min(1),
        button: labeledLink,
      }),
    ),
  }),

  // Questions and answers beside a heading with an intro and a link.
  "faq-aside": section("faq-aside", {
    eyebrow: z.string().min(1).optional(),
    title: z.string().min(1),
    intro: z.string().min(1).optional(),
    link: labeledLink.optional(),
    items: itemList(z.strictObject({ question: z.string().min(1), answer: z.string().min(1) })),
  }),

  // Groups of practical details: a heading, lines of text, rows, links, a note.
  "info-groups": section("info-groups", {
    items: itemList(
      z.strictObject({
        title: z.string().min(1),
        text: z.string().min(1).optional(),
        rows: itemList(z.strictObject({ label: z.string().min(1), value: z.string().min(1) })).optional(),
        links: itemList(labeledLink).optional(),
        note: z.string().min(1).optional(),
      }),
    ),
  }),
};

// The labels the site's own templates show, declared with uiString() from the
// kit's schema helpers, such as `keepReading: uiString()`. Their text is
// under `ui` in each locale's settings, and each has a field under `ui` in
// config.site.yml. Templates read them with getUi() from
// "@hostsmith/site-kit-astro/ui".
export const siteUi: Record<string, UiString> = {
  // The collections' page titles: "{title} | Cobbleford Co-Working". Their
  // descriptions are each entry's `description`.
  postsPageTitle: uiString({ params: ["title"] }),
  teamPageTitle: uiString({ params: ["title"] }),
  // A post's header: the link back to the blog and the author's line.
  postsBack: uiString(),
  postsByline: uiString({ params: ["author"] }),
  // A team member's page: the link back to the team on About.
  teamBack: uiString(),
  // The call to action after a post, and the button on a member's page.
  tourTitle: uiString(),
  tourText: uiString(),
  tourButton: uiString(),
};

// The site's collections, each declared by its schema, as a Webflow CMS
// collection maps onto one. The kit loads it from src/content/<name>/, one
// file per entry and locale, such as src/content/news/collection-entry.en.md.
// Each one also needs a base path in src/site.config.ts, a detail template in
// src/components/collections/ and a Decap folder collection in
// config.site.yml.
export const siteCollections = {
  // Webflow's Blog Posts, at /blog.
  posts: {
    schema: z
      .strictObject({
        title: z.string().min(1),
        date: isoDate,
        // The summary: the cards' text and the page's meta description.
        description: z.string().min(1),
        image: mediaPath.optional(),
        imageAlt: z.string().min(1).optional(),
        // A team member's slug, whose name the post shows after "by".
        author: z.string().min(1).optional(),
        draft: z.boolean().optional(),
      })
      .superRefine(requireAlt("image", "imageAlt")),
  },
  // Webflow's Team, at /team. The role shows under the name on the cards,
  // as the list card's category.
  team: {
    schema: z
      .strictObject({
        title: z.string().min(1),
        category: z.string().min(1),
        // The short bio: the cards' text and the page's meta description.
        description: z.string().min(1),
        image: mediaPath.optional(),
        imageAlt: z.string().min(1).optional(),
        draft: z.boolean().optional(),
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
