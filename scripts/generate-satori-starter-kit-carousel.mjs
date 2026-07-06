import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "creative", "satori-carousel", "starter-kit");
const exportDir = path.join(root, "exports", "creative");

const variants = [
  { id: "1x1", width: 1080, height: 1080 },
  { id: "4x5", width: 1080, height: 1350 },
];

const cards = [
  {
    order: 1,
    slug: "ritual-path",
    eyebrow: "START THE RITUAL",
    headline: "Choose your SATORI path.",
    subline: "Cream, Duo, or Ritual Kit. Start simple and stay consistent.",
    badge: "Day-one offer",
    image: "public/images/satori-packs/satori-ritual-kit-three-jars-1254x1254.jpg",
  },
  {
    order: 2,
    slug: "cream",
    eyebrow: "SATORI CREAM",
    headline: "Simple first step.",
    subline: "One jar for the nightly cream ritual.",
    badge: "$39.99",
    image: "public/images/satori/23_pdp_main_product_front_2048x2048.jpg",
  },
  {
    order: 3,
    slug: "duo",
    eyebrow: "SATORI DUO",
    headline: "Stay stocked for consistency.",
    subline: "Two jars for a longer routine rhythm.",
    badge: "$69.99",
    image: "public/images/satori-packs/satori-duo-two-jars-1254x1254.jpg",
  },
  {
    order: 4,
    slug: "ritual-kit",
    eyebrow: "RITUAL KIT",
    headline: "Build the 90-day habit.",
    subline: "A simple supply path for the full nightly ritual.",
    badge: "$99.99",
    image: "public/images/satori-packs/satori-ritual-kit-three-jars-1254x1254.jpg",
  },
  {
    order: 5,
    slug: "subscribe-save",
    eyebrow: "SUBSCRIBE & SAVE",
    headline: "Keep the ritual stocked.",
    subline: "Subscribe & Save 15% when the refill rhythm fits.",
    badge: "15% savings",
    image: "public/images/satori/45_pdp_final_cta_product_only_1800x1200.jpg",
  },
  {
    order: 6,
    slug: "cta",
    eyebrow: "SHOP SATORI",
    headline: "Choose your ritual path.",
    subline: "Tap Shop Now and start with the path that fits your routine.",
    badge: "Shop Now",
    image: "public/images/satori/29_pdp_application_01_2048x2048.jpg",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function textBlock({ lines, x, y, size, weight = 400, color = "#004155", lineHeight }) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" fill="${color}" font-size="${size}" font-family="Arial, Helvetica, sans-serif" font-weight="${weight}">${escapeXml(line)}</text>`,
    )
    .join("");
}

