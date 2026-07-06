import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "creative", "satori-day-one");
const exportDir = path.join(root, "exports", "creative");
const width = 1080;
const height = 1920;

const assets = [
  {
    adName: "ugc_needleavoidant_no-needle-ritual_v1",
    status: "publish_day_1",
    source: "public/images/satori/40_pdp_ugc_photo_01_1200x1600.jpg",
    eyebrow: "NO-NEEDLE RITUAL",
    headline: "A smoother-looking nightly ritual without needles or downtime.",
    subline: "Cleanse. Apply. Repeat at night.",
    cta: "Start the SATORI ritual",
  },
  {
    adName: "reels_needleavoidant_no-needle-ritual_v1",
    status: "publish_day_1",
    source: "public/images/satori/29_pdp_application_01_2048x2048.jpg",
    eyebrow: "NO APPOINTMENT",
    headline: "No downtime. One nightly cream step.",
    subline: "Hydration + texture support.",
    cta: "Shop SATORI Cream",
  },
  {
    adName: "demo_routinesimplifier_30-night-habit_v1",
    status: "publish_day_1",
    source: "public/images/satori/42_pdp_ugc_photo_03_1200x1600.jpg",
    eyebrow: "30-NIGHT HABIT",
    headline: "The best anti-aging routine is the one you repeat.",
    subline: "Cleanse. Apply. Sleep.",
    cta: "Try the 30-night ritual",
  },
  {
    adName: "texture_routinesimplifier_hydration-texture_v1",
    status: "publish_day_1",
    source: "public/images/satori/25_pdp_product_texture_2048x2048.jpg",
    eyebrow: "TEXTURE SUPPORT",
    headline: "One cream step for a calmer-looking morning finish.",
    subline: "Rich hydration. Simple night ritual.",
    cta: "Make tonight simple",
  },
  {
    adName: "carousel_valuestarter_starter-kit_v1",
    status: "publish_day_1",
    source: "public/images/satori-packs/satori-ritual-kit-three-jars-1254x1254.jpg",
    eyebrow: "STARTER KIT VALUE",
    headline: "Choose your ritual path.",
    subline: "Cream. Duo. Ritual Kit. Subscribe & Save.",
    cta: "Start here",
  },
  {
    adName: "offer_valuestarter_starter-kit_v1",
    status: "publish_day_1",
    source: "public/images/satori/45_pdp_final_cta_product_only_1800x1200.jpg",
    eyebrow: "START HERE",
    headline: "One jar to try. Duo to stay consistent.",
    subline: "Upgrade into the Ritual Kit when ready.",
    cta: "Choose your ritual",
  },
  {
    adName: "founder_sciencecurious_science-simple_v1",
    status: "hold_review",
    source: "public/images/satori/18_home_brand_story_group_1800x1200.jpg",
    eyebrow: "HOLD: SCIENCE SIMPLE",
    headline: "Science-led skincare, simplified into one cream step.",
    subline: "Hold until source review.",
    cta: "See the ritual",
  },
  {
    adName: "dm_routinesimplifier_30-night-habit_v1",
    status: "hold_review",
    source: "public/images/satori/44_pdp_final_cta_model_1800x1200.jpg",
    eyebrow: "HOLD: COMMENT 30",
    headline: "Comment 30 for the simple SATORI night ritual.",
    subline: "Use only in a separate engagement test.",
    cta: "Get the ritual",
  },
];

function escapeXml(value) {
  return value
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

function textBlock({ lines, x, y, size, weight = 400, color = "#fff", lineHeight }) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" fill="${color}" font-size="${size}" font-family="Arial, Helvetica, sans-serif" font-weight="${weight}">${escapeXml(line)}</text>`,
    )
    .join("");
}

function overlaySvg(asset) {
  const headlineLines = wrapText(asset.headline, 24).slice(0, 4);
  const sublineLines = wrapText(asset.subline, 34).slice(0, 2);
  const statusLabel =
    asset.status === "hold_review" ? "HOLD / REVIEW" : "PUBLISH DAY 1";

  return Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#041821" stop-opacity="0.1"/>
      <stop offset="46%" stop-color="#041821" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#041821" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#shade)"/>
  <rect x="52" y="52" width="222" height="56" rx="28" fill="#fffaf7" opacity="0.94"/>
  <text x="82" y="88" fill="#004155" font-size="23" font-family="Arial, Helvetica, sans-serif" font-weight="700">SATORI</text>
  <rect x="52" y="128" width="${asset.status === "hold_review" ? 258 : 246}" height="44" rx="22" fill="${asset.status === "hold_review" ? "#fff2f7" : "#f9c5d7"}" opacity="0.95"/>
  <text x="76" y="157" fill="#323435" font-size="17" font-family="Arial, Helvetica, sans-serif" font-weight="700">${statusLabel}</text>
  <text x="56" y="1340" fill="#f9c5d7" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="2">${escapeXml(asset.eyebrow)}</text>
  ${textBlock({ lines: headlineLines, x: 56, y: 1428, size: 62, weight: 700, lineHeight: 72 })}
  ${textBlock({ lines: sublineLines, x: 60, y: 1712, size: 31, weight: 400, lineHeight: 40 })}
  <rect x="56" y="1800" width="430" height="76" rx="38" fill="#00657d"/>
  <text x="96" y="1849" fill="#fffaf7" font-size="27" font-family="Arial, Helvetica, sans-serif" font-weight="700">${escapeXml(asset.cta)}</text>
</svg>`);
}

function csvEscape(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(exportDir, { recursive: true });

const manifestRows = [
  [
    "ad_name",
    "status",
    "format",
    "aspect_ratio",
    "width",
    "height",
    "source_image",
    "preview_file",
    "headline",
  ],
];

for (const asset of assets) {
  const input = path.join(root, asset.source);
  const filename = `${asset.adName}.png`;
  const output = path.join(outputDir, filename);

  await sharp(input)
    .resize(width, height, { fit: "cover", position: "center" })
    .modulate({ saturation: 0.96, brightness: 0.94 })
    .composite([{ input: overlaySvg(asset), top: 0, left: 0 }])
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(output);

  manifestRows.push([
    asset.adName,
    asset.status,
    asset.adName.includes("carousel") ? "carousel_preview" : "static_preview",
    "9:16",
    width,
    height,
    asset.source,
    `/creative/satori-day-one/${filename}`,
    asset.headline,
  ]);
}

const csv = manifestRows.map((row) => row.map(csvEscape).join(",")).join("\n");
await fs.writeFile(path.join(exportDir, "satori-day-one-preview-manifest.csv"), `${csv}\n`);

console.log(`Generated ${assets.length} previews in ${path.relative(root, outputDir)}`);
