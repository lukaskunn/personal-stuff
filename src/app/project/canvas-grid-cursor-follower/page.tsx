import projectInfo from './project-information.json';
import type { ProjectInfoType } from '@/types/project';
import { generateProjectMetadata } from '@/components/ProjectPageLayout';
import CanvasGridClient from './CanvasGridClient';

const info = projectInfo as ProjectInfoType;
const SLUG = 'canvas-grid-cursor-follower';

export const metadata = generateProjectMetadata(info);

export default function Page() {
  return <CanvasGridClient info={info} slug={SLUG} />;
}
