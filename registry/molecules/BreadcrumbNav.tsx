import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  maxItems?: number;
  className?: string;
}

export function BreadcrumbNav({ items, maxItems = 4, className }: BreadcrumbNavProps) {
  let displayItems = items;
  let truncated = false;

  if (maxItems && items.length > maxItems) {
    truncated = true;
    displayItems = [items[0], { label: "…" }, ...items.slice(-2)];
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1", className)}>
      {displayItems.map((item, i) => {
        const isLast = i === displayItems.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <a href={item.href} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </a>
            ) : (
              <span className={cn(
                "font-body text-sm",
                isLast ? "font-medium text-foreground" : "text-muted-foreground",
              )}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
          </span>
        );
      })}
    </nav>
  );
}
