import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { Heading, Text } from "@/components/atoms";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TokenItem {
  name: string;
  desc: string;
}

interface TokenGroup {
  label: string;
  items: TokenItem[];
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: "Surfaces",
    items: [
      { name: "--background", desc: "Page background, lowest layer" },
      { name: "--surface", desc: "Mid-layer for content blocks" },
      { name: "--card", desc: "Elevated containers" },
    ],
  },
  {
    label: "Text",
    items: [
      { name: "--foreground", desc: "Primary readable text" },
      { name: "--foreground-muted", desc: "Secondary labels and descriptions" },
      { name: "--foreground-subtle", desc: "Disabled or low-priority text" },
    ],
  },
  {
    label: "Accent",
    items: [
      { name: "--accent", desc: "Primary action colour — terracotta" },
      { name: "--accent-muted", desc: "Emphasis blocks and focus" },
      { name: "--accent-subtle", desc: "Hover outlines and backgrounds" },
    ],
  },
  {
    label: "Fonts",
    items: [
      { name: "font-display", desc: "Headings — Plus Jakarta Sans" },
      { name: "font-body", desc: "Prose and UI — Satoshi" },
      { name: "font-mono", desc: "Code and data — JetBrains Mono" },
    ],
  },
];

interface TokenReferenceCardProps {
  className?: string;
}

export function TokenReferenceCard({ className }: TokenReferenceCardProps) {
  // On mobile, groups collapse; the first one is open by default.
  const [openGroup, setOpenGroup] = useState<string>(TOKEN_GROUPS[0].label);

  return (
    <Card className={cn("p-6", className)}>
      {/* Desktop / tablet: static grid of all groups */}
      <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
        {TOKEN_GROUPS.map((group) => (
          <TokenGroupColumn key={group.label} group={group} />
        ))}
      </div>

      {/* Mobile: collapsible per group */}
      <div className="flex flex-col divide-y divide-border md:hidden">
        {TOKEN_GROUPS.map((group) => (
          <MobileTokenGroup
            key={group.label}
            group={group}
            isOpen={openGroup === group.label}
            onToggle={() =>
              setOpenGroup((current) => (current === group.label ? "" : group.label))
            }
          />
        ))}
      </div>
    </Card>
  );
}

function TokenGroupColumn({ group }: { group: TokenGroup }) {
  return (
    <div className="space-y-3">
      <Heading level="h4" className="text-sm uppercase tracking-wide text-foreground-muted">
        {group.label}
      </Heading>
      <ul className="space-y-2">
        {group.items.map((item) => (
          <li key={item.name} className="space-y-0.5">
            <code className="font-mono text-sm text-foreground">{item.name}</code>
            <Text variant="muted" size="xs">
              {item.desc}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileTokenGroup({
  group,
  isOpen,
  onToggle,
}: {
  group: TokenGroup;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-2 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <span className="font-display text-sm font-medium uppercase tracking-wide text-foreground-muted">
          {group.label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-150",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <ul id={panelId} className="mt-2 space-y-2">
          {group.items.map((item) => (
            <li key={item.name} className="space-y-0.5">
              <code className="font-mono text-sm text-foreground">{item.name}</code>
              <Text variant="muted" size="xs">
                {item.desc}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
