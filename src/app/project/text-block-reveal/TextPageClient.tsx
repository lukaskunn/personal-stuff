"use client"

import React, { useRef } from 'react'
import SideMenu from '@/components/SideMenu'
import type { SideMenuInfoProps } from "@/types/project";
import TextBlockRevealControls, { TextBlockRevealProps } from './Controls';
import { useControls } from '@/components/hooks/useControls';
import { useIsMobile } from '@/components/hooks/useIsMobile';
import { useMenuState } from '@/components/hooks/useMenuState';
import TextContainer, { TextContainerRef } from './TextContainer';

const TextPageClient = ({ projectName, description, slug, technologies, inspirationLink, inspirationText }: SideMenuInfoProps) => {
  const containerRef = useRef<TextContainerRef>(null);
  const [isMenuOpen, setIsMenuOpen] = useMenuState(false);
  const isMobile = useIsMobile(768);

  const [props, update] = useControls<TextBlockRevealProps>({
    text: "Reveal your power\nunleash your potential\nwith every word you speak",
    color: "#ffffff",
    blockColor: "#ff0000",
    fontSize: 48,
    animationSpeed: 0.8,
    staggerDelay: 0.15,
    direction: 'bottom-to-top',
    maxWidth: 600,
    lineHeight: 1.2,
  });

  const handleReplay = () => {
    // Close menu on mobile
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
      // Delay replay on mobile to allow menu to close
      setTimeout(() => {
        containerRef.current?.replay();
      }, 500);
    } else {
      containerRef.current?.replay();
    }
  };

  return (
    <>
      <SideMenu
        projectName={projectName}
        description={description}
        technologies={technologies}
        slug={slug}
        inspirationLink={inspirationLink}
        inspirationText={inspirationText}
        isOpen={isMenuOpen}
        onToggle={setIsMenuOpen}
        controls={<TextBlockRevealControls {...props} onChange={update} onReplay={handleReplay} />}
      />
      <TextContainer ref={containerRef} {...props} />
    </>
  )
}

export default TextPageClient
