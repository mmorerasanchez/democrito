import { cn } from "@/lib/utils";
import { TabNav } from "@/components/molecules/TabNav";

interface SettingsSection {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SettingsNavProps {
  sections: SettingsSection[];
  activeSection: string;
  onSectionChange?: (value: string) => void;
  className?: string;
}

/**
 * SettingsNav — Horizontal tab navigation for settings pages.
 * Renders below the header, above settings content.
 */
export function SettingsNav({
  sections,
  activeSection,
  onSectionChange,
  className,
}: SettingsNavProps) {
  return (
    <div className={cn(className)}>
      <TabNav
        items={sections.map((s) => ({ label: s.label, value: s.value, disabled: s.disabled }))}
        value={activeSection}
        onValueChange={onSectionChange}
      />
    </div>
  );
}
