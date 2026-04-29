'use client';

import React from 'react';
import { Slider } from "@/components/controls";

interface ControlParams {
  pictureSize: number;
  lifespan: number;
  spawnDistance: number;
  opacity: number;
}

interface ControlsProps extends ControlParams {
  onUpdate: (controls: Partial<ControlParams>) => void;
}

export default function Controls({ opacity, lifespan, pictureSize, spawnDistance, onUpdate }: ControlsProps) {
  return (
    <>
      <Slider label="Picture Size" value={pictureSize} min={40} max={300} step={1} onChange={(v) => onUpdate({ pictureSize: v })} />
      <Slider label="Spawn Distance (px)" value={spawnDistance} min={20} max={200} step={5} onChange={(v) => onUpdate({ spawnDistance: v })} />
      <Slider label="Lifespan (ms)" value={lifespan} min={100} max={3000} step={100} onChange={(v) => onUpdate({ lifespan: v })} />
      <Slider label="Opacity" value={opacity} min={0.1} max={1} step={0.05} onChange={(v) => onUpdate({ opacity: v })} />
    </>
  );
}
