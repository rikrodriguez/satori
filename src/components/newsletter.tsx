"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { trackSatoriEvent } from "@/lib/tracking";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "joined">("idle");

  return (
    <section className="newsletter-section">
      <div>
        <span>Join the Satori family.</span>
        <h2>Be the first to know about discounts, rituals, and new drops.</h2>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          trackSatoriEvent("Lead", {
            content_name: "Satori newsletter",
            source: "newsletter_form",
          });
          setStatus("joined");
        }}
      >
        <Mail size={18} />
        <input required type="email" placeholder="Email" aria-label="Email" />
        <button type="submit">Subscribe</button>
        {status === "joined" ? <p>You&apos;re on the Satori list.</p> : null}
      </form>
    </section>
  );
}
