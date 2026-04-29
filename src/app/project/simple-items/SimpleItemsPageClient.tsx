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

type Props = { info: ProjectInfoType; slug: string };

export default function SimpleItemsPageClient({ info, slug }: Props) {
  return (
    <ProjectPageClient info={info} slug={slug}>
      {(props) => (
        <Suspense fallback={<SceneLoader />}>
          <Scene simpleItemsProps={props as SimpleItemsProps} />
        </Suspense>
      )}
    </ProjectPageClient>
  );
}
