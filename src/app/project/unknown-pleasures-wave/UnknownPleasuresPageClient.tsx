"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageClient from "@/components/ProjectPageClient";
import SceneLoader from "@/components/SceneLoader";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type UnknownPleasuresProps = {
  lineCount: number;
  amplitude: number;
  speed: number;
  noiseScale: number;
  lineColor: string;
  bgColor: string;
};

type Props = { info: ProjectInfoType };

export default function UnknownPleasuresPageClient({ info }: Props) {
  return (
    <ProjectPageClient<UnknownPleasuresProps> info={info}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene waveProps={props} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
