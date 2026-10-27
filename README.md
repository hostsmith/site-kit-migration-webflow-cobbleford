# Cobbleford Co-Working

The website of Cobbleford Co-Working, a co-working space in a restored 1920s woolen mill at 214 Millrace Road, Cobbleford. It moved from Webflow in October 2026: `.hostsmith/migration-report.md` says what moved and what changed.

It's built with the [Hostsmith site kit](https://github.com/hostsmith/site-kit-astro), on [Astro](https://astro.build), from the kit's `webflow` example. Its content is in `src/content/`, as Markdown and YAML: the pages, the blog posts (`posts`, at `/blog`), the team (`team`, at `/team`) and the settings. Its look is the theme in `src/styles/theme/`.

```bash
npm ci
npm run dev     # local preview with live reload
npm run build   # writes the static site to dist/
```

The business facts, audience and voice are in `.hostsmith/brief.md`. Agents start with `AGENTS.md`. Third-party files, such as the photos and the font, are listed in `CREDITS.md`.

The code from the kit's `webflow` example is under [MIT-0](https://github.com/hostsmith/site-kit-astro/blob/main/examples/LICENSE), so the site owes no notice for it.
