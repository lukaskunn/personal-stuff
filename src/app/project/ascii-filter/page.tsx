import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import { generateProjectMetadata } from "@/components/ProjectPageLayout";
import type { ProjectInfoType } from "@/types/project";

const AsciiPageClient = dynamic(() => import("./AsciiPageClient"), { ssr: false });

const info = projectInfo as ProjectInfoType;
const SLUG = "ascii-filter";

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return <AsciiPageClient info={info} slug={SLUG} />;
}
