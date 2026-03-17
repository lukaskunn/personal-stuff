import React from "react";
import {
  useGLTF,
  Text,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Mesh } from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const Model = () => {
  const mesh = React.useRef<Mesh>(null);
  const { nodes } = useGLTF("/my-stuff/medias/torus.glb");
  const { viewport } = useThree();
  //   const orbitControls = React.useRef<OrbitControls>(null);

  const materialProps = useControls({
    thickness: { value: 0.9, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.15, min: 0, max: 1 },
    backside: { value: true },
  });

  // React.useEffect(() => {
  //   if (!mesh.current) return;

  //   // mesh.current.rotation.x = 20;
  //   // mesh.current.rotation.y = 3;

  // }, [])

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
      <OrbitControls enableDamping dampingFactor={0.08} autoRotate autoRotateSpeed={0.1}/>
    </group>
  );
};

export default Model;
