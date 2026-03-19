import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import ProjectPageLayout, { generateProjectMetadata } from "@/components/ProjectPageLayout";
import type { ProjectInfoType } from "@/types/project";

const KeyboardPageClient = dynamic(() => import("./KeyboardPageClient"), { ssr: false });

const info = projectInfo as ProjectInfoType;
const SLUG = "small-keyboard";

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return (
    <ProjectPageLayout info={info} slug={SLUG}>
      <KeyboardPageClient
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
