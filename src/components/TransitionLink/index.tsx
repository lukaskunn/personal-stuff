"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "@/components/PageTransition";
import type { ComponentPropsWithoutRef } from "react";

type TransitionLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

export default function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const { navigate } = useTransition();
  const router = useRouter();

  const isInternal = !href.startsWith("http") && !href.startsWith("//");

  const handleMouseEnter = () => {
    if (isInternal) router.prefetch(href);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isExternal = href.startsWith("http") || href.startsWith("//");
    const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    if (isExternal || isModified) return;
    e.preventDefault();
    onClick?.(e);
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} onMouseEnter={handleMouseEnter} {...props}>
      {children}
    </a>
  );
}
