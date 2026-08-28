# evatov.uz — personal portfolio

Portfolio site for Akbar Evatov, Software Engineer. Dark-first "developer command
center" aesthetic with a `⌘K` command palette, an interactive mini terminal, and a
resume preview modal.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Animation | Framer Motion |
| Icons | lucide-react (brand marks inlined — lucide v1 dropped its brand set) |
| Command palette | `cmdk` + Radix Dialog |
| Theming | `next-themes`, class strategy, dark by default |

## Commands

```bash
npm run dev
```

```bash
npm run build
```

```bash
npx eslint .
```

## Editing content

All copy lives in `src/data/` — no component edits needed for routine updates.

| File | Contains |
| --- | --- |
| `src/data/site.ts` | Name, role, tagline, email, social URLs, resume path, nav items |
| `src/data/projects.ts` | Project cards: problem, architecture notes, tech tags, links, card artwork |
| `src/data/skills.ts` | The six competency groups |
| `src/data/journey.ts` | The three background pillars and the three strengths |

The resume PDF is `public/akbar-evatov-resume.pdf`. Replace that file to update both
the preview modal and every download button.

## Structure

```
src/
  app/            layout (metadata, JSON-LD), page, globals.css,
                  generated icon + OG image, sitemap, robots
  components/
    layout/       site header (scroll-aware nav) and footer
    sections/     hero, projects, skills, journey, contact
    providers/    theme provider, UI provider (shared overlay state)
    ui/           reveal, buttons, badges, brand icons, project artwork
    command-palette.tsx  ⌘K / Ctrl+K palette
    resume-modal.tsx     PDF preview + download
    terminal-drawer.tsx  collapsible mini shell
  data/           all site content
  hooks/          mounted, clipboard, active-section
  lib/            cn() class merge helper
```

### Notable implementation details

- **Design tokens** are raw CSS variables in `globals.css`, exposed to Tailwind via
  `@theme inline` so they can swap at runtime for the theme toggle.
- **Overlay state** (palette, resume modal, terminal) lives in one `UIProvider`, so
  the header, hero, footer and terminal can all open each other's surfaces.
- **The command palette doubles as mobile navigation** — the header's search button
  opens it on touch devices, where `⌘K` is unavailable.
- **Project artwork is generated SVG**, not screenshots, so it never goes stale.
- **Reduced motion** is honoured throughout; a `<noscript>` rule pins revealed
  content visible if JavaScript never runs.

## Terminal commands

`help`, `bio` / `whoami`, `skills`, `projects` / `ls`, `contact`, `resume`, `theme`,
`goto <section>`, `clear`.

## Before deploying — please verify

These were inferred rather than taken from the CV:

- **LinkedIn and Telegram URLs** in `src/data/site.ts` are guessed from the GitHub
  username (`akbarevatov`). Confirm or replace them.
- **Project repo links** all point at the GitHub profile, because the CV linked
  "GitHub" generically rather than per-repo. Point them at the real repositories.
- **Location** is set to Tashkent; the CV does not state a current city.
- **`site.url`** is `https://evatov.uz` — it drives canonical URLs, the sitemap and
  OG tags. Change it if you deploy elsewhere.

## Settled decisions

- **The Journey pillars** are Mathematics / Applied problem solving / Engineering
  craft. Teaching and marketplace-management experience are deliberately excluded —
  the site presents only the engineering, mathematics and competition track.
