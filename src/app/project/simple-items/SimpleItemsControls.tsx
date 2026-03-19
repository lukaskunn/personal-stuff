"use client";

import Slider from "@/components/controls/Slider";
import Toggle from "@/components/controls/Toggle";
import ColorInput from "@/components/controls/ColorInput";

export type SimpleItemsProps = {
  rotationSpeed: number;
  sphereColor: string;
  cubeWireframe: boolean;
  sphereWireframe: boolean;
  torusThickness: number;
  torusRoughness: number;
  torusTransmission: number;
  torusIor: number;
};

type SimpleItemsControlsProps = SimpleItemsProps & {
  onChange: (patch: Partial<SimpleItemsProps>) => void;
};

export default function SimpleItemsControls({ rotationSpeed, sphereColor, cubeWireframe, sphereWireframe, torusThickness, torusRoughness, torusTransmission, torusIor, onChange }: SimpleItemsControlsProps) {
  return (
    <>
      <Slider label="Rotation Speed" value={rotationSpeed} min={0} max={0.05} step={0.001} onChange={(v) => onChange({ rotationSpeed: v })} />
      <Toggle label="Cube Wireframe" value={cubeWireframe} onChange={(v) => onChange({ cubeWireframe: v })} />
      <ColorInput label="Sphere Color" value={sphereColor} onChange={(v) => onChange({ sphereColor: v })} />
      <Toggle label="Sphere Wireframe" value={sphereWireframe} onChange={(v) => onChange({ sphereWireframe: v })} />
      <Slider label="Torus Thickness" value={torusThickness} min={0} max={3} step={0.05} onChange={(v) => onChange({ torusThickness: v })} />
      <Slider label="Torus Roughness" value={torusRoughness} min={0} max={1} step={0.1} onChange={(v) => onChange({ torusRoughness: v })} />
      <Slider label="Torus Transmission" value={torusTransmission} min={0} max={1} step={0.1} onChange={(v) => onChange({ torusTransmission: v })} />
      <Slider label="Torus IOR" value={torusIor} min={0} max={3} step={0.1} onChange={(v) => onChange({ torusIor: v })} />
    </>
  );
}
