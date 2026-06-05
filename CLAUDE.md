# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # start dev server at localhost:3000
yarn build        # production build
yarn lint         # ESLint via next lint
yarn sass         # watch and compile SCSS (run alongside dev)
```

No test suite is configured.

## Architecture

This is a Next.js 14 (App Router) personal portfolio showcasing interactive Three.js / React Three Fiber projects.

### Project page structure

Each project lives under `src/app/project/<slug>/` and follows a strict 6-file pattern documented in `CREATING_A_PROJECT.md`:

```
page.tsx                  ← server page: metadata + dynamic import of PageClient
<Name>PageClient.tsx      ← "use client": wires useControls + renders ProjectPageClient
<Name>Controls.tsx        ← control definitions + exported props type (older projects only)
Scene.tsx                 ← Canvas + lights + Environment
Model.tsx                 ← Three.js geometry and animation
project-information.json  ← metadata (name, description, slug, controls schema, …)
```

### Data flow

`project-information.json` drives almost everything at runtime:

- `controls` array (typed as `ControlSchema[]` in `src/types/project.ts`) declares interactive sliders, toggles, color pickers, etc.
- `ProjectPageClient` (generic component at `src/components/ProjectPageClient`) reads `info.controls`, builds default state via `useControls`, and passes live values into its `children` render-prop.
- `ControlsMapper` (`src/components/ControlsMapper`) maps the schema to the matching UI control components in `src/components/controls/`.
- `ProjectPageLayout` (`src/components/ProjectPageLayout`) composes the full layout: `Header` + `SideMenu` + `ControlsMapper` + scene area.

### Preferred pattern (current)

Newer projects use the **schema-driven** approach — controls are declared in `project-information.json` and the generic `ProjectPageClient` handles state. Older projects used a manual `*Controls.tsx` + `useControls` setup directly in the PageClient; both styles exist in the codebase.

### Key files

| Path | Purpose |
|---|---|
| `src/data/projects.json` | Home-page card list; each entry must have a `url` matching the folder slug |
| `src/types/project.ts` | `ProjectInfoType`, `ProjectCardType`, `ControlSchema` union |
| `src/lib/projects.ts` | `getProjects`, `getProjectIndex`, `generateProjectMetadata` |
| `src/lib/github.ts` | Derives GitHub source URL from slug |
| `src/components/hooks/useControls.ts` | `useState` + `useCallback` wrapper for control state |

### Styling

CSS Modules (`.module.scss`) per component. Global styles in `src/app/globals.css`. Shared SCSS variables/mixins in `src/styles/_references.scss` — import it at the top of any `.scss` file that needs tokens.
