import React from "react";
import {
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

const Model = () => {
  const mesh = React.useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF("/my-stuff/medias/torus.glb");
  const { viewport } = useThree();

  const material = new THREE.MeshStandardMaterial({
    color: "red",
    roughness: 0.5,
    metalness: 0.5,
  });

  useFrame(async () => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.005;
  });

  return (
    <group scale={viewport.width / 20}>
      <mesh geometry={(nodes.Torus002 as THREE.Mesh).geometry} rotation={[0, 0, 10]} ref={mesh} material={material}/>
      <OrbitControls enableDamping dampingFactor={0.08} autoRotate autoRotateSpeed={0.1}/>
    </group>
  );
};

export default Model;
