"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageLayout from "@/components/ProjectPageLayout";
import SceneLoader from "@/components/SceneLoader";
import { useControls } from "@/components/hooks/useControls";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type GalaxyProps = {
  count: number;
  size: number;
  radius: number;
  radiusPower: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
};

type Props = { info: ProjectInfoType; slug: string };

export default function GalaxyPageClient({ info, slug }: Props) {
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<GalaxyProps>(defaults as unknown as GalaxyProps);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<GalaxyProps>)}
    >
      <Suspense fallback={<SceneLoader />}>
        <Scene galaxyProps={props} />
      </Suspense>
    </ProjectPageLayout>
  );
}
