import { useTheme } from "../hooks/use-theme";
import { Button } from "../ui/button";
import { Sun, Moon, Flame } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "warm" as const, icon: Flame, label: "Warm", isDefault: true },
    { value: "dark" as const, icon: Moon, label: "Dark", isDefault: false },
    { value: "light" as const, icon: Sun, label: "Light", isDefault: false },
  ];

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-muted p-0.5">
      {themes.map(({ value, icon: Icon, label, isDefault }) => (
        <Button
          key={value}
          variant={theme === value ? "default" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs font-display"
          onClick={() => setTheme(value)}
          aria-label={`Switch to ${label} theme${isDefault ? " (default)" : ""}`}
        >
          <Icon className="h-3 w-3 sm:mr-1" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}
