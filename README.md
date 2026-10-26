# Cobbleford Co-Working

The website of Cobbleford Co-Working, a coworking space in a restored 1920s woolen mill: hot desks, dedicated desks and private offices, member events and tours. It moved here from Webflow on 2026-10-26; `.hostsmith/migration-report.md` says what moved, what changed and what the owner still has to approve.

The site is built with the [Hostsmith site kit](https://github.com/hostsmith/site-kit-astro), on [Astro](https://astro.build), from the kit's `webflow` example. Its content is in `src/content/`, as Markdown and YAML: the pages, the blog posts (`posts`, at `/blog`), the team (`team`, at `/team`) and the settings. Its look is the theme in `src/styles/theme/`, ported from the Webflow design.

```bash
npm ci
npm run dev     # local preview with live reload
npm run build   # writes the static site to dist/
```

The business facts, audience, voice and contacts are in `.hostsmith/brief.md`. Agents start with `AGENTS.md`. Third-party files, such as the font and the photos, are listed in `CREDITS.md`.

The kit isn't affiliated with Webflow. The site holds no Webflow code, class names or files from a Webflow export.

In the migration report, `<site>` stands for the Webflow site's name in the export's file names.
