import projectsData from "@/data/projects.json";
import type { Metadata } from "next";
import { ProjectCardType, ProjectInfoType } from "@/types/project";

const projects = projectsData as ProjectCardType[];

export function getProjects(): ProjectCardType[] {
  return projects;
}

export function getProjectIndex(slug: string): number {
  const index = projects.findIndex((p) => p.url === slug);
  return index === -1 ? 0 : projects.length - index;
}

export function loadProjectInfo(json: unknown): ProjectInfoType {
  return json as ProjectInfoType;
}

export function generateProjectMetadata(info: ProjectInfoType): Metadata {
  return {
    title: `${info.projectName} — My Stuff`,
    description: info.description,
  };
}
