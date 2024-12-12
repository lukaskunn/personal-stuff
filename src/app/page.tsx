import styles from "./page.module.css";

import ProjectCard from "@/components/ProjectCard";
import projects from "../../public/content/projects.json";
import { ProjectType } from "../types/project";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to my personal stuff</h1>
      <p>Find here my mini projects that i use to practice my skills.</p>
      <div className={styles.projects}>
        {projects.map((project, index) => {
          const { projectName, description, url, cardImage } = project as ProjectType;

          return (
            <ProjectCard
              key={index}
              title={projectName}
              description={description}
              url={url}
                cardImage={cardImage}
            />
          );
        })}
      </div>
    </div>
  );
}

