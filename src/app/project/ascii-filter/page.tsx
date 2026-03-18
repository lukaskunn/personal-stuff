import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import ProjectHeader from "@/components/ProjectHeader";
import pageStyles from "../project.module.scss";
import componentStyles from "./AsciiFilter.module.scss";
import type { ProjectInfoType } from "@/types/project";
import { getProjectGithubUrl } from "@/lib/github";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const info = projectInfo as ProjectInfoType;

export const metadata: Metadata = {
  title: `${info.projectName} — My Stuff`,
  description: info.description,
};

export default function Page() {
  return (
    <div className={pageStyles.container}>
      <ProjectHeader {...info} githubUrl={getProjectGithubUrl("ascii-filter")} />
      <div className={componentStyles.container}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>
    </div>
  );
}
