import styles from "./Controls.module.scss";

type ColorInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className={styles.controlGroup}>
      <span className={styles.label}>{label}</span>
      <div className={styles.colorRow}>
        <label className={styles.colorSwatch}>
          <div className={styles.colorPreview} style={{ background: value }} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
        <span className={styles.colorValue}>{value}</span>
      </div>
    </div>
  );
}
