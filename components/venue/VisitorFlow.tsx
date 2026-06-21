"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVenueStore } from '@/store/venueStore';
import * as THREE from 'three';

function Arrow({ pos,rot=0,color='#00cc44',phase=0 }:
  { pos:[number,number,number];rot?:number;color?:string;phase?:number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.getElapsedTime()+phase)*1.2) % 1;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = Math.max(0, Math.sin(t*Math.PI));
    const base = pos;
    ref.current.position.x = base[0] + (rot!==0 ? Math.sin(t*Math.PI*2)*0.3*Math.sign(rot) : 0);
    ref.current.position.z = base[2] + (rot===0  ? Math.sin(t*Math.PI*2)*0.3 : 0);
  });
  return (
    <mesh ref={ref} position={pos} rotation={[Math.PI/2, 0, rot]}>
      <coneGeometry args={[0.18,0.4,6]}/>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5}
        transparent opacity={0.8}/>
    </mesh>
  );
}

export default function VisitorFlow() {
  const show = useVenueStore((s) => s.showFlow);
  if (!show) return null;
  const G='#00cc66', R='#ee3344';
  return (
    <group>
      {/* Entrance inward */}
      {([-9,-7,-5] as number[]).map((x,i) => <Arrow key={`in${i}`} pos={[x,0.08,0]} rot={-Math.PI/2} color={G} phase={i*0.33}/>)}
      {/* Up toward VIP/stage */}
      {([6,4,2] as number[]).map((z,i) => <Arrow key={`lu${i}`} pos={[-3.5,0.08,z]} rot={0} color={G} phase={i*0.25}/>)}
      {([6,4,2] as number[]).map((z,i) => <Arrow key={`ru${i}`} pos={[3.5, 0.08,z]} rot={0} color={G} phase={i*0.25}/>)}
      {/* Along booths */}
      {([-3,0,3] as number[]).map((z,i) => <Arrow key={`lb${i}`} pos={[-7.5,0.08,z]} rot={-Math.PI/2} color={G} phase={i*0.3}/>)}
      {([-3,0,3] as number[]).map((z,i) => <Arrow key={`rb${i}`} pos={[7.5, 0.08,z]} rot={ Math.PI/2} color={G} phase={i*0.3}/>)}
      {/* Runway up */}
      {([0,3,6,9] as number[]).map((z,i) => <Arrow key={`rw${i}`} pos={[0,0.06,z]} rot={0} color={G} phase={i*0.25}/>)}
      {/* Exit flow */}
      {([5,7,9] as number[]).map((x,i) => <Arrow key={`ex${i}`} pos={[x,0.08,0]} rot={Math.PI/2} color={R} phase={i*0.33}/>)}
      {([-3,0,3] as number[]).map((z,i) => <Arrow key={`te${i}`} pos={[5.5,0.08,z]} rot={Math.PI/2} color={R} phase={i*0.25}/>)}
    </group>
  );
}
