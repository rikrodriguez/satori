import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, posix, relative, resolve, sep } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "out");
const ignoredTopLevelDirs = new Set(["_next", "ads", "creative", "satori-assets"]);
const internalPhrases = [
  "Reserved slot",
  "final approved asset",
  "No unverified logos displayed",
  "unverified logos displayed",
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry);
    const relativePath = relative(outDir, absolute).split(sep).join("/");
    const [topLevel] = relativePath.split("/");
    if (ignoredTopLevelDirs.has(topLevel)) continue;

    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      walk(absolute, files);
    } else {
      files.push(absolute);
    }
  }
  return files;
}

function isSkippableUrl(value) {
  return (
    !value ||
    value.startsWith("#") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("sms:") ||
    value.startsWith("data:") ||
    value.startsWith("blob:") ||
    value.startsWith("javascript:") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//")
  );
}

function candidateFiles(urlPath) {
  const cleanPath = decodeURI(urlPath.split("?")[0].split("#")[0]);
  const safePath = posix.normalize(cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath);
  const absolute = resolve(outDir, safePath);
  const ext = extname(safePath);

  if (ext) {
    return [absolute];
  }

  return [
    absolute,
    resolve(outDir, safePath, "index.html"),
    resolve(outDir, `${safePath}.html`),
  ];
}

function resolveUrlPath(value, htmlFile) {
  const [withoutHash] = value.split("#");
  const [urlPath] = withoutHash.split("?");
  if (value.startsWith("/")) return urlPath || "/";

  const htmlRelativeDir = posix.dirname(relative(outDir, htmlFile).split(sep).join("/"));
  return posix.normalize(posix.join("/", htmlRelativeDir, urlPath));
}

function targetExists(value, htmlFile) {
  const urlPath = resolveUrlPath(value, htmlFile);
  return candidateFiles(urlPath).some((candidate) => existsSync(candidate));
}

function extractUrls(html) {
  const urls = [];
  const attrPattern = /\b(?:href|src)=["']([^"']+)["']/g;
  const srcsetPattern = /\bsrcset=["']([^"']+)["']/g;
  let match;

  while ((match = attrPattern.exec(html))) {
    urls.push(match[1].replaceAll("&amp;", "&"));
  }

  while ((match = srcsetPattern.exec(html))) {
    for (const candidate of match[1].split(",")) {
      const [url] = candidate.trim().split(/\s+/);
      urls.push(url.replaceAll("&amp;", "&"));
    }
  }

  return urls;
}

if (!existsSync(resolve(outDir, "index.html"))) {
  throw new Error("Missing out/index.html. Run npm run build:hostinger first.");
}

const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));
const missing = [];
const phraseHits = [];

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, "utf8");
  const htmlRelative = relative(outDir, htmlFile).split(sep).join("/");

  for (const phrase of internalPhrases) {
    if (html.includes(phrase)) {
      phraseHits.push(`${htmlRelative}: ${phrase}`);
    }
  }

  for (const rawUrl of extractUrls(html)) {
    if (isSkippableUrl(rawUrl)) continue;
    if (!targetExists(rawUrl, htmlFile)) {
      missing.push(`${htmlRelative} -> ${rawUrl}`);
    }
  }
}

if (missing.length || phraseHits.length) {
  console.error("Hostinger static audit failed.");
  if (missing.length) {
    console.error("\nMissing internal targets:");
    for (const item of missing) console.error(`- ${item}`);
  }
  if (phraseHits.length) {
    console.error("\nInternal/incomplete copy found:");
    for (const item of phraseHits) console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log(`Hostinger static audit passed: ${htmlFiles.length} HTML files checked.`);
