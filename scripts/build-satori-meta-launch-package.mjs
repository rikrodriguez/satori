import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const metaUploadDir = path.join(root, "exports", "meta-upload");
const packageDir = path.join(root, "exports", "meta-launch-package");
const readyCreativeDir = path.join(packageDir, "creative-ready-to-upload");
const controlsDir = path.join(packageDir, "controls-and-copy");
const docsDir = path.join(packageDir, "docs");
const notReadyDir = path.join(packageDir, "not-ready");

const uploadManifestPath = path.join(
  metaUploadDir,
  "satori-meta-upload-kit-manifest.csv",
);
const adCopyPath = path.join(root, "exports", "satori-meta-prelaunch-ad-copy.csv");

const controlFiles = [
  "exports/satori-meta-draft-ui-entry-fields.csv",
  "exports/satori-meta-prelaunch-ad-copy.csv",
  "exports/satori-meta-ads-manager-draft-checklist.csv",
  "exports/satori-meta-prelaunch-campaign-build.csv",
  "exports/satori-meta-prelaunch-creative-batch.csv",
  "exports/satori-meta-ad-upload-map.csv",
  "exports/satori-final-creative-approval-gate.csv",
  "exports/satori-final-creative-production-readiness.csv",
  "exports/satori-claim-proof-registry.csv",
  "exports/meta-upload/satori-meta-upload-kit-manifest.csv",
];

const docFiles = [
  "docs/satori-meta-ads-manager-draft-setup.md",
  "docs/satori-final-creative-approval-gate.md",
  "docs/satori-prelaunch-readiness-report.md",
  "docs/satori-day-one-creative-execution-pack.md",
  "docs/satori-video-carousel-production-queue.md",
  "docs/satori-video-production-scripts.md",
  "docs/satori-growth-os.md",
  "docs/satori-sam-full-channel-audit.md",
];

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

function packageCreativePath(metaUploadPath) {
  return metaUploadPath.replace(
    "exports/meta-upload",
    "exports/meta-launch-package/creative-ready-to-upload",
  );
}

function basename(filePath) {
  return path.basename(filePath);
}

const uploadRows = parseCsv(await readFile(uploadManifestPath, "utf8"));
const adCopyRows = parseCsv(await readFile(adCopyPath, "utf8"));
const adCopyByName = new Map(adCopyRows.map((row) => [row.ad_name, row]));
const readyRows = uploadRows.filter(
  (row) => row.meta_upload_path !== "not_ready_for_upload",
);
const waitingRows = uploadRows.filter(
  (row) => row.meta_upload_path === "not_ready_for_upload",
);

await rm(packageDir, { force: true, recursive: true });
await mkdir(readyCreativeDir, { recursive: true });
await mkdir(controlsDir, { recursive: true });
await mkdir(docsDir, { recursive: true });
await mkdir(notReadyDir, { recursive: true });

await cp(path.join(metaUploadDir, "day-one-static-ready"), path.join(readyCreativeDir, "day-one-static-ready"), {
  recursive: true,
});
await cp(path.join(metaUploadDir, "day-one-carousel-ready"), path.join(readyCreativeDir, "day-one-carousel-ready"), {
  recursive: true,
});
await cp(path.join(metaUploadDir, "awaiting-production"), path.join(notReadyDir, "awaiting-production"), {
  recursive: true,
});

const manifestRows = [];

for (const row of readyRows) {
  manifestRows.push({
    section: "creative_ready_to_upload",
    item: row.asset_name,
    status: row.launch_bucket,
    source_path: row.meta_upload_path,
    package_path: packageCreativePath(row.meta_upload_path),
    note: row.required_before_upload,
  });
}

for (const row of waitingRows) {
  manifestRows.push({
    section: "not_ready",
    item: row.asset_name,
    status: row.launch_bucket,
    source_path: "exports/meta-upload/awaiting-production/satori-awaiting-production.csv",
    package_path:
      "exports/meta-launch-package/not-ready/awaiting-production/satori-awaiting-production.csv",
    note: row.required_before_upload,
  });
}

for (const file of controlFiles) {
  const source = path.join(root, file);
  const destination = path.join(controlsDir, basename(file));

  await cp(source, destination);
  manifestRows.push({
    section: "controls_and_copy",
    item: basename(file),
    status: "included",
    source_path: file,
    package_path: path.relative(root, destination),
    note: "Use before or during Ads Manager draft setup.",
  });
}

for (const file of docFiles) {
  const source = path.join(root, file);
  const destination = path.join(docsDir, basename(file));

  await cp(source, destination);
  manifestRows.push({
    section: "docs",
    item: basename(file),
    status: "included",
    source_path: file,
    package_path: path.relative(root, destination),
    note: "Read as launch context and guardrails.",
  });
}

