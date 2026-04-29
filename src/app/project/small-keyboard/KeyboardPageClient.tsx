"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageLayout from "@/components/ProjectPageLayout";
import SceneLoader from "@/components/SceneLoader";
import { useControls } from "@/components/hooks/useControls";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type KeyboardProps = {
  keyColor: string;
  accentColor: string;
  lightIntensity: number;
};

type Props = { info: ProjectInfoType; slug: string };

export default function KeyboardPageClient({ info, slug }: Props) {
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<KeyboardProps>(defaults as unknown as KeyboardProps);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<KeyboardProps>)}
    >
      <Suspense fallback={<SceneLoader />}>
        <Scene keyboardProps={props} />
      </Suspense>
    </ProjectPageLayout>
  );
}
