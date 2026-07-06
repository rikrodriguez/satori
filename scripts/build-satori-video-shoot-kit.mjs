import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const scriptsCsvPath = path.join(root, "exports", "satori-video-production-scripts.csv");
const shootKitDir = path.join(root, "exports", "video-shoot-kit");
const manifestPath = path.join(shootKitDir, "satori-video-shoot-kit-manifest.csv");
const rawIntakePath = path.join(shootKitDir, "satori-raw-footage-intake.csv");

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

function toCsv(headers, rows) {
  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
}

function groupRows(rows) {
  const groups = new Map();

  for (const row of rows) {
    const group = groups.get(row.asset_name) ?? [];
    group.push(row);
    groups.set(row.asset_name, group);
  }

  return groups;
}

function expectedFinalFiles(assetName) {
  return [
    `${assetName}_9x16_master.mp4`,
    `${assetName}_4x5_crop-safe.mp4`,
    `${assetName}_captions.mp4`,
    `${assetName}_cover-frame.jpg`,
  ];
}

function rawFileCandidates(row) {
  return [
    `${row.raw_file_name}.mov`,
    `${row.raw_file_name}.mp4`,
  ];
}

function buildAssetReadme(assetName, rows) {
  const first = rows[0];
  const finalFiles = expectedFinalFiles(assetName);

  return `${[
    `# ${assetName}`,
    "",
    `Format: ${first.format}`,
    `Target length: ${first.duration}`,
    `Raw file prefix: ${first.raw_file_prefix}`,
    "Status: ready to shoot, not ready to upload",
    "",
    "## Teleprompter",
    "",
    first.teleprompter,
    "",
    "## Required Raw Clips",
    "",
    ...rows.flatMap((row) => [
      `### ${row.timecode} - ${row.overlay}`,
      "",
      `Shot: ${row.shot}`,
      `Voiceover/caption: ${row.voiceover}`,
      `Raw filename candidates: ${rawFileCandidates(row).map((file) => `\`${file}\``).join(", ")}`,
      `Editor note: ${row.edit_note}`,
      "",
    ]),
    "## Final Deliverables",
    "",
    ...finalFiles.map((file) => `- \`${file}\``),
    "",
    "## Compliance",
    "",
    "- Product visible in the first 2 seconds.",
    "- No injectable replacement claim.",
    "- No guaranteed wrinkle removal or 30-night result.",
    "- No fake review, rating, clinical seal, or before/after proof.",
    "- No personal-attribute attack such as calling out the viewer's wrinkles.",
  ].join("\n")}\n`;
}

function buildRawChecklist(assetName, rows) {
  return `${[
    `# Raw Footage Checklist - ${assetName}`,
    "",
    "Check each item after the raw clip is received.",
    "",
    "| Received | Timecode | Raw file | Shot | Overlay | QA note |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows.map((row) =>
      `| [ ] | ${row.timecode} | \`${row.raw_file_name}\` | ${row.shot} | ${row.overlay} | ${row.edit_note} |`,
    ),
    "",
    "Do not move this asset into `exports/meta-upload/` until the final MP4s are exported and the readiness matrix is updated.",
  ].join("\n")}\n`;
}

function buildEditorHandoff(assetName, rows) {
  const first = rows[0];

  return `${[
    `# Editor Handoff - ${assetName}`,
    "",
    "## Edit Intent",
    "",
    `Turn the raw clips into a ${first.duration} ${first.format} ad. Keep the product readable, pacing direct, and claims cosmetic.`,
    "",
    "## Assembly",
    "",
    ...rows.map((row, index) =>
      `${index + 1}. ${row.timecode}: ${row.shot} | overlay: "${row.overlay}" | voiceover: "${row.voiceover}"`,
    ),
    "",
    "## Export",
    "",
    ...expectedFinalFiles(assetName).map((file) => `- \`${file}\``),
    "",
    "## Final QA",
    "",
    "- Captions match the teleprompter and do not add new claims.",
    "- Text is readable on mobile-safe crop.",
    "- No before/after structure, no medical claim, no fake authority seal.",
    "- File names match this handoff exactly.",
  ].join("\n")}\n`;
}

const rows = parseCsv(await readFile(scriptsCsvPath, "utf8"));
const groups = groupRows(rows);

await rm(shootKitDir, { force: true, recursive: true });
await mkdir(shootKitDir, { recursive: true });

const manifestRows = [];
const rawIntakeRows = [];

for (const [assetName, assetRows] of groups) {
  const first = assetRows[0];
  const assetDir = path.join(shootKitDir, assetName);
  const rawDir = path.join(assetDir, "raw-footage");
  const finalDir = path.join(assetDir, "final-exports");
  const referenceDir = path.join(assetDir, "reference");

  await mkdir(rawDir, { recursive: true });
  await mkdir(finalDir, { recursive: true });
  await mkdir(referenceDir, { recursive: true });
  await writeFile(path.join(rawDir, ".gitkeep"), "");
  await writeFile(path.join(finalDir, ".gitkeep"), "");
  await writeFile(path.join(referenceDir, ".gitkeep"), "");

  const shotRows = assetRows.map((row) => ({
    timecode: row.timecode,
    shot: row.shot,
    overlay: row.overlay,
    voiceover: row.voiceover,
    raw_file_name: row.raw_file_name,
    raw_file_candidates: rawFileCandidates(row).join(" | "),
    edit_note: row.edit_note,
  }));

  await writeFile(path.join(assetDir, "README.md"), buildAssetReadme(assetName, assetRows));
  await writeFile(path.join(assetDir, "raw-footage-checklist.md"), buildRawChecklist(assetName, assetRows));
  await writeFile(path.join(assetDir, "editor-handoff.md"), buildEditorHandoff(assetName, assetRows));
  await writeFile(
    path.join(assetDir, "shot-list.csv"),
    `${toCsv(
      [
        "timecode",
        "shot",
        "overlay",
        "voiceover",
        "raw_file_name",
        "raw_file_candidates",
        "edit_note",
      ],
      shotRows,
    )}\n`,
  );

  manifestRows.push({
    asset_name: assetName,
    format: first.format,
    duration: first.duration,
    raw_file_prefix: first.raw_file_prefix,
    shot_count: assetRows.length,
    folder: path.relative(root, assetDir),
    readme: path.relative(root, path.join(assetDir, "README.md")),
    editor_handoff: path.relative(root, path.join(assetDir, "editor-handoff.md")),
    raw_checklist: path.relative(root, path.join(assetDir, "raw-footage-checklist.md")),
    expected_final_files: expectedFinalFiles(assetName).join(" | "),
  });

  rawIntakeRows.push(
    ...assetRows.map((row) => ({
      asset_name: assetName,
      timecode: row.timecode,
      raw_file_name: row.raw_file_name,
      accepted_extensions: ".mov | .mp4",
      shot: row.shot,
      received_file: "",
      approved: "",
      notes: row.edit_note,
    })),
  );
}

await writeFile(
  manifestPath,
  `${toCsv(
    [
      "asset_name",
      "format",
      "duration",
      "raw_file_prefix",
      "shot_count",
      "folder",
      "readme",
      "editor_handoff",
      "raw_checklist",
      "expected_final_files",
    ],
    manifestRows,
  )}\n`,
);

await writeFile(
  rawIntakePath,
  `${toCsv(
    [
      "asset_name",
      "timecode",
      "raw_file_name",
      "accepted_extensions",
      "shot",
      "received_file",
      "approved",
      "notes",
    ],
    rawIntakeRows,
  )}\n`,
);

await writeFile(
  path.join(shootKitDir, "README.md"),
  `${[
    "# SATORI Video Shoot Kit",
    "",
    "Generated from `exports/satori-video-production-scripts.csv`.",
    "",
    "This kit is for production handoff only. These folders are not Meta upload files yet.",
    "",
    "## Contents",
    "",
    "- `satori-video-shoot-kit-manifest.csv` lists every video asset and expected deliverables.",
    "- `satori-raw-footage-intake.csv` tracks raw clip receipt and approval.",
    "- Each asset folder contains a README, shot list, raw-footage checklist, editor handoff, raw-footage placeholder, final-exports placeholder, and reference placeholder.",
    "",
    "## Asset Folders",
    "",
    ...manifestRows.map((row) => `- \`${row.folder}\` - ${row.format}, ${row.duration}, ${row.shot_count} raw clips`),
    "",
    "## After Shoot",
    "",
    "1. Put raw clips in the matching `raw-footage/` folder.",
    "2. Fill `satori-raw-footage-intake.csv` with received filenames and approval status.",
    "3. Export final MP4s to the matching `final-exports/` folder using the expected names.",
    "4. Update `exports/satori-final-creative-production-readiness.csv` after QA.",
    "5. Run `npm run meta:upload-kit` only after the videos are marked ready.",
  ].join("\n")}\n`,
);

console.log(
  JSON.stringify(
    {
      shootKit: path.relative(root, shootKitDir),
      assets: manifestRows.length,
      rawClipRows: rawIntakeRows.length,
      manifest: path.relative(root, manifestPath),
      rawIntake: path.relative(root, rawIntakePath),
    },
    null,
    2,
  ),
);
