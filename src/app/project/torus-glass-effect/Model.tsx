import React from "react";
import {
  useGLTF,
  Text,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Mesh } from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { type TorusMaterialProps } from "./TorusPageClient";

const Model = ({ materialProps }: { materialProps: TorusMaterialProps }) => {
  const mesh = React.useRef<Mesh>(null);
  const { nodes } = useGLTF("/my-stuff/assets/medias/torus.glb");
  const { viewport } = useThree();

  useFrame(() => {
    if (!mesh.current) return;

    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.005;
  });

  return (
    <group scale={viewport.width / 20}>
      <Text fontSize={4} position={[0, 0, -5]}>
        Hello World!
      </Text>
      <mesh {...nodes.Torus002} rotation={[0, 0, 10]} ref={mesh}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <OrbitControls enableDamping dampingFactor={0.08} autoRotate autoRotateSpeed={0.1} />
    </group>
  );
};

export default Model;
