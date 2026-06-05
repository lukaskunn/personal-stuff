"use client";

import Link from "next/link";
import { useTransition } from "@/components/PageTransition";
import type { ComponentPropsWithoutRef } from "react";

type TransitionLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

export default function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const { navigate } = useTransition();

  const isExternal = href.startsWith("http") || href.startsWith("//");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isExternal) return;
    const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    if (isModified) return;
    e.preventDefault();
    onClick?.(e);
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} prefetch={!isExternal} {...props}>
      {children}
    </Link>
  );
}
