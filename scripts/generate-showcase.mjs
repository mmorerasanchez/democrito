import { readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve(".");
const validateOnly = process.argv.includes("--validate-only");

// ── Load data ──────────────────────────────────────────────────────────────

const dataPath = join(root, "showcase", "showcase.json");

let data;
try {
  data = JSON.parse(readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error(`✗ generate-showcase — cannot read showcase.json: ${err.message}`);
  process.exit(1);
}

// ── Validate ───────────────────────────────────────────────────────────────

const VALID_VERDICTS        = ["pure-retheme", "retheme-additions", "partial-fork", "rewrite"];
const VALID_VALUE_FORMATS   = ["bare-triplet", "hsl-function"];
const VALID_STATUSES        = ["live", "prototype", "private", "alpha"];
const VALID_VERIFY_LEVELS   = ["self-declared", "source-audited"];
const SLUG_PATTERN          = /^[a-z0-9-]+$/;

function validateSystem(sys, context, requireVignette) {
  const errors = [];
  const id = `${context} '${sys.slug ?? "(no slug)"}'`;

  if (!sys.slug || !SLUG_PATTERN.test(sys.slug)) {
    errors.push(`${id}: slug must match ^[a-z0-9-]+$`);
  }
  if (!VALID_STATUSES.includes(sys.status)) {
    errors.push(`${id}: status '${sys.status}' must be one of ${VALID_STATUSES.join(", ")}`);
  }
  if (!sys.divergence || !VALID_VERDICTS.includes(sys.divergence.verdict)) {
    errors.push(`${id}: divergence.verdict '${sys.divergence?.verdict}' must be one of ${VALID_VERDICTS.join(", ")}`);
  }
  if (requireVignette) {
    if (!sys.vignette) {
      errors.push(`${id}: vignette is required for shipped systems`);
    } else {
      if (!VALID_VALUE_FORMATS.includes(sys.vignette.valueFormat)) {
        errors.push(`${id}: vignette.valueFormat '${sys.vignette.valueFormat}' must be one of ${VALID_VALUE_FORMATS.join(", ")}`);
      }
      const VALID_MODES = ["substituted", "approximated", "excluded"];
      for (const absent of (sys.vignette.absent ?? [])) {
        if (typeof absent.token !== "string" || !absent.token) {
          errors.push(`${id}: vignette.absent entry missing required 'token' string`);
        }
        if (!("substitutedWith" in absent)) {
          errors.push(`${id}: vignette.absent entry for '${absent.token}' missing required 'substitutedWith' (use null if none)`);
        }
        if (typeof absent.consequence !== "string" || !absent.consequence.trim()) {
          errors.push(`${id}: vignette.absent entry for '${absent.token}' requires a non-empty 'consequence' string`);
        }
        if (!VALID_MODES.includes(absent.mode)) {
          errors.push(`${id}: vignette.absent entry for '${absent.token}' has invalid mode '${absent.mode}'; must be one of ${VALID_MODES.join(", ")}`);
        }
        if (!("renderValue" in absent)) {
          errors.push(`${id}: vignette.absent entry for '${absent.token}' missing required 'renderValue' (use null only when mode is 'excluded')`);
        } else if (absent.mode !== "excluded" && !absent.renderValue) {
          errors.push(`${id}: vignette.absent entry for '${absent.token}' has mode '${absent.mode}' but renderValue is null or empty`);
        }
      }
    }
  }
  if (sys.tokens) {
    for (const [name, entry] of Object.entries(sys.tokens)) {
      if (typeof entry !== "object" || entry === null || !("base" in entry)) {
        errors.push(`${id}: tokens.${name} requires a 'base' field`);
      }
    }
  } else {
    errors.push(`${id}: tokens is required`);
  }
  for (const field of ["name", "tagline", "recipe", "contractNotes"]) {
    if (!(field in sys)) errors.push(`${id}: required field '${field}' is missing`);
  }
  if (sys.contractNotes) {
    if (!Array.isArray(sys.contractNotes.held))  errors.push(`${id}: contractNotes.held must be an array`);
    if (!Array.isArray(sys.contractNotes.broke))  errors.push(`${id}: contractNotes.broke must be an array`);
  }
  return errors;
}

function validate(d) {
  const errors = [];

  if (!Array.isArray(d.systems) || d.systems.length === 0) {
    errors.push("systems must be a non-empty array");
    return errors;
  }

  for (const sys of d.systems) {
    errors.push(...validateSystem(sys, "system", true));
  }

  if (d.prototypes) {
    if (!VALID_VERIFY_LEVELS.includes(d.prototypes.verificationLevel)) {
      errors.push(`prototypes.verificationLevel '${d.prototypes.verificationLevel}' must be one of ${VALID_VERIFY_LEVELS.join(", ")}`);
    }
    if (!Array.isArray(d.prototypes.systems)) {
      errors.push("prototypes.systems must be an array");
    } else {
      for (const sys of d.prototypes.systems) {
        errors.push(...validateSystem(sys, "prototype", false));
      }
    }
  }

  if (!Array.isArray(d.whatWeLearned)) {
    errors.push("whatWeLearned must be an array");
  }
  if (!d.submit || !d.submit.email || !d.submit.subject || !d.submit.bodyTemplate) {
    errors.push("submit requires email, subject, and bodyTemplate");
  }

  return errors;
}

const errors = validate(data);
if (errors.length > 0) {
  console.error("✗ generate-showcase — showcase.json validation failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

if (validateOnly) {
  console.log("✓ generate-showcase — showcase.json is valid (--validate-only)");
  process.exit(0);
}

// ── Helpers ────────────────────────────────────────────────────────────────

function enc(s) {
  return encodeURIComponent(s).replace(/%20/g, "%20");
}

function bulletList(items) {
  return items.map((i) => `- ${i}`).join("\n");
}

function tokenTable(tokens, absentLabel = "not used") {
  const rows = Object.entries(tokens).map(([name, entry]) => {
    const base   = entry.base   ?? "";
    const system = entry.system;
    const note   = entry.note   ?? "";
    return `| \`${name}\` | \`${base}\` | ${system === null ? absentLabel : `\`${system ?? ""}\``} | ${note} |`;
  });
  return [
    "| Token | Base | System | Note |",
    "|---|---|---|---|",
    ...rows,
  ].join("\n");
}

function renderSystem(sys, lines, lbl = {}) {
  lines.push(`**${sys.tagline}**`);
  lines.push("");
  if (sys.url) {
    lines.push(`URL: <${sys.url}>`);
  }
  const coveragePart = sys.divergence.primitivesAudited
    ? ` · ${lbl.coverage ?? "Coverage"}: ${sys.divergence.primitivesAudited}${sys.divergence.coverageNote ? ` (${sys.divergence.coverageNote})` : ""}`
    : "";
  lines.push(`Status: ${sys.status} · ${sys.year} · Built by ${sys.builtBy}`);
  lines.push(`${lbl.approach ?? "Verdict"}: ${sys.divergence.verdict}${coveragePart}`);
  lines.push("");
  if (sys.headline) {
    lines.push(`> ${sys.headline}`);
    lines.push("");
  }
  lines.push(`### ${lbl.tokenDiff ?? "Token Diff"}`);
  lines.push("");
  lines.push(tokenTable(sys.tokens, lbl.absentValue));
  lines.push("");
  if (sys.kept && sys.kept.length > 0) {
    lines.push(`### ${lbl.inherited ?? "Kept"}`);
    lines.push("");
    lines.push(bulletList(sys.kept));
    lines.push("");
  }
  if (sys.overridden && sys.overridden.length > 0) {
    lines.push(`### ${lbl.madeItsOwn ?? "Overridden"}`);
    lines.push("");
    lines.push(bulletList(sys.overridden));
    lines.push("");
  }
  lines.push(`### ${lbl.recipe ?? "Recipe"}`);
  lines.push("");
  lines.push(sys.recipe);
  lines.push("");
  lines.push("### Contract Notes");
  lines.push("");
  lines.push(`**${lbl.carriedOver ?? "Held"}:**`);
  lines.push("");
  lines.push(bulletList(sys.contractNotes.held));
  lines.push("");
  lines.push(`**${lbl.neededOnTop ?? "Broke"}:**`);
  lines.push("");
  lines.push(bulletList(sys.contractNotes.broke));
  lines.push("");
}

// ── Generate docs/showcase.md ──────────────────────────────────────────────

function genShowcaseMd(d) {
  const lines = [];
  const lbl = d.labels ?? {};

  lines.push("<!-- GENERATED by scripts/generate-showcase.mjs — edit showcase/showcase.json instead -->");
  lines.push("");
  lines.push(`# ${d.intro.heading}`);
  lines.push("");
  lines.push(d.intro.body);
  lines.push("");
  lines.push(`> ${d.intro.note}`);
  lines.push("");
  lines.push(`## ${lbl.spectrumTitle ?? "Divergence Spectrum"}`);
  lines.push("");

  // Build verdict → system names map for the merged table
  const systemsByVerdict = {};
  for (const sys of d.systems) {
    const v = sys.divergence.verdict;
    if (!systemsByVerdict[v]) systemsByVerdict[v] = [];
    systemsByVerdict[v].push(sys.name);
  }
  if (d.prototypes) {
    for (const sys of d.prototypes.systems) {
      const v = sys.divergence.verdict;
      if (!systemsByVerdict[v]) systemsByVerdict[v] = [];
      systemsByVerdict[v].push(`${sys.name} (prototype)`);
    }
  }
  lines.push(`| ${lbl.approach ?? "Verdict"} | Label | Systems | Definition |`);
  lines.push("|---|---|---|---|");
  for (const slug of d.spectrum.axis) {
    const label   = d.spectrum.axisLabels?.[slug] ?? slug;
    const def     = d.spectrum.axisDefinitions?.[slug] ?? "";
    const systems = (systemsByVerdict[slug] ?? []).join(", ") || "—";
    lines.push(`| ${slug} | ${label} | ${systems} | ${def} |`);
  }
  lines.push("");
  lines.push(`> ${d.spectrum.note}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const sys of d.systems) {
    lines.push(`## ${sys.name}`);
    lines.push("");
    renderSystem(sys, lines, lbl);
    lines.push("---");
    lines.push("");
  }

  if (d.prototypes) {
    lines.push(`## ${lbl.prototypes ?? d.prototypes.sectionTitle}`);
    lines.push("");
    lines.push(`> ${d.prototypes.sectionNote}`);
    lines.push("");
    for (const sys of d.prototypes.systems) {
      lines.push(`### ${sys.name} (prototype · not source-verified)`);
      lines.push("");
      renderSystem(sys, lines, lbl);
      lines.push("---");
      lines.push("");
    }
  }

  lines.push(`## ${lbl.learnings ?? "What We Learned"}`);
  lines.push("");
  for (const item of d.whatWeLearned) {
    lines.push(`### ${item.title}`);
    lines.push("");
    lines.push(item.body);
    lines.push("");
    if (item.evidence && item.evidence.length > 0) {
      lines.push(bulletList(item.evidence));
      lines.push("");
    }
  }
  lines.push("---");
  lines.push("");
  lines.push(`## ${d.submit.headline}`);
  lines.push("");
  lines.push(d.submit.body);
  lines.push("");
  const mailtoUrl = `mailto:${d.submit.email}?subject=${enc(d.submit.subject)}&body=${enc(d.submit.bodyTemplate)}`;
  lines.push(`[${d.submit.cta}](${mailtoUrl})`);
  lines.push("");

  return lines.join("\n");
}

// ── Generate README.md region ──────────────────────────────────────────────

function genReadmeRegion(d) {
  const lines = [];
  const systemCount = d.systems.length + (d.prototypes?.systems?.length ?? 0);

  lines.push(`democrito is a token contract. ${systemCount} systems show how far builders actually went.`);
  lines.push("");
  lines.push("| System | What it did | Verdict | URL |");
  lines.push("| --- | --- | --- | --- |");
  for (const sys of d.systems) {
    const what = sys.headline ?? sys.tagline;
    lines.push(`| **${sys.name}** | ${what} | ${sys.divergence.verdict} | [${new URL(sys.url).hostname}](${sys.url}) |`);
  }
  if (d.prototypes) {
    for (const sys of d.prototypes.systems) {
      const what = sys.headline ?? sys.tagline;
      lines.push(`| **${sys.name}** (prototype) | ${what} | ${sys.divergence.verdict} | — |`);
    }
  }
  lines.push("");
  lines.push("Full audit, token diffs, and what broke: [docs/showcase.md](docs/showcase.md)");

  return lines.join("\n");
}

// ── Write outputs ──────────────────────────────────────────────────────────

const showcaseMd = genShowcaseMd(data);
const showcasePath = join(root, "docs", "showcase.md");
writeFileSync(showcasePath, showcaseMd, "utf8");

const readmePath = join(root, "README.md");
const readmeRaw  = readFileSync(readmePath, "utf8");
const region     = genReadmeRegion(data);
const fence_re   = /<!-- BEGIN GENERATED: showcase -->[\s\S]*?<!-- END GENERATED: showcase -->/;
const replacement = `<!-- BEGIN GENERATED: showcase -->\n${region}\n<!-- END GENERATED: showcase -->`;

if (!fence_re.test(readmeRaw)) {
  console.error("✗ generate-showcase — README.md is missing the generated-showcase fences. Add them first.");
  process.exit(1);
}

const newReadme = readmeRaw.replace(fence_re, replacement);
writeFileSync(readmePath, newReadme, "utf8");

console.log("✓ generate-showcase — docs/showcase.md · README.md region updated");
