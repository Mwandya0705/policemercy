"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { useVenueStore } from '@/store/venueStore';
import Floor from './Floor';
import Walls from './Walls';
import Lighting from './Lighting';
import Stage from './Stage';
import Runway from './Runway';
import VIPArea from './VIPArea';
import CocktailTables from './CocktailTables';
import Booths from './Booths';
import Doors from './Doors';
import Labels from './Labels';
import VisitorFlow from './VisitorFlow';
import CameraController from './CameraController';
import CamTracker from './CamTracker';
import AutoTour from './AutoTour';

export default function VenueScene() {
  const select = useVenueStore((s) => s.select);
  const isWalk = useVenueStore((s) => s.isWalkthrough);
  const [camX, setCamX] = useState(0);
  const [camZ, setCamZ] = useState(0);

  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [28, 26, -22], fov: 45, near: 0.1, far: 200 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Floor />
          <Walls />
          <Doors />
          <Stage onClick={select} />
          <Runway onClick={select} />
          <VIPArea onClick={select} />
          <CocktailTables onClick={select} />
          <Booths onClick={select} />
          <Labels />
          <VisitorFlow />
          <CameraController />
          <CamTracker onUpdate={(x, z) => { setCamX(x); setCamZ(z); }} />
          <AutoTour />
        </Suspense>
      </Canvas>

      {isWalk && (
        <div className="walk-overlay">
          <div className="walk-crosshair" />
          <div className="walk-coord">
            X: {camX.toFixed(1)}m · Z: {camZ.toFixed(1)}m
          </div>
        </div>
      )}
    </div>
  );
}
