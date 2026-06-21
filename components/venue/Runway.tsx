"use client";
import { useVenueStore } from '@/store/venueStore';
import { RUNWAY } from '@/utils/constants';

export default function Runway({ onClick }:{ onClick?:(i:any)=>void }) {
  const day = useVenueStore((s) => s.dayMode);
  const EI = day ? 0.35 : 1.4;

  const click = (e:any) => {
    e.stopPropagation();
    onClick?.({ id:'runway', title:'RUNWAY', dim:'1 m × 20 m',
      desc:'Premium dark-carpet runway from stage front to networking floor. Keep clear.' });
  };

  return (
    <group onClick={click}>
      {/* Surface */}
      <mesh position={[RUNWAY.cx,0.008,RUNWAY.cz]} receiveShadow>
        <boxGeometry args={[RUNWAY.w,0.016,RUNWAY.len]}/>
        <meshStandardMaterial color="#0d0d10" roughness={0.9}/>
      </mesh>
      {/* Gold edge lights */}
      {([-1,1] as number[]).map((s,i) => (
        <mesh key={i} position={[s*(RUNWAY.w/2+0.04),0.012,RUNWAY.cz]}>
          <boxGeometry args={[0.06,0.02,RUNWAY.len]}/>
          <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={EI} roughness={0.2} metalness={0.3}/>
        </mesh>
      ))}
      {/* Interval markers */}
      {Array.from({length:10},(_,i) => (
        <mesh key={i} position={[RUNWAY.cx,0.018,RUNWAY.rearZ-(i+0.5)*2]}>
          <boxGeometry args={[RUNWAY.w-0.04,0.004,0.06]}/>
          <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={EI*0.6}/>
        </mesh>
      ))}
      {/* Keep-clear dashed boundary */}
      {([-0.8,0.8] as number[]).map((ox,i) => (
        <mesh key={i} position={[ox,0.005,RUNWAY.cz]} rotation={[-Math.PI/2,0,0]}>
          <planeGeometry args={[0.04,RUNWAY.len]}/>
          <meshStandardMaterial color="#cc2222" transparent opacity={0.55}/>
        </mesh>
      ))}
    </group>
  );
}
