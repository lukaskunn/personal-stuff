"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageLayout from "@/components/ProjectPageLayout";
import SceneLoader from "@/components/SceneLoader";
import { useControls } from "@/components/hooks/useControls";
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
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<SimpleItemsProps>(defaults as unknown as SimpleItemsProps);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<SimpleItemsProps>)}
    >
      <Suspense fallback={<SceneLoader />}>
        <Scene simpleItemsProps={props} />
      </Suspense>
    </ProjectPageLayout>
  );
}
