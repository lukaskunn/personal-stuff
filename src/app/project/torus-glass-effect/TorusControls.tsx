"use client";

import Slider from "@/components/controls/Slider";
import Toggle from "@/components/controls/Toggle";

export type TorusMaterialProps = {
  thickness: number;
  roughness: number;
  transmission: number;
  ior: number;
  chromaticAberration: number;
  backside: boolean;
};

type TorusControlsProps = TorusMaterialProps & {
  onChange: (patch: Partial<TorusMaterialProps>) => void;
};

export default function TorusControls({ thickness, roughness, transmission, ior, chromaticAberration, backside, onChange }: TorusControlsProps) {
  return (
    <>
      <Slider label="Thickness" value={thickness} min={0} max={3} step={0.05} onChange={(v) => onChange({ thickness: v })} />
      <Slider label="Roughness" value={roughness} min={0} max={1} step={0.1} onChange={(v) => onChange({ roughness: v })} />
      <Slider label="Transmission" value={transmission} min={0} max={1} step={0.1} onChange={(v) => onChange({ transmission: v })} />
      <Slider label="IOR" value={ior} min={0} max={3} step={0.1} onChange={(v) => onChange({ ior: v })} />
      <Slider label="Chromatic Aberration" value={chromaticAberration} min={0} max={1} step={0.01} onChange={(v) => onChange({ chromaticAberration: v })} />
      <Toggle label="Backside" value={backside} onChange={(v) => onChange({ backside: v })} />
    </>
  );
}
