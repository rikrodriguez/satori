import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "out";
const exts = [".html", ".css", ".txt", ".js"];

function walk(dir) {
  let files = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) files = files.concat(walk(full));
    else if (exts.some((e) => full.endsWith(e))) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let text = readFileSync(file, "utf8");
  const before = text;
  text = text.replace(/(["'(\s])\/images\//g, "$1/satori/images/");
  text = text.replace(/(["'(\s])\/satori-assets\//g, "$1/satori/satori-assets/");
  text = text.replace(/(["'(\s=])\/_next\//g, "$1/satori/_next/");
  text = text.replace(/\/satori\/satori\//g, "/satori/");
  if (text !== before) {
    writeFileSync(file, text);
    changed++;
  }
}
console.log(`Fixed ${changed} files in out/`);
