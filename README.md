# Maitrey Bharambe — Portfolio

A single-page Neo-Brutalist editorial portfolio. Next.js (App Router), JavaScript, Tailwind CSS v4, Lucide icons. Fully static, no backend or database.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Where things live

| What | File |
| --- | --- |
| Name, email, social links, nav, hero copy, identity strip, working principles | `src/data/profile.js` |
| Projects | `src/data/projects.js` |
| Experience | `src/data/experience.js` |
| Skills | `src/data/skills.js` |
| Education | `src/data/education.js` |
| Design tokens (colours, borders, shadow offset, type) | `:root` in `src/app/globals.css` |
| Font (Host Grotesk, registered as `NeoBrutalismHost`) | `public/fonts/HostGrotesk.woff2` |

## Social links

In `src/data/profile.js` set `github` and `linkedin` to full URLs. While they are `null` the buttons are hidden. `availability` is also `null` by default; set it to a short string to show a label in the nav.

## Add or update a project

Add an object to the array in `src/data/projects.js`. The page renders the array in order. Every field except `id`, `name`, `category` and `projectType` is optional, and empty fields (including links) are not rendered.

```js
{
  id: "my-project",
  code: "PRJ-07",
  name: "My Project",
  category: "Machine Learning",
  projectType: "software", // pipeline | classifier | vision | devtool | rl | software | pending
  featured: false,         // full-width feature layout (use sparingly)
  shortDescription: "",
  problem: "",
  implementation: ["..."],
  technologies: ["Python"],
  contribution: "",
  achievement: null,       // e.g. "Runner-up"
  results: null,           // verified outcomes only
  diagram: { label: "Pipeline", kind: "chain", steps: ["A", "B", "C"] },
  image: null,
  githubUrl: null,
  liveUrl: null,
}
```

**NexLink** is a placeholder entry (`projectType: "pending"`). Once you have reviewed the repository, fill in its description, implementation, technologies, `githubUrl` and change `projectType`.

## Add screenshots

1. Put the file in `public/images/projects/`.
2. Set `image` on the project:

```js
image: { src: "/images/projects/dam-rtm.png", alt: "Describe what the screenshot shows", width: 1600, height: 900 }
```

Use real screenshots and real result plots only. Without an image the card shows a typographic diagram instead.

## Update experience

Edit `src/data/experience.js`. Each entry takes `role`, `organization`, `dates`, `points` (bullet strings), `tags` and `highlight` (yellow row). The **CSRE, IIT Bombay** entry has `dates`, `points` and `tags` left empty for you to fill.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import it at vercel.com/new (framework is detected automatically).
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your production URL (used for Open Graph metadata).

The page revalidates daily so the footer year stays current.
