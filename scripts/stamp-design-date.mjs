import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const today = new Date().toISOString().split("T")[0];
const path = resolve("DESIGN.md");
const content = readFileSync(path, "utf8");
const updated = content.replace(
  /^(>\s*Last updated:\s*)\d{4}-\d{2}-\d{2}/m,
  `$1${today}`,
);
writeFileSync(path, updated);
console.log(`✓ DESIGN.md last-updated stamped → ${today}`);
