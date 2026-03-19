"use client";

import Slider from "@/components/controls/Slider";
import ColorInput from "@/components/controls/ColorInput";

export type KeyboardProps = {
  keyColor: string;
  accentColor: string;
  lightIntensity: number;
};

type KeyboardControlsProps = KeyboardProps & {
  onChange: (patch: Partial<KeyboardProps>) => void;
};

export default function KeyboardControls({ keyColor, accentColor, lightIntensity, onChange }: KeyboardControlsProps) {
  return (
    <>
      <ColorInput label="Key Color" value={keyColor} onChange={(v) => onChange({ keyColor: v })} />
      <ColorInput label="Accent Key" value={accentColor} onChange={(v) => onChange({ accentColor: v })} />
      <Slider label="Light Intensity" value={lightIntensity} min={0} max={10} step={0.1} onChange={(v) => onChange({ lightIntensity: v })} />
    </>
  );
}
