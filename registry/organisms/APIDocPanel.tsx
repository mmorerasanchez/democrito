import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  sampleRequest?: string;
  sampleResponse: string;
}

const methodColors: Record<string, string> = {
  GET: "bg-success-bg text-success",
  POST: "bg-info-bg text-info",
  PUT: "bg-warning-bg text-warning",
  DELETE: "bg-error-bg text-error",
};

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/v1/prompts",
    description: "List all prompts with optional filters.",
    sampleResponse: `[
  {
    "id": "p_01",
    "name": "customer-support-v3",
    "status": "production",
    "tokens": 1284,
    "updated_at": "2026-02-10T14:30:00Z"
  }
]`,
  },
  {
    method: "GET",
    path: "/api/v1/prompts/:id",
    description: "Retrieve a single prompt by ID.",
    sampleResponse: `{
  "id": "p_01",
  "name": "customer-support-v3",
  "status": "production",
  "fields": { "role": "...", "task": "...", "context": "..." },
  "variables": [{ "name": "company_name", "default": "Acme" }],
  "tokens": 1284,
  "version": 3
}`,
  },
  {
    method: "POST",
    path: "/api/v1/prompts",
    description: "Create a new prompt.",
    sampleRequest: `{
  "name": "onboarding-flow",
  "template": "customer-support",
  "platform": "claude"
}`,
    sampleResponse: `{
  "id": "p_09",
  "name": "onboarding-flow",
  "status": "draft",
  "created_at": "2026-02-17T10:00:00Z"
}`,
  },
  {
    method: "PUT",
    path: "/api/v1/prompts/:id",
    description: "Update an existing prompt.",
    sampleRequest: `{
  "fields": { "role": "Updated system role..." },
  "status": "testing"
}`,
    sampleResponse: `{
  "id": "p_01",
  "status": "testing",
  "version": 4,
  "updated_at": "2026-02-17T10:05:00Z"
}`,
  },
  {
    method: "DELETE",
    path: "/api/v1/prompts/:id",
    description: "Delete a prompt permanently.",
    sampleResponse: `{ "deleted": true }`,
  },
  {
    method: "POST",
    path: "/api/v1/evaluate",
    description: "Run a CLEAR evaluation on a prompt.",
    sampleRequest: `{
  "prompt_id": "p_01",
  "model": "claude-3.5-sonnet",
  "test_cases": 5
}`,
    sampleResponse: `{
  "run_id": "r_42",
  "score": 87,
  "dimensions": { "C": 92, "L": 85, "E": 88, "A": 82, "R": 90 },
  "tokens_used": 3420,
  "latency_ms": 2840
}`,
  },
];

interface APIDocPanelProps {
  className?: string;
}

export function APIDocPanel({ className }: APIDocPanelProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setExpandedIdx(expandedIdx === idx ? null : idx);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Base URL */}
      <div className="rounded-md border border-border bg-card">
        <div className="border-b border-border px-3 py-2">
          <span className="font-display text-sm font-medium text-foreground">API Reference</span>
        </div>
        <div className="space-y-3 p-4">
          <div className="space-y-1">
            <span className="font-body text-xs text-muted-foreground">Base URL</span>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2">
              <code className="font-mono text-sm text-accent">https://api.example.com/v1</code>
              <Button variant="ghost" size="icon" className="ml-auto h-7 w-7 min-h-0 min-w-0">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-body text-xs text-muted-foreground">Authentication</span>
            <div className="rounded-md border border-border bg-surface px-3 py-2">
              <code className="font-mono text-sm text-foreground">
                Authorization: Bearer <span className="text-accent">{"<your-api-key>"}</span>
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoints */}
      <div className="rounded-md border border-border bg-card">
        <div className="border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-medium text-foreground">Endpoints</span>
            <Badge variant="outline" size="sm"><span className="font-mono">{endpoints.length}</span></Badge>
          </div>
        </div>
        <div className="divide-y divide-border">
          {endpoints.map((ep, i) => (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
              >
                {expandedIdx === i ? (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className={cn("inline-flex w-16 justify-center rounded px-2 py-0.5 font-mono text-2xs font-medium uppercase", methodColors[ep.method])}>
                  {ep.method}
                </span>
                <code className="font-mono text-sm text-foreground">{ep.path}</code>
                <span className="ml-auto font-body text-xs text-muted-foreground">{ep.description}</span>
              </button>
              {expandedIdx === i && (
                <div className="space-y-3 border-t border-border bg-surface px-4 py-3">
                  {ep.sampleRequest && (
                    <div className="space-y-1">
                      <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Request Body</span>
                      <pre className="overflow-auto rounded-md border border-border bg-background p-3 font-mono text-xs text-foreground">
                        {ep.sampleRequest}
                      </pre>
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Response</span>
                    <pre className="overflow-auto rounded-md border border-border bg-background p-3 font-mono text-xs text-foreground">
                      {ep.sampleResponse}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
