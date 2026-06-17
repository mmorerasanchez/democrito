import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage, AvatarStatus, type AvatarSize } from "@/components/ui/avatar";

interface AvatarGroupProps {
  name: string;
  role?: string;
  initials?: string;
  imageSrc?: string;
  status?: "online" | "offline" | "busy";
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({ name, role, initials, imageSrc, status, size = "md", className }: AvatarGroupProps) {
  const fallbackInitials = initials || name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar size={size}>
        {imageSrc && <AvatarImage src={imageSrc} alt={name} />}
        <AvatarFallback>{fallbackInitials}</AvatarFallback>
        {status && <AvatarStatus status={status} />}
      </Avatar>
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-medium text-foreground">{name}</p>
        {role && <p className="truncate font-body text-xs text-muted-foreground">{role}</p>}
      </div>
    </div>
  );
}
