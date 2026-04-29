import type { Metadata } from "next";
import dynamic from "next/dynamic";
import projectInfo from "./project-information.json";
import { generateProjectMetadata } from "@/lib/projects";
import { loadProjectInfo } from "@/lib/projects";

const KeyboardPageClient = dynamic(() => import("./KeyboardPageClient"), { ssr: false });

const info = loadProjectInfo(projectInfo);

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return <KeyboardPageClient info={info} slug={info.slug} />;
}
