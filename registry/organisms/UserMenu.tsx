import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, CreditCard, User } from "lucide-react";

interface UserMenuProps {
  name: string;
  email: string;
  initials?: string;
  plan?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onBilling?: () => void;
  onLogout?: () => void;
  className?: string;
}

/**
 * UserMenu — Dropdown-like user menu panel with profile info and actions.
 */
export function UserMenu({
  name,
  email,
  initials,
  plan,
  onProfile,
  onSettings,
  onBilling,
  onLogout,
  className,
}: UserMenuProps) {
  const avatarInitials = initials || name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={cn("rounded-md border border-border bg-card w-64", className)}>
      {/* Profile section */}
      <div className="flex items-center gap-3 border-b border-border px-3 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-medium text-accent">
          {avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <span className="block font-display text-sm font-medium text-foreground truncate">{name}</span>
          <span className="block font-body text-xs text-muted-foreground truncate">{email}</span>
        </div>
        {plan && <Badge variant="outline" size="sm"><span className="font-mono">{plan}</span></Badge>}
      </div>

      {/* Actions */}
      <div className="py-1">
        {[
          { label: "Profile", icon: User, action: onProfile },
          { label: "Settings", icon: Settings, action: onSettings },
          { label: "Billing", icon: CreditCard, action: onBilling },
        ].map(({ label, icon: Icon, action }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors duration-150 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-sm text-foreground">{label}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-border py-1">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors duration-150 hover:bg-error-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogOut className="h-4 w-4 text-error" />
          <span className="font-body text-sm text-error">Log out</span>
        </button>
      </div>
    </div>
  );
}
