import React from "react";
import Link from "next/link";
import { FaArrowLeft, FaGithub } from "react-icons/fa";

import styles from "./ProjectHeader.module.scss";

type ProjectHeaderProps = {
  projectName: string;
  date: string;
  description: string;
  githubUrl: string;
  inspirationLink?: string;
  inspirationText?: string;
  technologies: string;
};

const ProjectHeader = ({
  projectName: name,
  date,
  description,
  githubUrl,
  inspirationLink,
  inspirationText,
  technologies,
}: ProjectHeaderProps) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));

  return (
    <div className={styles.container}>
      <Link className={styles["return-home-link"]} href="/">
        <FaArrowLeft /> <p className={styles["home-text"]}>Home</p>
      </Link>
      <p className={styles["project-name"]}>{name}</p>
      <p className={styles["project-date"]}>{formattedDate}</p>
      <p className={styles["project-description"]}>{description}</p>
      <a
        className={styles["github-link"]}
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={14} /> view code
      </a>
      {inspirationText && (
        <a
          className={styles["inspiration-link"]}
          href={inspirationLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inspirationText}
        </a>
      )}
      <p className={styles["technologies"]}>technologies: {technologies}</p>
    </div>
  );
};

export default ProjectHeader;
