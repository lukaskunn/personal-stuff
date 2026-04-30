"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageClient from "@/components/ProjectPageClient";
import SceneLoader from "@/components/SceneLoader";
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

type Props = { info: ProjectInfoType };

export default function GalaxyPageClient({ info }: Props) {
  return (
    <ProjectPageClient info={info}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene galaxyProps={props as GalaxyProps} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
