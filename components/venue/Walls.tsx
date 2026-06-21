"use client";
import { useVenueStore } from '@/store/venueStore';
import { HALF_W, HALF_L, WALL_H } from '@/utils/constants';

function WallPlane({ pos,rot,w,h,color='#f0eee8' }:
  { pos:[number,number,number];rot:[number,number,number];w:number;h:number;color?:string }) {
  return (
    <mesh position={pos} rotation={rot} receiveShadow castShadow>
      <planeGeometry args={[w,h]}/>
      <meshStandardMaterial color={color} roughness={0.9} side={2}/>
    </mesh>
  );
}

export default function Walls() {
  const { showWalls, showRoof } = useVenueStore();
  const hy = WALL_H/2;
  const wc = '#f0eee8';

  return (
    <group>
      {showRoof && (
        <mesh position={[0,WALL_H,0]} rotation={[Math.PI/2,0,0]}>
          <planeGeometry args={[HALF_W*2, HALF_L*2]}/>
          <meshStandardMaterial color="#2a2a2a" roughness={0.95} side={2}/>
        </mesh>
      )}
      {showWalls && <>
        {/* Rear (stage) wall */}
        <WallPlane pos={[0,hy,HALF_L]}   rot={[0,Math.PI,0]}   w={HALF_W*2} h={WALL_H} color="#252528"/>
        {/* Bottom wall — no door */}
        <WallPlane pos={[0,hy,-HALF_L]}  rot={[0,0,0]}          w={HALF_W*2} h={WALL_H} color={wc}/>
        {/* Left wall — entrance gap at Z=0 (±1.5 m gap) */}
        <WallPlane pos={[-HALF_W,hy, 10.5]} rot={[0, Math.PI/2,0]} w={20} h={WALL_H} color={wc}/>
        <WallPlane pos={[-HALF_W,hy,-10.5]} rot={[0, Math.PI/2,0]} w={20} h={WALL_H} color={wc}/>
        <WallPlane pos={[-HALF_W,WALL_H-0.5,0]} rot={[0,Math.PI/2,0]} w={3} h={1} color={wc}/>
        {/* Right wall — exit gap at Z=0 */}
        <WallPlane pos={[HALF_W,hy, 10.5]} rot={[0,-Math.PI/2,0]} w={20} h={WALL_H} color={wc}/>
        <WallPlane pos={[HALF_W,hy,-10.5]} rot={[0,-Math.PI/2,0]} w={20} h={WALL_H} color={wc}/>
        <WallPlane pos={[HALF_W,WALL_H-0.5,0]} rot={[0,-Math.PI/2,0]} w={3} h={1} color={wc}/>
      </>}
      {/* Corner columns (always visible) */}
      {([[-HALF_W+0.25,HALF_L-0.25],[-HALF_W+0.25,-HALF_L+0.25],
         [HALF_W-0.25,HALF_L-0.25], [HALF_W-0.25,-HALF_L+0.25]] as [number,number][])
        .map(([x,z],i) => (
          <mesh key={i} position={[x,WALL_H/2,z]} castShadow>
            <boxGeometry args={[0.5,WALL_H,0.5]}/>
            <meshStandardMaterial color="#c0b8a8" roughness={0.85}/>
          </mesh>
        ))}
    </group>
  );
}
