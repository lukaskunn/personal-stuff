import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import styles from "./ProjectPageLayout.module.scss";
import type { ProjectInfoType } from "@/types/project";
import { getProjectGithubUrl } from "@/lib/github";
import { getProjectIndex } from "@/lib/projects";

type ProjectPageLayoutProps = {
  info: ProjectInfoType;
  slug: string;
  children: ReactNode;
  flagText?: string;
};

export function generateProjectMetadata(info: ProjectInfoType): Metadata {
  return {
    title: `${info.projectName} — My Stuff`,
    description: info.description,
  };
}

export default function ProjectPageLayout({ info, slug, children, flagText = "[ CLICK TO INTERACT ]"}: ProjectPageLayoutProps) {
  const githubUrl = getProjectGithubUrl(slug);
  const projectIndex = getProjectIndex(slug);

  return (
    <div className={styles.container}>
      <Header projectName={info.projectName} githubUrl={githubUrl} projectIndex={projectIndex} />
      {info.isInteractive && (
        <p className={styles.interactiveFlag}>{flagText}</p>
      )}
      <div className={styles.sceneContainer}>
        {children}
      </div>
    </div>
  );
}
