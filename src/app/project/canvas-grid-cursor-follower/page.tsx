import projectInfo from './project-information.json';
import { generateProjectMetadata } from '@/lib/projects';
import { loadProjectInfo } from '@/lib/projects';
import CanvasGridClient from './CanvasGridClient';

const info = loadProjectInfo(projectInfo);

export const metadata = generateProjectMetadata(info);

export default function Page() {
  return <CanvasGridClient info={info} />;
}
