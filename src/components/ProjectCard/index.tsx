import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  title: string;
  description: string;
  url: string;
  cardImage: string;
  technologies: string[];
  tags: string[];
  index: number;
};

const ProjectCard = ({ title, description, url, cardImage, technologies, tags, index }: ProjectCardProps) => {
  return (
    <Link className={styles.container} href={`/project/${url}`}>
      <div className={styles.imageWrapper}>
        {tags[0] && <span className={styles.tagFlag}>{tags[0]}</span>}
        <Image
          src={`/my-stuff/assets/images/${cardImage}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.titleRow}>
          <h2 className={styles.projectTitle}>{title}</h2>
          <span className={styles.projectIndex}>{String(index).padStart(2, "0")}</span>
        </div>
        <div className={styles.cardBodyDetails}>
          <p className={styles.projectDescription}>{description}</p>
          <div className={styles.technologies}>
            {technologies.map((tech) => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
