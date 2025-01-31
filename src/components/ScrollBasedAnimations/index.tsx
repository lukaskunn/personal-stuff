import React from "react";
import dynamic from "next/dynamic";

import styles from "./ScrollBasedAnimations.module.scss";
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const ScrollBasedAnimations = () => {
      return (
    <div className={styles.container}>
        <div className={styles["title-1"]}><h1>Hello World!</h1></div>
        <div className={styles["title-2"]}><h1>Welcome</h1></div>
        <div className={styles["title-3"]}><h1>Loren Ipsun</h1></div>
      <Scene />
    </div>
  );
};

export default ScrollBasedAnimations;
