//@ts-nocheck
import React from "react";
import {
  useGLTF,
  OrbitControls,
  Text
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useKeyPress from "@/components/hooks/listenUserKeyPress";
// import { useControls } from "leva";

const Model = () => {
const key1ref = React.useRef<THREE.Mesh>(null);
const key2ref = React.useRef<THREE.Mesh>(null);
const key3ref = React.useRef<THREE.Mesh>(null);
const key4ref = React.useRef<THREE.Mesh>(null);
const key5ref = React.useRef<THREE.Mesh>(null);
const key6ref = React.useRef<THREE.Mesh>(null);
const spaceBarRef = React.useRef<THREE.Mesh>(null);

    
  const { nodes, materials } = useGLTF("/my-stuff/medias/small_keyboard_2.glb");
  const { viewport } = useThree();

  const pressKey = (key: number) => {
    const keys = [key1ref, key2ref, key3ref, key4ref, key5ref, key6ref, spaceBarRef];

    if(keys[key-1].current) {
        keys[key-1].current.position.y -= 0.15;

        setTimeout(() => {
            keys[key-1].current.position.y += 0.15;
        }, 100);
    }
  }

    useKeyPress("1", () => pressKey(1));
    useKeyPress("2", () => pressKey(2));
    useKeyPress("3", () => pressKey(4));
    useKeyPress("4", () => pressKey(3));
    useKeyPress("5", () => pressKey(6));
    useKeyPress("6", () => pressKey(5));
    useKeyPress(" ", () => pressKey(7));

  return (
    <group dispose={null} scale={viewport.width / 20} rotation={[1.5, 5, 0]} position={[0, 1, -3]}>
      <group position={[0, -0.527, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials['Keybord Base gray']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={materials.Material}
        />
      </group>
      <mesh
      ref={key1ref}
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-0.875, 0.139, 2.875]}
        scale={[1, 0.711, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-0.875, 0.139, 0.875]}
        scale={[1, 0.711, 1]}
        ref={key2ref}	
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[-0.875, 0.139, -3.125]}
        scale={[1, 0.711, 1]}
        ref={key3ref}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[-0.875, 0.139, -1.125]}
        scale={[1, 0.711, 1]}
        ref={key4ref}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
        position={[1.125, -0.042, -3.125]}
        scale={[1, 0.711, 1]}
        ref={key5ref}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials['Orange color']}
        position={[1.125, -0.042, 0.875]}
        scale={[1, 0.711, 1]}
        ref={spaceBarRef}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[1.125, -0.042, 2.875]}
        scale={[1, 0.711, 1]}
        ref={key6ref}
      />
      <OrbitControls enableDamping dampingFactor={0.08}/>
    </group>
  )
};

export default Model;
