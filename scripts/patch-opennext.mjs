import { readFileSync, writeFileSync } from "node:fs";

const file = "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/load-manifest.js";
const source = readFileSync(file, "utf8");
const needle = 'p.endsWith("prefetch-hints")) {';
const patched = 'p.endsWith("prefetch-hints") ||\n        p.endsWith("preview-props")) {';

if (source.includes('p.endsWith("preview-props")')) {
  process.exit(0);
}

if (!source.includes(needle)) {
  console.error("OpenNext load-manifest patch point was not found");
  process.exit(1);
}

writeFileSync(file, source.replace(needle, patched));
