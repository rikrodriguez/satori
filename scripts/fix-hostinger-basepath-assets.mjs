import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "exports/hostinger/public_html_upload";
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
  // Solo reescribe rutas que NO tengan ya /satori delante
  text = text.replace(/(["'(\s])\/images\//g, "$1/satori/images/");
  text = text.replace(/(["'(\s])\/satori-assets\//g, "$1/satori/satori-assets/");
  // Corrige dobles por si acaso
  text = text.replace(/\/satori\/satori\/images\//g, "/satori/images/");
  text = text.replace(/\/satori\/satori\/satori-assets\//g, "/satori/satori-assets/");
  if (text !== before) {
    writeFileSync(file, text);
    changed++;
  }
}
console.log(`basePath asset fix: ${changed} archivos actualizados`);
