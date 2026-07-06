import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const dataPath = path.join(root, "src", "data", "satori-competitor-inspired-creatives.json");
const outputDir = path.join(root, "public", "creative", "satori-competitor-inspired");
const exportDir = path.join(root, "exports", "creative");
const mapExportPath = path.join(root, "exports", "satori-competitor-inspired-creative-map.csv");
const width = 1080;
const height = 1920;

const assets = JSON.parse(await fs.readFile(dataPath, "utf8"));

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapText(text, maxChars) {
  const words = String(text).split(" ");
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

function statusTheme(status) {
  if (status.startsWith("hold")) {
    return {
      label: "HOLD / REVIEW",
      fill: "#fff2f7",
      text: "#88495d",
      accent: "#f9c5d7",
    };
  }

  return {
    label: "SCRIPT REVIEW",
    fill: "#f2fcf9",
    text: "#004155",
    accent: "#9fd8cf",
  };
}

function overlaySvg(asset) {
  const headlineLines = wrapText(asset.headline, 24).slice(0, 4);
  const sublineLines = wrapText(asset.subline, 34).slice(0, 2);
  const theme = statusTheme(asset.status);

  return Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#041821" stop-opacity="0.08"/>
      <stop offset="44%" stop-color="#041821" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#041821" stop-opacity="0.86"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#shade)"/>
  <rect x="52" y="52" width="222" height="56" rx="28" fill="#fffaf7" opacity="0.94"/>
  <text x="82" y="88" fill="#004155" font-size="23" font-family="Arial, Helvetica, sans-serif" font-weight="700">SATORI</text>
  <rect x="52" y="128" width="278" height="44" rx="22" fill="${theme.fill}" opacity="0.96"/>
  <text x="76" y="157" fill="${theme.text}" font-size="17" font-family="Arial, Helvetica, sans-serif" font-weight="700">${theme.label}</text>
  <rect x="52" y="190" width="430" height="44" rx="22" fill="#fffaf7" opacity="0.9"/>
  <text x="76" y="219" fill="#323435" font-size="15" font-family="Arial, Helvetica, sans-serif" font-weight="700">INSPIRED BY ${escapeXml(asset.sourceBrand.toUpperCase())} PATTERN</text>
  <text x="56" y="1300" fill="${theme.accent}" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="2">${escapeXml(asset.eyebrow)}</text>
  ${textBlock({ lines: headlineLines, x: 56, y: 1390, size: 60, weight: 700, lineHeight: 70 })}
  ${textBlock({ lines: sublineLines, x: 60, y: 1710, size: 31, weight: 400, lineHeight: 40 })}
  <rect x="56" y="1800" width="430" height="76" rx="38" fill="#00657d"/>
  <text x="96" y="1849" fill="#fffaf7" font-size="27" font-family="Arial, Helvetica, sans-serif" font-weight="700">${escapeXml(asset.cta)}</text>
</svg>`);
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function toCsv(headers, rows) {
  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(exportDir, { recursive: true });

const manifestRows = [];
const mapRows = [];

for (const asset of assets) {
  const input = path.join(root, asset.sourceImage);
  const filename = `${asset.assetName}.png`;
  const output = path.join(outputDir, filename);

  await sharp(input)
    .resize(width, height, { fit: "cover", position: "center" })
    .modulate({ saturation: 0.94, brightness: 0.93 })
    .composite([{ input: overlaySvg(asset), top: 0, left: 0 }])
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(output);

  manifestRows.push({
    asset_name: asset.assetName,
    status: asset.status,
    format: asset.format,
    aspect_ratio: "9:16",
    width,
    height,
    source_brand: asset.sourceBrand,
    source_pattern: asset.sourcePattern,
    source_image: asset.sourceImage,
    preview_file: `/creative/satori-competitor-inspired/${filename}`,
    headline: asset.headline,
  });

  mapRows.push({
    asset_name: asset.assetName,
    status: asset.status,
    source_brand: asset.sourceBrand,
    source_pattern: asset.sourcePattern,
    format: asset.format,
    primary_text: asset.primaryText,
    headline: asset.headline,
    cta: asset.cta,
    destination_url: asset.destinationUrl,
    compliance_note: asset.complianceNote,
    production_action: asset.productionAction,
    preview_file: `/creative/satori-competitor-inspired/${filename}`,
    source_url: asset.sourceUrl,
  });
}

await fs.writeFile(
  path.join(exportDir, "satori-competitor-inspired-preview-manifest.csv"),
  `${toCsv(
    [
      "asset_name",
      "status",
      "format",
      "aspect_ratio",
      "width",
      "height",
      "source_brand",
      "source_pattern",
      "source_image",
      "preview_file",
      "headline",
    ],
    manifestRows,
  )}\n`,
);

await fs.writeFile(
  mapExportPath,
  `${toCsv(
    [
      "asset_name",
      "status",
      "source_brand",
      "source_pattern",
      "format",
      "primary_text",
      "headline",
      "cta",
      "destination_url",
      "compliance_note",
      "production_action",
      "preview_file",
      "source_url",
    ],
    mapRows,
  )}\n`,
);

console.log(`Generated ${assets.length} competitor-inspired previews in ${path.relative(root, outputDir)}`);
