# Migration report

<!-- Written by the migration skill, step by step, from node_modules/@hostsmith/site-kit-astro/skills/migrate-webflow/references/report-template.md. Every section stays: one with nothing to report says so in a line. Step 10 removes these comments. -->

The site Cobbleford Co-Working moved from Webflow to this repository on 2026-10-26, from the exports listed under "Sources". This report lists what moved, what changed, what didn't carry over, and what the owner needs to decide before the site goes to production.

## For the owner to approve

- [ ] <decision, and where it's described below>

## Sources

| File | Size | Modified |
| --- | --- | --- |
| `<site>.webflow` (the code export, an unzipped folder) | 2,144,922 bytes | 2026-10-24 |
| `export-demo - Blog Posts - 6ad49570acec9ae2790c9630.csv` | 13,581 bytes | 2026-10-25 |
| `export-demo - Team - 6ad49566944eb9e842c48787.csv` | 1,482 bytes | 2026-10-25 |

The site has no custom domain, and its `webflow.io` address publishes no sitemap, so there is none. The answers given in advance are `answers.md`, copied to `.hostsmith/snapshot/answers.md`.

The snapshot is in `.hostsmith/snapshot/`, which git ignores. It can be deleted once the owner has approved the site.

## Pages

| Page | URL | Sections |
| --- | --- | --- |
| Home (`home`) | `/` | `hero` (image-right), `steps`, `split` (the tour), `services-grid` (amenities, with icons), `testimonials`, `photo-figures` (site-local: "By the numbers"), `collection-list` (the 3 newest posts), `cta` (card, accent) |
| Membership (`membership`) | `/membership` | `hero` (page), `plan-cards` (site-local), `faq-aside` (site-local) |
| About (`about`) | `/about` | `hero` (page), `split` (our story), `services-grid` (values, without icons), `tabs` (the floors), `collection-list` (the team), `cta` (card, accent) |
| Blog (`blog`) | `/blog` | `hero` (page), `collection-list` (every post) |
| Contact (`contact`) | `/contact` | `hero` (page), `info-groups` (site-local: visit, opening hours, get in touch), `embed` (the map) |
| 404 (`404`) | any missing page | `hero` (page), written anew: the export's `404.html` is Webflow's default text ("Page Not Found / The page you are looking for doesn't exist or has been moved"). The new text is in the site's voice, with links home and to the tour, for the owner to approve |

Every page keeps its old `<title>` and meta description. No page needed `template: custom`.

## Site-local types and Components

Site-local types, each with its component in `src/components/sections/site/`, its schema in `src/site.schema.ts` and its Decap type in `public/admin/config.site.yml`:

- **`photo-figures`** (Home): a photo beside a green-dark panel with an eyebrow, a title, a paragraph and four figures, the old "By the numbers" (`section_home-numbers`). The kit's `split` has the parts, but no dark tone.
- **`plan-cards`** (Membership): the three plans as cards, each with its name, price, period, what's included and a "Book a Tour" button (`plan-card_component`, a Component used three times). The kit's `pricing-list` shows only a label and a price.
- **`faq-aside`** (Membership): the questions beside a heading with an intro and a "How to choose a plan" button (`section_membership-faq`). The kit's `faq` has no intro or link.
- **`info-groups`** (Contact): "Visit", "Opening hours" and "Get in touch", each with a heading, lines, rows, links and a note (`contact_info`). The kit's `hours-location` has one heading and one note, so two notes and the group headings would have been lost.

Components found by repetition:

- **The call to action band** (`cta_component`), on Home, About and the blog post template: the library `cta` (card, accent). On the post template, its markup with its text from interface strings (`tourTitle`, `tourText`, `tourButton`).
- **The section header** (`section-header_component`), on every page: the library types' eyebrow and title.
- **The plan card** (`plan-card_component`), three times on Membership: `plan-cards`.
- **The page header** (`page-header_component`), on Membership, About, Blog and Contact: `hero` with the variant `page`.
- **The check list** (`check-list`), on Home's tour and in About's tabs: a Markdown list, which the theme draws with the old green ticks in a `split` or `tabs` body.
- **The navbar and the footer:** the layout's, from the settings.

Webflow elements replaced by kit parts:

- **Tabs** (`w-tabs`) on About, "Inside the mill": a `tabs` section, one item per floor.
- **The map embed** (`w-embed` with an OpenStreetMap frame) on Contact: an `embed` section.
- **The native accordions** (`details`) on Membership: the `faq-aside` type's own `details`, as the kit's `faq` has them.
- **The navbar's mobile menu** (a `details` element): the kit's header menu.

## Collections

| Collection | Webflow | Base path | Entries | Drafts | Breadcrumb |
| --- | --- | --- | --- | --- | --- |
| `posts` | Blog Posts | `/blog` | 4 | 1: "Getting the Mill Ready for Winter" (`draft: true`, no page) | off |
| `team` | Team | `/team` | 3 | none | off |

