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

## Deploying to Cloudflare

The site builds to a fully static bundle in `out/` (`output: "export"` in
`next.config.ts`), so it deploys as Cloudflare **static assets** — no Workers
runtime, no OpenNext adapter, no cold starts. Everything fits the free tier.

### Option A — connect the Git repo (recommended)

Push to GitHub, then in the Cloudflare dashboard: **Workers & Pages → Create →
Import a repository**, pick the repo, and set:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | 22 (already pinned by `.node-version`) |

Every push to `main` then redeploys automatically.

### Option B — deploy from your machine

```bash
npx wrangler login
```

```bash
npm run deploy
```

`deploy` builds and uploads in one step, using `wrangler.jsonc`. To preview the
exact production bundle locally before shipping:

```bash
npm run preview:dist
```

### Custom domain

After the first deploy, attach `evatov.uz` under the project's **Custom domains**
tab. If the domain's DNS is already on Cloudflare, that is the whole process.

### Two things that are easy to get wrong

- `public/_headers` sets `Content-Type: image/png` on `/icon` and
  `/opengraph-image`. Next emits those generated images as **extensionless**
  files, so without it they are served as `application/octet-stream` and the
  favicon and social card silently break. Do not delete that file.
- Metadata routes carry `export const dynamic = "force-static"`, which
  `output: "export"` requires. Removing it fails the build.

If you later add an API route, server action or ISR, this static path stops
working — you would move to `@opennextjs/cloudflare` and drop `output: "export"`.

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
