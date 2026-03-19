# Creating a New Project

Follow these steps to add a new Three.js project page. Each step maps to one file.

---

## 1. Create the folder

```text
src/app/project/my-project-slug/
```

The slug must match the folder name exactly — it's used in the URL, the GitHub source link, and the project index.

---

## 2. Add `project-information.json`

```json
{
  "projectName": "My Project Name",
  "description": "Short description of the project.",
  "date": "YYYY-MM-DD",
  "technologies": "Three.js / React.js",
  "isInteractive": true,
  "inspirationLink": "https://example.com",
  "inspirationText": "Inspiration source name"
}
```

> `inspirationLink` and `inspirationText` are optional — remove them if not needed.

---

## 3. Add the project to `src/data/projects.json`

```json
{
  "projectName": "My Project Name",
  "description": "Short description.",
  "url": "my-project-slug",
  "cardImage": "my-project.png",
  "technologies": ["Three.js", "React"],
  "tags": ["Your Tag"]
}
```

Add the matching card image to `public/images/`.

---

## 4. Define props and create `MyProjectControls.tsx`

```tsx
"use client";

import Slider from "@/components/controls/Slider";
import ColorInput from "@/components/controls/ColorInput";
import Toggle from "@/components/controls/Toggle";

export type MyProjectProps = {
  speed: number;
  color: string;
  wireframe: boolean;
};

type MyProjectControlsProps = MyProjectProps & {
  onChange: (patch: Partial<MyProjectProps>) => void;
};

export default function MyProjectControls({ speed, color, wireframe, onChange }: MyProjectControlsProps) {
  return (
    <>
      <Slider label="Speed" value={speed} min={0} max={1} step={0.01} onChange={(v) => onChange({ speed: v })} />
      <ColorInput label="Color" value={color} onChange={(v) => onChange({ color: v })} />
      <Toggle label="Wireframe" value={wireframe} onChange={(v) => onChange({ wireframe: v })} />
    </>
  );
}
```

Available controls: `Slider`, `ColorInput`, `Toggle`, `TextInput`, `NumberInput`.

---

## 5. Create `MyProjectPageClient.tsx`

```tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import SceneLoader from "@/components/SceneLoader";
import MyProjectControls, { type MyProjectProps } from "./MyProjectControls";
import { useControls } from "@/components/hooks/useControls";
import type { SideMenuInfoProps } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function MyProjectPageClient({ projectName, description, technologies, slug, inspirationLink, inspirationText }: SideMenuInfoProps) {
  const [props, update] = useControls<MyProjectProps>({
    speed: 0.5,
    color: "#ffffff",
    wireframe: false,
  });

  return (
    <>
      <SideMenu
        projectName={projectName}
        description={description}
        technologies={technologies}
        slug={slug}
        inspirationLink={inspirationLink}
        inspirationText={inspirationText}
        controls={<MyProjectControls {...props} onChange={update} />}
      />
      <Suspense fallback={<SceneLoader />}>
        <Scene myProps={props} />
      </Suspense>
    </>
  );
}
```

---

## 6. Create `Scene.tsx`

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Model";
import type { MyProjectProps } from "./MyProjectControls";

const Scene = ({ myProps }: { myProps: MyProjectProps }) => {
  return (
    <Canvas style={{ background: "black" }}>
      <directionalLight position={[0, 3, 2]} intensity={3} />
      <Environment preset="city" />
      <Model myProps={myProps} />
    </Canvas>
  );
};

export default Scene;
```

---

## 7. Create `Model.tsx`

Build your Three.js model here. Receive `myProps` and use them to drive geometry, materials, or animations.

---

## 8. Create `page.tsx`

```tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import ProjectPageLayout, { generateProjectMetadata } from "@/components/ProjectPageLayout";
import type { ProjectInfoType } from "@/types/project";

const MyProjectPageClient = dynamic(() => import("./MyProjectPageClient"), { ssr: false });

const info = projectInfo as ProjectInfoType;
const SLUG = "my-project-slug";

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return (
    <ProjectPageLayout info={info} slug={SLUG}>
      <MyProjectPageClient
        projectName={info.projectName}
        description={info.description}
        technologies={info.technologies}
        slug={SLUG}
        inspirationLink={info.inspirationLink}
        inspirationText={info.inspirationText}
      />
    </ProjectPageLayout>
  );
}
```

---

## Final folder structure

```text
src/app/project/my-project-slug/
  project-information.json      ← project metadata (name, description, date…)
  page.tsx                      ← Next.js server page (boilerplate, copy-paste)
  MyProjectPageClient.tsx       ← state via useControls + SideMenu + Scene
  MyProjectControls.tsx         ← control definitions + exported prop types
  Scene.tsx                     ← Canvas + lights + Environment + Model
  Model.tsx                     ← Three.js geometry and animations
```

---

## Checklist

- [ ] Folder created with correct slug
- [ ] `project-information.json` filled in
- [ ] Entry added to `src/data/projects.json`
- [ ] Card image added to `public/images/`
- [ ] `MyProjectControls.tsx` — props type exported, `onChange` pattern used
- [ ] `MyProjectPageClient.tsx` — `useControls` with defaults, `slug` passed to `SideMenu`
- [ ] `Scene.tsx` — `Canvas` + model wired up
- [ ] `Model.tsx` — geometry built
- [ ] `page.tsx` — `ProjectPageLayout` + `generateProjectMetadata` used, `SLUG` constant set
