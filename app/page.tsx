"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ControlPanel from "@/components/ui/ControlPanel";
import CameraMenu from "@/components/ui/CameraMenu";
import { useVenueStore } from "@/store/venueStore";
import { X } from "lucide-react";

// Dynamically import the 3D scene with SSR disabled to prevent Node environment reference errors
const VenueScene = dynamic(() => import("@/components/venue/VenueScene"), {
  ssr: false,
  loading: () => (
    <div className="loading-screen">
      <div className="spinner" />
      <p style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}>LOADING 3D SCENE...</p>
    </div>
  ),
});

export default function Home() {
  const selected = useVenueStore((s) => s.selected);
  const select = useVenueStore((s) => s.select);
  const setLeft = useVenueStore((s) => s.setLeftOpen);
  const setRight = useVenueStore((s) => s.setRightOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // On mobile devices (width < 768px), auto-collapse the panels on mount
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setLeft(false);
      setRight(false);
    }
  }, [setLeft, setRight]);

  if (!mounted) return null;

  return (
    <div className="app-container">
      {/* 3D Venue Canvas */}
      <VenueScene />

      {/* Overlapping UI Panels */}
      <ControlPanel />
      <CameraMenu />

      {/* Selected Item Detail Panel */}
      {selected && (
        <div className="detail-card">
          <div className="detail-head">
            <div>
              <h2 className="detail-title">{selected.title}</h2>
              {selected.dim && <span className="detail-dim">{selected.dim}</span>}
            </div>
            <button
              className="icon-btn"
              onClick={() => select(null)}
              title="Close Details"
            >
              <X size={16} />
            </button>
          </div>
          <p className="detail-desc">{selected.desc}</p>
        </div>
      )}
    </div>
  );
}
