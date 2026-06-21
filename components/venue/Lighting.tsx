"use client";
import { useVenueStore } from '@/store/venueStore';
import { STAGE } from '@/utils/constants';

export default function Lighting() {
  const day = useVenueStore((s) => s.dayMode);
  return (
    <>
      <ambientLight intensity={day ? 0.6 : 0.12} color={day ? '#fffdf5' : '#1a2040'} />
      {day && (
        <directionalLight position={[10,20,-5]} intensity={0.85} color="#fffdf0"
          castShadow shadow-mapSize={[2048,2048]}
          shadow-camera-left={-28} shadow-camera-right={28}
          shadow-camera-top={32} shadow-camera-bottom={-32} />
      )}
      <directionalLight position={[-8,12,-15]} intensity={day?0.28:0.08} color="#fff4e0" />

      {/* Stage spotlights */}
      {([-5,0,5] as number[]).map((x,i) => (
        <spotLight key={i} position={[x*1.1, STAGE.h+4.8, STAGE.cz-1]}
          angle={0.35} penumbra={0.6}
          intensity={day?1.2:3.0} color="#ffe8c0" castShadow={false} />
      ))}

      {/* VIP teal accents */}
      <pointLight position={[-3,3.5,10]} intensity={day?0.4:1.4} color="#00e0cc" distance={9} />
      <pointLight position={[ 3,3.5,10]} intensity={day?0.4:1.4} color="#00e0cc" distance={9} />

      {/* Runway glow */}
      <pointLight position={[0,0.3,2.5]} intensity={day?0.08:0.7} color="#c9a84c" distance={24} />

      {/* Night extras */}
      {!day && <>
        <pointLight position={[0,STAGE.h+3,STAGE.cz]} intensity={2.8} color="#ffe0a0" distance={18}/>
        <pointLight position={[-6,4,14]} intensity={1.6} color="#00ccff" distance={10}/>
        <pointLight position={[6, 4,14]} intensity={1.6} color="#ff6699" distance={10}/>
        <pointLight position={[0, 3,-8]} intensity={0.9} color="#4466ff" distance={22}/>
      </>}

      {/* Ceiling fills */}
      {([-9,9] as number[]).flatMap((x) =>
        ([-5,5] as number[]).map((z,i) => (
          <pointLight key={`${x}${z}`} position={[x,4,z]}
            intensity={day?0.28:0.45} color="#fff5e8" distance={14}/>
        ))
      )}
    </>
  );
}
