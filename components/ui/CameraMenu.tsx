"use client";
import {
  X,
  Video,
  Map,
  Compass,
  Mic,
  Activity,
  Crown,
  Store,
  LogIn,
  LogOut,
  Wine,
  Building,
} from 'lucide-react';
import { CAM_VIEWS } from '@/utils/constants';
import { useVenueStore } from '@/store/venueStore';

const CAM_ICONS = [
  Map,         // 1. Top Floor Plan
  Compass,     // 2. Isometric Overview
  Mic,         // 3. Stage View
  Activity,    // 4. Runway View
  Crown,       // 5. Left VIP View
  Crown,       // 6. Right VIP View
  Store,       // 7. Left Booth View
  Store,       // 8. Right Booth View
  LogIn,       // 9. Entrance View
  LogOut,      // 10. Exit View
  Wine,        // 11. Networking Area
  Building,    // 12. Front Entrance
];

export default function CameraMenu() {
  const activeCamIdx = useVenueStore((s) => s.activeCamIdx);
  const setCamera    = useVenueStore((s) => s.setCamera);
  const rightOpen    = useVenueStore((s) => s.rightOpen);
  const setRight     = useVenueStore((s) => s.setRightOpen);

  if (!rightOpen) return (
    <button className="panel-fab right-fab" onClick={() => setRight(true)} title="Camera Views">
      <Video size={18}/>
    </button>
  );

  return (
    <aside className="cam-panel">
      <div className="panel-head">
        <span className="panel-title">Camera Views</span>
        <button className="icon-btn" onClick={() => setRight(false)} title="Collapse">
          <X size={14}/>
        </button>
      </div>
      {CAM_VIEWS.map((v, i) => {
        const IconComponent = CAM_ICONS[i] || Video;
        return (
          <button key={i}
            className={`cam-btn${activeCamIdx===i?' active':''}`}
            onClick={() => setCamera(i)}>
            <span className="cam-num">{i+1}</span>
            <IconComponent size={14} style={{ marginRight: 6 }} />
            <span>{v.name}</span>
          </button>
        );
      })}
    </aside>
  );
}
