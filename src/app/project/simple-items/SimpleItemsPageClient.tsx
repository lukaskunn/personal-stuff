"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import SceneLoader from "@/components/SceneLoader";
import SimpleItemsControls, { type SimpleItemsProps } from "./SimpleItemsControls";
import { useControls } from "@/components/hooks/useControls";
import type { SideMenuInfoProps } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function SimpleItemsPageClient({ projectName, description, technologies, slug, inspirationLink, inspirationText }: SideMenuInfoProps) {
  const [props, update] = useControls<SimpleItemsProps>({
    rotationSpeed: 0.005,
    sphereColor: "#ff0000",
    cubeWireframe: true,
    sphereWireframe: true,
    torusThickness: 0.9,
    torusRoughness: 0,
    torusTransmission: 1,
    torusIor: 1.2,
  });

  return (
    <>
      <SideMenu
        projectName={projectName}
        description={description}
        technologies={technologies}
        slug={slug}
        inspirationLink={inspirationLink}
        inspirationText={inspirationText}
        controls={<SimpleItemsControls {...props} onChange={update} />}
      />
      <Suspense fallback={<SceneLoader />}>
        <Scene simpleItemsProps={props} />
      </Suspense>
    </>
  );
}