function overlaySvg(card, variant) {
  const isTall = variant.id === "4x5";
  const headlineLines = wrapText(card.headline, isTall ? 18 : 17).slice(0, 3);
  const sublineLines = wrapText(card.subline, isTall ? 34 : 30).slice(0, 3);
  const headlineY = isTall ? 205 : 180;
  const sublineY = headlineY + headlineLines.length * (isTall ? 74 : 68) + 32;
  const badgeY = isTall ? 78 : 68;
  const pageLabelY = variant.height - 58;

  return Buffer.from(`
<svg width="${variant.width}" height="${variant.height}" viewBox="0 0 ${variant.width} ${variant.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="soft" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffaf7"/>
      <stop offset="56%" stop-color="#f8efe5"/>
      <stop offset="100%" stop-color="#e8f4f3"/>
    </linearGradient>
  </defs>
  <rect width="${variant.width}" height="${variant.height}" fill="url(#soft)"/>
  <circle cx="${variant.width - 130}" cy="126" r="210" fill="#d9eeee" opacity="0.72"/>
  <circle cx="${variant.width - 110}" cy="${variant.height - 110}" r="240" fill="#f9c5d7" opacity="0.28"/>
  <rect x="42" y="42" width="${variant.width - 84}" height="${variant.height - 84}" rx="34" fill="none" stroke="#d6ccc0" stroke-width="2"/>
  <text x="70" y="${badgeY}" fill="#004155" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700">SATORI</text>
  <text x="70" y="${badgeY + 42}" fill="#ff6fa1" font-size="22" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="2">${escapeXml(card.eyebrow)}</text>
  <rect x="${variant.width - 292}" y="${badgeY - 32}" width="222" height="58" rx="29" fill="#004155"/>
  <text x="${variant.width - 254}" y="${badgeY + 6}" fill="#fffaf7" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="700">${escapeXml(card.badge)}</text>
  ${textBlock({ lines: headlineLines, x: 70, y: headlineY, size: isTall ? 66 : 58, weight: 700, lineHeight: isTall ? 74 : 68 })}
  ${textBlock({ lines: sublineLines, x: 74, y: sublineY, size: 29, color: "#666a6c", lineHeight: 38 })}
  <rect x="70" y="${variant.height - 132}" width="302" height="62" rx="31" fill="#00657d"/>
  <text x="112" y="${variant.height - 92}" fill="#fffaf7" font-size="23" font-family="Arial, Helvetica, sans-serif" font-weight="700">Choose your ritual</text>
  <text x="${variant.width - 164}" y="${pageLabelY}" fill="#004155" font-size="22" font-family="Arial, Helvetica, sans-serif" font-weight="700">${card.order}/6</text>
</svg>`);
}

function imageFrameSvg(variant, imageBox) {
  return Buffer.from(`
<svg width="${variant.width}" height="${variant.height}" viewBox="0 0 ${variant.width} ${variant.height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${imageBox.x - 10}" y="${imageBox.y - 10}" width="${imageBox.width + 20}" height="${imageBox.height + 20}" rx="38" fill="none" stroke="#d6ccc0" stroke-width="2"/>
</svg>`);
}

function csvEscape(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(exportDir, { recursive: true });

const manifestRows = [
  [
    "asset_name",
    "card_order",
    "card_slug",
    "variant",
    "width",
    "height",
    "source_image",
    "output_file",
    "headline",
    "subline",
  ],
];

for (const variant of variants) {
  const variantDir = path.join(outputDir, variant.id);
  await fs.mkdir(variantDir, { recursive: true });

  for (const card of cards) {
    const imageBox =
      variant.id === "4x5"
        ? { x: 156, y: 622, width: 768, height: 500 }
        : { x: 430, y: 482, width: 560, height: 382 };
    const productImage = await sharp(path.join(root, card.image))
      .resize(imageBox.width, imageBox.height, { fit: "cover", position: "center" })
      .modulate({ saturation: 0.96, brightness: 0.98 })
      .png()
      .toBuffer();
    const filename = `card_${String(card.order).padStart(2, "0")}_${card.slug}_${variant.width}x${variant.height}.png`;
    const output = path.join(variantDir, filename);

    await sharp({
      create: {
        width: variant.width,
        height: variant.height,
        channels: 4,
        background: "#fffaf7",
      },
    })
      .composite([
        { input: overlaySvg(card, variant), left: 0, top: 0 },
        { input: productImage, left: imageBox.x, top: imageBox.y },
        { input: imageFrameSvg(variant, imageBox), left: 0, top: 0 },
      ])
      .png({ quality: 92, compressionLevel: 9 })
      .toFile(output);

    manifestRows.push([
      "carousel_valuestarter_starter-kit_v1",
      card.order,
      card.slug,
      variant.id,
      variant.width,
      variant.height,
      card.image,
      path.relative(root, output),
      card.headline,
      card.subline,
    ]);
  }
}

const csv = manifestRows.map((row) => row.map(csvEscape).join(",")).join("\n");
await fs.writeFile(
  path.join(exportDir, "satori-starter-kit-carousel-manifest.csv"),
  `${csv}\n`,
);

console.log(`Generated ${cards.length * variants.length} carousel cards in ${path.relative(root, outputDir)}`);
