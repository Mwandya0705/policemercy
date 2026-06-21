"use client";
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useVenueStore } from '@/store/venueStore';
import { HALF_W, HALF_L } from '@/utils/constants';

const WALK_SPEED   = 5;
const SPRINT_SPEED = 12;

export default function CameraController() {
  const { camera, gl } = useThree();
  const orbitRef   = useRef<any>(null);
  const keysRef    = useRef<Record<string,boolean>>({});
  const pitchRef   = useRef(0);
  const yawRef     = useRef(Math.PI); // face into venue
  const ptrLocked  = useRef(false);
  const destPos    = useRef(new THREE.Vector3());
  const destTgt    = useRef(new THREE.Vector3());
  const transiting = useRef(false);
  const transT     = useRef(0);

  const camPos    = useVenueStore((s) => s.camPos);
  const camTarget = useVenueStore((s) => s.camTarget);
  const isWalk    = useVenueStore((s) => s.isWalkthrough);
  const exitWalk  = useVenueStore((s) => s.exitWalkthrough);

  // Trigger smooth transition whenever store position changes
  useEffect(() => {
    destPos.current.set(...camPos);
    destTgt.current.set(...camTarget);
    transiting.current = true;
    transT.current = 0;
  }, [camPos, camTarget]);

  // Keyboard
  useEffect(() => {
    const dn = (e:KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === 'Escape' && isWalk) { document.exitPointerLock?.(); exitWalk(); }
    };
    const up = (e:KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown',dn); window.removeEventListener('keyup',up); };
  }, [isWalk, exitWalk]);

  // Pointer lock (walkthrough mouse look)
  useEffect(() => {
    if (!isWalk) return;
    const onMove = (e:MouseEvent) => {
      if (!ptrLocked.current) return;
      yawRef.current   -= e.movementX * 0.0022;
      pitchRef.current  = Math.max(-1.1, Math.min(1.1, pitchRef.current - e.movementY * 0.0022));
    };
    const onChg = () => { ptrLocked.current = document.pointerLockElement === gl.domElement; };
    const onClick = () => gl.domElement.requestPointerLock();
    gl.domElement.addEventListener('mousemove', onMove);
    document.addEventListener('pointerlockchange', onChg);
    gl.domElement.addEventListener('click', onClick);
    return () => {
      gl.domElement.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerlockchange', onChg);
      gl.domElement.removeEventListener('click', onClick);
      document.exitPointerLock?.();
    };
  }, [isWalk, gl.domElement]);

  useFrame((_, delta) => {
    if (isWalk) {
      const spd = keysRef.current['shift'] ? SPRINT_SPEED : WALK_SPEED;
      const fwd   = new THREE.Vector3(-Math.sin(yawRef.current),0,-Math.cos(yawRef.current));
      const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0,1,0)).normalize();
      const dir   = new THREE.Vector3();
      if (keysRef.current['w']||keysRef.current['arrowup'])    dir.add(fwd);
      if (keysRef.current['s']||keysRef.current['arrowdown'])  dir.sub(fwd);
      if (keysRef.current['a']||keysRef.current['arrowleft'])  dir.sub(right);
      if (keysRef.current['d']||keysRef.current['arrowright']) dir.add(right);
      if (dir.lengthSq()>0) dir.normalize();
      const np = camera.position.clone().addScaledVector(dir, spd*delta);
      np.x = Math.max(-HALF_W+0.5, Math.min(HALF_W-0.5, np.x));
      np.z = Math.max(-HALF_L+0.5, Math.min(HALF_L-0.5, np.z));
      np.y = 1.7;
      camera.position.copy(np);
      camera.rotation.order = 'YXZ';
      camera.rotation.y = yawRef.current;
      camera.rotation.x = pitchRef.current;
      return;
    }

    if (!transiting.current || !orbitRef.current) return;
    transT.current = Math.min(transT.current + delta * 0.9, 1);
    // Ease-out cubic
    const t  = 1 - Math.pow(1 - transT.current, 3);
    camera.position.lerp(destPos.current, t);
    orbitRef.current.target.lerp(destTgt.current, t);
    orbitRef.current.update();
    if (transT.current >= 0.99) transiting.current = false;
  });

  if (isWalk) return null;

  return (
    <OrbitControls
      ref={orbitRef}
      makeDefault
      minDistance={1.5}
      maxDistance={90}
      maxPolarAngle={Math.PI / 2 - 0.05} // prevent going below floor
      enableDamping
      dampingFactor={0.07}
      rotateSpeed={0.8}
      zoomSpeed={1.1}
      panSpeed={0.9}
      screenSpacePanning={true}
      touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
    />
  );
}
