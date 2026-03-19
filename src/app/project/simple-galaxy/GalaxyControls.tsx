"use client";

import Slider from "@/components/controls/Slider";
import ColorInput from "@/components/controls/ColorInput";

export type GalaxyProps = {
  count: number;
  size: number;
  radius: number;
  radiusPower: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
};

type GalaxyControlsProps = GalaxyProps & {
  onChange: (patch: Partial<GalaxyProps>) => void;
};

export default function GalaxyControls({ count, size, radius, radiusPower, branches, spin, randomness, randomnessPower, insideColor, outsideColor, onChange }: GalaxyControlsProps) {
  return (
    <>
      <Slider label="Count" value={count} min={100} max={100000} step={100} onChange={(v) => onChange({ count: v })} />
      <Slider label="Size" value={size} min={0.01} max={0.1} step={0.01} onChange={(v) => onChange({ size: v })} />
      <Slider label="Radius" value={radius} min={1} max={20} step={1} onChange={(v) => onChange({ radius: v })} />
      <Slider label="Radius Power" value={radiusPower} min={1} max={10} step={1} onChange={(v) => onChange({ radiusPower: v })} />
      <Slider label="Branches" value={branches} min={1} max={10} step={1} onChange={(v) => onChange({ branches: v })} />
      <Slider label="Spin" value={spin} min={-5} max={5} step={0.1} onChange={(v) => onChange({ spin: v })} />
      <Slider label="Randomness" value={randomness} min={0} max={2} step={0.001} onChange={(v) => onChange({ randomness: v })} />
      <Slider label="Randomness Power" value={randomnessPower} min={1} max={10} step={1} onChange={(v) => onChange({ randomnessPower: v })} />
      <ColorInput label="Inside Color" value={insideColor} onChange={(v) => onChange({ insideColor: v })} />
      <ColorInput label="Outside Color" value={outsideColor} onChange={(v) => onChange({ outsideColor: v })} />
    </>
  );
}
