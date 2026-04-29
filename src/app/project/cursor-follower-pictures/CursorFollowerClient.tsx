'use client';

import React from 'react';
import Controls from './Controls';
import SideMenu from '@/components/SideMenu';
import CursorFollower from './CursrorFollower';
import { useControls } from '@/components/hooks/useControls';

interface ControlParams {
  pictureSize: number;
  lifespan: number;
  spawnDistance: number;
  opacity: number;
}

export default function CursorFollowerClient() {
  const [props, update] = useControls<ControlParams>({
    pictureSize: 240,
    lifespan: 500,
    spawnDistance: 140,
    opacity: 1,
  });

  return (
    <>
      <SideMenu
        projectName="Cursor Follower Pictures"
        description="A fun interactive effect where pictures follow the cursor, creating a trailing effect. Customize the picture size, trail length, fade duration, and more!"
        technologies={'React'}
        slug="cursor-follower-pictures"
        controls={<Controls {...props} onUpdate={update} />}
      />
      <CursorFollower {...props} />
    </>
  );
}
