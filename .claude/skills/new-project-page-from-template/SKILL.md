---
name: new-project-page-from-template
description: |
  Create a new project page and minimal template files from a project-type-aware page template.
  Use when you want to quickly scaffold a small project page in this repository from an existing pattern.
inputs:
  - name: route
    description: The page route slug (e.g., "ascii-filter").
    required: true
  - name: purpose
    description: Short description of the project purpose (e.g., "3d torus with ascii filter").
    required: true
  - name: scope
    description: Optional. "workspace" (default) or "user" for where to save templates/presets.
    required: false
outputs:
  - files: A list of created files and their paths
  - instructions: Steps to run, test, and customize the scaffold
---

Goal

Create a small project scaffold for a new page at `src/app/project/{route}` using the given `purpose` to detect the project type and generate an appropriate template.

Behavior rules

- Infer product type from `purpose` using keywords (3d, animation, css, shader, audio, static, interactive).
- For 3D projects (keywords: "3d", "torus", "scene", "model", "shader", "gl"), generate these files:
  - `page.tsx` (page wrapper using `ProjectPageLayout` if present)
  - `Model.tsx` (placeholder React component exporting the 3D model setup)
  - `Scene.tsx` (Three.js/React-Three-Fiber scene scaffold)
  - `Controls.tsx` (UI controls component to adjust parameters)
  - `project-information.json` (metadata: title, description, tags)
- For animation/CSS projects (keywords: "animation", "css", "transition", "keyframes"), generate:
  - `page.tsx`, `Animation.tsx`, `Controls.tsx` (if interactive), `project-information.json`.
- For simple static or content projects, generate a `page.tsx` and `project-information.json` only.

Implementation details

- Use TypeScript React components consistent with repository conventions.
- Import local `ProjectPageLayout` where applicable.
- Keep generated code minimal but functional with TODO comments marking where to implement specifics.
- Ensure default exports match existing repo patterns (export default function Page()).
- Provide example `project-information.json` with `title`, `description`, `date`, and `tags`.

Scaffolding template (example output for a 3D project)

- src/app/project/{route}/page.tsx
- src/app/project/{route}/Model.tsx
- src/app/project/{route}/Scene.tsx
- src/app/project/{route}/Controls.tsx
- src/app/project/{route}/project-information.json

Usage examples

1) Minimal invocation (fill route and purpose):

- route: ascii-filter
- purpose: 3d torus with ascii filter

2) Prompt example to paste to the agent:

"Create a new project page for route `ascii-filter` with purpose `3d torus with ascii filter`. Generate a 3D project scaffold (page, Scene, Model, Controls, project-information.json) suitable for this repository's conventions, and include TODO markers where I should add real model and shader code."

Customization suggestions

- Add custom presets per product type (e.g., `preset-3d`, `preset-css`) stored in `.github/prompts/` or `{{VSCODE_USER_PROMPTS_FOLDER}}`.
- Allow an optional `template` argument to copy an existing project as a starting point.

What I create

- A clear set of files in `src/app/project/{route}` following repository patterns.
- A `project-information.json` to appear in project lists.
- Short usage instructions explaining how to open the page and where to implement the model and shaders.
