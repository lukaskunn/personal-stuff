import projectsData from "@/data/projects.json";
import { ProjectCardType } from "@/types/project";

const projects = projectsData as ProjectCardType[];

export function getProjects(): ProjectCardType[] {
  return projects;
}
