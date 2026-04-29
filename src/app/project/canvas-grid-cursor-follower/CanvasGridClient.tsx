'use client';
import Image from 'next/image';
import ProjectPageLayout from '@/components/ProjectPageLayout';
import CanvasGrid from './CanvasGrid';
import { useControls } from '@/components/hooks/useControls';
import type { ProjectInfoType } from '@/types/project';

type CanvasGridProps = {
  cellSize: number;
  brushRadius: number;
  tailLife: number;
  charLife: number;
  bigBlockChance: number;
};

type Props = { info: ProjectInfoType; slug: string };

const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
const text2 = "sed do eiusmod tempor incididunt ut labore et";

export default function CanvasGridClient({ info, slug }: Props) {
  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== 'button').map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<CanvasGridProps>(defaults as unknown as CanvasGridProps);

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<CanvasGridProps>)}
    >
      <div style={{ position: 'relative', width: '80%', height: '80%' }}>
        <Image
          src="/my-stuff/assets/images/orange_picture_unsplash.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
          <CanvasGrid {...props} />
          <div style={{ width: "100%", height: "fit-content", background: "black", position: "absolute", top: "50%", transform: "transition(50%, 0%)", color: "white", zIndex: 2, pointerEvents: "none", fontSize: 18 }}>
            <p style={{ margin: "0", display: "flex", justifyContent: "space-between" }}>{text1.split(" ").map((word, index) => <span key={index}>{word}</span>)}</p>
            <p style={{ margin: "0", display: "flex", justifyContent: "space-between" }}>{text2.split(" ").map((word, index) => <span key={index}>{word}</span>)}</p>
          </div>
        </div>
      </div>
    </ProjectPageLayout>
  );
}
