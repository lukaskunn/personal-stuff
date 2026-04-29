"use client";

import type { ReactNode } from "react";
import ProjectPageLayout from "@/components/ProjectPageLayout";
import { useControls } from "@/components/hooks/useControls";
import type { ProjectInfoType } from "@/types/project";

type Props = {
  info: ProjectInfoType;
  slug: string;
  flagText?: string;
  onAction?: (actionId: string) => void;
  children: (props: Record<string, unknown>) => ReactNode;
};

export default function ProjectPageClient({ info, slug, flagText, onAction, children }: Props) {
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<Record<string, unknown>>(defaults);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      flagText={flagText}
      values={props}
      onChange={update}
      onAction={onAction}
    >
      {children(props)}
    </ProjectPageLayout>
  );
}
