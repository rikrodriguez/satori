import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const imageDir = join(root, "public", "images", "satori");
const sourceDir = join(root, "src");

const expectedFiles = [
  "01_home_hero_desktop_2880x1400.jpg",
  "02_home_hero_mobile_1200x1600.jpg",
  "03_home_before_after_01_1600x1600.jpg",
  "04_home_before_after_02_1600x1600.jpg",
  "05_home_before_after_03_1600x1600.jpg",
  "06_home_before_after_04_1600x1600.jpg",
  "07_home_product_card_main_01_2048x2048.jpg",
  "08_home_product_card_secondary_01_2048x2048.jpg",
  "09_home_product_card_main_02_2048x2048.jpg",
  "10_home_product_card_secondary_02_2048x2048.jpg",
  "11_home_product_card_main_03_2048x2048.jpg",
  "12_home_product_card_secondary_03_2048x2048.jpg",
  "13_home_product_card_main_04_2048x2048.jpg",
  "14_home_product_card_secondary_04_2048x2048.jpg",
  "15_home_product_card_main_05_2048x2048.jpg",
  "16_home_product_card_secondary_05_2048x2048.jpg",
  "17_home_gentle_skincare_1800x1200.jpg",
  "18_home_brand_story_group_1800x1200.jpg",
  "19_home_blog_thumb_01_1600x1200.jpg",
  "20_home_blog_thumb_02_1600x1200.jpg",
  "21_home_blog_thumb_03_1600x1200.jpg",
  "22_home_blog_thumb_04_1600x1200.jpg",
  "23_pdp_main_product_front_2048x2048.jpg",
  "24_pdp_product_angle_2048x2048.jpg",
  "25_pdp_product_texture_2048x2048.jpg",
  "26_pdp_product_in_hand_2048x2048.jpg",
  "27_pdp_product_lifestyle_1800x1200.jpg",
  "28_pdp_ingredients_flatlay_1800x1200.jpg",
  "29_pdp_application_01_2048x2048.jpg",
  "30_pdp_application_02_2048x2048.jpg",
  "31_pdp_application_03_2048x2048.jpg",
  "32_pdp_before_after_05_1600x1600.jpg",
  "33_pdp_before_after_06_1600x1600.jpg",
  "34_pdp_before_after_07_1600x1600.jpg",
  "35_pdp_before_after_08_1600x1600.jpg",
  "36_pdp_review_avatar_01_900x1200.jpg",
  "37_pdp_review_avatar_02_900x1200.jpg",
  "38_pdp_review_avatar_03_900x1200.jpg",
  "39_pdp_review_avatar_04_900x1200.jpg",
  "40_pdp_ugc_photo_01_1200x1600.jpg",
  "41_pdp_ugc_photo_02_1200x1600.jpg",
  "42_pdp_ugc_photo_03_1200x1600.jpg",
  "43_pdp_ugc_photo_04_1200x1600.jpg",
  "44_pdp_final_cta_model_1800x1200.jpg",
  "45_pdp_final_cta_product_only_1800x1200.jpg",
  "46_cart_product_thumbnail_512x512.jpg",
  "47_cart_supporting_image_1200x1200.jpg",
  "48_checkout_product_thumbnail_512x512.jpg",
  "49_checkout_header_brand_1200x400.jpg",
];

const forbiddenSourcePattern =
  /\b(?:skincare|glowing|minimalist|natural|satori)_[a-z0-9_]+\.png\b/g;

const failures = [];
const warnings = [];

function addFailure(message) {
  failures.push(message);
}

function walkFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    return statSync(fullPath).isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
}

function getDimensions(path) {
  const output = execFileSync(
    "sips",
    ["-g", "pixelWidth", "-g", "pixelHeight", path],
    { encoding: "utf8" },
  );
  const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1]);
  return { width, height };
}

if (!existsSync(imageDir)) {
  addFailure(`Missing image directory: ${imageDir}`);
} else {
  const files = readdirSync(imageDir).filter((file) => !file.startsWith(".")).sort();
  const expected = [...expectedFiles].sort();

  if (files.length !== 49) {
    addFailure(`Expected 49 display images, found ${files.length}.`);
  }

  const unexpected = files.filter((file) => !expected.includes(file));
  const missing = expected.filter((file) => !files.includes(file));

  if (unexpected.length) {
    addFailure(`Unexpected files in public image folder: ${unexpected.join(", ")}`);
  }

  if (missing.length) {
    addFailure(`Missing canonical files: ${missing.join(", ")}`);
  }

  const forbiddenPublicFiles = files.filter((file) =>
    /manifest|contact|review[_-]?sheet|sheet/i.test(file),
  );
  if (forbiddenPublicFiles.length) {
    addFailure(`Forbidden helper files found: ${forbiddenPublicFiles.join(", ")}`);
  }

  for (const file of files.filter((item) => expected.includes(item))) {
    const match = file.match(/_(\d+)x(\d+)\.jpg$/);
    if (!match) {
      addFailure(`Filename does not include dimensions: ${file}`);
      continue;
    }

    const expectedWidth = Number(match[1]);
    const expectedHeight = Number(match[2]);
    const actual = getDimensions(join(imageDir, file));
    const isBatchOne = Number(file.slice(0, 2)) <= 10;

    if (actual.width !== expectedWidth || actual.height !== expectedHeight) {
      const message = `${file}: actual ${actual.width}x${actual.height}, filename ${expectedWidth}x${expectedHeight}`;
      if (isBatchOne) {
        warnings.push(`${message} (Batch 1 source dimensions preserved; not upscaled).`);
      } else {
        addFailure(message);
      }
    }
  }
}

const sourceFiles = walkFiles(sourceDir).filter((file) => /\.(ts|tsx|js|jsx)$/.test(file));
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  const matches = text.match(forbiddenSourcePattern);
  if (matches?.length) {
    addFailure(
      `Forbidden descriptive Batch 1 source filename pattern referenced in ${file}: ${[
        ...new Set(matches),
      ].join(", ")}`,
    );
  }
}

console.log("Satori image validation");
console.log(`- Directory: ${imageDir}`);
console.log(`- Expected canonical images: ${expectedFiles.length}`);

if (warnings.length) {
  console.log("\nWarnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (failures.length) {
  console.error("\nFailures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nValidation passed.");
