import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Kbd } from "@/components/atoms";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  showShortcut?: boolean;
  className?: string;
}

export function SearchBar({ value = "", onChange, placeholder = "Search…", showShortcut = true, className }: SearchBarProps) {
  const [internal, setInternal] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentValue = onChange ? value : internal;
  const handleChange = (v: string) => {
    if (onChange) onChange(v);
    else setInternal(v);
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-16"
      />
      {currentValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-8 h-6 w-6"
          onClick={() => { handleChange(""); inputRef.current?.focus(); }}
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      {showShortcut && !currentValue && (
        <span className="absolute right-3 hidden sm:flex items-center gap-0.5">
          <Kbd>⌘</Kbd><Kbd>K</Kbd>
        </span>
      )}
    </div>
  );
}
