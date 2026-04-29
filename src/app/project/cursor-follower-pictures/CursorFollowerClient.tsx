'use client';

import ProjectPageClient from '@/components/ProjectPageClient';
import CursorFollower from './CursrorFollower';
import type { ProjectInfoType } from '@/types/project';

type ControlParams = {
  pictureSize: number;
  lifespan: number;
  spawnDistance: number;
  opacity: number;
};

type Props = { info: ProjectInfoType; slug: string };

export default function CursorFollowerClient({ info, slug }: Props) {
  return (
    <ProjectPageClient info={info} slug={slug}>
      {(props) => <CursorFollower {...(props as ControlParams)} />}
    </ProjectPageClient>
  );
}
