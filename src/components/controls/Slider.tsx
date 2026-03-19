import styles from "./Controls.module.scss";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export default function Slider({ label, value, min, max, step = 0.01, onChange }: SliderProps) {
  const decimals = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  return (
    <div className={styles.controlGroup}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.valueDisplay}>{value.toFixed(decimals)}</span>
      </div>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
