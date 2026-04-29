import { Metadata } from 'next';
import projectInfo from './project-information.json';
import { generateProjectMetadata } from '@/components/ProjectPageLayout';
import type { ProjectInfoType } from '@/types/project';
import CursorFollowerClient from './CursorFollowerClient';

const info = projectInfo as ProjectInfoType;
const SLUG = 'cursor-follower-pictures';

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return <CursorFollowerClient info={info} slug={SLUG} />;
}
