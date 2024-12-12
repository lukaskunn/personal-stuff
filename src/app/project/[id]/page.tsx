import React, { lazy } from "react";

import ProjectHeader from "@/components/ProjectHeader";
import styles from "../project.module.scss";
import { ProjectType } from "@/types/project";
import projects from "../../../../public/content/projects.json";

const TorusGlassEffect = lazy(() => import("@/components/TorusGlassEffect"));

type ProjectProps = {
  params: Promise<{ id: string }>;
};

const Project = async ({ params }: ProjectProps) => {
  const { id } = await params;
  const projectInfo = projects.find(
    (project) => project.url === id
  ) as ProjectType;

  const componentMap: { [key: string]: React.JSX.Element } = {
    "torus-glass-effect": <TorusGlassEffect />,
  };

  const Component = componentMap[id];

  return (
    <div className={styles.container}>
      {projectInfo && <ProjectHeader {...projectInfo} />}
      {Component}
    </div>
  );
};

export default Project;