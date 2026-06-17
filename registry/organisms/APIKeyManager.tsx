import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

interface APIKey {
  id: string;
  name: string;
  provider: string;
  maskedValue: string;
  createdAt: string;
}

interface APIKeyManagerProps {
  keys: APIKey[];
  onAdd?: (name: string, value: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

/**
 * APIKeyManager — Manages API keys for LLM providers.
 * Shows masked keys with reveal toggle, add form, and delete.
 */
export function APIKeyManager({ keys, onAdd, onDelete, className }: APIKeyManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = () => {
    if (newName.trim() && newValue.trim()) {
      onAdd?.(newName, newValue);
      setNewName("");
      setNewValue("");
      setShowAddForm(false);
    }
  };

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-medium text-foreground">API Keys</span>
          <Badge variant="outline" size="sm"><span className="font-mono">{keys.length} keys</span></Badge>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-3.5 w-3.5" />
          Add Key
        </Button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="border-b border-border bg-surface p-3 space-y-2">
          <div className="flex gap-2">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Key name (e.g. openai-prod)" className="h-8 flex-1 font-mono text-xs" />
            <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="sk-..." type="password" className="h-8 flex-[2] font-mono text-xs" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAdd} disabled={!newName.trim() || !newValue.trim()}>Save</Button>
          </div>
        </div>
      )}

      {/* Key rows */}
      {keys.map((key) => (
        <div key={key.id} className="flex items-center gap-3 border-b border-border px-3 py-2.5 last:border-b-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-medium text-foreground">{key.name}</span>
              <Badge variant="outline" size="sm"><span className="font-mono">{key.provider}</span></Badge>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {revealedIds.has(key.id) ? key.maskedValue.replace(/•/g, "*") : key.maskedValue}
            </span>
          </div>
          <span className="font-mono text-2xs text-foreground-subtle shrink-0">{key.createdAt}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 min-h-0 min-w-0" onClick={() => toggleReveal(key.id)} aria-label="Toggle visibility">
            {revealedIds.has(key.id) ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 min-h-0 min-w-0 text-muted-foreground hover:text-error" onClick={() => onDelete?.(key.id)} aria-label={`Delete ${key.name}`}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}

      {keys.length === 0 && !showAddForm && (
        <p className="px-3 py-8 text-center font-body text-sm text-foreground-subtle italic">
          No API keys configured. Add a key to connect to LLM providers.
        </p>
      )}
    </div>
  );
}
