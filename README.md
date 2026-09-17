# typesafe-ui

shadcn-style reusable components and blocks for using TypeSafe AI.

Small parts. Clear interfaces.

A Turborepo + pnpm monorepo scaffolded with shadcn/ui (`base-nova` style on Base UI, Tailwind v4, RTL-ready) and styled with the TypeSafe AI brand: pink primary, teal for live state, dark by default, IBM Plex type, and a dot-grid ground. The web app follows the OpenCoven UI layout: a sticky topbar, a grouped component rail, per-component cards with Preview/Source and Install/Import tabs, an "On this page" outline, and an interactive Lab.

## Layout

```
apps/
  web/                  Next.js 16 site (App Router, React 19)
    app/                / (library) and /lab (scenes)
    components/         site shell, component cards, demos, lab scenes
    lib/                site config, component registry, source loader, shiki
packages/
  ui/                   @workspace/ui — components, hooks, lib, globals.css
  eslint-config/        @workspace/eslint-config
  typescript-config/    @workspace/typescript-config
```

## Getting started

```bash
pnpm install
pnpm dev          # runs apps/web on http://localhost:3000
pnpm build
pnpm lint
pnpm typecheck
```

Press `d` in the browser to toggle dark mode and `⌘K` to search components.

## Adding a component

1. Install it with the shadcn CLI against the `web` app. It lands in `packages/ui/src/components`.

   ```bash
   pnpm dlx shadcn@latest add popover -c apps/web
   ```

2. Add an entry to `apps/web/lib/registry.ts` (id, title, group, description, exports, states).
3. Add a demo keyed by the same id in `apps/web/components/demos.tsx`.

The library page reads each component's source from disk at build time and highlights it with shiki, so the Source tab, install command, and import statement come for free.

## Using components

```tsx
import { Button } from "@workspace/ui/components/button"
```

Base UI triggers compose through the `render` prop rather than `asChild`. A `Button` rendered as a link needs `nativeButton={false}`.

## Theming

Design tokens live in `packages/ui/src/styles/globals.css` as CSS variables, light in `:root` and dark in `.dark`. The TypeSafe palette adds `--teal`, `--success`, `--warning`, and `--dot` on top of the shadcn set. Fonts are wired in `apps/web/app/layout.tsx` via `next/font` and exposed as `--font-sans` and `--font-mono`.

Site name, tagline, links, and nav live in `apps/web/lib/site.ts`.

## RTL

`components.json` has `"rtl": true`, so every component the CLI adds uses logical properties. Direction is set in `apps/web/lib/site.ts`. Change `dir` to `"rtl"` and `lang` to your locale, and the root layout will set `<html dir lang>` and the `DirectionProvider` accordingly.
