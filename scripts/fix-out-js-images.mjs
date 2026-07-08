import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "out/_next/static/chunks";

function walk(dir) {
  let files = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) files = files.concat(walk(full));
    else if (full.endsWith(".js")) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let text = readFileSync(file, "utf8");
  const before = text;
  // Reescribe "/images/..." -> "/satori/images/..." (solo si no tiene ya el prefijo)
  text = text.replace(/(["'`])\/images\//g, "$1/satori/images/");
  // Corrige dobles por si acaso
  text = text.replace(/\/satori\/satori\/images\//g, "/satori/images/");
  if (text !== before) {
    writeFileSync(file, text);
    changed++;
  }
}
console.log(`JS image fix: ${changed} chunks actualizados`);
