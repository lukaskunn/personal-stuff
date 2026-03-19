"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import styles from "./SideMenu.module.scss";
import { getProjectGithubUrl } from "@/lib/github";

type SideMenuProps = {
  projectName: string;
  description: string;
  technologies: string;
  slug: string;
  inspirationLink?: string;
  inspirationText?: string;
  controls?: ReactNode;
  backHref?: string;
};

export default function SideMenu({
  projectName,
  description,
  technologies,
  slug,
  inspirationLink,
  inspirationText,
  controls,
  backHref = "/",
}: SideMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const githubUrl = getProjectGithubUrl(slug);

  return (
    <>
      <div className={`${styles.buttonGroup} ${isOpen ? styles.buttonGroupOpen : ""}`}>
        {backHref && (
          <Link href={backHref} className={styles.backButton}>
            [ BACK TO ALL PROJECTS ]
          </Link>
        )}
        <button
          className={`${styles.toggleButton} ${isOpen ? styles.toggleButtonOpen : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
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
