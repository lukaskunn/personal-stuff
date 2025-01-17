import React from "react";
import dynamic from "next/dynamic";

import styles from "./SmallKeyboard.module.scss";
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const TorusGlassEffect = () => {
  return (
    <div className={styles.container}>
        {/* <p>press 1, 2, 3, 4, 5, 6 or Space</p> */}
      <Scene />
    </div>
  );
};

export default TorusGlassEffect;
