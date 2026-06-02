import React from "react";

const SPLIT_RE = /(\[[^\]\n]+\])/g;
const MATCH_RE = /^\[[^\]\n]+\]$/;

const HIGHLIGHT_CLASS = "rounded-sm bg-accent/10 px-1 text-accent";

/**
 * Splits `text` on [bracketed] tokens and wraps each match in a highlighted span.
 * Plain segments are returned as strings. The raw `text` is unchanged and should
 * be used as the copy-to-clipboard value.
 */
export function tokenizeBrackets(text: string): React.ReactNode[] {
  const parts = text.split(SPLIT_RE);
  return parts.map((part, i) =>
    MATCH_RE.test(part) ? (
      <span key={i} className={HIGHLIGHT_CLASS}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
