"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectPageLayout from "@/components/ProjectPageLayout";
import SceneLoader from "@/components/SceneLoader";
import { useControls } from "@/components/hooks/useControls";
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
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<AsciiProps>(defaults as unknown as AsciiProps);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<AsciiProps>)}
    >
      <Suspense fallback={<SceneLoader />}>
        <Scene asciiProps={props} />
      </Suspense>
    </ProjectPageLayout>
  );
}
