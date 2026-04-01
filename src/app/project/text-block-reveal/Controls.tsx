"use client"

import TextArea from "@/components/controls/TextArea"
import ColorInput from "@/components/controls/ColorInput";
import Slider from "@/components/controls/Slider";
import Select from "@/components/controls/Select";
import Button from "@/components/controls/Button";

export type TextBlockRevealProps = {
  text: string;
  fontSize: number;
  color: string;
  blockColor: string;
  animationSpeed: number;
  staggerDelay: number;
  direction: 'bottom-to-top' | 'top-to-bottom' | 'left-to-right' | 'right-to-left';
  maxWidth: number;
  lineHeight: number;
}

type TextBlockRevealControlsProps = TextBlockRevealProps & {
  onChange: (patch: Partial<TextBlockRevealProps>) => void;
  onReplay?: () => void;
};

const directionOptions = [
  { value: 'bottom-to-top' as const, label: 'Bottom to Top' },
  { value: 'top-to-bottom' as const, label: 'Top to Bottom' },
  { value: 'left-to-right' as const, label: 'Left to Right' },
  { value: 'right-to-left' as const, label: 'Right to Left' }
];

export default function TextBlockRevealControls({
  text,
  fontSize,
  color,
  blockColor,
  animationSpeed,
  staggerDelay,
  direction,
  maxWidth,
  lineHeight,
  onChange,
  onReplay
}: TextBlockRevealControlsProps) {
  return (
    <>
      <TextArea label="Text" value={text} onChange={(v) => onChange({ text: v })} rows={4} />
      <Slider label="Font Size" value={fontSize} min={1} max={100} step={1} onChange={(v) => onChange({ fontSize: v })} />
      <Slider
        label="Container Max Width"
        value={maxWidth}
        min={200}
        max={1200}
        step={50}
        onChange={(v) => onChange({ maxWidth: v })}
      />
      <Slider
        label="Line Height"
        value={lineHeight}
        min={0.8}
        max={2}
        step={0.1}
        onChange={(v) => onChange({ lineHeight: v })}
      />
      <ColorInput label="Text Color" value={color} onChange={(v) => onChange({ color: v })} />
      <ColorInput label="Block Color" value={blockColor} onChange={(v) => onChange({ blockColor: v })} />
      <Slider
        label="Animation Speed"
        value={animationSpeed}
        min={0.1}
        max={3}
        step={0.1}
        onChange={(v) => onChange({ animationSpeed: v })}
      />
      <Slider
        label="Stagger Delay"
        value={staggerDelay}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => onChange({ staggerDelay: v })}
      />
      <Select
        label="Direction"
        value={direction}
        options={directionOptions}
        onChange={(v) => onChange({ direction: v })}
      />
      {onReplay && <Button text="Reset Animation" onClick={onReplay} />}
    </>
  );
}
