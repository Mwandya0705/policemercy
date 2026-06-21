"use client";
import { VIP_L, VIP_R, VIP_W, VIP_D } from '@/utils/constants';

// Couch facing +Z (toward stage) by default. Back is at lower-Z edge.
function Couch({ x, z, w = 1.8, depth = 0.85, rot = 0 } :
  { x: number; z: number; w?: number; depth?: number; rot?: number }) {
  const sh = 0.44, bh = 0.62;
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, sh / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, sh, depth]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.85} />
      </mesh>
      <mesh position={[0, sh + 0.05, 0]}>
        <boxGeometry args={[w - 0.06, 0.09, depth - 0.08]} />
        <meshStandardMaterial color="#d0c8b8" roughness={0.9} />
      </mesh>
      {/* Back at lower-Z (people face +Z / stage when rot=0) */}
      <mesh position={[0, sh + bh / 2, -depth / 2 + 0.09]} castShadow>
        <boxGeometry args={[w, bh, 0.16]} />
        <meshStandardMaterial color="#ddd5c5" roughness={0.85} />
      </mesh>
      {/* Armrests */}
      {([-w / 2 + 0.07, w / 2 - 0.07] as number[]).map((ax, i) => (
        <mesh key={i} position={[ax, sh + 0.2, -0.04]} castShadow>
          <boxGeometry args={[0.15, 0.4, depth - 0.1]} />
          <meshStandardMaterial color="#c8c0b0" roughness={0.8} />
        </mesh>
      ))}
      {/* Legs */}
      {([[-w / 2 + 0.12, -depth / 2 + 0.1], [w / 2 - 0.12, -depth / 2 + 0.1],
         [-w / 2 + 0.12, depth / 2 - 0.1], [w / 2 - 0.12, depth / 2 - 0.1]] as [number, number][])
        .map(([lx, lz], i) => (
          <mesh key={i} position={[lx, 0.06, lz]}>
            <boxGeometry args={[0.07, 0.12, 0.07]} />
            <meshStandardMaterial color="#8a7a6a" roughness={0.5} metalness={0.2} />
          </mesh>
        ))}
    </group>
  );
}

function CoffeeTable({ x, z, wide = false }: { x: number; z: number; wide?: boolean }) {
  const tw = wide ? 0.9 : 0.65, td = 0.45;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.44, 0]} castShadow>
        <boxGeometry args={[tw, 0.05, td]} />
        <meshStandardMaterial color="#2a1f0f" roughness={0.4} metalness={0.1} />
      </mesh>
      {([-tw / 2 + 0.08, tw / 2 - 0.08] as number[]).map((tx, i) => (
        <mesh key={i} position={[tx, 0.22, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.44, 8]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Plant({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.36, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.24, 8, 6]} />
        <meshStandardMaterial color="#2d6a2d" roughness={0.95} />
      </mesh>
    </group>
  );
}

function GoldPost({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 8]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

type ClickInfo = { id: string; title: string; dim: string; desc: string };

function VIPZone({ cx, cz, side, onClick }:
  { cx: number; cz: number; side: 'L' | 'R'; onClick?: (i: ClickInfo) => void }) {
  const label = side === 'L' ? 'VIP LEFT' : 'VIP RIGHT';
  const rearZ = cz + VIP_D / 2;  // toward stage
  const frontZ = cz - VIP_D / 2;

  const click = (e: any) => {
    e.stopPropagation();
    onClick?.({
      id: `vip-${side}`,
      title: label,
      dim: '5 m × 5 m',
      desc: 'Premium VIP zone. Luxurious U-shaped lounge seating with gold accents & teal carpet.'
    });
  };

  return (
    <group onClick={click}>
      {/* Back Couch — central, facing stage */}
      <Couch x={cx} z={rearZ - 1.2} w={2.4} rot={0} />

      {/* Side Couches — rotated inward, creating U-shape */}
      <Couch x={cx - 1.8} z={cz - 0.2} w={1.6} rot={Math.PI / 2} />
      <Couch x={cx + 1.8} z={cz - 0.2} w={1.6} rot={-Math.PI / 2} />

      {/* Central coffee table */}
      <CoffeeTable x={cx} z={cz - 0.2} wide />

      {/* Corner plants with adjusted margins to prevent overlapping with couches */}
      <Plant x={cx - VIP_W / 2 + 0.4} z={frontZ + 0.5} />
      <Plant x={cx + VIP_W / 2 - 0.4} z={frontZ + 0.5} />
      <Plant x={cx - VIP_W / 2 + 0.4} z={rearZ - 0.5} />
      <Plant x={cx + VIP_W / 2 - 0.4} z={rearZ - 0.5} />

      {/* Gold stanchion posts */}
      {([
        [cx - VIP_W / 2, rearZ],  [cx + VIP_W / 2, rearZ],
        [cx - VIP_W / 2, frontZ], [cx + VIP_W / 2, frontZ],
        [cx - VIP_W / 2, cz],     [cx + VIP_W / 2, cz],
      ] as [number, number][]).map(([px, pz], i) => <GoldPost key={i} x={px} z={pz} />)}

      {/* VIP rope (thin boxes connecting posts along front edge) */}
      <mesh position={[cx, 0.85, frontZ]}>
        <boxGeometry args={[VIP_W, 0.02, 0.025]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function VIPArea({ onClick }: { onClick?: (i: ClickInfo) => void }) {
  return (
    <group>
      <VIPZone cx={VIP_L.cx} cz={VIP_L.cz} side="L" onClick={onClick} />
      <VIPZone cx={VIP_R.cx} cz={VIP_R.cz} side="R" onClick={onClick} />
    </group>
  );
}
