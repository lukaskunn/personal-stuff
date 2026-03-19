"use client";

import Slider from "@/components/controls/Slider";
import Toggle from "@/components/controls/Toggle";
import ColorInput from "@/components/controls/ColorInput";
import TextInput from "@/components/controls/TextInput";

export type AsciiProps = {
  density: string;
  fontSize: number;
  cellSize: number;
  color: string;
  invert: boolean;
};

type AsciiControlsProps = AsciiProps & {
  onChange: (patch: Partial<AsciiProps>) => void;
};

export default function AsciiControls({ density, fontSize, cellSize, color, invert, onChange }: AsciiControlsProps) {
  return (
    <>
      <TextInput label="Density String" value={density} onChange={(v) => onChange({ density: v })} />
      <Slider label="Font Size" value={fontSize} min={1} max={100} step={1} onChange={(v) => onChange({ fontSize: v })} />
      <Slider label="Cell Size" value={cellSize} min={1} max={100} step={1} onChange={(v) => onChange({ cellSize: v })} />
      <ColorInput label="Color" value={color} onChange={(v) => onChange({ color: v })} />
      <Toggle label="Invert" value={invert} onChange={(v) => onChange({ invert: v })} />
    </>
  );
}
