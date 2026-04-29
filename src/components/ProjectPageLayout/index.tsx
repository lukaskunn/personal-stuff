"use client";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import ControlsMapper from "@/components/ControlsMapper";
import styles from "./ProjectPageLayout.module.scss";
import type { ProjectInfoType } from "@/types/project";
import { getProjectGithubUrl } from "@/lib/github";
import { getProjectIndex } from "@/lib/projects";

type ProjectPageLayoutProps = {
  info: ProjectInfoType;
  slug: string;
  children: ReactNode;
  flagText?: string;
  values?: Record<string, unknown>;
  onChange?: (patch: Record<string, unknown>) => void;
  onAction?: (actionId: string) => void;
};

export function generateProjectMetadata(info: ProjectInfoType): Metadata {
  return {
    title: `${info.projectName} — My Stuff`,
    description: info.description,
  };
}

export default function ProjectPageLayout({ info, slug, children, flagText = "[ CLICK TO INTERACT ]", values, onChange, onAction }: ProjectPageLayoutProps) {
  const githubUrl = getProjectGithubUrl(slug);
  const projectIndex = getProjectIndex(slug);

  const controls = info.controls && values && onChange
    ? <ControlsMapper schema={info.controls} values={values} onChange={onChange} onAction={onAction} />
    : undefined;

  return (
    <div className={styles.container}>
      <Header projectName={info.projectName} githubUrl={githubUrl} projectIndex={projectIndex} />
      <SideMenu
        projectName={info.projectName}
        description={info.description}
        technologies={info.technologies}
        slug={slug}
        inspirationLink={info.inspirationLink}
        inspirationText={info.inspirationText}
        controls={controls}
      />
      {info.isInteractive && (
        <p className={styles.interactiveFlag}>{flagText}</p>
      )}
      <div className={styles.sceneContainer}>
        {children}
      </div>
    </div>
  );
}
