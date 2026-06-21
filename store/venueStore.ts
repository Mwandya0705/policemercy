"use client";
import { create } from 'zustand';
import { CAM_VIEWS, type CamView } from '@/utils/constants';

export interface SelectedObj { id:string; title:string; dim?:string; desc?:string }

interface VenueState {
  showRoof:       boolean;
  showWalls:      boolean;
  showLabels:     boolean;
  showDimensions: boolean;
  showFlow:       boolean;
  dayMode:        boolean;
  isFullscreen:   boolean;

  activeCamIdx: number;
  camPos:   [number,number,number];
  camTarget:[number,number,number];

  isWalkthrough: boolean;
  tourActive:    boolean;
  tourStep:      number;
  selected:      SelectedObj | null;

  // panel collapse state
  leftOpen:  boolean;
  rightOpen: boolean;

  toggle: (k:'showRoof'|'showWalls'|'showLabels'|'showDimensions'|'showFlow'|'dayMode') => void;
  setCamera: (idx:number) => void;
  setCamPos: (pos:[number,number,number], tgt:[number,number,number]) => void;
  enterWalkthrough: () => void;
  exitWalkthrough:  () => void;
  startTour: () => void;
  stopTour:  () => void;
  setTourStep: (n:number) => void;
  select: (o:SelectedObj|null) => void;
  setFullscreen: (v:boolean) => void;
  setLeftOpen:  (v:boolean) => void;
  setRightOpen: (v:boolean) => void;
}

export const useVenueStore = create<VenueState>((set) => ({
  showRoof: false, showWalls: true, showLabels: true,
  showDimensions: true, showFlow: false, dayMode: true,
  isFullscreen: false,
  activeCamIdx: 1,
  camPos:    CAM_VIEWS[1].pos,
  camTarget: CAM_VIEWS[1].tgt,
  isWalkthrough: false,
  tourActive: false, tourStep: 0, selected: null,
  leftOpen: true, rightOpen: true,

  toggle: (k) => set((s) => ({ [k]: !s[k] } as Partial<VenueState>)),

  setCamera: (idx) => set({
    activeCamIdx: idx,
    camPos:    CAM_VIEWS[idx].pos,
    camTarget: CAM_VIEWS[idx].tgt,
    isWalkthrough: false,
  }),

  setCamPos: (pos, tgt) => set({ camPos: pos, camTarget: tgt }),

  enterWalkthrough: () => set({
    isWalkthrough: true, activeCamIdx: -1,
    camPos: [-10, 1.7, 0], camTarget: [0, 1.7, 0],
  }),

  exitWalkthrough: () => set({
    isWalkthrough: false, activeCamIdx: 1,
    camPos: CAM_VIEWS[1].pos, camTarget: CAM_VIEWS[1].tgt,
  }),

  startTour: () => set({ tourActive: true, tourStep: 0, isWalkthrough: false }),
  stopTour:  () => set({ tourActive: false }),
  setTourStep: (n) => set({ tourStep: n }),
  select: (o) => set({ selected: o }),
  setFullscreen: (v) => set({ isFullscreen: v }),
  setLeftOpen:  (v) => set({ leftOpen: v }),
  setRightOpen: (v) => set({ rightOpen: v }),
}));
