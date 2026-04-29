import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import { generateProjectMetadata } from "@/components/ProjectPageLayout";
import type { ProjectInfoType } from "@/types/project";

const GalaxyPageClient = dynamic(() => import("./GalaxyPageClient"), { ssr: false });

const info = projectInfo as ProjectInfoType;
const SLUG = "simple-galaxy";

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return <GalaxyPageClient info={info} slug={SLUG} />;
}
