"use client"

import { useRef } from 'react'
import ProjectPageClient from '@/components/ProjectPageClient';
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

type Props = { info: ProjectInfoType };

const TextPageClient = ({ info }: Props) => {
  const containerRef = useRef<TextContainerRef>(null);
  const [isMenuOpen, setIsMenuOpen] = useMenuState(false);
  const isMobile = useIsMobile(768);

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
    <ProjectPageClient info={info} onAction={handleAction}>
      {(props) => <TextContainer ref={containerRef} {...(props as TextBlockRevealProps)} />}
    </ProjectPageClient>
  );
}

export default TextPageClient
