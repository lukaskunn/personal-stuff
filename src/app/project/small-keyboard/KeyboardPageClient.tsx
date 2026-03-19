"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import SceneLoader from "@/components/SceneLoader";
import KeyboardControls, { type KeyboardProps } from "./KeyboardControls";
import { useControls } from "@/components/hooks/useControls";
import type { SideMenuInfoProps } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function KeyboardPageClient({ projectName, description, technologies, slug, inspirationLink, inspirationText }: SideMenuInfoProps) {
  const [props, update] = useControls<KeyboardProps>({
    keyColor: "#f0ede6",
    accentColor: "#e07c24",
    lightIntensity: 2,
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
        controls={<KeyboardControls {...props} onChange={update} />}
      />
      <Suspense fallback={<SceneLoader />}>
        <Scene keyboardProps={props} />
      </Suspense>
    </>
  );
}
