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

type Props = { info: ProjectInfoType; slug: string };

export default function AsciiPageClient({ info, slug }: Props) {
  return (
    <ProjectPageClient info={info} slug={slug}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene asciiProps={props as AsciiProps} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
