"use client";
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export default function CamTracker({ onUpdate }:{ onUpdate:(x:number,z:number)=>void }) {
  const { camera } = useThree();
  const prev = useRef({ x:0, z:0 });
  useFrame(() => {
    const { x, z } = camera.position;
    if (Math.abs(x-prev.current.x)>0.15 || Math.abs(z-prev.current.z)>0.15) {
      prev.current = { x, z };
      onUpdate(x, z);
    }
  });
  return null;
}
