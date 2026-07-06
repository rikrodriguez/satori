import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const imagesDir = resolve(root, "out/images");
function commandExists(command) {
  const result = spawnSync("which", [command], { stdio: "ignore" });
  return result.status === 0;
}

if (!existsSync(imagesDir)) {
  console.log("No out/images directory found; skipping WebP generation.");
  process.exit(0);
}

if (!commandExists("python3")) {
  console.log("python3 not found; skipping WebP generation.");
  process.exit(0);
}

const pillowCheck = spawnSync(
  "python3",
  ["-c", "from PIL import Image, features; raise SystemExit(0 if features.check('webp') else 1)"],
  { stdio: "ignore" },
);

if (pillowCheck.status !== 0) {
  console.log("Python Pillow WebP support not found; skipping WebP generation.");
  process.exit(0);
}

execFileSync("python3", ["scripts/build-hostinger-webp-assets.py", imagesDir], {
  cwd: root,
  stdio: "inherit",
});
