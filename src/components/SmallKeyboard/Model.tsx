import React from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Mesh } from "three";
import { useThree } from "@react-three/fiber";
import useKeyPress from "@/components/hooks/listenUserKeyPress";
// import { useControls } from "leva";

const Model = () => {
  const key1ref = React.useRef<Mesh>(null);
  const key2ref = React.useRef<Mesh>(null);
  const key3ref = React.useRef<Mesh>(null);
  const key4ref = React.useRef<Mesh>(null);
  const key5ref = React.useRef<Mesh>(null);
  const key6ref = React.useRef<Mesh>(null);
  const spaceBarRef = React.useRef<Mesh>(null);

  const { nodes, materials } = useGLTF("/my-stuff/medias/small_keyboard_2.glb");
  const { viewport } = useThree();

  const pressKey = (keyIndex: number) => {
    const keys = [
      key1ref,
      key2ref,
      key3ref,
      key4ref,
      key5ref,
      key6ref,
      spaceBarRef,
    ];

    const key = keys[keyIndex - 1];

    if (!key.current) return;

    key.current.position.y -= 0.15;

    setTimeout(() => {
      if (key.current) {
        key.current.position.y += 0.15;
      }
    }, 100);
  };

  useKeyPress("1", () => pressKey(1));
  useKeyPress("2", () => pressKey(2));
  useKeyPress("3", () => pressKey(4));
  useKeyPress("4", () => pressKey(3));
  useKeyPress("5", () => pressKey(6));
  useKeyPress("6", () => pressKey(5));
  useKeyPress(" ", () => pressKey(7));

  return (
    <group
      dispose={null}
      scale={viewport.width / 20}
      rotation={[1.5, 5, 0]}
      position={[0, 1, -3]}
    >
      <group position={[0, -0.527, 0]}>
        <mesh {...nodes.Cube010} material={materials["Keybord Base gray"]}>
          <meshStandardMaterial {...materials["Keybord Base gray"]} />
        </mesh>
        <mesh {...nodes.Cube010_1}>
          <meshStandardMaterial {...materials.Material} />
        </mesh>
      </group>
      <mesh
        ref={key1ref}
        {...nodes.Cube}
        position={[-0.875, 0.139, 2.875]}
        scale={[1, 0.711, 1]}
      >
        <meshStandardMaterial {...materials[""]} />
      </mesh>
      <mesh
        {...nodes.Cube001}
        position={[-0.875, 0.139, 0.875]}
        scale={[1, 0.711, 1]}
        ref={key2ref}
      >
        <meshStandardMaterial {...materials[""]} />
      </mesh>
      <mesh
        {...nodes.Cube002}
        position={[-0.875, 0.139, -3.125]}
        scale={[1, 0.711, 1]}
        ref={key3ref}
      >
        <meshStandardMaterial {...materials[""]} />
      </mesh>
      <mesh
        {...nodes.Cube003}
        position={[-0.875, 0.139, -1.125]}
        scale={[1, 0.711, 1]}
        ref={key4ref}
      >
        <meshStandardMaterial {...materials[""]} />
      </mesh>
      <mesh
        {...nodes.Cube005}
        position={[1.125, -0.042, -3.125]}
        scale={[1, 0.711, 1]}
        ref={key5ref}
      >
        <meshStandardMaterial {...materials[""]} />
      </mesh>
      <mesh
        {...nodes.Cube006}
        material={materials["Orange color"]}
        position={[1.125, -0.042, 0.875]}
        scale={[1, 0.711, 1]}
        ref={spaceBarRef}
      >
        <meshStandardMaterial {...materials["Orange color"]} />
      </mesh>
      <mesh
        {...nodes.Cube007}
        position={[1.125, -0.042, 2.875]}
        scale={[1, 0.711, 1]}
        ref={key6ref}
      >
        <meshStandardMaterial {...materials[""]} />
      </mesh>
      <OrbitControls enableDamping dampingFactor={0.08} />
    </group>
  );
};

export default Model;
