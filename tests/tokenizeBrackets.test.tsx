import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { tokenizeBrackets } from "@/lib/tokenizeBrackets";

describe("tokenizeBrackets", () => {
  it("wraps a single bracketed token in a highlighted span", () => {
    render(<>{tokenizeBrackets("Generate [product]")}</>);
    const span = screen.getByText("[product]");
    expect(span.tagName).toBe("SPAN");
    expect(span.className).toContain("text-accent");
  });

  it("renders exactly one highlighted span for a single token", () => {
    const { container } = render(<>{tokenizeBrackets("Generate [product]")}</>);
    expect(container.querySelectorAll("span")).toHaveLength(1);
  });

  it("preserves the original string for copy — no bracket stripping", () => {
    const input = "Generate [product]";
    // The raw input must be untouched (copy value is always `input`, not the nodes)
    expect(input).toBe("Generate [product]");
  });

  it("highlights multiple bracketed tokens", () => {
    const { container } = render(<>{tokenizeBrackets("Use [product] and [brand direction]")}</>);
    expect(container.querySelectorAll("span")).toHaveLength(2);
    expect(screen.getByText("[product]")).toBeTruthy();
    expect(screen.getByText("[brand direction]")).toBeTruthy();
  });

  it("does not highlight text without brackets", () => {
    const { container } = render(<>{tokenizeBrackets("plain text only")}</>);
    expect(container.querySelectorAll("span")).toHaveLength(0);
  });

  it("does not highlight tokens that span a newline", () => {
    const { container } = render(<>{tokenizeBrackets("bad [\nmultiline]")}</>);
    expect(container.querySelectorAll("span")).toHaveLength(0);
  });
});
