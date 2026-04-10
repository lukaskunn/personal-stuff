'use client';
import React, { useState } from 'react';
import SideMenu from '@/components/SideMenu';
import CanvasGrid from './CanvasGrid';
import info from './project-information.json';

const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
const text2 = "sed do eiusmod tempor incididunt ut labore et";

export default function CanvasGridClient() {
  const [cellSize, setCellSize] = useState(40);
  const [brushRadius, setBrushRadius] = useState(3);
  const [tailLife, setTailLife] = useState(240);
  const [charLife, setCharLife] = useState(1000);
  const [bigBlockChance, setBigBlockChance] = useState(0.18);

  const controls = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ fontSize: 12 }}>Cell size: {cellSize}px
        <input type="range" min={8} max={80} step={1} value={cellSize}
          onChange={e => setCellSize(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
      </label>

      <label style={{ fontSize: 12 }}>Brush radius: {brushRadius} cells
        <input type="range" min={1} max={12} step={1} value={brushRadius}
          onChange={e => setBrushRadius(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
      </label>

      <label style={{ fontSize: 12 }}>Tail life: {tailLife}ms
        <input type="range" min={40} max={800} step={20} value={tailLife}
          onChange={e => setTailLife(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
      </label>

      <label style={{ fontSize: 12 }}>Char life: {charLife}ms
        <input type="range" min={100} max={5000} step={100} value={charLife}
          onChange={e => setCharLife(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
      </label>

      <label style={{ fontSize: 12 }}>Big block chance: {Math.round(bigBlockChance * 100)}%
        <input type="range" min={0} max={0.5} step={0.01} value={bigBlockChance}
          onChange={e => setBigBlockChance(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
      </label>
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CanvasGrid
        cellSize={cellSize}
        brushRadius={brushRadius}
        tailLife={tailLife}
        charLife={charLife}
        bigBlockChance={bigBlockChance}
      />

      <div style={{ position: 'absolute', right: 12, top: 12, zIndex: 3 }}>
        <SideMenu
          projectName={info.title}
          description={info.description}
          technologies={info.technologies}
          slug="canvas-grid-cusor-follower"
          controls={controls}
        />
      </div>

      <div style={{ width: "100%", height: "fit-content", background: "black", position: "absolute", top: "50%", transform: "transition(50%, 0%)", color: "white", zIndex: 2, pointerEvents: "none", fontSize: 18 }}>
          <p style={{ margin: "0", display: "flex", justifyContent: "space-between"}}>{text1.split(" ").map((word, index) => <span key={index}>{word}</span>)}</p>
          <p style={{ margin: "0", display: "flex", justifyContent: "space-between"}}>{text2.split(" ").map((word, index) => <span key={index}>{word}</span>)}</p>
        </div>
    </div>
  );
}

