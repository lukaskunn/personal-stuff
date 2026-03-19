"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import SceneLoader from "@/components/SceneLoader";
import GalaxyControls, { type GalaxyProps } from "./GalaxyControls";
import { useControls } from "@/components/hooks/useControls";
import type { SideMenuInfoProps } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function GalaxyPageClient({ projectName, description, technologies, slug, inspirationLink, inspirationText }: SideMenuInfoProps) {
  const [props, update] = useControls<GalaxyProps>({
    count: 20000,
    size: 0.01,
    radius: 6,
    radiusPower: 2,
    branches: 5,
    spin: 0.8,
    randomness: 0.7,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
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
        controls={<GalaxyControls {...props} onChange={update} />}
      />
      <Suspense fallback={<SceneLoader />}>
        <Scene galaxyProps={props} />
      </Suspense>
    </>
  );
}
