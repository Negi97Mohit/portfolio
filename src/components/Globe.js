import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE

// Import your texture - adjust the path as needed
import EarthTexture from '../assets/earth_texture.jpg'; // Make sure this path is correct

function GlobeMesh() {
  // Load the texture
  const texture = useLoader(THREE.TextureLoader, EarthTexture);

  // Ref for rotating the mesh
  const meshRef = useRef();

  // Basic rotation animation on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; // Adjust speed as needed
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Args for Sphere: [radius, widthSegments, heightSegments] */}
      <sphereGeometry args={[2, 64, 32]} />
      {/* Use standard material for lighting effects */}
      <meshStandardMaterial
         map={texture}
         metalness={0.4} // Adjust for desired look
         roughness={0.7}  // Adjust for desired look
      />
    </mesh>
  );
}

const Globe = () => {
  return (
    // Set camera position, crucial for viewing the globe
    // Adjust field of view (fov) for zoom level
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
       {/* Ambient light to softly illuminate the scene */}
      <ambientLight intensity={0.5} />
       {/* Directional light to simulate sunlight */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Point light for highlights */}
      <pointLight position={[-10, -10, -10]} intensity={0.8} />

      <GlobeMesh />

      {/* Controls for manual interaction (optional, good for debugging) */}
      {/* Disable controls later when driven by scroll */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default Globe;