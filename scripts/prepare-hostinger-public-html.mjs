import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const root = process.cwd();
const outputDir = resolve(root, "exports/hostinger");
const staticZip = resolve(outputDir, "satori-hostinger-static-upload.zip");
const uploadDir = resolve(outputDir, "public_html_upload");
const uploadReadme = resolve(outputDir, "PUBLIC_HTML_UPLOAD_README.md");

const requiredEntries = [
  ".htaccess",
  "index.html",
  "products/satori-cream/index.html",
  "checkout/index.html",
  "thank-you/index.html",
  "blog/index.html",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
];

const forbiddenTopLevel = new Set([
  "ads",
  "creative",
  "satori-assets",
  ".git",
  ".next",
  "node_modules",
]);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry);
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      walk(absolute, files);
    } else {
      files.push(absolute);
    }
  }
  return files;
}

if (!existsSync(staticZip)) {
  throw new Error(`Missing static upload ZIP: ${staticZip}`);
}

rmSync(uploadDir, { force: true, recursive: true });
mkdirSync(uploadDir, { recursive: true });
execFileSync("unzip", ["-q", staticZip, "-d", uploadDir], { stdio: "inherit" });

const failures = [];

for (const entry of requiredEntries) {
  if (!existsSync(resolve(uploadDir, entry))) {
    failures.push(`Missing extracted entry: ${entry}`);
  }
}

for (const entry of readdirSync(uploadDir)) {
  if (forbiddenTopLevel.has(entry) || entry.startsWith(".env")) {
    failures.push(`Forbidden extracted top-level entry: ${entry}`);
  }
}

const files = walk(uploadDir);
const webpCount = files.filter((file) => file.endsWith(".webp")).length;

if (webpCount < 40) {
  failures.push(`Expected at least 40 WebP fallbacks, found ${webpCount}`);
}

if (failures.length) {
  console.error("Hostinger public_html folder preparation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const relativeSample = files
  .slice(0, 8)
  .map((file) => relative(uploadDir, file).split(sep).join("/"));

writeFileSync(
  uploadReadme,
  `# Hostinger Public HTML Upload

Upload the **contents** of this folder to Hostinger \`public_html\`:

\`\`\`text
${uploadDir}
\`\`\`

Do not upload the parent folder itself. The root of \`public_html\` should
contain \`index.html\`, \`.htaccess\`, \`_next/\`, \`images/\`, \`robots.txt\`,
and \`sitemap.xml\`.

Prepared folder summary:

- Files: ${files.length}
- WebP fallbacks: ${webpCount}
- Source ZIP: ${staticZip}

Sample files:

${relativeSample.map((file) => `- \`${file}\``).join("\n")}
`,
);

console.log(`Hostinger public_html folder ready: ${uploadDir}`);
console.log(`Upload readme: ${uploadReadme}`);
