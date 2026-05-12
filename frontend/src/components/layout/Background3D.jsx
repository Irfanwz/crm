import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedMesh() {
  const meshRef1 = useRef(null);
  const meshRef2 = useRef(null);
  const meshRef3 = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef1.current) {
      meshRef1.current.rotation.x = t * 0.05;
      meshRef1.current.rotation.y = t * 0.03;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = t * -0.04;
      meshRef2.current.rotation.y = t * 0.06;
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.x = t * 0.02;
      meshRef3.current.rotation.y = t * -0.05;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef1} args={[1, 64, 64]} scale={2.8} position={[5, -2, -6]}>
          <MeshDistortMaterial 
            color="#6366f1" 
            distort={0.4} 
            speed={1.5} 
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.08}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere ref={meshRef2} args={[1, 64, 64]} scale={2.2} position={[-6, 3, -10]}>
          <MeshDistortMaterial 
            color="#22d3ee" 
            distort={0.3} 
            speed={2} 
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.06}
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={meshRef3} args={[1, 64, 64]} scale={1.8} position={[0, -5, -12]}>
          <MeshDistortMaterial 
            color="#a855f7" 
            distort={0.5} 
            speed={1} 
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.04}
          />
        </Sphere>
      </Float>
    </>
  );
}

function Grid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#111" 
        wireframe 
        transparent 
        opacity={0.05} 
      />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 25]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#22d3ee" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#fff" />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={2000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
        
        <AnimatedMesh />
        <Grid />
        
        <Environment preset="night" />
      </Canvas>
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
    </div>
  );
}
