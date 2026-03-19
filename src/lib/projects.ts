import projectsData from "@/data/projects.json";
import { ProjectCardType } from "@/types/project";

const projects = projectsData as ProjectCardType[];

export function getProjects(): ProjectCardType[] {
  return projects;
}

export function getProjectIndex(slug: string): number {
  const index = projects.findIndex((p) => p.url === slug);
  return index === -1 ? 0 : projects.length - index;
}
