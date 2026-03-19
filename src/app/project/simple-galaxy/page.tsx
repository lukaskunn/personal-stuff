import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import ProjectPageLayout, { generateProjectMetadata } from "@/components/ProjectPageLayout";
import type { ProjectInfoType } from "@/types/project";

const GalaxyPageClient = dynamic(() => import("./GalaxyPageClient"), { ssr: false });

const info = projectInfo as ProjectInfoType;
const SLUG = "simple-galaxy";

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return (
    <ProjectPageLayout info={info} slug={SLUG}>
      <GalaxyPageClient
        projectName={info.projectName}
        description={info.description}
        technologies={info.technologies}
        slug={SLUG}
        inspirationLink={info.inspirationLink}
        inspirationText={info.inspirationText}
      />
    </ProjectPageLayout>
  );
}
