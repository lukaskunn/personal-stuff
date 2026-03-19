import styles from "./Controls.module.scss";

type ToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function Toggle({ label, value, onChange }: ToggleProps) {
  return (
    <div className={styles.controlGroup}>
      <div className={styles.toggleRow}>
        <span className={styles.label}>{label}</span>
        <button
          className={`${styles.togglePill} ${value ? styles.toggleOn : ""}`}
          onClick={() => onChange(!value)}
          aria-pressed={value}
          aria-label={label}
        />
      </div>
    </div>
  );
}
