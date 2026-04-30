import type { Metadata } from "next";
import projectInfo from './project-information.json';
import { generateProjectMetadata } from '@/lib/projects';
import { loadProjectInfo } from '@/lib/projects';
import CursorFollowerClient from './CursorFollowerClient';

const info = loadProjectInfo(projectInfo);

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return <CursorFollowerClient info={info} />;
}
