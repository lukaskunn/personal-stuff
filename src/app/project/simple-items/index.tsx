import React from "react";
import dynamic from "next/dynamic";

import styles from "./SimpleItems.module.scss";
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const SimpleItems = () => {
  return (
    <div className={styles.container}>
      <Scene />
    </div>
  );
};

export default SimpleItems;
