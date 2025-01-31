
import React from "react";
import {
  OrbitControls,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";

const Model = () => {
    const mesh1 = React.useRef<THREE.Mesh>(null);
    const mesh2 = React.useRef<THREE.Mesh>(null);
    const mesh3 = React.useRef<THREE.Mesh>(null);
    const groupRef = React.useRef<THREE.Group>(null);
    const [showComponent, setShowComponent] = React.useState(true);
  const { height, width } = useThree(state => state.viewport);
  const textureLoader = new THREE.TextureLoader();

  const controls = useControls({
    color: "#f81894",
  });

  const objectDistances = height;

  const gradientTexture = textureLoader.load("/my-stuff/textures/toon_texture_3px.jpg");
  gradientTexture.magFilter = THREE.NearestFilter;
  
  const material = new THREE.MeshToonMaterial({ color: controls.color, gradientMap: gradientTexture });

  React.useEffect(() => {
    setShowComponent(false)
  }, [controls]);

  console.log(height, width);

  useFrame(() => {
    if (mesh1.current && mesh2.current && mesh3.current) {
      mesh1.current.rotation.y += 0.01;
      mesh2.current.rotation.y += 0.01;
      mesh3.current.rotation.y += 0.01;
    }
  });

    useScroll((scrollY) => {
        if (groupRef.current) {
        groupRef.current.position.y = scrollY * 0.0073;
        }
    });

  
  React.useEffect(() => {
    setShowComponent(true)
  }, [showComponent]);

return showComponent ? (
    <group scale={width / 20} ref={groupRef}>
        <mesh material={material} position={[0, objectDistances * 0, 0]} ref={mesh1} scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        </mesh>
        <mesh material={material} position={[0, objectDistances * -1, 0]} ref={mesh2} scale={[1.2, 1.2, 1.2]}>
        <coneGeometry args={[1, 2, 16]} />
        </mesh>
        <mesh material={material} position={[0, objectDistances * -2, 0]} ref={mesh3} scale={[1.2, 1.2, 1.2]}>
        <torusKnotGeometry args={[1, 0.4, 100, 16]} />
        {/* <meshStandardMaterial color="hotpink" /> */}
        </mesh>
      <OrbitControls enableDamping dampingFactor={0.08} autoRotate autoRotateSpeed={0.15}/>
    </group>
  ) : null;
};

export default Model;

const useScroll = (callback: (scrollY: number) => void) => {
    React.useEffect(() => {
        const handleScroll = () => {
            callback(window.scrollY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [callback]);
};