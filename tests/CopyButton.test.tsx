import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "@/components/atoms/CopyButton";

describe("CopyButton", () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    writeText.mockClear();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  it("copies the provided value to the clipboard on click", async () => {
    render(<CopyButton variant="primary" value="npm install democrito" />);
    const button = screen.getByRole("button", {
      name: /copy npm install democrito to clipboard/i,
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("npm install democrito");
    });
  });

  it("shows the copied confirmation after a successful copy", async () => {
    render(<CopyButton variant="primary" value="pnpm add democrito" label="pnpm add" />);
    fireEvent.click(screen.getByRole("button", { name: /copy pnpm add to clipboard/i }));

    await screen.findByText("Copied!");
    expect(screen.getByRole("button")).toHaveAccessibleName("Copied to clipboard");
  });
});
