import { cn } from "../lib/utils";
import { useTheme } from "../hooks/use-theme";

const PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Crect width='28' height='28' rx='6' fill='%23888'/%3E%3Ctext x='14' y='19' font-size='12' text-anchor='middle' fill='%23fff' font-family='sans-serif'%3ED%3C/text%3E%3C/svg%3E";

interface LogoProps {
  /**
   * Logo image src for light/warm themes.
   * Pass your own asset; defaults to a placeholder SVG.
   */
  logoSrc?: string;
  /**
   * Logo image src for the dark theme.
   * Pass your own asset; defaults to the same placeholder.
   */
  logoDarkSrc?: string;
  /** Size in pixels for width/height */
  size?: number;
  className?: string;
}

/**
 * Logo — Theme-aware brand mark.
 * Consumers supply their own assets via logoSrc / logoDarkSrc props.
 * Falls back to a neutral placeholder so the component never renders a broken <img>.
 */
export function Logo({ logoSrc, logoDarkSrc, size = 28, className }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark"
    ? (logoDarkSrc ?? PLACEHOLDER_SVG)
    : (logoSrc ?? PLACEHOLDER_SVG);

  return (
    <img
      src={src}
      alt="logo"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
