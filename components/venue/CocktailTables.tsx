"use client";
import { TABLES } from '@/utils/constants';

function Table({ id,cx,cz,onClick }:{ id:string;cx:number;cz:number;onClick?:(i:any)=>void }) {
  const click = (e:any) => {
    e.stopPropagation();
    onClick?.({ id, title:`TABLE ${id}`, dim:'Ø 0.9 m × H 1.05 m',
      desc:'Cocktail table with 4 stools. Regular Networking Area.' });
  };
  return (
    <group position={[cx,0,cz]} onClick={click}>
      {/* Base disc */}
      <mesh position={[0,0.04,0]}>
        <cylinderGeometry args={[0.22,0.22,0.05,12]}/>
        <meshStandardMaterial color="#c9a84c" metalness={0.7} roughness={0.25}/>
      </mesh>
      {/* Stem */}
      <mesh position={[0,0.52,0]}>
        <cylinderGeometry args={[0.04,0.04,1,8]}/>
        <meshStandardMaterial color="#c9a84c" metalness={0.7} roughness={0.3}/>
      </mesh>
      {/* Top */}
      <mesh position={[0,1.05,0]} castShadow>
        <cylinderGeometry args={[0.44,0.44,0.05,20]}/>
        <meshStandardMaterial color="#1a1208" roughness={0.3} metalness={0.1}/>
      </mesh>
      {/* Rim */}
      <mesh position={[0,1.07,0]}>
        <torusGeometry args={[0.44,0.025,8,20]}/>
        <meshStandardMaterial color="#c9a84c" metalness={0.8} roughness={0.2}/>
      </mesh>
      {/* 4 Stools — N/S/E/W */}
      {([[0,0.82],[0,-0.82],[0.82,0],[-0.82,0]] as [number,number][]).map(([sx,sz],i) => (
        <group key={i} position={[sx,0,sz]}>
          <mesh position={[0,0.75,0]} castShadow>
            <cylinderGeometry args={[0.22,0.22,0.08,12]}/>
            <meshStandardMaterial color="#1a1208" roughness={0.5}/>
          </mesh>
          <mesh position={[0,0.79,0]}>
            <cylinderGeometry args={[0.2,0.2,0.06,12]}/>
            <meshStandardMaterial color="#2a2010" roughness={0.85}/>
          </mesh>
          <mesh position={[0,0.38,0]}>
            <cylinderGeometry args={[0.03,0.03,0.76,8]}/>
            <meshStandardMaterial color="#c9a84c" metalness={0.7} roughness={0.3}/>
          </mesh>
          <mesh position={[0,0.38,0]}>
            <torusGeometry args={[0.15,0.018,6,12]}/>
            <meshStandardMaterial color="#a88030" metalness={0.6} roughness={0.3}/>
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function CocktailTables({ onClick }:{ onClick?:(i:any)=>void }) {
  return (
    <group>
      {TABLES.map((t) => (
        <Table key={t.id} id={t.id} cx={t.cx} cz={t.cz} onClick={onClick}/>
      ))}
    </group>
  );
}
