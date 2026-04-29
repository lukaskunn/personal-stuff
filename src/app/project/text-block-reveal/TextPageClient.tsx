"use client"

import { useRef } from 'react'
import ProjectPageLayout from '@/components/ProjectPageLayout';
import { useControls } from '@/components/hooks/useControls';
import { useIsMobile } from '@/components/hooks/useIsMobile';
import { useMenuState } from '@/components/hooks/useMenuState';
import TextContainer, { TextContainerRef } from './TextContainer';
import type { ProjectInfoType } from "@/types/project";

type TextBlockRevealProps = {
  text: string;
  color: string;
  blockColor: string;
  fontSize: number;
  animationSpeed: number;
  staggerDelay: number;
  direction: 'bottom-to-top' | 'top-to-bottom' | 'left-to-right' | 'right-to-left';
  maxWidth: number;
  lineHeight: number;
};

type Props = { info: ProjectInfoType; slug: string };

const TextPageClient = ({ info, slug }: Props) => {
  const containerRef = useRef<TextContainerRef>(null);
  const [isMenuOpen, setIsMenuOpen] = useMenuState(false);
  const isMobile = useIsMobile(768);

  const defaults = Object.fromEntries(
    (info.controls ?? []).filter((c) => c.type !== "button").map((c) => [c.key, c.default])
  );
  const [props, update] = useControls<TextBlockRevealProps>(defaults as unknown as TextBlockRevealProps);

  const handleAction = (actionId: string) => {
    if (actionId === 'replay') {
      if (isMobile && isMenuOpen) {
        setIsMenuOpen(false);
        setTimeout(() => containerRef.current?.replay(), 500);
      } else {
        containerRef.current?.replay();
      }
    }
  };

  return (
    <ProjectPageLayout
      info={info}
      slug={slug}
      values={props as Record<string, unknown>}
      onChange={(patch) => update(patch as Partial<TextBlockRevealProps>)}
      onAction={handleAction}
    >
      <TextContainer ref={containerRef} {...props} />
    </ProjectPageLayout>
  );
}

export default TextPageClient