- **`posts` fields:** `title` (Name), `date` (Published Date), `description` (Summary), `image` and `imageAlt` (Main Image and Main Image Alt), `author` (the Author reference, a team member's slug), `draft`, and the body (Body, as Markdown). Title pattern: `{title} | Cobbleford Co-Working`, the interface string `postsPageTitle`. Description pattern: the Summary, the entry's `description`. The template shows the author's name after "by", with no link.
- **`team` fields:** `title` (Name), `category` (Role, so the list cards show it), `description` (Short Bio), `image` and `imageAlt` (Photo, empty for all three), `draft`. Title pattern: `{title} | Cobbleford Co-Working`, the interface string `teamPageTitle`. Description pattern: the Short Bio, the entry's `description`.
- **Lists:** Home shows the 3 newest posts, Blog every post, both newest first by `date`; About shows the team in the CSV's order (by slug, which is the same order: Hollis Whitcomb, Ines Calloway, Tobias Renn), each card linked to `/team/<slug>`. No list has a filter. The list cards show the date above a post's title and the role under a member's name, as the old cards did.
- **Breadcrumb:** both templates have only a back link ("← All articles", "← Meet the team"), so each collection has `breadcrumb: false`, and so does the site, whose pages aren't in folders.
- **Template text:** "← All articles", "by {author}", "← Meet the team", and the call to action's title, text and button are interface strings, in `ui` in `src/content/settings/site.en.yml`.

The Blog Posts body holds the email address and the phone number as the facts `{email}` and `{phone}`.

## Interactions

- **`i-ad0d0a50`** (IX3, timeline `t-e2dcface`): on scroll into view (top at 85%), once, every `section-header_component` faded in while moving up 15%, over 0.7 s, and skipped to the end under reduced motion. It's a simple entrance: `reveal: fade-up` on the 11 sections whose header was a `section-header_component` (Home: steps, amenities, testimonials, by the numbers, blog; Membership: FAQ; About: story, values, floors, team). The theme animates it over 0.7 s, and never under reduced motion. The kit reveals the whole section, where the old site moved only its header.

Webflow's inline style that hid the headers until its script ran isn't carried: the kit hides nothing without its own script.

## Embeds

- **Contact: the map,** an OpenStreetMap frame titled "Map placeholder showing open countryside": an `embed` section, `kind: map`, loaded on a click (given in advance). Its frame was a fixed 22rem high; it's `21:9`, the nearest aspect. Its caption is the old line under it.
- **The blog post "Remote Work Doesn't Have to Be Lonely: Inside Our Community Calendar":** its YouTube video, "These CATS are too FUNNY! | New Cat Videos", in the rich text, is a video link alone in its paragraph, which the kit renders as an embed that loads on a click.

## Forms

No form is carried over: the kit's contact form comes in a later release. The built pages submit nothing to Webflow.

- **Newsletter,** in the footer of every page (`wf-form-Newsletter`): a label "Email address", then one field: `newsletter-email`, type email, required, placeholder "you@example.com", autocomplete email. Button: "Join" ("Joining..." while it sends). Success: "Thanks! You are on the list for the next newsletter." Error: "Something went wrong. Please try again, or email hello@cobbleford.example." The footer keeps the column's heading and text, "Newsletter" and "Community events, open house dates and member perks, once a month.", without the form.
- **Tour Request,** on Contact (`wf-form-Tour-Request`), in a card headed "Request a tour" with the text "Tell us when suits you and we will save you a desk for the day. Fields marked * are required.":
  - "Name *": `name`, text, required, placeholder "Your name", autocomplete name;
  - "Email *": `email`, email, required, placeholder "you@example.com", autocomplete email;
  - "Phone": `phone`, tel, optional, placeholder "Optional", autocomplete tel;
  - "Preferred day": `preferred-day`, a select: "Any weekday" (empty value), Monday, Tuesday, Wednesday, Thursday, Friday;
  - "Plan of interest": `plan`, a select: "Not sure yet" (empty value), Hot Desk, Dedicated Desk, Private Office;
  - "Message": `message`, a text area, optional, up to 5,000 characters, placeholder "Tell us a little about your work and what you need.";
  - button "Request a Tour" ("Sending..." while it sends); success "Thanks! We will reply within one working day to confirm your tour."; error "Something went wrong. Please try again, or email hello@cobbleford.example."

  The card's heading and text belong to the form, so they wait with it. Until then, the Contact page shows the visit, hours and contact details, and the map.

## Fonts

| Family | Where it came from | License | Recommendation | Files |
| --- | --- | --- | --- | --- |
| Space Grotesk | An upload the export left out: both `@font-face` rules in `css/<site>.webflow.css` point at `url('../images/')`, weights 300 to 700 | SIL Open Font License 1.1, Florian Karsten | Host the variable WOFF2 with its `OFL.txt` | Arrived: the owner's `space-grotesk-latin-wght-normal.woff2` and `OFL.txt`, from Fontsource, in `public/assets/fonts/`, listed in `CREDITS.md` |

The site uses no other font. Webflow's own `webflow-icons` font, in `webflow.css`, isn't carried: nothing on the site used it.

## Colors changed for contrast

None. Every pair in the theme's contrast table passes with the old site's colors, as they were. The theme's error color, which the old site didn't define, is `#9b2c1c`, a brick red that fits the palette.

## Builder defaults kept

- **The selected tab on About** ("Inside the mill"): the old site's CSS never styled the current tab, so it showed `webflow.css`'s `.w-tab-link.w--current` background, grey `#c8c8c8`, behind the green label. It's kept as `--color-builder-tab-current` in `src/styles/theme/builder-defaults.css`.

To use the theme's own styles instead, delete `src/styles/theme/builder-defaults.css`, its import in `src/styles/global.css`, and the `--color-builder-*` colors in the site's preset.

## Not carried over

- **The forms:** the newsletter and the tour request (see "Forms").
- **The password page,** `401.html`: Webflow's, for protected pages. No page was protected.
- **Webflow's scripts:** `webflow.js`, jQuery from Webflow's CDN, and GSAP with ScrollTrigger from Webflow's CDN, which ran the interaction (see "Interactions").
- **The draft post** "Getting the Mill Ready for Winter" has an entry with `draft: true`, so it has no page, as on Webflow.
- **Differences in the port,** each kept to the kit's parts, never dropping content:
  - Home, "Take a Tour": its own section, a `split`, after the steps; its title is a section title (`h2`), where the old one was an `h3` in the steps section.
  - About, "Read the full story": a `split`'s link, which the theme draws as a primary button, as Home's "Book a Tour" in the other `split`; the old one was a secondary button.
  - Contact: the visit, hours and contact groups sit side by side, as the form beside them isn't carried yet.
  - The home and about sections reveal as a whole, where the old site moved only the section headers.

## Missing pieces

- **Fonts:** Space Grotesk, which the export left out (see "Fonts"). The owner sent its files.
- **Utility pages:** the export has `404.html` and `401.html`. Its `404.html` is Webflow's default text, so the 404 page is written anew (see "Pages").
- **Collections:** Blog Posts and Team each have a template page, `detail_blog.html` and `detail_team.html`, and a CSV. Nothing is missing.
- **The favicon and the touch icon:** the export had only Webflow's defaults. The owner sent their own (see "Answers").
- **Team photos:** Team has 3 entries without a photo (Hollis Whitcomb, Ines Calloway, Tobias Renn). The owner hasn't sent them yet: the cards and the member pages show a placeholder until they arrive.
- **What the export never holds:** the CMS content, which comes from the CSVs, and each collection list's settings, which were given in advance (see "Answers").

## Answers

All of these were given in advance, in `.hostsmith/snapshot/answers.md`:

- **A live address:** none. The site has no custom domain, and its `webflow.io` address publishes no sitemap. Nothing was fetched from it.
- **A rerun:** no, the first migration in this site.
- **Replacing the example's content:** yes, all of it.
- **Webflow Localization:** no, one locale.
- **Missing CSV exports:** none. Blog Posts and Team are the only collections.
- **Blog Posts' base path:** `/blog`.
- **Team's base path:** `/team`.
- **Space Grotesk:** the owner's files, `space-grotesk-latin-wght-normal.woff2`, the variable font for weights 300 to 700, and `OFL.txt`. Space Grotesk by Florian Karsten, under the SIL Open Font License 1.1, from Fontsource.
- **Any other font:** none.
- **The production URL:** `https://cobbleford.us.hostsmith.link`, in `src/site.config.ts`.
- **The primary locale's tag:** `en-US`.
- **A default Open Graph image:** yes, the owner's `og-image.jpg`, 1200 by 630 pixels, as `/assets/images/cobbleford-og-image.jpg`, the settings' `seo.ogImage`.
- **The favicon and the touch icon:** the export's `favicon.ico` and `webclip.png` are Webflow's defaults (their SHA-1 hashes match Webflow's), so neither was carried. The owner's `favicon.ico` and `apple-touch-icon.png` are `public/favicon.ico` and `public/apple-touch-icon.png`.
- **The Contact page's map embed:** load it on a click.
- **Typos and copy:** keep the text exactly as it is, and list any typo in the report.
- **Blog Posts' title pattern:** `{Name} | Cobbleford Co-Working`; description pattern: the Summary.
- **Team's title pattern:** `{Name} | Cobbleford Co-Working`; description pattern: the Short Bio.
- **What the author reference shows:** the team member's Name, as text after "by", with no link.
- **The home page's blog list:** the 3 newest published posts, newest first, by Published Date.
- **The Blog page's list:** every published post, newest first, by Published Date.
- **The About page's team list:** all three members, in the CSV's order (Hollis Whitcomb, Ines Calloway, Tobias Renn), each card linked to the member's page under `/team`.
- **Filters:** no list has one.

## Alt text written

None. Every image in the export and in the CSVs had its alt text. The amenity icons were decorative (`alt=""`), and are drawn as the kit's icons, hidden from assistive technology.

## Links to check

None. The two links to posts in the pages, `/blog/from-woolen-mill-to-workspace` (About) and `/blog/hot-desk-dedicated-desk-or-private-office` (Membership, and in the post "Inside Our Community Calendar"), are both published. Every post's author is a team member's slug.

## Fidelity check

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
