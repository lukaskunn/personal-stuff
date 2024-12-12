import React from "react";
import { FaArrowLeft } from "react-icons/fa";

import styles from "./ProjectHeadeer.module.scss";

type ProjectHeaderProps = {
  projectName: string;
  date: string;
  description: string;
  githubLink: string;
  inspirationLink: string;
  inspirationText: string;
  technologies: string;
};

const ProjectHeader = ({
  projectName: name,
  date,
  description,
  githubLink,
  inspirationLink,
  inspirationText,
  technologies,
}: ProjectHeaderProps) => {
  return (
    <div className={styles.container}>
      <a className={styles["return-home-link"]} href="/my-stuff">
        <FaArrowLeft /> <p className={styles["home-text"]}>Home</p>
      </a>
      <p className={styles["project-name"]}>{name}</p>
      <p className={styles["project-date"]}>{date}</p>
      <p className={styles["project-description"]}>{description}</p>
      <a
        className={styles["github-link"]}
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        project code
      </a>
      <a
        className={styles["inspiration-link"]}
        href={inspirationLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inspirationText}
      </a>
      <p className={styles["technologies"]}>technologies: {technologies}</p>
    </div>
  );
};

export default ProjectHeader;
