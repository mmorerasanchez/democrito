import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type TextVariant = "default" | "muted" | "subtle" | "accent" | "error" | "success";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  size?: "xs" | "sm" | "base" | "lg";
  mono?: boolean;
  as?: "p" | "span" | "div";
}

const textVariantStyles: Record<TextVariant, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  subtle: "text-foreground-subtle",
  accent: "text-accent",
  error: "text-error",
  success: "text-success",
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "default", size = "base", mono = false, as: Tag = "p", className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          `text-${size}`,
          mono ? "font-mono" : "font-body",
          textVariantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text };
export type { TextProps, TextVariant };
