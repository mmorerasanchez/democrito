import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Stamps the "Last updated" line of DESIGN.md with the committer date of the
// last commit that touched the file. The value comes from git history, never
// from the clock, so repeated builds of the same commit produce the same file.
// If git cannot answer reliably, the line is left as it is.

const FILE = "DESIGN.md";
const STAMP = /^(>\s*Last updated:\s*)\d{4}-\d{2}-\d{2}/m;

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function skip(reason) {
  console.warn(`⚠ ${FILE} last-updated left unchanged: ${reason}`);
  process.exit(0);
}

let shallow;
try {
  shallow = git(["rev-parse", "--is-shallow-repository"]);
} catch {
  skip("git is not available or this is not a git repository");
}
if (shallow === "true") {
  skip("shallow clone, file history is incomplete");
}

let date;
try {
  date = git(["log", "-1", "--format=%cs", "--", FILE]);
} catch {
  skip("could not read git history");
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  skip("no commit history for this file");
}

const path = resolve(FILE);
const content = readFileSync(path, "utf8");
if (!STAMP.test(content)) {
  skip('no "Last updated" line found');
}

const updated = content.replace(STAMP, `$1${date}`);
if (updated === content) {
  console.log(`= ${FILE} last-updated already ${date} (from git)`);
} else {
  writeFileSync(path, updated);
  console.log(`✓ ${FILE} last-updated stamped → ${date} (from git)`);
}
