# typesafe-ui

shadcn-style reusable components and blocks for using TypeSafe AI.

Turborepo + pnpm monorepo scaffolded with shadcn/ui (`base-nova` style on Base UI, Tailwind v4, RTL-ready, pointer cursors on buttons).

## Layout

```
apps/
  web/                  Next.js 16 app (App Router, React 19)
packages/
  ui/                   @workspace/ui — shared components, hooks, lib, globals.css
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

Press `d` in the browser to toggle dark mode.

## Adding components

Run the shadcn CLI against the `web` app. Components land in `packages/ui/src/components`.

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Then import them from the `ui` package:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Theming

Design tokens live in `packages/ui/src/styles/globals.css` as CSS variables (light in `:root`, dark in `.dark`). The app's fonts are wired in `apps/web/app/layout.tsx` via `next/font` and exposed as `--font-sans` and `--font-mono`.

## RTL

`components.json` has `"rtl": true`, so every component the CLI adds uses logical properties (`ps-`/`pe-`/`ms-`/`me-`). Direction is set in one place: `apps/web/lib/site.ts`. Change `dir` to `"rtl"` and `lang` to your locale, and the root layout will set `<html dir lang>` and the `DirectionProvider` accordingly. Swap the sans font for a script-appropriate one (for example `Noto_Sans_Arabic`) in the layout.
