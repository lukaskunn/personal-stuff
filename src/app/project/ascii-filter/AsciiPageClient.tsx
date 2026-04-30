"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageClient from "@/components/ProjectPageClient";
import SceneLoader from "@/components/SceneLoader";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type AsciiProps = {
  density: string;
  fontSize: number;
  cellSize: number;
  color: string;
  invert: boolean;
};

type Props = { info: ProjectInfoType };

export default function AsciiPageClient({ info }: Props) {
  return (
    <ProjectPageClient info={info}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene asciiProps={props as AsciiProps} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
