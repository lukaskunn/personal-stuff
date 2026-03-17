import { FaGithub } from "react-icons/fa";

import styles from "./page.module.css";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const projects = getProjects();

  return (
    <div className={styles.container}>
      <section className={styles.bio}>
        <h1 className={styles["bio-name"]}>Lucas Oliveira</h1>
        <p className={styles["bio-tagline"]}>
          frontend developer · practicing 3D &amp; creative code
        </p>
        <div className={styles["bio-links"]}>
          <a
            href="https://github.com/lukaskunn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={22} />
          </a>
        </div>
      </section>

      <section className={styles.projects}>
        {projects.map((project) => (
          <ProjectCard
            key={project.url}
            title={project.projectName}
            description={project.description}
            url={project.url}
            cardImage={project.cardImage}
          />
        ))}
      </section>
    </div>
  );
}
