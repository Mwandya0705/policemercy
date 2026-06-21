"use client";
import { BOOTHS } from '@/utils/constants';

function Booth({ id,cx,cz,side,onClick }:
  { id:string;cx:number;cz:number;side:'L'|'R';onClick?:(i:any)=>void }) {
  const d = side==='L' ? 1 : -1;
  const TIMBER='#8B6340', CREAM='#f0ece4', BLACK='#1a1a1a', GOLD='#c9a84c';

  const click = (e:any) => {
    e.stopPropagation();
    onClick?.({ id:`booth-${id}`, title:`BOOTH ${id}`, dim:'4 m × 4 m',
      desc:'Business showcase booth with counter, shelves, display screen and lighting.' });
  };

  return (
    <group position={[cx,0,cz]} onClick={click}>
      {/* Back wall */}
      <mesh position={[-d*1.8,1.25,0]} castShadow>
        <boxGeometry args={[0.12,2.5,4]}/>
        <meshStandardMaterial color={TIMBER} roughness={0.7}/>
      </mesh>
      {/* Side walls */}
      {([-1.8,1.8] as number[]).map((sz,i) => (
        <mesh key={i} position={[-d*0.8,1.25,sz]} castShadow>
          <boxGeometry args={[2,2.5,0.1]}/>
          <meshStandardMaterial color={CREAM} roughness={0.85}/>
        </mesh>
      ))}
      {/* Counter */}
      <mesh position={[-d*0.2,0.45,0]} castShadow receiveShadow>
        <boxGeometry args={[1.2,0.9,3]}/>
        <meshStandardMaterial color={BLACK} roughness={0.4} metalness={0.1}/>
      </mesh>
      {/* Counter top */}
      <mesh position={[-d*0.2,0.92,0]}>
        <boxGeometry args={[1.2,0.06,3]}/>
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.3}/>
      </mesh>
      {/* Display screen */}
      <mesh position={[-d*1.72,1.6,0]}>
        <boxGeometry args={[0.08,1.5,2.5]}/>
        <meshStandardMaterial color="#0a1520" emissive="#003366" emissiveIntensity={0.4} roughness={0.2}/>
      </mesh>
      {/* Shelves */}
      {([-0.8,0.8] as number[]).flatMap((sz,si) =>
        ([1.0,1.5,2.0] as number[]).map((sy,yi) => (
          <mesh key={`${si}-${yi}`} position={[-d*1.2,sy,sz*0.7]}>
            <boxGeometry args={[0.5,0.04,0.55]}/>
            <meshStandardMaterial color={TIMBER} roughness={0.6}/>
          </mesh>
        ))
      )}
      {/* Valance header */}
      <mesh position={[-d*0.5,2.4,0]}>
        <boxGeometry args={[2,0.3,4.1]}/>
        <meshStandardMaterial color={TIMBER} roughness={0.6}/>
      </mesh>
      {/* Floor tile */}
      <mesh position={[-d*0.15,0.005,0]} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[3.4,4]}/>
        <meshStandardMaterial color="#f5f0e8" roughness={0.7}/>
      </mesh>
      {/* Spotlights */}
      {([-1,1] as number[]).map((sz,i) => (
        <mesh key={i} position={[-d*0.4,2.35,sz]}>
          <sphereGeometry args={[0.09,8,8]}/>
          <meshStandardMaterial color="#ddd" emissive="#ffe8c0" emissiveIntensity={0.5}/>
        </mesh>
      ))}
    </group>
  );
}

export default function Booths({ onClick }:{ onClick?:(i:any)=>void }) {
  return (
    <group>
      {BOOTHS.map((b) => (
        <Booth key={b.id} id={b.id} cx={b.cx} cz={b.cz} side={b.side} onClick={onClick}/>
      ))}
    </group>
  );
}
