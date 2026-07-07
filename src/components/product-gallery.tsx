"use client";

import { useRef, useState } from "react";
import { ProductVisual } from "@/components/product-visual";
import { productGalleryAssets } from "@/lib/visual-assets";

const galleryBadges = ["Science-led", "Daily cream", "Texture", "In hand"];

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setActive(index);
    const track = trackRef.current;
    if (track) {
      const slide = track.children[index] as HTMLElement | undefined;
      slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  };

  return (
    <div className="pdp-gallery">
      <div className="pdp-gallery-main" ref={trackRef} onScroll={handleScroll}>
        {productGalleryAssets.map((asset, index) => (
          <div className="pdp-gallery-slide" key={asset.key}>
            <ProductVisual
              badge={galleryBadges[index]}
              priority={index === 0}
              src={asset}
              variant="gallery"
            />
          </div>
        ))}
      </div>

      <div className="pdp-gallery-thumbs">
        {productGalleryAssets.map((asset, index) => (
          <button
            aria-label={`View ${galleryBadges[index]}`}
            className={index === active ? "is-active" : ""}
            key={asset.key}
            onClick={() => goTo(index)}
            type="button"
          >
            <ProductVisual priority={false} src={asset} variant="mini" />
          </button>
        ))}
      </div>
    </div>
  );
}
