// ── Coordinate system ─────────────────────────────────────────────────
// X: −11 (left/entrance wall) → +11 (right/exit wall)
// Z: −20.5 (bottom, no door)  → +20.5 (rear/stage wall)
// Y: 0 (floor) upward

export const VENUE_W = 22;
export const VENUE_L = 41;
export const HALF_W  = VENUE_W / 2;   // 11
export const HALF_L  = VENUE_L / 2;   // 20.5
export const WALL_H  = 5.5;

// ── Stage ──────────────────────────────────────────────────────────────
export const STAGE = {
  w: 15, d: 8, h: 1,
  cx: 0,
  cz: HALF_L - 4,      // 16.5
  frontZ: HALF_L - 8,  // 12.5
} as const;

// ── Runway ─────────────────────────────────────────────────────────────
export const RUNWAY = {
  w: 1, len: 20,
  cx: 0,
  rearZ:  STAGE.frontZ,           // 12.5
  cz:     STAGE.frontZ - 10,      // 2.5
  frontZ: STAGE.frontZ - 20,      // −7.5
} as const;

// ── VIP areas (expanded: 5 m wide × 5 m deep) ────────────────────────
export const VIP_W = 5;
export const VIP_D = 5;
const VIP_CZ  = STAGE.frontZ - VIP_D / 2;           // 10
const VIP_LCX = -3.5;
const VIP_RCX =  3.5;
export const VIP_L = { cx: VIP_LCX, cz: VIP_CZ } as const;
export const VIP_R = { cx: VIP_RCX, cz: VIP_CZ } as const;

// ── Cocktail tables (20 = 5 rows × 4 cols) ────────────────────────────
// First row starts 2 m below VIP front (VIP front = 12.5−5 = 7.5)
export const TABLE_XS = [-4.5, -2.2, 2.2, 4.5] as const;
export const TABLE_ZS = [5.0, 2.0, -1.0, -4.0, -7.0] as const;

export interface TableDef { id: string; cx: number; cz: number }
export const TABLES: TableDef[] = TABLE_ZS.flatMap((z, row) =>
  TABLE_XS.map((x, col) => ({
    id: `T${String(row * 4 + col + 1).padStart(2, '0')}`,
    cx: x, cz: z,
  }))
);

// ── Booths (6 L + 6 R, each 4 m × 4 m) ───────────────────────────────
// Gap at Z = 0 for entrance/exit doors
const BOOTH_CXL = -(HALF_W - 2);  // −9
const BOOTH_CXR =  (HALF_W - 2);  // +9
const BOOTH_ZS  = [10.5, 6.5, 2.5, -3.5, -7.5, -11.5] as const;

export interface BoothDef { id: string; cx: number; cz: number; side: 'L'|'R' }
export const BOOTHS: BoothDef[] = [
  ...BOOTH_ZS.map((z, i) => ({ id: `L${String(i+1).padStart(2,'0')}`, cx: BOOTH_CXL, cz: z, side: 'L' as const })),
  ...BOOTH_ZS.map((z, i) => ({ id: `R${String(i+1).padStart(2,'0')}`, cx: BOOTH_CXR, cz: z, side: 'R' as const })),
];

// ── Entrance / Exit ────────────────────────────────────────────────────
export const ENTRANCE  = { x: -HALF_W, z: 0 } as const;
export const EXIT_PT   = { x:  HALF_W, z: 0 } as const;

// ── Camera views ───────────────────────────────────────────────────────
export interface CamView {
  name: string;
  pos: [number,number,number];
  tgt: [number,number,number];
}
export const CAM_VIEWS: CamView[] = [
  { name: 'Top Floor Plan',    pos: [0, 50, 2],       tgt: [0, 0, 2]    },
  { name: 'Isometric Overview',pos: [28, 26, -22],    tgt: [0, 1, 6]    },
  { name: 'Stage View',        pos: [0, 4, 5],        tgt: [0, 2, 16.5] },
  { name: 'Runway View',       pos: [0, 4, -8],       tgt: [0, 1, 2.5]  },
  { name: 'Left VIP View',     pos: [-9, 4, 8],       tgt: [-3, 1, 10]  },
  { name: 'Right VIP View',    pos: [9, 4, 8],        tgt: [3, 1, 10]   },
  { name: 'Left Booth View',   pos: [-15, 4, 0],      tgt: [-9, 2, 0]   },
  { name: 'Right Booth View',  pos: [15, 4, 0],       tgt: [9, 2, 0]    },
  { name: 'Entrance View',     pos: [-18, 4, 0],      tgt: [-11, 2, 0]  },
  { name: 'Exit View',         pos: [18, 4, 0],       tgt: [11, 2, 0]   },
  { name: 'Networking Area',   pos: [0, 10, -2],      tgt: [0, 1, 2]    },
  { name: 'Front Entrance',    pos: [-14, 5, -20],    tgt: [0, 2, 0]    },
];

// ── Auto-tour stops ────────────────────────────────────────────────────
export interface TourStop {
  title: string; desc: string;
  pos: [number,number,number]; tgt: [number,number,number];
  ms: number;
}
export const TOUR_STOPS: TourStop[] = [
  { title:'Welcome',          desc:'Midpoint Access & Circulation Venue — 22 m × 41 m',  pos:[28,26,-22], tgt:[0,1,6],    ms:4500 },
  { title:'Entrance',         desc:'Left-wall midpoint entrance, 20.5 m from either end', pos:[-18,4,0],   tgt:[-11,2,0],  ms:4000 },
  { title:'Exhibition Booths',desc:'12 booths × 4 m × 4 m — six on each long wall',       pos:[-14,5,-4],  tgt:[-9,1,2],   ms:4000 },
  { title:'Networking Area',  desc:'20 cocktail tables · 80 stools (4 per table)',          pos:[0,10,-2],   tgt:[0,1,2],    ms:4000 },
  { title:'VIP Left',         desc:'VIP Left — 5 m × 5 m · All seating faces the stage',   pos:[-9,4,8],    tgt:[-3,1,10],  ms:4000 },
  { title:'VIP Right',        desc:'VIP Right — 5 m × 5 m · All seating faces the stage',  pos:[9,4,8],     tgt:[3,1,10],   ms:4000 },
  { title:'Runway',           desc:'Runway — 1 m × 20 m · From stage to networking floor', pos:[4,4,2],     tgt:[0,1,8],    ms:4000 },
  { title:'Stage',            desc:'Stage — 15 m × 8 m · LED screen, truss & spotlights',  pos:[0,5,6],     tgt:[0,2,16.5], ms:4000 },
  { title:'Exit',             desc:'Right-wall midpoint exit — opposite the entrance',      pos:[18,4,0],    tgt:[11,2,0],   ms:4000 },
  { title:'Overview',         desc:'All elements verified ✓',                               pos:[28,26,-22], tgt:[0,1,6],    ms:5000 },
];
