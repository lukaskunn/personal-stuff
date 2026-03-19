"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/SideMenu";
import SceneLoader from "@/components/SceneLoader";
import AsciiControls, { type AsciiProps } from "./AsciiControls";
import { useControls } from "@/components/hooks/useControls";
import type { SideMenuInfoProps } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function AsciiPageClient({ projectName, description, technologies, slug, inspirationLink, inspirationText }: SideMenuInfoProps) {
  const [props, update] = useControls<AsciiProps>({
    density: "Ñ@#WMB%$&O08GCLft1i;:,. ",
    fontSize: 54,
    cellSize: 9,
    color: "#ffffff",
    invert: true,
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
        controls={<AsciiControls {...props} onChange={update} />}
      />
      <Suspense fallback={<SceneLoader />}>
        <Scene asciiProps={props} />
      </Suspense>
    </>
  );
}
