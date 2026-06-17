import { cn } from "@/lib/utils";
import { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentZone {
  label: string;
  className?: string;
}

type Viewport = "desktop" | "tablet" | "mobile";

interface TemplatePreviewProps {
  title: string;
  description: string;
  responsive: string;
  composedOf: string;
  zones: ContentZone[];
  layout: "sidebar-main" | "centered" | "full-width" | "sidebar-settings" | "split-pane" | "sidebar-main-panel" | "modal-overlay" | "comparison";
  className?: string;
}

const viewportConfig: Record<Viewport, { icon: typeof Monitor; label: string; maxWidth: string }> = {
  desktop: { icon: Monitor, label: "Desktop", maxWidth: "100%" },
  tablet: { icon: Tablet, label: "Tablet", maxWidth: "580px" },
  mobile: { icon: Smartphone, label: "Mobile", maxWidth: "320px" },
};

function Zone({ label, className }: ContentZone) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/50 p-4 font-mono text-xs text-muted-foreground",
      className,
    )}>
      {label}
    </div>
  );
}

export function TemplatePreview({ title, description, responsive, composedOf, zones, layout, className }: TemplatePreviewProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";
  const isCompact = isMobile || isTablet;

  const renderLayout = () => {
    switch (layout) {
      case "sidebar-main":
        return isMobile ? (
          <div className="flex flex-col h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label={zones[1]?.label || "Header"} className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label={zones[2]?.label || "Main Content"} className="flex-1 rounded-none border-0" />
            <Zone label={`${zones[0]?.label || "Sidebar"} (drawer)`} className="h-8 rounded-none border-0 border-t-2 shrink-0 text-foreground-subtle" />
          </div>
        ) : (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label={zones[0]?.label || "Sidebar"} className={cn("rounded-none border-0 border-r-2 shrink-0", isTablet ? "w-[50px]" : "w-[60px] sm:w-[100px]")} />
            <div className="flex-1 flex flex-col">
              <Zone label={zones[1]?.label || "Header"} className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <Zone label={zones[2]?.label || "Main Content"} className="flex-1 rounded-none border-0" />
            </div>
          </div>
        );

      case "sidebar-main-panel":
        return isMobile ? (
          <div className="flex flex-col h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label="Main Content" className="flex-1 rounded-none border-0" />
          </div>
        ) : (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Sidebar" className={cn("rounded-none border-0 border-r-2 shrink-0", isTablet ? "w-[50px]" : "w-[60px] sm:w-[80px]")} />
            <div className="flex-1 flex flex-col">
              <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <div className="flex flex-1">
                <Zone label="Main Content" className="flex-1 rounded-none border-0" />
                {!isTablet && <Zone label="Right Panel" className="w-[80px] rounded-none border-0 border-l-2 shrink-0" />}
              </div>
            </div>
          </div>
        );

      case "split-pane":
        return isMobile ? (
          <div className="flex flex-col h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label="Editor" className="flex-1 rounded-none border-0 border-b-2" />
            <Zone label="Preview" className="flex-1 rounded-none border-0" />
          </div>
        ) : (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            {!isTablet && <Zone label="Sidebar" className="w-[60px] rounded-none border-0 border-r-2 shrink-0" />}
            <div className="flex-1 flex flex-col">
              <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <div className="flex flex-1">
                <Zone label="Editor (50%)" className="flex-1 rounded-none border-0" />
                <div className="w-1 bg-border cursor-col-resize shrink-0" />
                <Zone label="Preview (50%)" className="flex-1 rounded-none border-0" />
              </div>
            </div>
          </div>
        );

      case "comparison":
        return isMobile ? (
          <div className="flex flex-col h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label="Version A" className="flex-1 rounded-none border-0 border-b-2" />
            <Zone label="Version B" className="flex-1 rounded-none border-0" />
          </div>
        ) : (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            {!isTablet && <Zone label="Sidebar" className="w-[60px] rounded-none border-0 border-r-2 shrink-0" />}
            <div className="flex-1 flex flex-col">
              <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <div className="flex flex-1">
                <Zone label="Version A (50%)" className="flex-1 rounded-none border-0" />
                <div className="w-1 bg-border shrink-0" />
                <Zone label="Version B (50%)" className="flex-1 rounded-none border-0" />
              </div>
            </div>
          </div>
        );

      case "centered":
        return (
          <div className="flex h-[320px] items-center justify-center rounded-md border border-border bg-muted/30">
            <Zone label={zones[0]?.label || "Auth Card"} className={cn("h-[180px]", isMobile ? "w-full mx-3" : "w-[200px]")} />
          </div>
        );

      case "modal-overlay":
        return (
          <div className="relative flex h-[320px] items-center justify-center rounded-md border border-border bg-background/80">
            <div className="absolute inset-0 rounded-md bg-foreground/5" />
            <Zone label={zones[0]?.label || "Modal Content"} className={cn("relative z-10", isMobile ? "w-[95%] h-[95%]" : isTablet ? "w-[80%] h-[80%]" : "w-[70%] h-[70%]")} />
          </div>
        );

      case "full-width":
        return (
          <div className="flex flex-col h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label="Hero / Content" className="flex-1 rounded-none border-0" />
            <Zone label="Footer" className="h-10 rounded-none border-0 border-t-2 shrink-0" />
          </div>
        );

      case "sidebar-settings":
        return isMobile ? (
          <div className="flex flex-col h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label="Settings Nav (scroll)" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label="Settings Content" className="flex-1 rounded-none border-0" />
          </div>
        ) : (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Sidebar" className={cn("rounded-none border-0 border-r-2 shrink-0", isTablet ? "w-[50px]" : "w-[60px]")} />
            <div className="flex-1 flex flex-col">
              <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <Zone label="Settings Nav" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <Zone label="Settings Content" className="flex-1 rounded-none border-0" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-md font-medium">{title}</h3>
          <p className="font-body text-sm text-muted-foreground">{description}</p>
          <p className="mt-1 font-mono text-2xs text-accent">Composed of: {composedOf}</p>
          <p className="font-mono text-2xs text-muted-foreground">Responsive: {responsive}</p>
        </div>
        <div className="flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5 shrink-0">
          {(Object.entries(viewportConfig) as [Viewport, typeof viewportConfig.desktop][]).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <Button
                key={key}
                variant={viewport === key ? "secondary" : "ghost"}
                size="icon"
                className={cn("h-7 w-7", viewport === key && "bg-accent/10 text-accent")}
                onClick={() => setViewport(key)}
                aria-label={`Preview ${config.label}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center transition-all duration-200">
        <div className="w-full transition-all duration-200" style={{ maxWidth: viewportConfig[viewport].maxWidth }}>
          {renderLayout()}
        </div>
      </div>
    </div>
  );
}
