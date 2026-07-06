"use client";

import { useEffect, useRef } from "react";
import {
  trackSatoriEvent,
  type SatoriTrackingEvent,
  type SatoriTrackingPayload,
} from "@/lib/tracking";

type TrackingEventProps = {
  eventName: SatoriTrackingEvent;
  payload?: SatoriTrackingPayload;
};

export function TrackingEvent({ eventName, payload }: TrackingEventProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) {
      return;
    }

    hasTracked.current = true;
    trackSatoriEvent(eventName, payload);
  }, [eventName, payload]);

  return null;
}
