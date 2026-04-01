import styles from "./Controls.module.scss";

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
};

export default function TextArea({ label, value, onChange, rows = 3 }: TextAreaProps) {
  return (
    <div className={styles.controlGroup}>
      <span className={styles.label}>{label}</span>
      <textarea
        className={styles.textArea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={rows}
      />
    </div>
  );
}
