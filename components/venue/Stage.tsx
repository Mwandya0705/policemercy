"use client";
import { useVenueStore } from '@/store/venueStore';
import { STAGE, HALF_L } from '@/utils/constants';

type ClickInfo = { id:string; title:string; dim:string; desc:string };

export default function Stage({ onClick }:{ onClick?:(i:ClickInfo)=>void }) {
  const day = useVenueStore((s) => s.dayMode);
  const { w, d, h, cx, cz, frontZ } = STAGE;

  const click = (e:any) => {
    e.stopPropagation();
    onClick?.({ id:'stage', title:'STAGE', dim:'15 m × 8 m',
      desc:'Raised performance stage with LED screen, truss lighting rig, spotlights and speakers.' });
  };

  return (
    <group onClick={click}>
      {/* Platform */}
      <mesh position={[cx,h/2,cz]} castShadow receiveShadow>
        <boxGeometry args={[w,h,d]}/>
        <meshStandardMaterial color="#1a1a1e" roughness={0.4} metalness={0.1}/>
      </mesh>
      {/* Edge trim */}
      <mesh position={[cx,h+0.03,cz]}>
        <boxGeometry args={[w+0.1,0.06,d+0.1]}/>
        <meshStandardMaterial color="#2a2a32" roughness={0.3} metalness={0.3}/>
      </mesh>

      {/* Front stairs (left + right of centre) */}
      {([-4.5, 4.5] as number[]).map((sx,si) => (
        <group key={si} position={[sx,0,frontZ-0.5]}>
          {([0.33,0.67,1] as number[]).map((sh,j) => (
            <mesh key={j} position={[0,sh/2,(j-1)*0.45]} castShadow>
              <boxGeometry args={[1.6,sh,0.45]}/>
              <meshStandardMaterial color="#222228" roughness={0.5} metalness={0.1}/>
            </mesh>
          ))}
        </group>
      ))}

      {/* Truss pillars */}
      {([-6,-2,2,6] as number[]).map((tx,i) => (
        <mesh key={i} position={[tx,h+3,cz+1.5]} castShadow>
          <cylinderGeometry args={[0.08,0.08,5,8]}/>
          <meshStandardMaterial color="#333340" roughness={0.3} metalness={0.7}/>
        </mesh>
      ))}
      {/* Horizontal truss bars */}
      {([1.5,3.5,5.5] as number[]).map((ty,i) => (
        <mesh key={i} position={[cx,h+ty,cz+1.5]}>
          <boxGeometry args={[w-1,0.12,0.12]}/>
          <meshStandardMaterial color="#404050" roughness={0.3} metalness={0.6}/>
        </mesh>
      ))}

      {/* LED Screen */}
      <mesh position={[cx,h+3.5,HALF_L-0.2]}>
        <boxGeometry args={[13,5,0.25]}/>
        <meshStandardMaterial
          color={day?'#111':'#002233'}
          emissive={day?'#001a0f':'#0099cc'}
          emissiveIntensity={day?0.3:0.9}
          roughness={0.2} metalness={0.1}/>
      </mesh>
      {/* Screen frame */}
      <mesh position={[cx,h+3.5,HALF_L-0.18]}>
        <boxGeometry args={[13.3,5.3,0.08]}/>
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5}/>
      </mesh>

      {/* Speakers */}
      {([-7.5,7.5] as number[]).map((sx,i) => (
        <mesh key={i} position={[sx,h+1.5,HALF_L-0.3]} castShadow>
          <boxGeometry args={[0.6,2.5,0.5]}/>
          <meshStandardMaterial color="#111" roughness={0.6} metalness={0.2}/>
        </mesh>
      ))}

      {/* Spotlights on truss */}
      {([-5,-2.5,0,2.5,5] as number[]).map((sx,i) => (
        <group key={i} position={[sx,h+5.3,cz+0.5]}>
          <mesh>
            <cylinderGeometry args={[0.12,0.22,0.45,12]}/>
            <meshStandardMaterial color="#222" roughness={0.3} metalness={0.5}/>
          </mesh>
          {!day && (
            <mesh position={[0,-0.8,0]}>
              <coneGeometry args={[0.3,1.2,8,1,true]}/>
              <meshStandardMaterial color="#ffe8c0" transparent opacity={0.07} side={2}/>
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
