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
| Home (`index.html`) | `/` | `hero` (image-right), `steps`, `split` (the tour block inside "How it works"), `services-grid` (cards, surface), `testimonials` (grid), `stats-band` (site-local), `collection-list` (posts, 3), `cta` (card, accent) |
| Membership | `/membership` | `hero` (page), `plan-cards` (site-local), `questions-aside` (site-local) |
| About | `/about` | `hero` (page), `split` (image-left), `services-grid` (list, surface), `tabs` (horizontal), `collection-list` (team), `cta` (card, accent) |
| Blog | `/blog` | `hero` (page), `collection-list` (posts, all) |
| Contact | `/contact` | `hero` (page), `contact-info` (site-local), `embed` (map) |
| 404 | served for any missing page | `hero` (page), written anew (see "For the owner to approve") |
| Blog post template (`detail_blog.html`) | `/blog/<slug>` | the `posts` detail template: header, image, body, and the call to action band |
| Team template (`detail_team.html`) | `/team/<slug>` | the `team` detail template |

No page needed `template: custom`.

## Site-local types and Components

Site-local types, in `src/components/sections/site/`:

- **`stats-band`** (Home): an image beside an eyebrow, a title, a paragraph and four figures, on the deep green band: the old "By the numbers". `split` has the image and figures but no dark tone, and `stats` has the tone but no image.
- **`plan-cards`** (Membership): the three plans as cards, each with its name, price and period, features and a "Book a Tour" button. `pricing-list` shows only a label and a price per row.
- **`questions-aside`** (Membership): the FAQ with its heading group, intro and "How to choose a plan" button beside the questions. `faq` has neither an intro nor a button.
- **`contact-info`** (Contact): the "Visit", "Opening hours" and "Get in touch" blocks, each with its title and note. `hours-location` has no block titles and one note.

Components found by repetition:

- **The call to action band** (`cta_component`): on Home, About and the blog post template, with different text. It became `cta` (variant `card`, tone `accent`) on the pages, and the same markup with interface strings (`postsCta*`) in the blog post template.
- **The section header** (`section-header_component`: eyebrow, title, intro): the header of the library types, `sk-section__header`, and of the site-local types.
- **The page header** (`section_page-header`): `hero` with the variant `page` on Membership, About, Blog, Contact and the 404 page.
- **The blog card** (`blog-card_*`), on Home and Blog: `collection-list` cards.
- **The check list** (`check-list`), on Home and About: a Markdown list in a `split` and in the tabs' bodies, drawn with checks by the theme.

Webflow elements replaced by kit parts:

- **Tabs** (`w-tabs`) on About, "Three floors, one community": `tabs`, one item per pane.
- **The native accordions** (`details`) on Membership: `questions-aside`, still native `details`.
- **The map embed** (`w-embed` with an `iframe`) on Contact: `embed`, `kind: map`.
- **The YouTube video** in the post "Inside Our Community Calendar": a video link alone in its paragraph, which the kit renders as an embed.
- **The navbar's `details` mobile menu**: the kit's header menu.

## Collections

## Interactions

