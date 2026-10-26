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

## Site-local types and Components

## Collections

## Interactions

## Embeds

## Forms

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

## Missing pieces

- **Fonts:** Space Grotesk, which the export left out (see "Fonts"). The owner sent its files.
- **Utility pages:** the export has `404.html` and `401.html`. Its `404.html` is Webflow's default text, so the 404 page is written anew (see "Pages").
- **Collections:** Blog Posts and Team each have a template page, `detail_blog.html` and `detail_team.html`, and a CSV. Nothing is missing.
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

## Alt text written

## Links to check

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
