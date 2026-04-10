import ProjectPageLayout from '@/components/ProjectPageLayout';
import CanvasGridClient from './CanvasGridClient';
import projectInfo from './project-information.json';
import type { ProjectInfoType } from '@/types/project';
import Image from 'next/image';

const info = projectInfo as ProjectInfoType;

export default function Page() {
  return (
    <ProjectPageLayout info={info} slug="canvas-grid-cusor-follower" flagText="[ Move your cursor around! ]">
      <div style={{ position: 'relative', width: '80%', height: '80%' }}>

        <Image src="/my-stuff/assets/images/orange_picture_unsplash.jpg" alt="Background" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />

        {/* Canvas grid client manages canvas and controls via SideMenu */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
          <CanvasGridClient />
        </div>
      </div>
    </ProjectPageLayout>
  );
}
