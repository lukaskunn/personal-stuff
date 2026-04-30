"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageClient from "@/components/ProjectPageClient";
import SceneLoader from "@/components/SceneLoader";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type SimpleItemsProps = {
  rotationSpeed: number;
  sphereColor: string;
  cubeWireframe: boolean;
  sphereWireframe: boolean;
  torusThickness: number;
  torusRoughness: number;
  torusTransmission: number;
  torusIor: number;
};

type Props = { info: ProjectInfoType };

export default function SimpleItemsPageClient({ info }: Props) {
  return (
    <ProjectPageClient<SimpleItemsProps> info={info}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene simpleItemsProps={props} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
