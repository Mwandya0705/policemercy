"use client";
import { Billboard, Text } from '@react-three/drei';
import { useVenueStore } from '@/store/venueStore';
import {
  HALF_L, HALF_W, WALL_H, STAGE, RUNWAY, VIP_L, VIP_R, VIP_W, VIP_D,
  TABLES, BOOTHS, ENTRANCE, EXIT_PT,
} from '@/utils/constants';

function L({ pos,text,size=0.45,color='#fff',bold=false,dim=false }:
  { pos:[number,number,number];text:string;size?:number;color?:string;bold?:boolean;dim?:boolean }) {
  const showLabels = useVenueStore((s) => s.showLabels);
  const showDim    = useVenueStore((s) => s.showDimensions);
  if (!showLabels || (dim && !showDim)) return null;
  return (
    <Billboard position={pos}>
      <Text fontSize={size} color={color} fontWeight={bold?'bold':'normal'}
        outlineWidth={0.025} outlineColor="#000" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </Billboard>
  );
}

export default function Labels() {
  const show = useVenueStore((s) => s.showLabels);
  if (!show) return null;
  return (
    <group>
      <L pos={[0,WALL_H+1.1,-HALF_L+2]} text="VENUE — 22 m × 41 m" size={0.85} color="#00b4a6" bold/>
      <L pos={[0,STAGE.h+2.2,STAGE.cz]}  text="STAGE — 15 m × 8 m"  size={0.7} color="#fff" bold/>
      <L pos={[2.2,1.1,RUNWAY.cz]}        text="RUNWAY — 1 m × 20 m"  size={0.35} color="#c9a84c"/>

      <L pos={[VIP_L.cx,2.8,VIP_L.cz]}   text={"VIP LEFT\n5 m × 5 m"} size={0.45} color="#00e0cc" bold/>
      <L pos={[VIP_L.cx,2.2,VIP_L.cz-0.5]} text="ALL SEATING FACES STAGE" size={0.26} color="#88ddcc" dim/>
      <L pos={[VIP_R.cx,2.8,VIP_R.cz]}   text={"VIP RIGHT\n5 m × 5 m"} size={0.45} color="#00e0cc" bold/>
      <L pos={[VIP_R.cx,2.2,VIP_R.cz-0.5]} text="ALL SEATING FACES STAGE" size={0.26} color="#88ddcc" dim/>

      <L pos={[0,3.5,0]} text="REGULAR NETWORKING AREA" size={0.52} color="#b8c4d4" bold/>
      <L pos={[0,2.9,0]} text="20 COCKTAIL TABLES — 80 STOOLS" size={0.33} color="#8898aa" dim/>

      {TABLES.map((t) => (
        <L key={t.id} pos={[t.cx,1.28,t.cz]} text={t.id} size={0.27} color="#c9a84c" dim/>
      ))}

      {BOOTHS.map((b) => {
        const ox = b.side==='L' ? 0.7 : -0.7;
        return <L key={b.id} pos={[b.cx+ox,2.0,b.cz]} text={`BOOTH ${b.id}\n4×4 m`} size={0.26} color="#d4a870" dim/>;
      })}

      <L pos={[-7.5,2.1,0]} text="SIDE AISLE" size={0.35} color="#9aa0ac"/>
      <L pos={[ 7.5,2.1,0]} text="SIDE AISLE" size={0.35} color="#9aa0ac"/>

      <L pos={[ENTRANCE.x-0.5,3.5,0]} text="ENTRANCE" size={0.72} color="#00cc66" bold/>
      <L pos={[EXIT_PT.x+0.5,  3.5,0]} text="EXIT"     size={0.72} color="#ee3355" bold/>

      <L pos={[-6.5,0.65, 1.5]} text={"KEEP\nCLEAR"} size={0.3} color="#ee3355"/>
      <L pos={[ 6.5,0.65, 1.5]} text={"KEEP\nCLEAR"} size={0.3} color="#ee3355"/>
      <L pos={[-6.5,0.65,-2]}   text={"KEEP\nCLEAR"} size={0.3} color="#ee3355"/>
      <L pos={[ 6.5,0.65,-2]}   text={"KEEP\nCLEAR"} size={0.3} color="#ee3355"/>

      <L pos={[0,1.2,-HALF_L+0.5]} text="NO DOOR ON THIS WALL" size={0.33} color="#7a8090" dim/>
    </group>
  );
}
