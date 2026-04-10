'use client';
import React, { useRef, useEffect } from 'react';

// ------- module-level constants -------
const ASCII_SET = ".:,'-^=*+?!|0#X%WM@";

// ------- types -------
type Point = { x: number; y: number; t: number };
type CellEntry = { ch: string; t: number } | null;

type Params = {
  cellSize?: number;
  brushRadius?: number;
  tailLife?: number;       // ms — how long a tail point lives
  charLife?: number;       // ms — how long a cell char persists after last touch
  bigBlockChance?: number; // 0‒1 probability of placing a 2×2 block
};

export default function CanvasGrid({
  cellSize = 20,
  brushRadius = 4,
  tailLife = 160,
  charLife = 1000,
  bigBlockChance = 0.18,
}: Params) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // hoverPos as ref — no state, no re-renders on every mouse move
  const hoverPosRef = useRef<{ x: number; y: number } | null>(null);
  const recentRef = useRef<Point[]>([]);
  // sizeMapRef: per-cell block size (1=1×1, 2=2×2, 0=occupied by bigger block)
  const sizeMapRef = useRef<number[][]>([]);
  // charMapRef: per-cell persistent char entry
  const charMapRef = useRef<CellEntry[][]>([]);
  // props as ref so the rAF loop always reads the latest values without re-running the effect
  const propsRef = useRef({ cellSize, brushRadius, tailLife, charLife, bigBlockChance });
  useEffect(() => { propsRef.current = { cellSize, brushRadius, tailLife, charLife, bigBlockChance }; }, [cellSize, brushRadius, tailLife, charLife, bigBlockChance]);
  // rebuild the grid whenever cellSize changes
  useEffect(() => { rebuildRef.current?.(); }, [cellSize]);
  // fitted cell size — snapped so an exact integer number of cells fills the canvas width
  const actualCsRef = useRef(cellSize);
  // exposed so the cellSize watcher can trigger a grid rebuild
  const rebuildRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    // ---- build size + char maps ----
    function buildMaps(w: number, h: number, base: number) {
      // snap cell size so an exact integer number of cells fills both axes
      const cols = Math.round(w / base);
      const cs   = w / cols;               // actual fitted cell size
      const rows = Math.round(h / cs);
      actualCsRef.current = cs;

      const { bigBlockChance } = propsRef.current;
      const map: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(1));
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          // only place a 2×2 if ALL four cells are still free (=1)
          if (
            map[y][x] === 1 &&
            map[y][x + 1] === 1 &&
            map[y + 1][x] === 1 &&
            map[y + 1][x + 1] === 1 &&
            Math.random() < bigBlockChance
          ) {
            map[y][x] = 2;
            map[y][x + 1] = 0;  // occupied — skip during draw
            map[y + 1][x] = 0;
            map[y + 1][x + 1] = 0;
          }
        }
      }
      sizeMapRef.current = map;
      charMapRef.current = Array.from({ length: rows }, () => new Array(cols).fill(null));
    }

    // ---- draw one cell (black bg + white ASCII char) ----
    function drawCell(cellX: number, cellY: number, size: number, alpha: number, now: number) {
      const ix = Math.floor(cellX / size);
      const iy = Math.floor(cellY / size);
      const cmap = charMapRef.current;

      ctx.fillStyle = 'black';
      ctx.fillRect(cellX, cellY, size, size);

      // deterministic char per cell, stable across reloads
      let entry = cmap[iy]?.[ix] ?? null;
      if (!entry) {
        // new random char each time the cell is freshly touched
        const ch = ASCII_SET.charAt(Math.floor(Math.random() * ASCII_SET.length));
        entry = { ch, t: now };
        if (cmap[iy]) cmap[iy][ix] = entry;
      } else {
        entry.t = now; // refresh touch time to keep it alive
      }

      const fontSize = Math.max(8, Math.floor(size * 0.9));
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.fillText(entry.ch, cellX + size / 2, cellY + size / 2 + 1);
    }

    // ---- paint all cells within a radius, respecting the sizeMap ----
    function paintRadius(
      cx: number, cy: number,
      radiusInPixels: number,
      cs: number,
      w: number, h: number,
      alpha: number,
      now: number,
      tailDrop: boolean,
    ) {
      const startX = Math.max(0, Math.floor((cx - radiusInPixels) / cs));
      const endX   = Math.min(Math.ceil(w / cs) - 1, Math.floor((cx + radiusInPixels) / cs));
      const startY = Math.max(0, Math.floor((cy - radiusInPixels) / cs));
      const endY   = Math.min(Math.ceil(h / cs) - 1, Math.floor((cy + radiusInPixels) / cs));
      const map    = sizeMapRef.current;

      for (let gy = startY; gy <= endY; gy++) {
        for (let gx = startX; gx <= endX; gx++) {
          const blockSize = map[gy]?.[gx];
          if (!blockSize) continue; // 0 = occupied by bigger block, skip

          const size  = blockSize * cs;
          const cellX = gx * cs;
          const cellY = gy * cs;
          const dist  = Math.hypot(cellX + size / 2 - cx, cellY + size / 2 - cy);
          if (dist > radiusInPixels) continue;

          if (tailDrop && Math.random() > alpha) continue; // stochastic tail dropout
          drawCell(cellX, cellY, size, alpha, now);
        }
      }
    }

    // ---- resize: rebuild DPI + maps ----
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.floor(canvas.clientWidth  * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { cellSize } = propsRef.current;
      buildMaps(canvas.clientWidth, canvas.clientHeight, cellSize);
    }
    rebuildRef.current = resize;

    // ---- rAF loop — decoupled from React state ----
    let rafId = 0;
    function loop() {
      rafId = requestAnimationFrame(loop);
      const { brushRadius: br, tailLife: tl, charLife: cl } = propsRef.current;
      const cs = actualCsRef.current; // use fitted cell size
      const w   = canvas.clientWidth;
      const h   = canvas.clientHeight;
      const now = performance.now();

      ctx.clearRect(0, 0, w, h);

      // prune stale tail points
      recentRef.current = recentRef.current.filter(p => now - p.t <= tl);

      // prune stale char entries
      const cmap = charMapRef.current;
      for (let y = 0; y < cmap.length; y++)
        for (let x = 0; x < (cmap[y]?.length ?? 0); x++)
          if (cmap[y][x] && now - cmap[y][x]!.t > cl) cmap[y][x] = null;

      const hp = hoverPosRef.current;

      // 1. draw tail first (oldest→newest so newer points overdraw older)
      for (const p of recentRef.current) {
        const age   = now - p.t;
        const alpha = Math.max(0, 1 - age / tl);
        // radius shrinks from 100% → 20% as the point ages
        const radiusFactor = 0.2 + 0.8 * alpha;
        paintRadius(p.x, p.y, br * cs * radiusFactor, cs, w, h, alpha, now, true);
      }

      // 2. draw immediate full-strength brush on top, then record the point
      if (hp) {
        paintRadius(hp.x, hp.y, br * cs, cs, w, h, 1, now, false);
        recentRef.current.push({ x: hp.x, y: hp.y, t: now });
      }
    }

    // ---- pointer handlers (no setState) ----
    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      hoverPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() { hoverPosRef.current = null; }

    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    resize();
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []); // runs once — props accessed via propsRef

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
  );
}
