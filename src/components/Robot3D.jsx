import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function RobotCore() {
  const groupRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  
  // Custom materials
  const armorMaterial = new THREE.MeshStandardMaterial({ 
    color: '#2a2a2a', // Lighter grey so it doesn't look like a black blob
    roughness: 0.4, 
    metalness: 0.6 
  });
  
  const screenMaterial = new THREE.MeshStandardMaterial({ 
    color: '#050505', 
    roughness: 0.1, 
    metalness: 0.9 
  });
  
  const eyeMaterial = new THREE.MeshBasicMaterial({ 
    color: '#ff5f2e', // Blaze Orange
    toneMapped: false 
  });

  const thrusterMaterial = new THREE.MeshBasicMaterial({
    color: '#00ffff', // Cyan glow for thruster
    toneMapped: false
  });

  useFrame((state) => {
    // 1. Make the head look at the cursor
    const target = new THREE.Vector3(
      (state.mouse.x * state.viewport.width) / 2,
      (state.mouse.y * state.viewport.height) / 2,
      5
    );
    groupRef.current.quaternion.slerp(
      new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(groupRef.current.position, target, new THREE.Vector3(0, 1, 0))
      ),
      0.1
    );

    // 2. Blink animation
    const time = state.clock.elapsedTime;
    // Blink every ~4 seconds
    if (Math.sin(time * 2) > 0.95) {
      leftEyeRef.current.scale.y = 0.1;
      rightEyeRef.current.scale.y = 0.1;
    } else {
      leftEyeRef.current.scale.y = 1;
      rightEyeRef.current.scale.y = 1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Rotate inner components 180deg because lookAt points the -Z axis at the target, but we built the face on +Z */}
      <group rotation={[0, Math.PI, 0]}>
        {/* --- HEAD --- */}
        <mesh position={[0, 0, 0]} material={armorMaterial}>
          {/* Main boxy head */}
          <boxGeometry args={[1.6, 1.2, 1.2]} /> 
        </mesh>
        
        {/* --- FACE SCREEN --- */}
        {/* Pushed slightly forward so it sits on the face */}
        <mesh position={[0, 0, 0.61]} material={screenMaterial}>
          <planeGeometry args={[1.4, 1.0]} />
        </mesh>

        {/* --- EYES --- */}
        {/* Angry/Cool glowing eyes */}
        <mesh ref={leftEyeRef} position={[-0.35, 0.1, 0.62]} material={eyeMaterial}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.35, 0.1, 0.62]} material={eyeMaterial}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
        </mesh>

        {/* --- EARS / SIDE ANTENNAS --- */}
        <mesh position={[-0.9, 0, 0]} material={armorMaterial}>
          <cylinderGeometry args={[0.2, 0.2, 0.4]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0.9, 0, 0]} material={armorMaterial}>
          <cylinderGeometry args={[0.2, 0.2, 0.4]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>

        {/* --- TOP ANTENNA --- */}
        <mesh position={[0, 0.8, -0.2]} material={armorMaterial}>
          <cylinderGeometry args={[0.05, 0.05, 0.4]} />
        </mesh>
        {/* Antenna tip glow */}
        <mesh position={[0, 1.05, -0.2]} material={eyeMaterial}>
          <sphereGeometry args={[0.08]} />
        </mesh>

        {/* --- FLOATING THRUSTER BASE --- */}
        <mesh position={[0, -0.8, 0]} material={armorMaterial}>
          <cylinderGeometry args={[0.4, 0.2, 0.4]} />
        </mesh>
        {/* Thruster glow */}
        <mesh position={[0, -1.05, 0]} material={thrusterMaterial}>
          <cylinderGeometry args={[0.15, 0.2, 0.1]} />
        </mesh>
      </group>
    </group>
  );
}

export default function Robot3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', cursor: 'crosshair' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
        <spotLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        
        {/* Environment reflections to make the metal look shiny */}
        <Environment preset="city" />

        {/* Floating Animation Wrapper */}
        <Float 
          speed={2.5} 
          rotationIntensity={0.2} 
          floatIntensity={1.5} 
        >
          <RobotCore />
        </Float>

        {/* Shadow on the "floor" */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
