import styles from "./page.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Personal<br /> <strong>Experiments</strong>
          </h1>
          <div className={styles.heroBottom}>
            <p className={styles.heroSubtitle}>
              A curated collection of micro-interactions, code snippets, design
              explorations, and weekend builds. These projects represent the
              playground where logic meets creativity.
            </p>
            <p className={styles.scrollCta}>[ SCROLL TO EXPLORE ]</p>
          </div>
        </section>

        {/* Projects */}
        <section className={styles.projectsSection}>
          <div className={styles.projectsGrid}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.url}
                title={project.projectName}
                description={project.description}
                url={project.url}
                cardImage={project.cardImage}
                technologies={project.technologies}
                tags={project.tags}
                index={projects.length - i}
              />
            ))}
            <div className={styles.moreCard}>
              <span className={styles.moreTitle}>More</span>
              <span className={styles.moreLabel}>COMING SOON</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
