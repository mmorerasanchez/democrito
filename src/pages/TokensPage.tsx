import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ── helpers ── */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function parseHsl(raw: string): { h: number; s: number; l: number } | null {
  const parts = raw.trim().split(/\s+/);
  if (parts.length < 3) return null;
  return { h: parseFloat(parts[0]), s: parseFloat(parts[1]), l: parseFloat(parts[2]) };
}

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Copy text using the async Clipboard API when available, otherwise fall
 * back to a hidden <textarea> + document.execCommand("copy"). The fallback
 * covers non-secure contexts (http://) and older browsers where
 * navigator.clipboard is undefined or rejects.
 */
async function copyToClipboard(value: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      /* fall through to legacy path */
    }
  }
  if (typeof document === "undefined") return false;
  try {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    ta.style.pointerEvents = "none";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Compact icon-only copy button used inside swatch cards. */
function MiniCopy({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  const Icon = copied ? Check : Copy;
  return (
    <button
      type="button"
      onClick={handle}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      title={`Copy ${label}: ${value}`}
      className="inline-flex h-6 items-center gap-1 rounded-sm border border-border bg-background px-1.5 font-mono text-2xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
    </button>
  );
}

/* ── Swatch Card ── */
function Swatch({ token, label }: { token: string; label?: string }) {
  const raw = getCssVar(token);
  const parsed = parseHsl(raw);
  const hex = parsed ? hslToHex(parsed.h, parsed.s, parsed.l) : "—";
  const hslString = raw ? `hsl(${raw})` : "—";
  const displayName = label || token.replace("--", "");

  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
      <div
        className="h-10 w-10 shrink-0 rounded-md border border-border"
        style={{ backgroundColor: `hsl(${raw})` }}
      />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate font-mono text-xs font-medium text-foreground">{displayName}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <MiniCopy value={hex} label={hex} />
          <MiniCopy value={hslString} label="HSL" />
        </div>
      </div>
    </div>
  );
}

/* ── Section wrapper ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-medium tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

interface ColorToken {
  token: string;
  label?: string;
}

function matchesQuery(query: string, ...fields: (string | undefined)[]) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((f) => f?.toLowerCase().includes(q));
}

function ColorGroup({
  title,
  tokens,
  query,
}: {
  title: string;
  tokens: ColorToken[];
  query: string;
}) {
  const filtered = tokens.filter((t) => matchesQuery(query, t.token, t.label));
  if (filtered.length === 0) return null;
  return (
    <div className="space-y-2">
      <h3 className="font-display text-md font-medium text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Swatch key={t.token} {...t} />
        ))}
      </div>
    </div>
  );
}

/* ── Token data (used by both render + export) ── */
const COLOR_GROUPS: { title: string; tokens: ColorToken[] }[] = [
  {
    title: "Primary & Accent",
    tokens: [
      { token: "--primary", label: "primary" },
      { token: "--primary-foreground", label: "primary-foreground" },
      { token: "--accent", label: "accent" },
      { token: "--accent-foreground", label: "accent-foreground" },
      { token: "--accent-muted", label: "accent-muted" },
      { token: "--accent-subtle", label: "accent-subtle" },
      { token: "--warm-dark", label: "warm-dark" },
    ],
  },
  {
    title: "Secondary & Surface",
    tokens: [
      { token: "--secondary", label: "secondary" },
      { token: "--secondary-foreground", label: "secondary-foreground" },
      { token: "--surface", label: "surface" },
      { token: "--card", label: "card" },
      { token: "--card-foreground", label: "card-foreground" },
      { token: "--muted", label: "muted" },
      { token: "--muted-foreground", label: "muted-foreground" },
      { token: "--background", label: "background" },
      { token: "--foreground", label: "foreground" },
    ],
  },
  {
    title: "Semantic",
    tokens: [
      { token: "--success", label: "success" },
      { token: "--warning", label: "warning" },
      { token: "--error", label: "error" },
      { token: "--info", label: "info" },
      { token: "--destructive", label: "destructive" },
      { token: "--destructive-foreground", label: "destructive-foreground" },
    ],
  },
  {
    title: "Border & Input",
    tokens: [
      { token: "--border", label: "border" },
      { token: "--input", label: "input" },
      { token: "--ring", label: "ring" },
    ],
  },
  {
    title: "Category Palette",
    tokens: [
      { token: "--category-teal", label: "category-teal" },
      { token: "--category-amber", label: "category-amber" },
      { token: "--category-emerald", label: "category-emerald" },
      { token: "--category-orange", label: "category-orange" },
      { token: "--category-violet", label: "category-violet" },
      { token: "--category-rose", label: "category-rose" },
      { token: "--category-blue", label: "category-blue" },
      { token: "--category-red", label: "category-red" },
      { token: "--category-gold", label: "category-gold" },
    ],
  },
  {
    title: "Status",
    tokens: [
      { token: "--status-draft", label: "status-draft" },
      { token: "--status-testing", label: "status-testing" },
      { token: "--status-production", label: "status-production" },
      { token: "--status-archived", label: "status-archived" },
    ],
  },
];

const TYPE_SCALE = [
  { label: "Display / Hero", classes: "text-3xl font-bold font-display tracking-tight", text: "Display Heading" },
  { label: "H1 (Page Title)", classes: "text-xl font-semibold font-display tracking-tight", text: "Page Title" },
  { label: "H2 (Section)", classes: "text-lg font-medium font-display", text: "Section Heading" },
  { label: "H3 (Card Title)", classes: "text-md font-medium font-display", text: "Card Title" },
  { label: "H4 (Subsection)", classes: "text-base font-medium font-display", text: "Subsection" },
  { label: "Body", classes: "text-base font-normal font-body", text: "Body text for descriptions, paragraphs, and general content. Optimized for readability at 14px." },
  { label: "Body Small", classes: "text-sm font-normal font-body", text: "Smaller body text for labels and helpers" },
  { label: "Caption", classes: "text-xs font-normal font-body", text: "Caption text for metadata" },
  { label: "Overline", classes: "text-2xs font-medium font-mono uppercase tracking-widest", text: "OVERLINE LABEL" },
  { label: "Mono Data", classes: "text-sm font-normal font-mono", text: "claude-3.5-sonnet · temperature: 0.7" },
  { label: "KPI Value", classes: "text-2xl font-bold font-mono", text: "1,247" },
] as const;

const SPACING = [
  { name: "space-1", value: "4px", tw: "p-1" },
  { name: "space-2", value: "8px", tw: "p-2" },
  { name: "space-3", value: "12px", tw: "p-3" },
  { name: "space-4", value: "16px", tw: "p-4" },
  { name: "space-6", value: "24px", tw: "p-6" },
  { name: "space-8", value: "32px", tw: "p-8" },
  { name: "space-12", value: "48px", tw: "p-12" },
  { name: "space-16", value: "64px", tw: "p-16" },
] as const;

const RADII = [
  { name: "none", tw: "rounded-none" },
  { name: "sm", tw: "rounded-sm" },
  { name: "md", tw: "rounded-md" },
  { name: "lg", tw: "rounded-lg" },
  { name: "xl", tw: "rounded-xl" },
  { name: "full", tw: "rounded-full" },
] as const;

const SHADOWS = [
  { name: "none", tw: "shadow-none" },
  { name: "sm", tw: "shadow-sm" },
  { name: "md", tw: "shadow-md" },
  { name: "lg", tw: "shadow-lg" },
  { name: "xl", tw: "shadow-xl" },
] as const;

/** Build a JSON snapshot of all current design tokens for download. */
function buildExportPayload() {
  const colors: Record<string, { token: string; hsl: string; hex: string }> = {};
  for (const group of COLOR_GROUPS) {
    for (const t of group.tokens) {
      const raw = getCssVar(t.token);
      const parsed = parseHsl(raw);
      colors[t.label ?? t.token.replace("--", "")] = {
        token: t.token,
        hsl: raw ? `hsl(${raw})` : "",
        hex: parsed ? hslToHex(parsed.h, parsed.s, parsed.l) : "",
      };
    }
  }

  return {
    name: "democrito",
    version: "v3",
    exportedAt: new Date().toISOString(),
    activeTheme:
      document.documentElement.classList.contains("warm")
        ? "warm"
        : document.documentElement.classList.contains("light")
        ? "light"
        : "dark",
    colors,
    typography: {
      fontFamilies: {
        display: "Plus Jakarta Sans, Poppins, Inter, system-ui, sans-serif",
        body: "Satoshi, Outfit, Inter, system-ui, sans-serif",
        mono: "JetBrains Mono, IBM Plex Mono, Consolas, monospace",
      },
      scale: TYPE_SCALE.map(({ label, classes }) => ({ label, classes })),
    },
    spacing: SPACING.map((s) => ({ ...s })),
    radius: RADII.map((r) => ({ ...r })),
    shadows: SHADOWS.map((s) => ({ ...s })),
    breakpoints: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    layout: {
      headerHeight: getCssVar("--header-height"),
      sidebarWidth: getCssVar("--sidebar-width"),
      sidebarCollapsed: getCssVar("--sidebar-collapsed"),
      rightPanel: getCssVar("--right-panel"),
    },
  };
}

function downloadTokensJson() {
  const payload = buildExportPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // Sanitize: strip whitespace and lowercase so the filename is always
  // a clean slug like "democrito-tokens-light.json" — never "democrito-tokens- light .json".
  const themeSlug = String(payload.activeTheme).trim().toLowerCase().replace(/\s+/g, "-");
  a.download = `democrito-tokens-${themeSlug}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── Tokens Page ── */
export default function TokensPage() {
  const [, forceUpdate] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [query, setQuery] = useState("");

  // Re-render on theme class change to pick up new computed values
  useEffect(() => {
    const observer = new MutationObserver(() => forceUpdate((n) => n + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const trimmedQuery = query.trim();

  // Match counts so we can hide whole sections + show an empty state.
  const colorMatches = useMemo(
    () =>
      COLOR_GROUPS.reduce(
        (acc, g) => acc + g.tokens.filter((t) => matchesQuery(trimmedQuery, t.token, t.label)).length,
        0,
      ),
    [trimmedQuery],
  );
  const typeMatches = useMemo(
    () => TYPE_SCALE.filter((t) => matchesQuery(trimmedQuery, t.label, t.classes)),
    [trimmedQuery],
  );
  const spacingMatches = useMemo(
    () => SPACING.filter((s) => matchesQuery(trimmedQuery, s.name, s.tw, s.value)),
    [trimmedQuery],
  );
  const radiusMatches = useMemo(
    () => RADII.filter((r) => matchesQuery(trimmedQuery, r.name, r.tw)),
    [trimmedQuery],
  );
  const shadowMatches = useMemo(
    () => SHADOWS.filter((s) => matchesQuery(trimmedQuery, s.name, s.tw)),
    [trimmedQuery],
  );

  const hasAny =
    colorMatches > 0 ||
    typeMatches.length > 0 ||
    spacingMatches.length > 0 ||
    radiusMatches.length > 0 ||
    shadowMatches.length > 0;

  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Design Tokens</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          The complete token reference for this design system.
        </p>
      </div>

      {/* Toolbar: search + export */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter tokens — name, class, or value (e.g. accent, p-4, rounded-md)…"
            aria-label="Filter design tokens"
            className="pl-9 pr-9 font-mono text-sm"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setQuery("")}
              aria-label="Clear filter"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        <Button variant="outline" onClick={downloadTokensJson} className="shrink-0">
          <Download className="h-4 w-4" />
          Export tokens
        </Button>
      </div>

      {!hasAny && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="font-display text-sm font-medium text-foreground">No tokens match “{trimmedQuery}”.</p>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            Try a different name, Tailwind class, or clear the filter.
          </p>
        </div>
      )}

      {/* ─── COLORS ─── */}
      {colorMatches > 0 && (
        <Section title="Colors">
          {COLOR_GROUPS.map((group) => (
            <ColorGroup key={group.title} title={group.title} tokens={group.tokens} query={trimmedQuery} />
          ))}
        </Section>
      )}

      {/* ─── TYPOGRAPHY ─── */}
      {typeMatches.length > 0 && (
        <Section title="Typography">
          <div className="space-y-6 rounded-lg border border-border bg-card p-6">
            {/* Font families — always shown when typography section is visible */}
            {!trimmedQuery && (
              <div className="space-y-3">
                <h3 className="font-display text-md font-medium text-muted-foreground">Font Families</h3>
                <div className="space-y-2">
                  <p className="font-display text-base">
                    <span className="font-mono text-2xs text-muted-foreground mr-3">font-display</span>
                    Plus Jakarta Sans — Headings & Navigation
                  </p>
                  <p className="font-body text-base">
                    <span className="font-mono text-2xs text-muted-foreground mr-3">font-body</span>
                    Satoshi — Body text & labels
                  </p>
                  <p className="font-mono text-base">
                    <span className="font-mono text-2xs text-muted-foreground mr-3">font-mono</span>
                    JetBrains Mono — Code, prompts, data
                  </p>
                </div>
              </div>
            )}

            {/* Type scale */}
            <div className="space-y-4">
              <h3 className="font-display text-md font-medium text-muted-foreground">Type Scale</h3>
              {typeMatches.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0">
                  <span className="font-mono text-2xs text-muted-foreground">{item.label} · {item.classes}</span>
                  <span className={item.classes}>{item.text}</span>
                </div>
              ))}
            </div>

            {!trimmedQuery && (
              <div className="space-y-2">
                <h3 className="font-display text-md font-medium text-muted-foreground">Readability Sample</h3>
                <p className="max-w-prose font-body text-base leading-relaxed text-foreground">
                  This design system treats prompts as code — every piece of user-editable content
                  is monospaced, reinforcing that prompts are precise, engineered artifacts. The visual
                  language uses 95% warm stone grays, 4% terracotta orange accent, and 1% semantic colors.
                  This creates a professional, IDE-like workspace optimized for engineering workflows.
                </p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ─── SPACING ─── */}
      {spacingMatches.length > 0 && (
        <Section title="Spacing">
          <div className="space-y-2 rounded-lg border border-border bg-card p-6">
            {spacingMatches.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="w-20 shrink-0 font-mono text-2xs text-muted-foreground">{s.tw}</span>
                <div className="h-4 rounded-sm bg-accent" style={{ width: s.value }} />
                <span className="font-mono text-xs text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ─── BORDER RADIUS ─── */}
      {radiusMatches.length > 0 && (
        <Section title="Border Radius">
          <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-card p-6">
            {radiusMatches.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`h-16 w-16 border-2 border-accent bg-accent/10 ${r.tw}`} />
                <span className="font-mono text-2xs text-muted-foreground">{r.tw}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ─── SHADOWS ─── */}
      {shadowMatches.length > 0 && (
        <Section title="Shadows">
          <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-card p-6">
            {shadowMatches.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div className={`h-20 w-20 rounded-md border border-border bg-surface ${s.tw}`} />
                <span className="font-mono text-2xs text-muted-foreground">{s.tw}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ─── BREAKPOINTS (always shown — reference table, not filterable) ─── */}
      {!trimmedQuery && (
        <Section title="Breakpoints">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">Current viewport:</span>
              <span className="font-mono text-sm font-medium text-accent">{viewportWidth}px</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 pr-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Breakpoint</th>
                    <th className="pb-2 pr-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Min Width</th>
                    <th className="pb-2 pr-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Prefix</th>
                    <th className="pb-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Target</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {([
                    { name: "Mobile", min: "0px", prefix: "(none)", target: "Phones", minPx: 0 },
                    { name: "sm", min: "480px", prefix: "sm:", target: "Large phones", minPx: 480 },
                    { name: "md", min: "768px", prefix: "md:", target: "Tablets", minPx: 768 },
                    { name: "lg", min: "1024px", prefix: "lg:", target: "Desktop", minPx: 1024 },
                    { name: "xl", min: "1280px", prefix: "xl:", target: "Large desktop", minPx: 1280 },
                    { name: "2xl", min: "1536px", prefix: "2xl:", target: "Wide screens", minPx: 1536 },
                  ] as const).map((bp) => (
                    <tr
                      key={bp.name}
                      className={`border-b border-border last:border-0 ${viewportWidth >= bp.minPx ? "text-foreground" : "text-muted-foreground/50"}`}
                    >
                      <td className="py-2 pr-6 font-medium">{bp.name}</td>
                      <td className="py-2 pr-6">{bp.min}</td>
                      <td className="py-2 pr-6">{bp.prefix}</td>
                      <td className="py-2">{bp.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
