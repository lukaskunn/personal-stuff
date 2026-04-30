"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import ProjectPageLayout from "@/components/ProjectPageLayout";
import { useControls } from "@/components/hooks/useControls";
import type { ProjectInfoType } from "@/types/project";

type Props<T extends Record<string, unknown>> = {
  info: ProjectInfoType;
  flagText?: string;
  onAction?: (actionId: string) => void;
  children: (props: T) => ReactNode;
};

export default function ProjectPageClient<T extends Record<string, unknown>>({ info, flagText, onAction, children }: Props<T>) {
  const defaults = useMemo(() =>
    Object.fromEntries(
      (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
    ) as T
    , [info.controls]);

  const [props, update] = useControls<T>(defaults);

  return (
    <ProjectPageLayout
      info={info}
      flagText={flagText}
      values={props}
      onChange={update}
      onAction={onAction}
    >
      {children(props)}
    </ProjectPageLayout>
  );
}
