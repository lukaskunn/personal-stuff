"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageLayout from "@/components/ProjectPageLayout";
import SceneLoader from "@/components/SceneLoader";
import { useControls } from "@/components/hooks/useControls";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type TorusMaterialProps = {
  thickness: number;
  roughness: number;
  transmission: number;
  ior: number;
  chromaticAberration: number;
  backside: boolean;
};

type Props = { info: ProjectInfoType; slug: string };

export default function TorusPageClient({ info, slug }: Props) {
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<TorusMaterialProps>(defaults as unknown as TorusMaterialProps);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<TorusMaterialProps>)}
    >
      <Suspense fallback={<SceneLoader />}>
        <Scene materialProps={props} />
      </Suspense>
    </ProjectPageLayout>
  );
}
