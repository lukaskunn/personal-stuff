"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import SceneLoader from "@/components/SceneLoader";
import TorusControls, { type TorusMaterialProps } from "./TorusControls";
import { useControls } from "@/components/hooks/useControls";
import type { SideMenuInfoProps } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function TorusPageClient({ projectName, description, technologies, slug, inspirationLink, inspirationText }: SideMenuInfoProps) {
  const [props, update] = useControls<TorusMaterialProps>({
    thickness: 0.9,
    roughness: 0,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.15,
    backside: true,
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
        controls={<TorusControls {...props} onChange={update} />}
      />
      <Suspense fallback={<SceneLoader />}>
        <Scene materialProps={props} />
      </Suspense>
    </>
  );
}
