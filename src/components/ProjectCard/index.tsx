import React from "react";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  title: string;
  description: string;
  url: string;
  cardImage: string;
  cardImageAlt?: string;
};

const ProjectCard = ({
  title,
  description,
  url,
  cardImage,
  cardImageAlt = "",
}: ProjectCardProps) => {
  return (
    <a className={styles.container} href={`/my-stuff/project/${url}`}>
      <img
        src={`/my-stuff/images/${cardImage}`}
        alt={cardImageAlt}
        className={styles["background-image"]}
      />
      <h2 className={styles["project-title"]}>{title}</h2>
      <p className={styles["project-description"]}>{description}</p>
    </a>
  );
};

export default ProjectCard;
