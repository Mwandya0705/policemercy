"use client";
import { useEffect, useRef } from 'react';
import { useVenueStore } from '@/store/venueStore';
import { TOUR_STOPS } from '@/utils/constants';

export default function AutoTour() {
  const tourActive = useVenueStore((s) => s.tourActive);
  const tourStep   = useVenueStore((s) => s.tourStep);
  const stopTour   = useVenueStore((s) => s.stopTour);
  const setStep    = useVenueStore((s) => s.setTourStep);
  const setCamPos  = useVenueStore((s) => s.setCamPos);
  const timer      = useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(() => {
    if (!tourActive) return;
    const stop = TOUR_STOPS[tourStep];
    if (!stop) { stopTour(); return; }
    setCamPos(stop.pos, stop.tgt);
    timer.current = setTimeout(() => {
      const next = tourStep + 1;
      if (next >= TOUR_STOPS.length) stopTour();
      else setStep(next);
    }, stop.ms);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [tourActive, tourStep]);

  return null;
}
