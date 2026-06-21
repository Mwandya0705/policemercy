"use client";
import { HALF_W, HALF_L, STAGE, RUNWAY, VIP_L, VIP_R, VIP_W, VIP_D } from '@/utils/constants';

function Plane({ x=0,z=0,w,d,color,y=0.001 }:
  { x?:number;z?:number;w:number;d:number;color:string;y?:number }) {
  return (
    <mesh position={[x,y,z]} rotation={[-Math.PI/2,0,0]} receiveShadow>
      <planeGeometry args={[w,d]}/>
      <meshStandardMaterial color={color} roughness={0.85}/>
    </mesh>
  );
}

export default function Floor() {
  return (
    <group>
      {/* Base floor */}
      <Plane w={HALF_W*2} d={HALF_L*2} color="#d4cfc8" y={0}/>

      {/* Side aisles */}
      <Plane x={-8.5} z={0} w={5} d={HALF_L*2} color="#ccc8c0" y={0.002}/>
      <Plane x={ 8.5} z={0} w={5} d={HALF_L*2} color="#ccc8c0" y={0.002}/>

      {/* Networking area */}
      <Plane x={0} z={0} w={12} d={26} color="#b8bec8" y={0.003}/>

      {/* VIP carpets */}
      <Plane x={VIP_L.cx} z={VIP_L.cz} w={VIP_W} d={VIP_D} color="#1a6e68" y={0.004}/>
      <Plane x={VIP_R.cx} z={VIP_R.cz} w={VIP_W} d={VIP_D} color="#1a6e68" y={0.004}/>

      {/* Stage approach */}
      <Plane x={0} z={STAGE.frontZ+1} w={STAGE.w} d={2} color="#1a1a1a" y={0.003}/>
    </group>
  );
}
