import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a
          href="https://www.linkedin.com/in/lucas-oliveira-io/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          [ Linkedin ]
        </a>
        <a
          href="https://www.instagram.com/http.lucaso/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          [ Instagram ]
        </a>
        <a
          href="https://x.com/http_lucaso"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          [ Twitter / X ]
        </a>
      </div>
      <p className={styles.copyright}>Lucas Oliveira. Based in São Paulo, Brazil.</p>
    </footer>
  );
}
