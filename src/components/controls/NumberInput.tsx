import styles from "./Controls.module.css";

type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export default function NumberInput({ label, value, min, max, step = 1, onChange }: NumberInputProps) {
  const handleChange = (raw: string) => {
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) return;
    const clamped = Math.min(max ?? Infinity, Math.max(min ?? -Infinity, parsed));
    onChange(clamped);
  };

  return (
    <div className={styles.controlGroup}>
      <span className={styles.label}>{label}</span>
      <input
        type="number"
        className={styles.numberInput}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
