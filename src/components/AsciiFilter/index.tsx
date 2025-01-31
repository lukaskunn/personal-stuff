'use client';
import React from "react";
import dynamic from "next/dynamic";

import styles from "./AsciiFilter.module.scss";
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const AsciiFilter = () => {
      return (
    <div className={styles.container} >
      <Scene />
    </div>
  );
};

export default AsciiFilter;
