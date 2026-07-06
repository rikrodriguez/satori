import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const readinessCsvPath = path.join(
  root,
  "exports",
  "satori-final-creative-production-readiness.csv",
);
const publicCreativeDir = path.join(
  root,
  "public",
  "creative",
  "satori-day-one",
);
const publicCarouselDir = path.join(
  root,
  "public",
  "creative",
  "satori-carousel",
  "starter-kit",
);
const uploadKitDir = path.join(root, "exports", "meta-upload");
const staticReadyDir = path.join(uploadKitDir, "day-one-static-ready");
const carouselReadyDir = path.join(uploadKitDir, "day-one-carousel-ready");
const waitingDir = path.join(uploadKitDir, "awaiting-production");

function parseCsvLine(line) {
  const cells = [];
  let cell = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && nextChar === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell);
  return cells;
}

function parseCsv(source) {
  const lines = source.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
  });
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function toCsv(rows) {
  const headers = [
    "asset_name",
    "launch_bucket",
    "meta_upload_path",
    "final_asset_type",
    "required_before_upload",
    "next_production_action",
    "fallback_plan",
  ];

  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
}

const rows = parseCsv(await readFile(readinessCsvPath, "utf8"));
const staticReadyRows = rows.filter((row) => row.launch_bucket === "static_ready");
const carouselReadyRows = rows.filter((row) => row.launch_bucket === "carousel_ready");
const uploadReadyBuckets = new Set(["static_ready", "carousel_ready"]);
const waitingRows = rows.filter((row) => !uploadReadyBuckets.has(row.launch_bucket));

await rm(uploadKitDir, { force: true, recursive: true });
await mkdir(staticReadyDir, { recursive: true });
await mkdir(carouselReadyDir, { recursive: true });
await mkdir(waitingDir, { recursive: true });

const uploadRows = [];

for (const row of staticReadyRows) {
  const source = path.join(publicCreativeDir, `${row.asset_name}.png`);
  const destination = path.join(staticReadyDir, `${row.asset_name}.png`);

  await copyFile(source, destination);
  uploadRows.push({
    ...row,
    meta_upload_path: path.relative(root, destination),
  });
}

for (const row of carouselReadyRows) {
  const destination = path.join(carouselReadyDir, row.asset_name);

  await cp(publicCarouselDir, destination, { recursive: true });
  uploadRows.push({
    ...row,
    meta_upload_path: path.relative(root, destination),
  });
}

const waitingManifestRows = waitingRows.map((row) => ({
  ...row,
  meta_upload_path: "not_ready_for_upload",
}));

await writeFile(
  path.join(uploadKitDir, "satori-meta-upload-kit-manifest.csv"),
  `${toCsv([...uploadRows, ...waitingManifestRows])}\n`,
);

await writeFile(
  path.join(waitingDir, "satori-awaiting-production.csv"),
  `${toCsv(waitingManifestRows)}\n`,
);

await writeFile(
  path.join(uploadKitDir, "README.md"),
  `${[
    "# SATORI Meta Upload Kit",
    "",
    "Generated from `exports/satori-final-creative-production-readiness.csv`.",
    "",
    "## Ready to Upload Now",
    "",
    ...uploadRows.map(
      (row) =>
        `- \`${row.meta_upload_path}\` - ${row.asset_name}: ${row.final_asset_type}`,
    ),
    "",
    "## Not Ready for Upload",
    "",
    "Use `awaiting-production/satori-awaiting-production.csv` for video and hold assets.",
    "",
    "## Final Approval Gate",
    "",
    "Review `docs/satori-final-creative-approval-gate.md` before uploading any file to Meta Ads Manager.",
    "",
    "Do not upload storyboard previews as final video assets.",
  ].join("\n")}\n`,
);

console.log(
  JSON.stringify(
    {
      uploadKit: path.relative(root, uploadKitDir),
      staticReady: staticReadyRows.length,
      carouselReady: carouselReadyRows.length,
      awaitingProduction: waitingManifestRows.length,
    },
    null,
    2,
  ),
);
