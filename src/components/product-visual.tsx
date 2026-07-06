import Image, { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import {
  homeBeforeAfterAssets,
  satoriAssets,
  type SatoriVisualAsset,
  type SatoriVisualFit,
} from "@/lib/visual-assets";

type VisualSource = SatoriVisualAsset | string;

type ProductVisualProps = {
  alt?: string;
  badge?: string;
  className?: string;
  fit?: SatoriVisualFit;
  priority?: boolean;
  sizes?: string;
  src?: VisualSource;
  variant?: "hero" | "card" | "gallery" | "mini" | "story";
};

type SkinResultVisualProps = {
  alt?: string;
  label?: string;
  phase?: string;
  priority?: boolean;
  src?: VisualSource;
  variant?: "calm" | "glow" | "smooth" | "firm";
};

type SatoriImageCardProps = {
  asset: SatoriVisualAsset;
  badge?: string;
  className?: string;
  fit?: SatoriVisualFit;
  priority?: boolean;
  sizes?: string;
};

type HeroPictureProps = {
  className?: string;
  desktop: SatoriVisualAsset;
  mobile: SatoriVisualAsset;
};

const productVisualSizes: Record<NonNullable<ProductVisualProps["variant"]>, string> = {
  card: "(max-width: 620px) 100vw, (max-width: 1260px) 50vw, 25vw",
  gallery: "(max-width: 860px) 100vw, 50vw",
  hero: "(max-width: 860px) 100vw, 48vw",
  mini: "96px",
  story: "(max-width: 860px) 100vw, 48vw",
};

function imageQuality(fit?: SatoriVisualFit) {
  return fit === "contain" ? 90 : 82;
}

function isAsset(src?: VisualSource): src is SatoriVisualAsset {
  return Boolean(src && typeof src === "object" && "src" in src);
}

function resolveSource(src: VisualSource | undefined, fallback: SatoriVisualAsset) {
  if (isAsset(src)) {
    return {
      alt: src.alt,
      fit: src.fit,
      height: src.height,
      priority: src.priority,
      src: src.src,
      width: src.width,
    };
  }

  return {
    alt: fallback.alt,
    fit: fallback.fit,
    height: fallback.height,
    priority: fallback.priority,
    src: src ?? fallback.src,
    width: fallback.width,
  };
}

export function ProductVisual({
  alt,
  badge = "Science-led",
  className = "",
  fit,
  priority = false,
  sizes,
  src,
  variant = "card",
}: ProductVisualProps) {
  const visual = resolveSource(src, satoriAssets.pdpMainProductFront);
  const loadEagerly = priority || visual.priority || variant === "hero";
  const imageFit = fit ?? visual.fit;

  return (
    <div className={`product-visual product-visual--${variant} ${className}`}>
      <Image
        alt={alt ?? visual.alt}
        fetchPriority={loadEagerly ? "high" : undefined}
        fill
        loading={loadEagerly ? undefined : "lazy"}
        preload={loadEagerly}
        quality={imageQuality(imageFit)}
        sizes={sizes ?? productVisualSizes[variant]}
        src={visual.src}
        style={{ objectFit: imageFit }}
      />
      {badge ? <span className="product-visual-badge">{badge}</span> : null}
    </div>
  );
}

export function SatoriImageCard({
  asset,
  badge,
  className = "",
  fit,
  priority = false,
  sizes = "(max-width: 620px) 100vw, (max-width: 1260px) 50vw, 33vw",
}: SatoriImageCardProps) {
  const loadEagerly = priority || asset.priority;
  const imageFit = fit ?? asset.fit;
  const cardStyle = {
    aspectRatio: `${asset.width} / ${asset.height}`,
  } as CSSProperties;

  return (
    <figure className={`satori-image-card ${className}`} style={cardStyle}>
      <Image
        alt={asset.alt}
        fetchPriority={loadEagerly ? "high" : undefined}
        fill
        loading={loadEagerly ? undefined : "lazy"}
        preload={loadEagerly}
        quality={imageQuality(imageFit)}
        sizes={sizes}
        src={asset.src}
        style={{ objectFit: imageFit }}
      />
      {badge ? <figcaption>{badge}</figcaption> : null}
    </figure>
  );
}

export function HeroPicture({ className = "", desktop, mobile }: HeroPictureProps) {
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    alt: mobile.alt,
    height: mobile.height,
    quality: 82,
    sizes: "100vw",
    src: mobile.src,
    width: mobile.width,
  });
  const { props: desktopProps } = getImageProps({
    alt: desktop.alt,
    fetchPriority: "high",
    height: desktop.height,
    loading: "eager",
    quality: 82,
    sizes: "(max-width: 860px) 100vw, 50vw",
    src: desktop.src,
    width: desktop.width,
  });

  return (
    <picture className={`hero-picture ${className}`}>
      <source media="(max-width: 860px)" sizes="100vw" srcSet={mobileSrcSet} />
      <img {...desktopProps} alt={desktop.alt} />
    </picture>
  );
}

export function SkinResultVisual({
  alt,
  label = "Visual reference",
  phase = "After",
  priority = false,
  src,
  variant = "glow",
}: SkinResultVisualProps) {
  const fallback =
    phase.toLowerCase() === "before"
      ? homeBeforeAfterAssets[0]
      : homeBeforeAfterAssets[1];
  const visual = resolveSource(src, fallback);

  return (
    <div className={`skin-result-visual skin-result-visual--${variant}`}>
      <Image
        alt={alt ?? visual.alt}
        fetchPriority={priority ? "high" : undefined}
        fill
        loading={priority ? undefined : "lazy"}
        preload={priority}
        quality={imageQuality(visual.fit)}
        sizes="(max-width: 860px) 100vw, 33vw"
        src={visual.src}
        style={{ objectFit: visual.fit }}
      />
      <span>{phase}</span>
      <strong>{label}</strong>
    </div>
  );
}
