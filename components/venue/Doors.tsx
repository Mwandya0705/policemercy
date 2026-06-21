"use client";
// Real double-door geometry with frames, glass panels, handles and signage
import { ENTRANCE, EXIT_PT, WALL_H } from '@/utils/constants';

function RealDoor({ x,z,side }:{ x:number;z:number;side:'L'|'R' }) {
  const isEntrance = side === 'L';
  const inDir = side === 'L' ? 1 : -1;   // direction pointing into the venue
  const frameColor   = '#c8b890';
  const glassColor   = '#a8d4e8';
  const panelColor   = '#d4c8a4';
  const signColor    = isEntrance ? '#004422' : '#440022';
  const signEmissive = isEntrance ? '#00dd66' : '#ee2244';

  // Door opening: 2.6 m wide × 2.3 m tall, centred at z=0
  const DW = 2.6;  // total opening width
  const DH = 2.3;  // door height
  const FT = 0.15; // frame thickness
  const PW = (DW/2) - 0.04; // single panel width

  return (
    <group position={[x,0,z]}>
      {/* ── Door frame ── */}
      {/* Left jamb */}
      <mesh position={[0, DH/2, -DW/2-FT/2]} castShadow>
        <boxGeometry args={[FT*2, DH+FT, FT]}/>
        <meshStandardMaterial color={frameColor} roughness={0.7}/>
      </mesh>
      {/* Right jamb */}
      <mesh position={[0, DH/2,  DW/2+FT/2]} castShadow>
        <boxGeometry args={[FT*2, DH+FT, FT]}/>
        <meshStandardMaterial color={frameColor} roughness={0.7}/>
      </mesh>
      {/* Lintel (top bar) */}
      <mesh position={[0, DH+FT/2, 0]} castShadow>
        <boxGeometry args={[FT*2, FT, DW+FT*2]}/>
        <meshStandardMaterial color={frameColor} roughness={0.7}/>
      </mesh>
      {/* Threshold */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[FT*2, 0.06, DW]}/>
        <meshStandardMaterial color={frameColor} metalness={0.4} roughness={0.4}/>
      </mesh>

      {/* ── Left door leaf (swung 80° inward) ── */}
      <group position={[0, 0, -DW/2+0.04]}
        rotation={[0, inDir * -1.35, 0]}>
        {/* Solid lower panel */}
        <mesh position={[inDir*PW/2, DH*0.25, 0]} castShadow>
          <boxGeometry args={[PW, DH*0.45, 0.06]}/>
          <meshStandardMaterial color={panelColor} roughness={0.6}/>
        </mesh>
        {/* Glass upper panel */}
        <mesh position={[inDir*PW/2, DH*0.7, 0]}>
          <boxGeometry args={[PW-0.08, DH*0.5, 0.04]}/>
          <meshStandardMaterial color={glassColor} transparent opacity={0.4} roughness={0.05} metalness={0.1}/>
        </mesh>
        {/* Door frame surround */}
        <mesh position={[inDir*PW/2, DH/2, 0]}>
          <boxGeometry args={[PW+0.04, DH+0.04, 0.08]}/>
          <meshStandardMaterial color={frameColor} roughness={0.65}/>
        </mesh>
        {/* Handle */}
        <mesh position={[inDir*(PW-0.12), 0.95, 0.055]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 8]}/>
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2}/>
        </mesh>
        <mesh position={[inDir*(PW-0.12), 0.95, 0.08]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.14, 8]}/>
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2}/>
        </mesh>
      </group>

      {/* ── Right door leaf (swung 80° inward) ── */}
      <group position={[0, 0, DW/2-0.04]}
        rotation={[0, inDir * 1.35, 0]}>
        <mesh position={[inDir*PW/2, DH*0.25, 0]} castShadow>
          <boxGeometry args={[PW, DH*0.45, 0.06]}/>
          <meshStandardMaterial color={panelColor} roughness={0.6}/>
        </mesh>
        <mesh position={[inDir*PW/2, DH*0.7, 0]}>
          <boxGeometry args={[PW-0.08, DH*0.5, 0.04]}/>
          <meshStandardMaterial color={glassColor} transparent opacity={0.4} roughness={0.05} metalness={0.1}/>
        </mesh>
        <mesh position={[inDir*PW/2, DH/2, 0]}>
          <boxGeometry args={[PW+0.04, DH+0.04, 0.08]}/>
          <meshStandardMaterial color={frameColor} roughness={0.65}/>
        </mesh>
        <mesh position={[inDir*(PW-0.12), 0.95, -0.055]}>
          <cylinderGeometry args={[0.015,0.015,0.12,8]}/>
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2}/>
        </mesh>
        <mesh position={[inDir*(PW-0.12), 0.95, -0.08]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.015,0.015,0.14,8]}/>
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2}/>
        </mesh>
      </group>

      {/* ── Illuminated sign above door ── */}
      <mesh position={[inDir*0.14, DH+0.35, 0]}>
        <boxGeometry args={[0.1, 0.28, 1.8]}/>
        <meshStandardMaterial color={signColor} emissive={signEmissive} emissiveIntensity={0.95}/>
      </mesh>
      {/* Emergency exit light box */}
      <mesh position={[inDir*0.14, DH+0.12, 0]}>
        <boxGeometry args={[0.08, 0.16, 0.6]}/>
        <meshStandardMaterial color="#004400" emissive="#00ee44" emissiveIntensity={0.7}/>
      </mesh>

      {/* ── Floor swing arc ── */}
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <ringGeometry args={[1.15, 1.22, 24, 1, 0, Math.PI/2]}/>
        <meshStandardMaterial
          color={isEntrance ? '#00aa44' : '#aa2244'} transparent opacity={0.35}/>
      </mesh>
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI/2, 0, Math.PI]}>
        <ringGeometry args={[1.15, 1.22, 24, 1, 0, Math.PI/2]}/>
        <meshStandardMaterial
          color={isEntrance ? '#00aa44' : '#aa2244'} transparent opacity={0.35}/>
      </mesh>

      {/* Keep-clear zone */}
      <mesh position={[inDir*1.4, 0.005, 0]} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[2.8, DW+0.6]}/>
        <meshStandardMaterial
          color={isEntrance ? '#004400' : '#440000'} transparent opacity={0.12}/>
      </mesh>
    </group>
  );
}

export default function Doors() {
  return (
    <group>
      <RealDoor x={ENTRANCE.x} z={ENTRANCE.z} side="L"/>
      <RealDoor x={EXIT_PT.x}  z={EXIT_PT.z}  side="R"/>
    </group>
  );
}
