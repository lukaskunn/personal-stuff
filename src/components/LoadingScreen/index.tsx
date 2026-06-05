"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./LoadingScreen.module.scss";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const overlay = overlayRef.current;
    const counter = counterRef.current;
    if (!overlay || !counter) return;

    const tl = gsap.timeline();

    // Slide counter text up into view from behind mask
    tl.fromTo(counter, { y: 100 }, { y: 0, duration: 0.6, ease: "power3.out" });

    // Count 0 → 100 over 4s
    const obj = { value: 0 };
    tl.to(
      obj,
      {
        value: 100,
        duration: 3,
        ease: "power3.inOut",
        onUpdate: () => setCount(Math.floor(obj.value)),
      },
      "<"
    );

    // Slide white block out upward
    tl.to(overlay, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, "+=0.1");

    return () => { tl.kill(); };
  }, []);

  const formatted = String(count).padStart(2, "0");

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.counterWrapper}>
        <span ref={counterRef} className={styles.counter}>{formatted}%</span>
      </div>
    </div>
  );
}