const readyUploadRows = readyRows.map((row) => {
  const adCopy = adCopyByName.get(row.asset_name);

  return {
    asset_name: row.asset_name,
    adset_name: adCopy?.adset_name ?? "",
    format: adCopy?.format ?? "",
    creative_package_path: packageCreativePath(row.meta_upload_path),
    primary_text: adCopy?.primary_text ?? "",
    headline: adCopy?.headline ?? "",
    description: adCopy?.description ?? "",
    cta: adCopy?.cta ?? "",
    destination_url: adCopy?.destination_url ?? "",
    upload_rule: row.required_before_upload,
  };
});

await writeFile(
  path.join(packageDir, "satori-ready-to-upload.csv"),
  `${toCsv(
    [
      "asset_name",
      "adset_name",
      "format",
      "creative_package_path",
      "primary_text",
      "headline",
      "description",
      "cta",
      "destination_url",
      "upload_rule",
    ],
    readyUploadRows,
  )}\n`,
);

await writeFile(
  path.join(packageDir, "satori-meta-launch-package-manifest.csv"),
  `${toCsv(
    ["section", "item", "status", "source_path", "package_path", "note"],
    manifestRows,
  )}\n`,
);

await writeFile(
  path.join(packageDir, "satori-operator-checklist.md"),
  `${[
    "# SATORI Meta Launch Operator Checklist",
    "",
    "Use this checklist before touching Meta Ads Manager. This package does not publish, spend, or change the ad account.",
    "",
    "## Ready Creative",
    "",
    ...readyRows.map(
      (row) =>
        `- \`${packageCreativePath(row.meta_upload_path)}\` - ${row.asset_name}`,
    ),
    "",
    "## Do Not Upload Yet",
    "",
    ...waitingRows.map((row) => `- \`${row.asset_name}\` - ${row.required_before_upload}`),
    "",
    "## Draft Setup Order",
    "",
    "1. Open `controls-and-copy/satori-meta-draft-ui-entry-fields.csv`.",
    "2. Create the campaign as draft only: `satori_prelaunch_us35_lead_202607`.",
    "3. Use Leads, website conversion location, campaign budget, and $75/day.",
    "4. Create only the three day-one ad sets: no-needle, 30-night habit, starter kit.",
    "5. Use `satori-ready-to-upload.csv` for the exact creative files, copy, CTA, and UTM URLs.",
    "6. Upload only the files in `creative-ready-to-upload/` after visual QA.",
    "7. Keep every `not-ready` asset out of the live draft until its blocker is resolved.",
    "8. Confirm Events Manager before publishing: PageView, ViewContent, AddToCart, InitiateCheckout, Lead, and zero Purchase.",
    "9. Leave the campaign in draft until final human review passes.",
    "",
    "## Hard Rules",
    "",
    "- Do not select Purchase optimization during the Vercel prelaunch flow.",
    "- Do not upload storyboard PNGs as video replacements.",
    "- Do not publish founder/science or DM prompt assets in the core $75/day test.",
    "- Do not add fake reviews, before/after proof, medical claims, or injectable replacement claims.",
  ].join("\n")}\n`,
);

await writeFile(
  path.join(packageDir, "README.md"),
  `${[
    "# SATORI Meta Launch Package",
    "",
    "Generated from the current SATORI Meta upload kit, approval gate, and draft setup exports.",
    "",
    "This is the single handoff folder to review before entering Meta Ads Manager. It does not publish or modify the ad account.",
    "",
    "## Summary",
    "",
    `- Ready creative groups: ${readyRows.length}`,
    `- Not ready or hold assets: ${waitingRows.length}`,
    "- Budget: $75/day CBO",
    "- Objective: Leads / website conversion intent",
    "- Stage: Vercel prelaunch demand test",
    "",
    "## Main Files",
    "",
    "- `satori-ready-to-upload.csv` - exact ready creative paths, ad copy, CTAs, and UTM URLs.",
    "- `satori-operator-checklist.md` - step-by-step Ads Manager draft workflow.",
    "- `satori-meta-launch-package-manifest.csv` - every included file and source.",
    "- `creative-ready-to-upload/` - only files eligible for upload after visual QA.",
    "- `not-ready/` - video and hold assets that must stay out of Meta for now.",
    "- `controls-and-copy/` - campaign fields, ad copy, claim registry, approval gate, readiness matrix.",
    "- `docs/` - launch context and guardrail docs.",
    "",
    "## Current Upload Rule",
    "",
    "Upload-ready means ready for final visual QA, not automatic publishing. Confirm the approval gate and Events Manager before spending.",
  ].join("\n")}\n`,
);

console.log(
  JSON.stringify(
    {
      launchPackage: path.relative(root, packageDir),
      readyCreativeGroups: readyRows.length,
      notReadyOrHoldAssets: waitingRows.length,
      manifestRows: manifestRows.length,
    },
    null,
    2,
  ),
);
