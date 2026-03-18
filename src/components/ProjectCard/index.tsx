import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  title: string;
  description: string;
  url: string;
  cardImage: string;
};

const ProjectCard = ({ title, description, url, cardImage }: ProjectCardProps) => {
  return (
    <Link className={styles.container} href={`/project/${url}`}>
      <h2 className={styles["project-title"]}>{title}</h2>
      <p className={styles["project-description"]}>{description}</p>
      <Image
        src={`/my-stuff/images/${cardImage}`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 20vw"
        className={styles["background-image"]}
      />
    </Link>
  );
};

export default ProjectCard;
