import React from "react";
import {
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { type GalaxyProps } from "./GalaxyControls";

const Model = ({ galaxyProps: controls }: { galaxyProps: GalaxyProps }) => {
  const { viewport } = useThree();

  const bufferRef = React.useRef<THREE.BufferAttribute>(null);
  const [positions, setPositions] = React.useState(new Float32Array(controls.count * 3));
  const [colors, setColors] = React.useState(new Float32Array(controls.count * 3));
  const [showGalaxy, setShowGalaxy] = React.useState(true);

  React.useEffect(() => {
    const tempPositions = new Float32Array(controls.count * 3);
    const tempColors = new Float32Array(controls.count * 3);
    const randomizePoints = () => {
      const colorInside = new THREE.Color(controls.insideColor);
      const colorOutside = new THREE.Color(controls.outsideColor);
      for (let i = 0; i < controls.count; i++) {
        const galRadius = Math.random() * controls.radius;
        const spinAngle = galRadius * controls.spin;
        const branchAngle = (i % controls.branches) / controls.branches * Math.PI * 2;

        const randomX = Math.pow(Math.random(), controls.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * controls.randomness;
        const randomY = Math.pow(Math.random(), controls.randomnessPower) * 0.5 * (Math.random() < 0.5 ? 1 : -1) * controls.randomness;
        const randomZ = Math.pow(Math.random(), controls.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * controls.randomness;

        tempPositions[i * 3] = Math.cos(branchAngle + spinAngle) * galRadius + randomX;
        tempPositions[i * 3 + 1] = randomY;
        tempPositions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * galRadius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, galRadius / controls.radius);

        tempColors[i * 3] = mixedColor.r;
        tempColors[i * 3 + 1] = mixedColor.g;
        tempColors[i * 3 + 2] = mixedColor.b;
      }
    };

    randomizePoints();
    setPositions(tempPositions);
    setColors(tempColors);
  }, [controls]);

  React.useEffect(() => {
    setShowGalaxy(false);
    if (bufferRef.current) {
      bufferRef.current.needsUpdate = true;
    }
  }, [positions]);

  React.useEffect(() => {
    setShowGalaxy(true);
  }, [showGalaxy]);

  return (
    <group scale={viewport.width / 20}>
      {showGalaxy && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach='attributes-position'
              count={controls.count}
              itemSize={3}
              array={positions}
              ref={bufferRef}
            />
            <bufferAttribute
              attach='attributes-color'
              count={controls.count}
              itemSize={3}
              array={colors}
            />
          </bufferGeometry>
          <pointsMaterial
            size={controls.size}
            color={"#ffffff"}
            vertexColors={true}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            transparent
          />
        </points>
      )}
      <OrbitControls enableDamping dampingFactor={0.08} autoRotate autoRotateSpeed={0.1} />
    </group>
  );
};

export default Model;
