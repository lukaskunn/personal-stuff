import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import styles from "./Header.module.scss";

type HeaderProps = {
  projectName?: string;
  githubUrl?: string;
  projectIndex?: number;
};

export default function Header({ projectName, githubUrl, projectIndex }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a
          href="https://lucasoliveira.io"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logo}
        >
          Lucas Oliveira
        </a>

        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbHome}>
            [ PROJECTS ]
          </Link>
          {projectName && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbProject}>{projectName.toLowerCase()}</span>
            </>
          )}
        </nav>

        {projectIndex !== undefined ? (
          <span className={styles.projectIndex}>
            EXP. {String(projectIndex).padStart(2, "0")}
          </span>
        ) : (
          <a
            href={githubUrl ?? "https://github.com/lukaskunn"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
        )}
      </div>
    </header>
  );
}
