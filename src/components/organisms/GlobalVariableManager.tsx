import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Info } from "lucide-react";

interface GlobalVariable {
  id: string;
  name: string;
  type: "text" | "number" | "boolean" | "select" | "json";
  defaultValue: string;
  description: string;
  usageCount: number;
}

const typeColors: Record<string, string> = {
  text: "secondary",
  number: "info",
  boolean: "warning",
  select: "outline",
  json: "success",
};

const mockVariables: GlobalVariable[] = [
  { id: "1", name: "company_name", type: "text", defaultValue: "Acme Corp", description: "Primary company name used across prompts", usageCount: 12 },
  { id: "2", name: "max_response_length", type: "number", defaultValue: "500", description: "Maximum word count for model responses", usageCount: 8 },
  { id: "3", name: "include_examples", type: "boolean", defaultValue: "true", description: "Whether to include few-shot examples", usageCount: 6 },
  { id: "4", name: "tone_style", type: "select", defaultValue: "professional", description: "Communication tone for generated content", usageCount: 15 },
  { id: "5", name: "output_schema", type: "json", defaultValue: '{"format":"markdown"}', description: "JSON schema for structured output format", usageCount: 3 },
];

interface GlobalVariableManagerProps {
  className?: string;
}

export function GlobalVariableManager({ className }: GlobalVariableManagerProps) {
  const [variables] = useState(mockVariables);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Sync Note */}
      <div className="flex items-start gap-2 rounded-md border border-info-border bg-info-bg px-3 py-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" />
        <p className="font-body text-xs text-foreground">
          Global variables are templates — importing copies the definition into the prompt. Changes to the global variable don't retroactively update prompts.
        </p>
      </div>

      {/* Variable Table */}
      <div className="rounded-md border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-medium text-foreground">Global Variables</span>
            <Badge variant="outline" size="sm"><span className="font-mono">{variables.length}</span></Badge>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-3.5 w-3.5" /> Add Variable
          </Button>
        </div>

        {showAddForm && (
          <div className="border-b border-border bg-surface p-3 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="font-body text-xs font-medium">Name</Label>
                <Input placeholder="{{variable_name}}" className="h-8 font-mono text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="font-body text-xs font-medium">Type</Label>
                <Select defaultValue="text">
                  <SelectTrigger className="h-8 font-mono text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="text" className="font-mono text-xs">Text</SelectItem>
                    <SelectItem value="number" className="font-mono text-xs">Number</SelectItem>
                    <SelectItem value="boolean" className="font-mono text-xs">Boolean</SelectItem>
                    <SelectItem value="select" className="font-mono text-xs">Select</SelectItem>
                    <SelectItem value="json" className="font-mono text-xs">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="font-body text-xs font-medium">Default Value</Label>
                <Input placeholder="Default value..." className="h-8 font-mono text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="font-body text-xs font-medium">Description</Label>
                <Input placeholder="What this variable does..." className="h-8 font-body text-xs" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button size="sm">Add</Button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono text-2xs uppercase tracking-widest">Name</TableHead>
              <TableHead className="font-mono text-2xs uppercase tracking-widest">Type</TableHead>
              <TableHead className="font-mono text-2xs uppercase tracking-widest">Default</TableHead>
              <TableHead className="font-mono text-2xs uppercase tracking-widest hidden sm:table-cell">Description</TableHead>
              <TableHead className="font-mono text-2xs uppercase tracking-widest text-right">Used</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {variables.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-mono text-sm font-medium text-accent">{`{{${v.name}}}`}</TableCell>
                <TableCell>
                  <Badge variant={typeColors[v.type] as React.ComponentProps<typeof Badge>["variant"]} size="sm">{v.type}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-foreground max-w-[120px] truncate">{v.defaultValue}</TableCell>
                <TableCell className="font-body text-xs text-muted-foreground hidden sm:table-cell max-w-[200px] truncate">{v.description}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="count" size="sm">{v.usageCount}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0 text-muted-foreground hover:text-error">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
