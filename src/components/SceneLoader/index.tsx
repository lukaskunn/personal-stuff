import styles from "./SceneLoader.module.scss";

export default function SceneLoader() {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Loading</span>
    </div>
  );
}
