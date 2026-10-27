# Migration report

<!-- Written by the migration skill, step by step, from node_modules/@hostsmith/site-kit-astro/skills/migrate-webflow/references/report-template.md. Every section stays: one with nothing to report says so in a line. Step 10 removes these comments. -->

The site Cobbleford Co-Working moved from Webflow to this repository on 2026-10-27, from the exports listed under "Sources". This report lists what moved, what changed, what didn't carry over, and what the owner needs to decide before the site goes to production.

## For the owner to approve

- [ ] <decision, and where it's described below>

## Sources

| File | Size | Modified |
| --- | --- | --- |
| `<site>.webflow` (code export, unzipped folder) | 2,144,922 bytes (36 files) | 2026-10-24 |
| `export-demo - Blog Posts - 6ad49570acec9ae2790c9630.csv` | 13,581 bytes | 2026-10-25 |
| `export-demo - Team - 6ad49566944eb9e842c48787.csv` | 1,482 bytes | 2026-10-25 |
| `answers.md` (answers given in advance) | | 2026-10-27 |

The site has no custom domain, and its `webflow.io` address publishes no sitemap, so no sitemap was read.

The snapshot is in `.hostsmith/snapshot/`, which git ignores. It can be deleted once the owner has approved the site.

## Pages

| Page | URL | Sections |
| --- | --- | --- |

## Site-local types and Components

## Collections

## Interactions

- **`i-ad0d0a50`** (IX3, site-wide): every `section-header_component` (the eyebrow and heading above a section) faded up by 15% as it scrolled into view (top at 85% of the viewport, 0.7 s, played once), skipped to the end under reduced motion. Found on Home (6), Membership (2), About (5), Blog (1), Contact (2), the blog post template (1) and the team template (1).

## Embeds

- **Contact:** an OpenStreetMap map (`openstreetmap.org/export/embed.html`) in a `w-embed`, titled "Map placeholder showing open countryside".
- **Blog post "Inside Our Community Calendar":** a YouTube video (`3URtTIdnXIk`) in the rich text.

## Forms

No form is carried over: the kit's contact form comes in a later release. No form works until the kit's contact form is set up.

- **Newsletter** (footer, every page; `wf-form-Newsletter`, method GET):
  - Email address: `newsletter-email`, email, required, placeholder "you@example.com".
  - Button: "Join" (while sending: "Joining...").
  - Success: "Thanks! You are on the list for the next newsletter."
  - Error: "Something went wrong. Please try again, or email hello@cobbleford.example."
- **Tour Request** (Contact; `wf-form-Tour-Request`, method GET), introduced by "Request a tour" and "Tell us when suits you and we will save you a desk for the day. Fields marked * are required.":
  - Name *: `name`, text, required, placeholder "Your name".
  - Email *: `email`, email, required, placeholder "you@example.com".
  - Phone: `phone`, tel, optional, placeholder "Optional".
  - Preferred day: `preferred-day`, select: Any weekday (empty value), Monday, Tuesday, Wednesday, Thursday, Friday.
  - Plan of interest: `plan`, select: Not sure yet (empty value), Hot Desk, Dedicated Desk, Private Office.
  - Message: `message`, textarea, optional, max 5000 characters, placeholder "Tell us a little about your work and what you need."
  - Button: "Request a Tour" (while sending: "Sending...").
  - Success: "Thanks! We will reply within one working day to confirm your tour."
  - Error: "Something went wrong. Please try again, or email hello@cobbleford.example."

## Fonts

## Colors changed for contrast

## Builder defaults kept

To use the theme's own styles instead, delete `src/styles/theme/builder-defaults.css`, its import in `src/styles/global.css`, and the `--color-builder-*` colors in the site's preset.

## Not carried over

- **The password page** (`401.html`): Webflow's default protected-page template. No page of the site is password-protected, and the page doesn't carry over.
- **Draft item:** the blog post "Getting the Mill Ready for Winter" (`getting-the-mill-ready-for-winter`) is a draft, with no live URL. See "Collections".

## Missing pieces

- **Font:** the export's `@font-face` for Space Grotesk points at no file (`url('../images/')`): Webflow's export leaves out uploaded fonts. The owner supplied the file (see "Fonts").
- **404 page:** the export's `404.html` is Webflow's default ("404", "Page Not Found", "The page you are looking for doesn't exist or has been moved"), so the 404 page is written anew (see "Pages").
- **Favicon and touch icon:** the export's `favicon.ico` and `webclip.png` are Webflow's own defaults. The owner supplied the site's own.
- **Collection list settings:** the export doesn't hold them (sort, limit, filters). They were given in advance (see "Answers").

## Answers

All answers below were given in advance, in `.hostsmith/snapshot/answers.md`, and none was asked during the run.

- **Live address:** none. The site has no custom domain, and its `webflow.io` address publishes no sitemap. Nothing was fetched from it. (given in advance)
- **Rerun:** no, this is the first migration in this site. (given in advance)
- **Replace the example's content:** yes, all of it. (given in advance)
- **Webflow Localization:** not used. The site has one locale. (given in advance)
- **Missing CSV exports:** none. Blog Posts and Team are the only collections, and both CSVs are given. (given in advance)
- **Blog Posts' base path:** `/blog`. (given in advance)
- **Team's base path:** `/team`. (given in advance)

## Alt text written

## Links to check

Every internal link in the export's pages and the CSVs' rich text points at a page or a published item in the URL map:

- `/blog/hot-desk-dedicated-desk-or-private-office`, from Membership and from the post "Inside Our Community Calendar";
- `/blog/from-woolen-mill-to-workspace`, from About.

## Fidelity check

**Compared:**

**Not compared:**

| Page | Width | Difference |
| --- | --- | --- |

## To translate

The site has one locale.

## DNS switch checklist

The domain moves to Hostsmith only when every item holds:

- [ ] `npm run check:urls -- --live <production site address>` passes against the deployed production site.
- [ ] Every form listed under "Forms" works through the kit's contact form.
- [ ] `url` in `src/site.config.ts` is the final domain.
- [ ] The custom domain is set up on the Hostsmith production site.
- [ ] The repository variable `SITE_NOINDEX` is `false`, and production has been deployed again since.

After the switch, submit the sitemap, `<url>/sitemap.xml`, again in the owner's search console.
