"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./PageTransition.module.scss";

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isAnimating = useRef(false);
  const covered = useRef(false);

  // Push overlay below viewport on mount so GSAP owns the position
  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { yPercent: 100 });
    }
  }, []);

  // Reveal: only fires after a cover animation has completed
  useEffect(() => {
    const el = overlayRef.current;
    if (!el || !covered.current) return;
    covered.current = false;
    gsap.to(el, {
      yPercent: -100,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimating.current = false;
        gsap.set(el, { yPercent: 100 });
      },
    });
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const el = overlayRef.current;
      if (!el) {
        router.push(href);
        return;
      }
      gsap.fromTo(
        el,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            covered.current = true;
            router.push(href);
          },
        }
      );
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
      {children}
    </TransitionContext.Provider>
  );
}
