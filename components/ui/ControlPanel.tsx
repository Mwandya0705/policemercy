"use client";
import { useEffect } from 'react';
import {
  Eye, EyeOff, Home, Box, Tag, Ruler, Workflow,
  Sun, Moon, Maximize2, Minimize2, Camera, Footprints,
  RotateCcw, PlayCircle, StopCircle, X, Menu,
} from 'lucide-react';
import { useVenueStore } from '@/store/venueStore';

type TK = 'showRoof'|'showWalls'|'showLabels'|'showDimensions'|'showFlow'|'dayMode';

function Toggle({ label, stateKey, Icon, IconOff }:
  { label:string; stateKey:TK; Icon:any; IconOff?:any }) {
  const val    = useVenueStore((s) => s[stateKey] as boolean);
  const toggle = useVenueStore((s) => s.toggle);
  const Ic = val ? Icon : (IconOff ?? Icon);
  return (
    <div className="tog-row">
      <div className="tog-left">
        <Ic size={13} className={val ? 'ic-on' : 'ic-off'}/>
        <span className="tog-lbl">{label}</span>
      </div>
      <button className={`tog-btn${val?' on':''}`} onClick={() => toggle(stateKey)}
        aria-label={`Toggle ${label}`}/>
    </div>
  );
}

export default function ControlPanel() {
  const isWalk     = useVenueStore((s) => s.isWalkthrough);
  const tourActive = useVenueStore((s) => s.tourActive);
  const dayMode    = useVenueStore((s) => s.dayMode);
  const leftOpen   = useVenueStore((s) => s.leftOpen);
  const isFull     = useVenueStore((s) => s.isFullscreen);
  const enterWalk  = useVenueStore((s) => s.enterWalkthrough);
  const exitWalk   = useVenueStore((s) => s.exitWalkthrough);
  const startTour  = useVenueStore((s) => s.startTour);
  const stopTour   = useVenueStore((s) => s.stopTour);
  const setCamera  = useVenueStore((s) => s.setCamera);
  const setFull    = useVenueStore((s) => s.setFullscreen);
  const setLeft    = useVenueStore((s) => s.setLeftOpen);

  useEffect(() => {
    const fn = () => setFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fn);
    return () => document.removeEventListener('fullscreenchange', fn);
  }, []);

  const screenshot = () => {
    const c = document.querySelector('canvas');
    if (!c) return;
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = 'venue-preview.png';
    a.click();
  };

  const toggleFs = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  if (!leftOpen) return (
    <button className="panel-fab left-fab" onClick={() => setLeft(true)} title="Open Controls">
      <Menu size={18}/>
    </button>
  );

  return (
    <aside className="ctrl-panel">
      <div className="panel-head">
        <span className="panel-title">Venue Controls</span>
        <button className="icon-btn" onClick={() => setLeft(false)} title="Collapse">
          <X size={14}/>
        </button>
      </div>

      {/* Navigate */}
      <section>
        <div className="sec-label">Navigate</div>
        <button className={`action-btn${isWalk?' active':''}`}
          onClick={() => isWalk ? exitWalk() : enterWalk()}>
          <Footprints size={13}/>
          {isWalk ? 'Exit Walkthrough' : 'Enter Walkthrough'}
        </button>
        <button className="action-btn" onClick={() => setCamera(1)}>
          <RotateCcw size={13}/> Reset Camera
        </button>
        <button className={`action-btn${tourActive?' active':' accent'}`}
          onClick={() => tourActive ? stopTour() : startTour()}>
          {tourActive ? <StopCircle size={13}/> : <PlayCircle size={13}/>}
          {tourActive ? 'Stop Tour' : 'Auto Tour'}
        </button>
      </section>

      {/* Visibility */}
      <section>
        <div className="sec-label">Visibility</div>
        <Toggle label="Roof"         stateKey="showRoof"       Icon={Home}/>
        <Toggle label="Walls"        stateKey="showWalls"      Icon={Box}/>
        <Toggle label="Labels"       stateKey="showLabels"     Icon={Tag}/>
        <Toggle label="Dimensions"   stateKey="showDimensions" Icon={Ruler}/>
        <Toggle label="Visitor Flow" stateKey="showFlow"       Icon={Workflow}/>
      </section>

      {/* Lighting */}
      <section>
        <div className="sec-label">Lighting</div>
        <Toggle label={dayMode ? 'Day Mode' : 'Night Mode'} stateKey="dayMode"
          Icon={Sun} IconOff={Moon}/>
      </section>

      {/* Tools */}
      <section>
        <div className="sec-label">Tools</div>
        <button className="action-btn" onClick={toggleFs}>
          {isFull ? <Minimize2 size={13}/> : <Maximize2 size={13}/>}
          {isFull ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
        <button className="action-btn" onClick={screenshot}>
          <Camera size={13}/> Screenshot
        </button>
      </section>

      <div className="kb-hint">
        <strong>Walk mode:</strong> WASD move · Mouse look · Shift sprint · Esc exit
      </div>
    </aside>
  );
}
