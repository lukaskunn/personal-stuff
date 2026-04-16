import { Metadata } from 'next';
import React from 'react';
import projectInfo from './project-information.json';
import ProjectPageLayout, { generateProjectMetadata } from '@/components/ProjectPageLayout';
import type { ProjectInfoType } from '@/types/project';
import CursorFollowerClient from './CursorFollowerClient';

const info = projectInfo as ProjectInfoType;
const SLUG = 'cursor-follower-pictures';

export const metadata: Metadata = generateProjectMetadata(info);

export default function Page() {
  return (
    <ProjectPageLayout info={info} slug={SLUG} flagText="[ Move your cursor around! ]">
      <CursorFollowerClient />
    </ProjectPageLayout>
  );
}
