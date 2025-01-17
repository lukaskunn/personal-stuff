import React from "react";
import {
  useGLTF,
  MeshTransmissionMaterial,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

const Model = () => {
  const torusRef = React.useRef<THREE.Mesh>(null);
  const cubeRef = React.useRef<THREE.Mesh>(null);
  const sphereRef = React.useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF("/my-stuff/medias/simple_items.glb");
  const { viewport } = useThree();

  console.log(nodes);

  const materialProps = {
    thickness:0.9,
    roughness:0,
    transmission:1,
    ior:1.2,
    chromaticAberration:0.15,
    backside: true
}

  useFrame(() => {
    if(cubeRef.current) {
        cubeRef.current.rotation.x += 0.005;
        cubeRef.current.rotation.y += 0.005;
    }

    if(sphereRef.current) {
        sphereRef.current.rotation.x += 0.005;
        sphereRef.current.rotation.y += 0.005;
    }

    if(torusRef.current) {
        torusRef.current.rotation.x += 0.005;
        torusRef.current.rotation.y += 0.005;
    }
  });

  const normalMaterial1 = new THREE.MeshNormalMaterial({wireframe: true});
  const basicMaterial = new THREE.MeshBasicMaterial({color: "#ff0000", opacity: 0.2, wireframe: true});

  return (
    <group scale={viewport.width / 20} rotation={[0, 30, 0]}>
      <mesh {...nodes.Cube} rotation={[0, 0, 10]} ref={cubeRef}>
        <meshStandardMaterial {...normalMaterial1} />
        </mesh>
      <mesh {...nodes.Sphere} rotation={[0, 0, 10]} ref={sphereRef}>
        <meshBasicMaterial {...basicMaterial} />
        </mesh>
      <mesh {...nodes.Torus} rotation={[0, 0, 10]} ref={torusRef}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <OrbitControls enableDamping dampingFactor={0.08}/>
    </group>
  );
};

export default Model;
