# TypeSafe UI

Reusable React components and interactive interface patterns for TypeSafe AI projects, built with shadcn/ui, Base UI, and Tailwind CSS.

**Small parts. Clear interfaces.** An independent community project maintained under `BunsDev`, not an official TypeSafe AI component library or SDK.

[Contributing](CONTRIBUTING.md) · [Agent guide](AGENTS.md) · [TypeSafe API documentation](https://docs.typesafe.ai/api)

## What this repository provides

A Turborepo + pnpm workspace with a Next.js component browser, source previews, install/import examples, and an interactive Lab. The UI uses the shadcn `base-nova` style, Base UI primitives, Tailwind v4, and RTL-aware components.

The site follows the OpenCoven UI layout: a sticky topbar, grouped component rail, per-component Preview/Source and Install/Import tabs, and an “On this page” outline. Its TypeSafe-inspired theme uses pink primary, teal live-state accents, dark mode by default, IBM Plex typography, and a dot-grid background.

`@workspace/ui` is a **private workspace package**, not a published npm package. The imports below work inside this monorepo. For another application, deliberately port the components, styles, dependencies, and aliases you need; do not assume `npm install typesafe-ui` or a hosted registry exists. A visual “live” state is not proof of a real Jev API call.

## Getting started

Use the pnpm version pinned in [package.json](package.json), currently `10.33.4`. The root manifest declares Node.js `>=20`; use a Node version supported by the checked-in Next.js dependency as well. Node.js 22+ is a practical development baseline.

```sh
git clone https://github.com/BunsDev/typesafe-ui.git
cd typesafe-ui
# Install/activate the pnpm version declared in package.json.
# Where Corepack is installed, `corepack enable` enables its package-manager shims.
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed by the development server, normally `http://localhost:3000`. The library is at `/`, and interactive scenes are at `/lab`. Press `d` to toggle dark mode and `⌘K` to search components.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run the web application through Turborepo. |
| `pnpm build` | Build the workspace. |
| `pnpm lint` | Run workspace lint tasks. |
| `pnpm typecheck` | Run workspace TypeScript checks. |
| `pnpm format` | Format source files; this writes changes. |

There is currently no root `test` or browser-test script. Lint, typecheck, and build results must not be described as unit or end-to-end test coverage.

## Layout

```text
apps/web/
  app/                 Next.js routes, layout, fonts, and metadata
  components/          Site shell, component cards, demos, and Lab scenes
  lib/                 Site config, component registry, source loader, and shiki
packages/
  ui/                  @workspace/ui: components, hooks, utilities, and styles
  eslint-config/       Shared lint configuration
  typescript-config/   Shared TypeScript configuration
```

## Adding a component

1. Add a component against the web app. The existing shadcn configuration places reusable components in `packages/ui/src/components`.

   ```sh
   pnpm dlx shadcn@latest add popover -c apps/web
   ```

   This is a generator operation that can change source and dependencies. Review its diff and the lockfile rather than treating it as a read-only command.

2. Register the component in `apps/web/lib/registry.ts`: id, title, group, description, exports, and supported states.
3. Add a demo using the same id in `apps/web/components/demos.tsx`.
4. Verify its preview, source, import example, keyboard behavior, themes, narrow layout, and RTL behavior.

The library reads component source from disk at build time and highlights it with shiki. Keep registry ids, exported paths, source paths, and demos aligned.

## Using components

```tsx
import { Button } from "@workspace/ui/components/button"
```

Base UI triggers compose through the `render` prop rather than Radix-style `asChild`. A `Button` rendered as a link needs `nativeButton={false}`. Keep provider credentials and application-specific network clients out of reusable client components.

## Theming and RTL

Tokens live in `packages/ui/src/styles/globals.css`: light values in `:root`, dark values in `.dark`. TypeSafe-oriented tokens include `--teal`, `--success`, `--warning`, and `--dot`. Fonts are wired through `next/font` in `apps/web/app/layout.tsx` and exposed as `--font-sans` and `--font-mono`.

Site name, tagline, links, navigation, language, and direction live in `apps/web/lib/site.ts`. The shadcn configuration has `"rtl": true`. Set `dir` to `"rtl"` and `lang` to the intended locale to update the root layout and `DirectionProvider`. Prefer logical CSS properties so components work in both directions.

## Related community projects

| Repository | Role |
| --- | --- |
| [typesafe-ai-playground](https://github.com/BunsDev/typesafe-ai-playground) | Interactive Jev experiments and integration demos. |
| [clarity-judge](https://github.com/BunsDev/clarity-judge) | Separate, named writing-quality checks. |
| [typesafe-router](https://github.com/BunsDev/typesafe-router) | Closed-set tool and model routing, separate from execution. |
| [typesafe-ui](https://github.com/BunsDev/typesafe-ui) | Reusable components and interface patterns. |

These are separate repositories, not an automatically integrated or officially supported product suite. The proposed GitHub description and discovery topics are recorded in [repository-metadata.json](repository-metadata.json); that file does not change GitHub settings automatically.
