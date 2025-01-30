import React from "react";
import dynamic from "next/dynamic";

import styles from "./SimpleGallaxy.module.scss";
const Scene = dynamic(() => import("./Scene"), { ssr: false });



const SimpleGalaxy = () => {
      return (
    <div className={styles.container}>
      <Scene />
    </div>
  );
};

export default SimpleGalaxy;
