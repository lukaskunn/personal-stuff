"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageClient from "@/components/ProjectPageClient";
import SceneLoader from "@/components/SceneLoader";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type KeyboardProps = {
  keyColor: string;
  accentColor: string;
  lightIntensity: number;
};

type Props = { info: ProjectInfoType; slug: string };

export default function KeyboardPageClient({ info, slug }: Props) {
  return (
    <ProjectPageClient info={info} slug={slug}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene keyboardProps={props as KeyboardProps} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
