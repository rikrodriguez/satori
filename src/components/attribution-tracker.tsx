"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  captureSatoriAttribution,
  trackSatoriEvent,
} from "@/lib/tracking";

type DebugEvent = {
  event?: string;
  satori_event_name?: string;
  content_name?: string;
  content_type?: string;
  value?: number;
  last_utm_campaign?: string;
  last_utm_content?: string;
  last_utm_term?: string;
  event_id?: string;
};

type DebugAttribution = {
  first_touch?: Record<string, string>;
  last_touch?: Record<string, string>;
} | null;

const debugAttributionKey = "satori-attribution";

export function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (
      params.get("satori_debug") === "1" &&
      params.get("satori_reset") === "1"
    ) {
      window.localStorage.removeItem("satori-attribution");
      window.localStorage.removeItem("satori-cart");
      window.__satoriTrackingEvents = [];
    }

    captureSatoriAttribution();
    trackSatoriEvent("PageView", {
      content_name: document.title || window.location.pathname,
      content_type: "page",
      page_path: `${window.location.pathname}${window.location.search}`,
      page_url: window.location.href,
    });
  }, [pathname]);

  return <TrackingDebugPanel />;
}

function TrackingDebugPanel() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [events, setEvents] = useState<DebugEvent[]>([]);
  const [attribution, setAttribution] = useState<DebugAttribution>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const enabled =
      params.get("satori_debug") === "1" ||
      window.localStorage.getItem("satori-debug") === "1";

    if (!enabled) {
      return;
    }

    const syncDebugState = () => {
      try {
        setAttribution(
          JSON.parse(
            window.localStorage.getItem(debugAttributionKey) || "null",
          ) as DebugAttribution,
        );
      } catch {
        setAttribution(null);
      }

      setEvents(
        (window.__satoriTrackingEvents || []).map((event) => ({
          event: event.event as string | undefined,
          satori_event_name: event.satori_event_name as string | undefined,
          content_name: event.content_name as string | undefined,
          content_type: event.content_type as string | undefined,
          value: event.value as number | undefined,
          last_utm_campaign: event.last_utm_campaign as string | undefined,
          last_utm_content: event.last_utm_content as string | undefined,
          last_utm_term: event.last_utm_term as string | undefined,
          event_id: event.event_id as string | undefined,
        })),
      );
    };

    const enableTimer = window.setTimeout(() => {
      setIsEnabled(true);
      syncDebugState();
    }, 0);
    window.addEventListener("satori:tracking", syncDebugState);

    return () => {
      window.clearTimeout(enableTimer);
      window.removeEventListener("satori:tracking", syncDebugState);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <aside className="tracking-debug-panel" id="satori-tracking-debug">
      <strong>Satori Tracking Debug</strong>
      <pre>
        {JSON.stringify(
          {
            attribution,
            event_count: events.length,
            events,
            purchase_events: events.filter(
              (event) => event.satori_event_name === "Purchase",
            ).length,
          },
          null,
          2,
        )}
      </pre>
    </aside>
  );
}
