import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IntegrationCardProps {
  name: string;
  description: string;
  provider: string;
  connected?: boolean;
  status?: "active" | "inactive" | "error";
  onConnect?: () => void;
  onDisconnect?: () => void;
  onConfigure?: () => void;
  className?: string;
}

const statusConfig = {
  active: { variant: "success" as const, label: "Active" },
  inactive: { variant: "secondary" as const, label: "Inactive" },
  error: { variant: "error" as const, label: "Error" },
};

/**
 * IntegrationCard — Card displaying an external integration/service
 * with connection status and actions.
 */
export function IntegrationCard({
  name,
  description,
  provider,
  connected = false,
  status = "inactive",
  onConnect,
  onDisconnect,
  onConfigure,
  className,
}: IntegrationCardProps) {
  const { variant, label } = statusConfig[status];

  return (
    <div className={cn(
      "rounded-md border p-4 transition-colors duration-150",
      connected ? "border-accent/30 bg-card" : "border-border bg-card",
      className,
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {/* Provider initial as avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-sm font-medium text-foreground">
              {provider.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="font-display text-sm font-medium text-foreground">{name}</span>
              <span className="ml-2 font-body text-xs text-muted-foreground">{provider}</span>
            </div>
          </div>
          <p className="mt-2 font-body text-xs text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <Badge variant={variant} size="sm">{label}</Badge>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {connected ? (
          <>
            <Button variant="ghost" size="sm" onClick={onConfigure}>Configure</Button>
            <Button variant="ghost" size="sm" className="text-error hover:text-error" onClick={onDisconnect}>Disconnect</Button>
          </>
        ) : (
          <Button variant="secondary" size="sm" onClick={onConnect}>Connect</Button>
        )}
      </div>
    </div>
  );
}
