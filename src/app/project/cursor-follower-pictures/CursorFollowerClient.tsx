'use client';

import ProjectPageClient from '@/components/ProjectPageClient';
import CursorFollower from './CursorFollower';
import type { ProjectInfoType } from '@/types/project';

type ControlParams = {
  pictureSize: number;
  lifespan: number;
  spawnDistance: number;
  opacity: number;
};

type Props = { info: ProjectInfoType };

export default function CursorFollowerClient({ info }: Props) {
  return (
    <ProjectPageClient<ControlParams> info={info}>
      {(props) => <CursorFollower {...props} />}
    </ProjectPageClient>
  );
}
