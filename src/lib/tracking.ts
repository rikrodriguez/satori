"use client";

export type SatoriTrackingEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead";

export type TrackingItem = {
  id: string;
  name: string;
  price?: number;
  quantity?: number;
};

export type SatoriTrackingPayload = {
  value?: number;
  currency?: "USD";
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  contents?: TrackingItem[];
  num_items?: number;
  event_id?: string;
  source?: string;
  [key: string]: string | number | boolean | string[] | TrackingItem[] | undefined;
};

type AttributionTouch = {
  captured_at: string;
  landing_path: string;
  landing_url: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
};

type StoredAttribution = {
  first_touch: AttributionTouch;
  last_touch: AttributionTouch;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    __satoriTrackingEvents?: Record<string, unknown>[];
    ttq?: {
      page?: () => void;
      track?: (eventName: string, payload?: Record<string, unknown>) => void;
    };
  }
}

const attributionStorageKey = "satori-attribution";
const attributionParams = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
] as const;

function createEventId(eventName: SatoriTrackingEvent) {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return `${eventName}.${window.crypto.randomUUID()}`;
  }

  return `${eventName}.${Date.now()}.${Math.random().toString(16).slice(2)}`;
}

function readStoredAttribution(): StoredAttribution | null {
  try {
    const stored = window.localStorage.getItem(attributionStorageKey);

    return stored ? (JSON.parse(stored) as StoredAttribution) : null;
  } catch {
    window.localStorage.removeItem(attributionStorageKey);
    return null;
  }
}

function createAttributionTouch(): {
  hasAttributionParams: boolean;
  touch: AttributionTouch;
} {
  const params = new URLSearchParams(window.location.search);
  const touch: AttributionTouch = {
    captured_at: new Date().toISOString(),
    landing_path: `${window.location.pathname}${window.location.search}`,
    landing_url: window.location.href,
  };

  if (document.referrer) {
    touch.referrer = document.referrer;
  }

  let hasAttributionParams = false;

  attributionParams.forEach((key) => {
    const value = params.get(key);

    if (value) {
      touch[key] = value;
      hasAttributionParams = true;
    }
  });

  return { hasAttributionParams, touch };
}

export function captureSatoriAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  const existing = readStoredAttribution();
  const { hasAttributionParams, touch } = createAttributionTouch();

  if (!existing) {
    const firstAttribution = {
      first_touch: touch,
      last_touch: touch,
    };
    window.localStorage.setItem(
      attributionStorageKey,
      JSON.stringify(firstAttribution),
    );
    return firstAttribution;
  }

  if (hasAttributionParams) {
    const updatedAttribution = {
      first_touch: existing.first_touch,
      last_touch: touch,
    };
    window.localStorage.setItem(
      attributionStorageKey,
      JSON.stringify(updatedAttribution),
    );
    return updatedAttribution;
  }

  return existing;
}

function createAttributionPayload(): SatoriTrackingPayload {
  const stored = readStoredAttribution();

  if (!stored) {
    return {};
  }

  return {
    first_landing_path: stored.first_touch.landing_path,
    first_landing_url: stored.first_touch.landing_url,
    first_referrer: stored.first_touch.referrer,
    first_utm_source: stored.first_touch.utm_source,
    first_utm_medium: stored.first_touch.utm_medium,
    first_utm_campaign: stored.first_touch.utm_campaign,
    first_utm_content: stored.first_touch.utm_content,
    first_utm_term: stored.first_touch.utm_term,
    last_landing_path: stored.last_touch.landing_path,
    last_landing_url: stored.last_touch.landing_url,
    last_referrer: stored.last_touch.referrer,
    last_utm_source: stored.last_touch.utm_source,
    last_utm_medium: stored.last_touch.utm_medium,
    last_utm_campaign: stored.last_touch.utm_campaign,
    last_utm_content: stored.last_touch.utm_content,
    last_utm_term: stored.last_touch.utm_term,
    last_fbclid: stored.last_touch.fbclid,
    last_gclid: stored.last_touch.gclid,
    last_ttclid: stored.last_touch.ttclid,
  };
}

export function trackSatoriEvent(
  eventName: SatoriTrackingEvent,
  payload: SatoriTrackingPayload = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  captureSatoriAttribution();

  const eventPayload: SatoriTrackingPayload = {
    currency: "USD",
    event_id: payload.event_id ?? createEventId(eventName),
    ...createAttributionPayload(),
    ...payload,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: `satori_${eventName.toLowerCase()}`,
    satori_event_name: eventName,
    ...eventPayload,
  });

  window.__satoriTrackingEvents = window.__satoriTrackingEvents ?? [];
  window.__satoriTrackingEvents.push({
    event: `satori_${eventName.toLowerCase()}`,
    satori_event_name: eventName,
    ...eventPayload,
  });
  window.dispatchEvent(
    new CustomEvent("satori:tracking", {
      detail: window.__satoriTrackingEvents,
    }),
  );

  if (window.fbq) {
    window.fbq("track", eventName, eventPayload, { eventID: eventPayload.event_id });
  } else {
    window.setTimeout(() => {
      if (window.fbq) {
        window.fbq("track", eventName, eventPayload, {
          eventID: eventPayload.event_id,
        });
      }
    }, 500);
  }

  if (window.ttq?.track) {
    window.ttq.track(eventName, eventPayload as Record<string, unknown>);
  }
}
