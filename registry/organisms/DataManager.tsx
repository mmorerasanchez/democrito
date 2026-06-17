import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Download, Upload, AlertTriangle } from "lucide-react";

interface DataManagerProps {
  className?: string;
}

export function DataManager({ className }: DataManagerProps) {
  const [exportAll, setExportAll] = useState(true);
  const [exportVars, setExportVars] = useState(true);
  const [exportSettings, setExportSettings] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Export */}
      <div className="rounded-md border border-border bg-card">
        <div className="border-b border-border px-3 py-2">
          <span className="font-display text-sm font-medium text-foreground">Export Data</span>
        </div>
        <div className="space-y-3 p-4">
          <p className="font-body text-xs text-muted-foreground">Select data to include in your export file (JSON format).</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="export-prompts" checked={exportAll} onCheckedChange={(c) => setExportAll(!!c)} />
              <Label htmlFor="export-prompts" className="font-body text-sm">All prompts</Label>
              <span className="font-mono text-2xs text-muted-foreground">24 prompts</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="export-vars" checked={exportVars} onCheckedChange={(c) => setExportVars(!!c)} />
              <Label htmlFor="export-vars" className="font-body text-sm">Variables</Label>
              <span className="font-mono text-2xs text-muted-foreground">5 variables</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="export-settings" checked={exportSettings} onCheckedChange={(c) => setExportSettings(!!c)} />
              <Label htmlFor="export-settings" className="font-body text-sm">Settings & Presets</Label>
            </div>
          </div>
          <Button size="sm" disabled={!exportAll && !exportVars && !exportSettings}>
            <Download className="h-3.5 w-3.5" /> Download Export
          </Button>
        </div>
      </div>

      {/* Import */}
      <div className="rounded-md border border-border bg-card">
        <div className="border-b border-border px-3 py-2">
          <span className="font-display text-sm font-medium text-foreground">Import Data</span>
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-surface px-6 py-10 text-center transition-colors hover:border-accent/50">
            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="font-body text-sm text-foreground">Drop a <code className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">.json</code> file here or click to browse</p>
            <p className="mt-1 font-body text-xs text-muted-foreground">Supports democrito export format</p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-md border border-destructive/30 bg-card">
        <div className="border-b border-destructive/30 px-3 py-2">
          <span className="font-display text-sm font-medium text-destructive">Danger Zone</span>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-body text-sm font-medium text-foreground">Clear All Data</span>
              <p className="font-body text-xs text-muted-foreground">Remove all prompts, variables, and presets. This cannot be undone.</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => setShowClearConfirm(true)}>
              Clear Data
            </Button>
          </div>
          <div className="border-t border-destructive/20 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-body text-sm font-medium text-foreground">Delete Account</span>
                <p className="font-body text-xs text-muted-foreground">Permanently remove your account and all data.</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Confirm */}
      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogContent className="z-modal bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-md text-destructive">
              <AlertTriangle className="h-5 w-5" /> Clear All Data
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-muted-foreground">
              This will permanently delete all your prompts, variables, and presets. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setShowClearConfirm(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => setShowClearConfirm(false)}>Clear Everything</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirm */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="z-modal bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-md text-destructive">
              <AlertTriangle className="h-5 w-5" /> Delete Account
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-muted-foreground">
              This will permanently remove your account and all associated data. This action is irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(false)}>Delete My Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
