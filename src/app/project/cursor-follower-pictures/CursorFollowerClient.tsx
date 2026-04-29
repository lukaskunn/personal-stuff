'use client';

import ProjectPageLayout from '@/components/ProjectPageLayout';
import CursorFollower from './CursrorFollower';
import { useControls } from '@/components/hooks/useControls';
import type { ProjectInfoType } from '@/types/project';

type ControlParams = {
  pictureSize: number;
  lifespan: number;
  spawnDistance: number;
  opacity: number;
};

type Props = { info: ProjectInfoType; slug: string };

export default function CursorFollowerClient({ info, slug }: Props) {
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== 'button').map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<ControlParams>(defaults as unknown as ControlParams);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<ControlParams>)}
    >
      <CursorFollower {...props} />
    </ProjectPageLayout>
  );
}
