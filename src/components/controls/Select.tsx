import styles from "./Controls.module.scss";

type SelectOption<T> = {
  value: T;
  label: string;
};

type SelectProps<T extends string> = {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
};

export default function Select<T extends string>({ label, value, options, onChange }: SelectProps<T>) {
  return (
    <div className={styles.controlGroup}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
      </div>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
