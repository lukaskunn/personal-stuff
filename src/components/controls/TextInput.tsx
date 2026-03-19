import styles from "./Controls.module.css";

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <div className={styles.controlGroup}>
      <span className={styles.label}>{label}</span>
      <input
        type="text"
        className={styles.textInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
