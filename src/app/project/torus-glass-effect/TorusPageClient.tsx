"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageClient from "@/components/ProjectPageClient";
import SceneLoader from "@/components/SceneLoader";
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

type Props = { info: ProjectInfoType };

export default function TorusPageClient({ info }: Props) {
  return (
    <ProjectPageClient info={info}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene materialProps={props as TorusMaterialProps} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
