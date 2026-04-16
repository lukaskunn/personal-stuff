import styles from "./Controls.module.scss";

type TextInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function TextInput({ label, value, onChange, placeholder }: TextInputProps) {
  return (
    <div className={styles.controlGroup}>
      <span className={styles.label}>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.textInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
