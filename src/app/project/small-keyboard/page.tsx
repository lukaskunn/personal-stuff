import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import ProjectHeader from "@/components/ProjectHeader";
import pageStyles from "../project.module.scss";
import componentStyles from "./SmallKeyboard.module.scss";
import type { ProjectInfoType } from "@/types/project";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const info = projectInfo as ProjectInfoType;

export const metadata: Metadata = {
  title: `${info.projectName} — My Stuff`,
  description: info.description,
};

export default function Page() {
  return (
    <div className={pageStyles.container}>
      <ProjectHeader {...info} />
      <div className={componentStyles.container}>
        {/* <p>press 1, 2, 3, 4, 5, 6 or Space</p> */}
        <Scene />
      </div>
    </div>
  );
}
