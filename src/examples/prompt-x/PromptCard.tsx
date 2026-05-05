import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/atoms";

interface PromptCardProps {
  title: string;
  status: "draft" | "testing" | "production" | "archived";
  preview: string;
  version: string;
  updatedAgo: string;
  tokens: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PromptCard({ title, status, preview, version, updatedAgo, tokens, selected, onClick, className }: PromptCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-md border bg-card p-4 transition-all duration-150",
        "hover:-translate-y-px hover:shadow-md",
        selected ? "border-accent bg-accent/[0.03]" : "border-border",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-md font-medium text-foreground truncate">{title}</h3>
        <Badge variant={status} size="sm">{status}</Badge>
      </div>
      <p className="mt-2 line-clamp-2 font-mono text-sm text-muted-foreground">{preview}</p>
      <div className="mt-3 flex items-center gap-2">
        <Text mono size="xs" variant="muted">{version}</Text>
        <span className="text-border">·</span>
        <Text mono size="xs" variant="muted">{updatedAgo}</Text>
        <span className="text-border">·</span>
        <Text mono size="xs" variant="muted">{tokens.toLocaleString()} tokens</Text>
      </div>
    </div>
  );
}
