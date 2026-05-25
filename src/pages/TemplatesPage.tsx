import { PageMeta } from "@/components/PageMeta";
import { Heading } from "@/components/atoms";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { EditorLayout } from "@/components/templates/EditorLayout";
import { LibraryLayout } from "@/components/templates/LibraryLayout";
import { DetailLayout } from "@/components/templates/DetailLayout";
import { ComparisonLayout } from "@/components/templates/ComparisonLayout";
import { Badge } from "@/components/ui/badge";

function LiveDemo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-md border border-border overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-1.5">
        <Badge variant="outline" size="sm"><span className="font-mono">live</span></Badge>
        <span className="font-mono text-2xs text-muted-foreground">{title}</span>
      </div>
      <div className="h-[280px]">{children}</div>
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground p-4">
      {label}
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="space-y-12">
      <PageMeta
        title="Templates"
        description="7 full-page layouts — App Shell, Dashboard, Editor, Library, Detail View, Settings, Auth."
        path="/templates"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Templates · democrito",
          "description": "7 full-page layouts — App Shell, Dashboard, Editor, Library, Detail View, Settings, Auth.",
          "url": "https://democrito.design/templates",
          "isPartOf": { "@type": "SoftwareApplication", "name": "democrito" },
        }}
      />
      <div>
        <Heading level="h1">Templates</Heading>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Page layout templates that define content zones and responsive behavior. Templates compose organisms into full-page structures.
        </p>
        <p className="mt-0.5 font-mono text-xs text-foreground-subtle">7 templates</p>
      </div>

      <TemplatePreview
        title="App Shell"
        description="CSS Grid: sidebar column + header row + content area. 100vh. Used by all authenticated pages."
        composedOf="SidebarNav + TopBar + main content area"
        responsive="Sidebar becomes overlay drawer on mobile"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar (240px)" },
          { label: "Top Bar (56px)" },
          { label: "Main Content" },
        ]}
      />

      <TemplatePreview
        title="Dashboard Layout"
        description="Max-width content within App Shell. Vertical stack: stats row → quick actions → activity feed."
        composedOf="AppShell + DashboardStats + ActivityFeed"
        responsive="Stats: 2-col mobile → 4-col desktop"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar" },
          { label: "Top Bar" },
          { label: "Stats → Actions → Feed" },
        ]}
      />

      <TemplatePreview
        title="Editor Layout"
        description="Split-pane: left editor (50%) + resizer (4px) + right preview/playground (50%). Collapses to stacked on mobile."
        composedOf="AppShell + Editor pane + Preview pane"
        responsive="Split-pane collapses to stacked on md and below"
        layout="split-pane"
        zones={[]}
      />
      <LiveDemo title="EditorLayout">
        <EditorLayout
          header={<Placeholder label="Header" />}
          editor={<Placeholder label="Editor Pane" />}
          preview={<Placeholder label="Preview Pane" />}
        />
      </LiveDemo>

      <TemplatePreview
        title="Library Layout"
        description="FilterBar + card grid/list + Pagination + Bulk Actions (conditional). Card grid: 1-col mobile, 2-col md, 3-col lg."
        composedOf="AppShell + FilterBar + Card grid + Pagination + BulkActionsBar"
        responsive="1-col mobile → 2-col md → 3-col lg"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar" },
          { label: "Top Bar + FilterBar" },
          { label: "Card Grid + Pagination" },
        ]}
      />
      <LiveDemo title="LibraryLayout">
        <LibraryLayout
          filters={<Placeholder label="FilterBar" />}
          pagination={<Placeholder label="Pagination" />}
        >
          <Placeholder label="Card 1" />
          <Placeholder label="Card 2" />
          <Placeholder label="Card 3" />
        </LibraryLayout>
      </LiveDemo>

      <TemplatePreview
        title="Detail View Layout"
        description="Header with breadcrumb + title + lifecycle bar + actions. Tabs below. Content area."
        composedOf="AppShell + BreadcrumbNav + Status indicator + Tabs"
        responsive="Full-width on mobile"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar" },
          { label: "Breadcrumb + Lifecycle" },
          { label: "Tabs + Tab Content" },
        ]}
      />
      <LiveDemo title="DetailLayout">
        <DetailLayout
          breadcrumb={<Placeholder label="Breadcrumb" />}
          titleBar={<Placeholder label="Title + Actions" />}
          statusBar={<Placeholder label="Status Lifecycle" />}
          tabs={<Placeholder label="Tabs Nav" />}
        >
          <Placeholder label="Tab Content Area" />
        </DetailLayout>
      </LiveDemo>

      <TemplatePreview
        title="Settings Layout"
        description="Horizontal SettingsNav tabs below header + content area below. Text-only nav with active state."
        composedOf="AppShell + SettingsNav (horizontal tabs) + Form content"
        responsive="Tabs scroll horizontally on mobile"
        layout="sidebar-settings"
        zones={[]}
      />

      <TemplatePreview
        title="Auth Layout"
        description="Centered card (400px max) on full-height background. Logo + auth form + footer links."
        composedOf="AuthForm + branding + footer"
        responsive="Full-width card on mobile"
        layout="centered"
        zones={[{ label: "Auth Card (400px)" }]}
      />

      <TemplatePreview
        title="Modal Layout"
        description="Centered modal covering 60–80% of the viewport over a dimmed overlay. Used for dialogs, wizards, and detail views."
        composedOf="Dialog + overlay backdrop + content area"
        responsive="Full-screen on mobile, 80% on tablet, 60% on desktop"
        layout="modal-overlay"
        zones={[{ label: "Modal Content (60–80%)" }]}
      />

      <TemplatePreview
        title="Comparison Layout"
        description="Toolbar with version selectors + sync toggle + close button. 2-column diff view below."
        composedOf="Toolbar + 2-col diff"
        responsive="Stacked columns on mobile"
        layout="comparison"
        zones={[]}
      />
      <LiveDemo title="ComparisonLayout">
        <ComparisonLayout
          toolbar={<Placeholder label="Toolbar: Version A ↔ Version B" />}
          panelA={<Placeholder label="Version A" />}
          panelB={<Placeholder label="Version B" />}
        />
      </LiveDemo>
    </div>
  );
}
