import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import pageStyles from "@/app/project/project.module.css";
import styles from "./ProjectPageLayout.module.css";
import type { ProjectInfoType } from "@/types/project";
import { getProjectGithubUrl } from "@/lib/github";
import { getProjectIndex } from "@/lib/projects";

type ProjectPageLayoutProps = {
  info: ProjectInfoType;
  slug: string;
  children: ReactNode;
};

export function generateProjectMetadata(info: ProjectInfoType): Metadata {
  return {
    title: `${info.projectName} — My Stuff`,
    description: info.description,
  };
}

export default function ProjectPageLayout({ info, slug, children }: ProjectPageLayoutProps) {
  const githubUrl = getProjectGithubUrl(slug);
  const projectIndex = getProjectIndex(slug);

  return (
    <div className={pageStyles.container}>
      <Header projectName={info.projectName} githubUrl={githubUrl} projectIndex={projectIndex} />
      {info.isInteractive && (
        <p className={pageStyles.interactiveFlag}>[ CLICK TO INTERACT ]</p>
      )}
      <div className={styles.sceneContainer}>
        {children}
      </div>
    </div>
  );
}
