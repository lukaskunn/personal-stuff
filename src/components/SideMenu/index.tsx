"use client";

import { useState, type ReactNode } from "react";
import TransitionLink from "@/components/TransitionLink";
import { FaGithub } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import styles from "./SideMenu.module.scss";
import { getProjectGithubUrl } from "@/lib/github";

type SideMenuProps = {
  projectName: string;
  description: string;
  technologies: string;
  slug: string;
  inspirationLink?: string;
  inspirationText?: string;
  articleSlug?: string;
  articleText?: string;
  controls?: ReactNode;
  backHref?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
};

export default function SideMenu({
  projectName,
  description,
  technologies,
  slug,
  inspirationLink,
  inspirationText,
  articleSlug,
  articleText = "READ ARTICLE",
  controls,
  backHref = "/",
  isOpen: controlledIsOpen,
  onToggle,
}: SideMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const githubUrl = getProjectGithubUrl(slug);

  const handleToggle = () => {
    const newValue = !isOpen;
    if (!isControlled) {
      setInternalIsOpen(newValue);
    }
    onToggle?.(newValue);
  };

  return (
    <>
      <div className={`${styles.buttonGroup} ${isOpen ? styles.buttonGroupOpen : ""}`}>
        {backHref && (
          <TransitionLink href={backHref} className={styles.backButton}>
            [ BACK TO ALL PROJECTS ]
          </TransitionLink>
        )}
        <button
          className={`${styles.toggleButton} ${isOpen ? styles.toggleButtonOpen : ""}`}
          onClick={handleToggle}
          aria-label={isOpen ? "Close project info" : "Open project info"}
        >
          <span className={styles.toggleOpen}>[ CLOSE ]</span>
          <span className={styles.toggleClosed}>[ INFO ]</span>
        </button>
      </div>

      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.panelContent}>
          <h2 className={styles.projectName}>{projectName}</h2>
          <p className={styles.description}>{description}</p>

          <div className={styles.section}>
            <span className={styles.label}>technologies</span>
            <p className={styles.technologies}>{technologies}</p>
          </div>

          {inspirationText && inspirationLink && (
            <div className={styles.section}>
              <span className={styles.label}>inspiration</span>
              <a
                href={inspirationLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inspirationLink}
              >
                {inspirationText}
              </a>
            </div>
          )}

          {controls && (
            <div className={styles.section}>
              <span className={styles.label}>controls</span>
              <div className={styles.controlsList}>
                {controls}
              </div>
            </div>
          )}
        </div>

        <div className={styles.panelFooter}>
          {articleSlug && (
            <a
              href={`https://blog.lucasoliveira.io/post/${articleSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.articleButton}
            >
              <span>{articleText}</span>
              <FaBookmark size={18} color="#111" />
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceButton}
          >
            <span>VIEW SOURCE CODE</span>
            <FaGithub size={18} color="#FFFFFF" />
          </a>
        </div>
      </div>
    </>
  );
}
