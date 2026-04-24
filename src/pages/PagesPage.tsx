import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

export default function PagesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Pages</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Page-level compositions built with democrito organisms and templates.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Dashboard — descriptive only; no interactive preview in the design system repo */}
        <div className="rounded-lg border border-border bg-card p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-md font-medium">Dashboard</h3>
            <Badge variant="outline" size="sm">DashboardLayout</Badge>
          </div>
          <p className="font-body text-sm text-muted-foreground">
            Overview with KPI stats, AI Designer snippet with Generator/Evaluator tabs, activity feed, and recent prompts grid.
          </p>
          <div>
            <p className="font-mono text-2xs text-muted-foreground mb-1.5">Key Organisms:</p>
            <div className="flex flex-wrap gap-1">
              {["DashboardStats", "TabNav", "ActivityFeed"].map((org) => (
                <Badge key={org} variant="secondary" size="sm">{org}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Community showcase card */}
        <div className="rounded-lg border border-dashed border-border bg-card/50 p-5 space-y-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-accent/10 p-3">
            <Mail className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-md font-medium">Showcase your app</h3>
            <p className="font-body text-sm text-muted-foreground max-w-xs">
              Built something with democrito? We'd love to feature it here. Send us a message to publish your demo.
            </p>
          </div>
          <a
            href="mailto:hola@atomic-products.com?subject=democrito%20showcase%20submission"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent/10 px-4 py-2 font-display text-sm font-medium text-accent hover:bg-accent/20 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            hola@atomic-products.com
          </a>
        </div>
      </div>
    </div>
  );
}
