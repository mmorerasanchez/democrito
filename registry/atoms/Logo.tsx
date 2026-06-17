import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import logoDark from "@/assets/logo-dark.png";
import logoLightWarm from "@/assets/logo-light-warm.png";

interface LogoProps {
  /** Size in pixels for width/height */
  size?: number;
  className?: string;
}

/**
 * Logo — Theme-aware brand mark.
 * Renders logo-dark.png for the dark theme,
 * logo-light-warm.png for warm (default) and light themes.
 */
export function Logo({ size = 28, className }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark" ? logoDark : logoLightWarm;

  return (
    <img
      src={src}
      alt="democrito"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
