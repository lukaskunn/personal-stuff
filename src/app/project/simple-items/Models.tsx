import React from "react";
import {
  useGLTF,
  MeshTransmissionMaterial,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { type SimpleItemsProps } from "./SimpleItemsControls";

const Model = ({ simpleItemsProps }: { simpleItemsProps: SimpleItemsProps }) => {
  const torusRef = React.useRef<THREE.Mesh>(null);
  const cubeRef = React.useRef<THREE.Mesh>(null);
  const sphereRef = React.useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF("/my-stuff/assets/medias/simple_items.glb");
  const { viewport } = useThree();

  const { rotationSpeed, sphereColor, cubeWireframe, sphereWireframe,
    torusThickness, torusRoughness, torusTransmission, torusIor } = simpleItemsProps;

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += rotationSpeed;
      cubeRef.current.rotation.y += rotationSpeed;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x += rotationSpeed;
      sphereRef.current.rotation.y += rotationSpeed;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += rotationSpeed;
      torusRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group scale={viewport.width / 20} rotation={[0, 30, 0]}>
      <mesh {...nodes.Cube} rotation={[0, 0, 10]} ref={cubeRef}>
        <meshNormalMaterial wireframe={cubeWireframe} />
      </mesh>
      <mesh {...nodes.Sphere} rotation={[0, 0, 10]} ref={sphereRef}>
        <meshBasicMaterial color={sphereColor} wireframe={sphereWireframe} />
      </mesh>
      <mesh {...nodes.Torus} rotation={[0, 0, 10]} ref={torusRef}>
        <MeshTransmissionMaterial
          thickness={torusThickness}
          roughness={torusRoughness}
          transmission={torusTransmission}
          ior={torusIor}
          chromaticAberration={0.15}
          backside={true}
        />
      </mesh>
      <OrbitControls enableDamping dampingFactor={0.08} />
    </group>
  );
};

export default Model;
