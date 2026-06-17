import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";

interface Tab {
  id: string;
  name: string;
  count: number;
  isDefault?: boolean;
}

interface Tag {
  id: string;
  name: string;
  type: "primary" | "secondary";
  color?: string;
  count: number;
}

const COLOR_PALETTE = [
  "#D9534F", "#E8833A", "#E2A03F", "#5CB85C",
  "#46B8DA", "#337AB7", "#9B59B6", "#E84393",
  "#636E72", "#2D3436",
];

const mockTabs: Tab[] = [
  { id: "all", name: "All Prompts", count: 24, isDefault: true },
  { id: "cs", name: "Customer Support", count: 8 },
  { id: "it", name: "Internal Tools", count: 6 },
  { id: "cg", name: "Content Generation", count: 10 },
];

const mockTags: Tag[] = [
  { id: "t1", name: "high-priority", type: "primary", color: "#D9534F", count: 7 },
  { id: "t2", name: "production-ready", type: "primary", color: "#5CB85C", count: 12 },
  { id: "t3", name: "needs-review", type: "primary", color: "#E2A03F", count: 4 },
  { id: "t4", name: "v2-migration", type: "secondary", count: 3 },
  { id: "t5", name: "customer-facing", type: "secondary", count: 9 },
  { id: "t6", name: "internal-only", type: "secondary", count: 5 },
  { id: "t7", name: "experimental", type: "secondary", count: 2 },
  { id: "t8", name: "deprecated-flow", type: "secondary", count: 0 },
];

interface OrganizationManagerProps {
  className?: string;
}

export function OrganizationManager({ className }: OrganizationManagerProps) {
  const [tabs] = useState(mockTabs);
  const [tags] = useState(mockTags);
  const [showTabModal, setShowTabModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [newTagType, setNewTagType] = useState<"primary" | "secondary">("primary");
  const [newTagColor, setNewTagColor] = useState(COLOR_PALETTE[0]);

  const primaryTags = tags.filter((t) => t.type === "primary");
  const secondaryTags = tags.filter((t) => t.type === "secondary");

  return (
    <div className={cn("space-y-6", className)}>
      {/* Tabs Section */}
      <div className="rounded-md border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div>
            <span className="font-display text-sm font-medium text-foreground">Tabs</span>
            <p className="font-body text-xs text-muted-foreground mt-0.5">Project folders shown in the sidebar. Prompts can belong to up to 5 tabs.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setShowTabModal(true)}>
            <Plus className="h-3.5 w-3.5" /> New Tab
          </Button>
        </div>
        <div className="divide-y divide-border">
          {tabs.map((tab) => (
            <div key={tab.id} className="flex items-center justify-between px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="font-body text-sm font-medium text-foreground">{tab.name}</span>
                <Badge variant="count" size="sm">{tab.count}</Badge>
                {tab.isDefault && <Badge variant="outline" size="sm">Default</Badge>}
              </div>
              {!tab.isDefault && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0">
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0 text-muted-foreground hover:text-error">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="rounded-md border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div>
            <span className="font-display text-sm font-medium text-foreground">Tags</span>
            <p className="font-body text-xs text-muted-foreground mt-0.5">Labels for categorization. Prompts can have multiple tags.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setShowTagModal(true)}>
            <Plus className="h-3.5 w-3.5" /> New Tag
          </Button>
        </div>

        {/* Primary Tags */}
        <div className="border-b border-border px-3 py-2">
          <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Primary Tags</span>
        </div>
        <div className="divide-y divide-border">
          {primaryTags.map((tag) => (
            <div key={tag.id} className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <BadgeDot color={tag.color} />
                <span className="font-mono text-sm text-foreground">{tag.name}</span>
                <Badge variant="count" size="sm">{tag.count}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0"><Pencil className="h-3 w-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0 text-muted-foreground hover:text-error"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Tags */}
        <div className="border-b border-border px-3 py-2">
          <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Secondary Tags</span>
        </div>
        <div className="divide-y divide-border">
          {secondaryTags.map((tag) => (
            <div key={tag.id} className={cn(
              "flex items-center justify-between px-3 py-2",
              tag.count === 0 && "bg-warning-bg"
            )}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-foreground">{tag.name}</span>
                <Badge variant={tag.count === 0 ? "warning" : "count"} size="sm">{tag.count}</Badge>
                {tag.count === 0 && (
                  <span className="flex items-center gap-1 font-body text-2xs text-warning">
                    <AlertTriangle className="h-3 w-3" /> Unused
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0"><Pencil className="h-3 w-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0 text-muted-foreground hover:text-error"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Tab Modal */}
      <Dialog open={showTabModal} onOpenChange={setShowTabModal}>
        <DialogContent className="z-modal bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-md">Create New Tab</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">Tab Name</Label>
              <Input value={newTabName} onChange={(e) => setNewTabName(e.target.value)} placeholder="e.g. Marketing" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setShowTabModal(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setShowTabModal(false)}>Create Tab</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Tag Modal */}
      <Dialog open={showTagModal} onOpenChange={setShowTagModal}>
        <DialogContent className="z-modal bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-md">Create New Tag</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">Tag Name</Label>
              <Input value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="e.g. high-priority" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">Type</Label>
              <RadioGroup value={newTagType} onValueChange={(v) => setNewTagType(v as "primary" | "secondary")} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="primary" id="type-primary" />
                  <Label htmlFor="type-primary" className="font-body text-sm">Primary</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="secondary" id="type-secondary" />
                  <Label htmlFor="type-secondary" className="font-body text-sm">Secondary</Label>
                </div>
              </RadioGroup>
            </div>
            {newTagType === "primary" && (
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">Color</Label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PALETTE.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewTagColor(color)}
                      className={cn(
                        "h-7 w-7 rounded-full border-2 transition-transform",
                        newTagColor === color ? "border-accent scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setShowTagModal(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setShowTagModal(false)}>Create Tag</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
