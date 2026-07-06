import {
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const outputDir = resolve(root, "exports/hostinger");
const staticZip = resolve(outputDir, "satori-hostinger-static-upload.zip");
const sourceZip = resolve(outputDir, "satori-hostinger-source.zip");
const completeCodeZip = resolve(outputDir, "satori-hostinger-complete-code.zip");
const deliveryManifest = resolve(outputDir, "HOSTINGER_DELIVERY_MANIFEST.md");
const outDir = resolve(root, "out");

function run(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...options,
  });
}

if (!existsSync(resolve(outDir, "index.html"))) {
  throw new Error("Missing out/index.html. Run npm run build:hostinger first.");
}

run("node", ["scripts/build-hostinger-webp-assets.mjs"]);

mkdirSync(outputDir, { recursive: true });
rmSync(staticZip, { force: true });
rmSync(sourceZip, { force: true });
rmSync(completeCodeZip, { force: true });
rmSync(deliveryManifest, { force: true });

// Keep internal marketing boards in source, but out of the consumer-facing upload.
run("zip", ["-qr", staticZip, ".", "-x", "ads/*", "creative/*", "satori-assets/*"], {
  cwd: outDir,
});
run("zip", ["-qj", staticZip, "public/.htaccess"]);

run("zip", [
  "-qr",
  sourceZip,
  ".env.example",
  ".gitignore",
  ".vercelignore",
  "README_HOSTINGER.md",
  "docs/hostinger-migration-guide.md",
  "docs/section-map.md",
  "eslint.config.mjs",
  "next-env.d.ts",
  "next.config.ts",
  "package-lock.json",
  "package.json",
  "postcss.config.mjs",
  "public",
  "scripts",
  "src",
  "tests",
  "tsconfig.json",
  "vercel.json",
]);
copyFileSync(sourceZip, completeCodeZip);

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

writeFileSync(
  deliveryManifest,
  `# Satori Hostinger Delivery Manifest

Generated package files:

- Static public upload: \`${staticZip}\` (${formatMb(statSync(staticZip).size)})
- Full editable source: \`${sourceZip}\` (${formatMb(statSync(sourceZip).size)})
- Complete code ZIP alias: \`${completeCodeZip}\` (${formatMb(statSync(completeCodeZip).size)})

Upload this file to Hostinger \`public_html\`:

\`\`\`text
exports/hostinger/satori-hostinger-static-upload.zip
\`\`\`

The public ZIP intentionally excludes:

- \`/ads/*\`
- \`/creative/*\`
- \`/satori-assets/*\`
- \`.env*\`
- \`.git/\`
- \`.next/\`
- \`node_modules/\`

Important included production files:

- \`index.html\`
- \`products/satori-cream/index.html\`
- \`checkout/index.html\`
- \`thank-you/index.html\`
- \`blog/index.html\`
- \`robots.txt\`
- \`sitemap.xml\`
- \`.htaccess\`
- canonical image files plus WebP fallbacks

Run final checks with:

\`\`\`bash
npm run verify:hostinger-package
\`\`\`

Or regenerate the ready-to-upload folder with:

\`\`\`bash
npm run prepare:hostinger-upload
\`\`\`
`,
);

console.log("");
console.log("Hostinger packages ready:");
console.log(`- Static upload ZIP: ${staticZip}`);
console.log(`- Source ZIP: ${sourceZip}`);
console.log(`- Complete code ZIP: ${completeCodeZip}`);
console.log(`- Delivery manifest: ${deliveryManifest}`);