- **`i-ad0d0a50`** (IX3, site-wide): every `section-header_component` (the eyebrow and heading above a section) faded up by 15% as it scrolled into view (top at 85% of the viewport, 0.7 s, played once), skipped to the end under reduced motion. Its class is on the section headers of Home (5: steps, amenities, testimonials, numbers, blog), Membership (1: FAQ), About (4: story, values, floors, team) and Contact (1: the tour request form's header). Carried as `reveal: fade-up` on those 10 sections (the Contact one went with its form), with the theme's transition at the old 0.7 s, skipped under reduced motion. The whole section fades up, where the old site moved only its header. Webflow's inline style that hid the headers until its script ran isn't carried.

## Embeds

- **Contact:** an OpenStreetMap map (`openstreetmap.org/export/embed.html`) in a `w-embed`, titled "Map placeholder showing open countryside". Choice: **on a click** (`load: click`, given in advance). It's an `embed` section, `kind: map`, at the nearest aspect, 21:9 (the old frame was 22rem tall across the content width), with its caption.
- **Blog post "Inside Our Community Calendar":** a YouTube video (`3URtTIdnXIk`, "These CATS are too FUNNY! | New Cat Videos") in the rich text. It's a video link alone in its paragraph, which the kit renders as an embed that loads on a click.

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

- **Space Grotesk** (headings and body, weights 300 to 700): an upload the export left out (its `@font-face` points at `url('../images/')`). It's an open font, by Florian Karsten, under the SIL Open Font License 1.1. The owner sent the variable WOFF2 from Fontsource and its `OFL.txt`, which are in `public/assets/fonts/`, loaded by `src/styles/theme/fonts.css` and listed in `CREDITS.md`. The files arrived.
- No other font: the site's CSS names only Space Grotesk, with a generic `sans-serif` fallback.

## Colors changed for contrast

None: every role of the old palette passes the theme's contrast pairs as it was.

## Builder defaults kept

- **About, "Three floors":** the selected tab's background, Webflow's Tabs gray `#c8c8c8` (`.w-tab-link.w--current`), which the site's own tab style never replaced. Kept on `.sk-tabs__tab[aria-selected="true"]`.
- **Blog posts, quotes:** the light gray left rule of Webflow's `blockquote`, `#e2e2e2`. Kept on `.sk-prose blockquote`.

To use the theme's own styles instead, delete `src/styles/theme/builder-defaults.css`, its import in `src/styles/global.css`, and the `--color-builder-*` colors in the site's preset.

## Not carried over

- **The password page** (`401.html`): Webflow's default protected-page template. No page of the site is password-protected, and the page doesn't carry over.
- **The forms:** the newsletter form in the footer and the tour request form on Contact, with its heading "Request a tour" and its line "Tell us when suits you and we will save you a desk for the day. Fields marked * are required." Both are listed under "Forms", for the kit's contact form in a later release. The footer keeps the Newsletter column's title and text. With the form gone, Contact's details sit in three columns where they were one column beside the form.
- **Draft item:** the blog post "Getting the Mill Ready for Winter" (`getting-the-mill-ready-for-winter`) is a draft, with no live URL. See "Collections".

## Missing pieces

- **Font:** the export's `@font-face` for Space Grotesk points at no file (`url('../images/')`): Webflow's export leaves out uploaded fonts. The owner supplied the file (see "Fonts").
- **404 page:** the export's `404.html` is Webflow's default ("404", "Page Not Found", "The page you are looking for doesn't exist or has been moved"), so the 404 page is written anew (see "Pages").
- **Favicon and touch icon:** the export's `favicon.ico` and `webclip.png` are Webflow's own defaults, showing Webflow's logo, and weren't carried. The owner supplied the site's own, which are in place.
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
- **Space Grotesk:** use the owner's files, `fonts/space-grotesk-latin-wght-normal.woff2` (the variable font for weights 300 to 700) and its license, `fonts/OFL.txt`: Space Grotesk by Florian Karsten, SIL Open Font License 1.1, from Fontsource. (given in advance)
- **Any other font:** the site uses none. (given in advance)
- **The production URL:** `https://cobbleford.us.hostsmith.link`, in `src/site.config.ts`. (given in advance)
- **The primary locale's tag:** `en-US`. (given in advance)
- **A default Open Graph image:** yes, the owner's `og-image.jpg`, 1200 by 630 pixels, for every page without its own: `/assets/images/cobbleford-og.jpg`, as `seo.ogImage`. (given in advance)
- **The favicon and the touch icon:** the export's `favicon.ico` and `webclip.png` are Webflow's own defaults (SHA-1 `743a2c39…` and `8f20cc5b…`), so they weren't carried. The owner's `favicon.ico` and `apple-touch-icon.png` are `public/favicon.ico` and `public/apple-touch-icon.png`. (given in advance)

## Alt text written

None: every image the pages show had its alt text in the export or the CSV. The amenity icons were decorative (`alt=""`) and are the kit's icons, hidden from assistive technology.

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
