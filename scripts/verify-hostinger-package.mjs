import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const staticZip = resolve(root, "exports/hostinger/satori-hostinger-static-upload.zip");

function unzip(args) {
  return execFileSync("unzip", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

if (!existsSync(staticZip)) {
  throw new Error(`Missing static upload ZIP: ${staticZip}`);
}

const listing = unzip(["-l", staticZip]);
const robots = unzip(["-p", staticZip, "robots.txt"]);
const htaccess = unzip(["-p", staticZip, ".htaccess"]);

const requiredEntries = [
  ".htaccess",
  "index.html",
  "products/satori-cream/index.html",
  "checkout/index.html",
  "thank-you/index.html",
  "blog/index.html",
  "pages/skin-concerns/index.html",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
];

const forbiddenPatterns = [
  / ads\//,
  /creative\//,
  /satori-assets\//,
  /\.env/,
  /node_modules\//,
  /\.git\//,
  /\.next\//,
];

const failures = [];

for (const entry of requiredEntries) {
  if (!listing.includes(` ${entry}`)) {
    failures.push(`Missing required ZIP entry: ${entry}`);
  }
}

for (const pattern of forbiddenPatterns) {
  if (pattern.test(listing)) {
    failures.push(`Forbidden ZIP entry matched: ${pattern}`);
  }
}

const webpCount = (listing.match(/\.webp\n/g) ?? []).length;
if (webpCount < 40) {
  failures.push(`Expected at least 40 WebP fallbacks, found ${webpCount}`);
}

if (!robots.includes("Sitemap: https://satoriorganicskincare.com/sitemap.xml")) {
  failures.push("robots.txt does not point to the Satori production sitemap");
}

for (const disallow of ["Disallow: /checkout", "Disallow: /thank-you", "Disallow: /ads"]) {
  if (!robots.includes(disallow)) failures.push(`robots.txt missing ${disallow}`);
}

for (const rule of ["RewriteEngine On", "image/webp", "ExpiresActive On"]) {
  if (!htaccess.includes(rule)) failures.push(`.htaccess missing ${rule}`);
}

if (failures.length) {
  console.error("Hostinger package verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Hostinger package verification passed: ${webpCount} WebP fallbacks included.`);
