import { useState } from "react";
import { TopBar } from "@/components/organisms/TopBar";
import { SidebarNav } from "@/components/organisms/SidebarNav";
import { DataTable } from "@/components/organisms/DataTable";
import { AuthForm } from "@/components/organisms/AuthForm";
import { BulkActionsBar } from "@/components/organisms/BulkActionsBar";
import { FilterBar } from "@/components/organisms/FilterBar";
import { DashboardStats } from "@/components/organisms/DashboardStats";
import { ActivityFeed } from "@/components/organisms/ActivityFeed";
import { ImportDialog } from "@/components/organisms/ImportDialog";
import { ExportMenu } from "@/components/organisms/ExportMenu";
import { UserMenu } from "@/components/organisms/UserMenu";
import { SettingsNav } from "@/components/organisms/SettingsNav";
import { APIKeyManager } from "@/components/organisms/APIKeyManager";
import { IntegrationCard } from "@/components/organisms/IntegrationCard";
import { OnboardingWizard } from "@/components/organisms/OnboardingWizard";
import { RunHistory } from "@/components/organisms/RunHistory";
import { APIDocPanel } from "@/components/organisms/APIDocPanel";
import { OrganizationManager } from "@/components/organisms/OrganizationManager";
import { DataManager } from "@/components/organisms/DataManager";
import { Badge } from "@/components/ui/badge";

function CategoryHeader({ id, title, description, count }: { id: string; title: string; description: string; count: number }) {
  return (
    <div id={id} className="scroll-mt-6 border-t border-border pt-8">
      <div className="flex items-baseline gap-3">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        <span className="font-mono text-2xs text-muted-foreground">{count} components</span>
      </div>
      <p className="mt-0.5 font-body text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function Section({ id, title, description, composedOf, children }: { id: string; title: string; description: string; composedOf?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <div>
        <h3 className="font-display text-base font-medium tracking-tight">{title}</h3>
        <p className="font-body text-sm text-muted-foreground">{description}</p>
        {composedOf && <p className="mt-1 font-mono text-2xs text-accent">Composed of: {composedOf}</p>}
      </div>
      <div className="relative rounded-lg border border-border overflow-hidden">
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <pre className="m-4 rounded-md border border-border bg-muted p-3 font-mono text-2xs text-muted-foreground overflow-x-auto">{children}</pre>;
}

const sampleTableData = [
  { name: "Customer Support Bot", status: "production", tokens: 2847, updated: "2h ago" },
  { name: "Code Review Assistant", status: "testing", tokens: 1523, updated: "5h ago" },
  { name: "Marketing Copy Writer", status: "draft", tokens: 890, updated: "1d ago" },
  { name: "Data Analysis Helper", status: "production", tokens: 3201, updated: "3d ago" },
  { name: "Email Template Generator", status: "archived", tokens: 1100, updated: "1w ago" },
];

const activityItems = [
  { actor: "Mariano", initials: "MR", action: "updated", resource: "Customer Support Bot v3", time: "2 minutes ago" },
  { actor: "Jane", initials: "JD", action: "created evaluation for", resource: "Code Review Assistant", time: "1 hour ago" },
  { actor: "Alex", initials: "AK", action: "promoted to production", resource: "Data Analysis Helper", time: "3 hours ago" },
  { actor: "Mariano", initials: "MR", action: "added variable to", resource: "Marketing Copy Writer", time: "yesterday" },
];

export default function OrganismsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [bulkCount, setBulkCount] = useState(3);

  const categories = [
    { id: "cat-navigation", label: "Navigation & Layout", count: 5, ids: ["topbar", "sidebar", "filterbar", "bulkactions", "usermenu"] },
    { id: "cat-dashboard", label: "Dashboard & Data", count: 6, ids: ["datatable", "dashstats", "activityfeed", "authform", "runhistory", "apidocpanel"] },
    { id: "cat-settings", label: "Settings & Config", count: 5, ids: ["settingsnav", "apikeymanager", "integrationcard", "onboardingwizard", "orgmanager"] },
    { id: "cat-io", label: "Import & Export", count: 3, ids: ["importdialog", "exportmenu", "datamanager"] },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Organisms</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Complex components composed of molecules and atoms. These form the major UI sections.
        </p>
        <p className="mt-0.5 font-mono text-xs text-foreground-subtle">19 components · 4 categories</p>
      </div>

      {/* ── CATEGORY JUMP NAV ── */}
      <nav className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-display text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {cat.label}
            <span className="font-mono text-2xs text-muted-foreground">{cat.count}</span>
          </a>
        ))}
      </nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Navigation & Layout                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-navigation" title="Navigation & Layout" description="App chrome, menus, and toolbar components." count={5} />

      {/* ── TOP BAR ── */}
      <Section id="topbar" title="Top Bar / Header" description="56px sticky header with search command button." composedOf="SearchBar + Kbd">
        <TopBar />
        <CodeBlock>{`<TopBar onMenuClick={fn} actions={<Button />} />`}</CodeBlock>
      </Section>

      {/* ── SIDEBAR ── */}
      <Section id="sidebar" title="Sidebar Navigation" description="240px expanded, 64px collapsed. Surface bg with nav items and user footer." composedOf="NavItem + Avatar + Separator + Button">
        <div className="flex h-[360px]">
          <SidebarNav
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeItem="library"
          />
          <div className="flex-1 flex items-center justify-center bg-background">
            <p className="font-body text-sm text-muted-foreground">
              Main content area · Sidebar is {sidebarCollapsed ? "collapsed" : "expanded"}
            </p>
          </div>
        </div>
        <CodeBlock>{`<SidebarNav collapsed={boolean} onToggle={fn} activeItem="library" />`}</CodeBlock>
      </Section>

      {/* ── FILTER BAR ── */}
      <Section id="filterbar" title="Filter Bar" description="Search + status chips + sort + view toggle for library filtering." composedOf="SearchBar + Badge chips + Select + Button group">
        <div className="p-4">
          <FilterBar search={filterSearch} onSearchChange={setFilterSearch} />
        </div>
        <CodeBlock>{`<FilterBar search={search} onSearchChange={setSearch} />`}</CodeBlock>
      </Section>

      {/* ── BULK ACTIONS BAR ── */}
      <Section id="bulkactions" title="Bulk Actions Bar" description="Sticky bottom bar for multi-select actions. Slides in from bottom." composedOf="Badge count + Button group + dismiss">
        <div className="relative h-24 bg-background flex items-end justify-center">
          <BulkActionsBar
            selectedCount={bulkCount}
            onDismiss={() => setBulkCount(0)}
            onDelete={() => {}}
          />
        </div>
        <CodeBlock>{`<BulkActionsBar selectedCount={3} onDismiss={fn} onMove={fn} onTag={fn} onArchive={fn} onDelete={fn} />`}</CodeBlock>
      </Section>

      {/* ── USER MENU ── */}
      <Section id="usermenu" title="User Menu" description="Dropdown-like user menu with profile info, navigation, and logout." composedOf="Avatar + Badge + Button list">
        <div className="p-4">
          <UserMenu name="Mariano Rivera" email="user@example.com" plan="Pro" />
        </div>
        <CodeBlock>{`<UserMenu name="Mariano" email="user@example.com" plan="Pro" onLogout={fn} />`}</CodeBlock>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Dashboard & Data                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-dashboard" title="Dashboard & Data" description="Data display, metrics, authentication, and activity tracking." count={6} />

      {/* ── DATA TABLE ── */}
      <Section id="datatable" title="Data Table" description="Sortable columns, mono headers uppercase, hover with orange left border accent." composedOf="Table headers + sortable columns + rows + pagination">
        <div className="p-4">
          <DataTable
            columns={[
              { key: "name", header: "Name", sortable: true },
              { key: "status", header: "Status", sortable: true, render: (row) => <Badge variant={row.status as "draft" | "testing" | "production" | "archived"} size="sm">{String(row.status)}</Badge> },
              { key: "tokens", header: "Tokens", sortable: true },
              { key: "updated", header: "Updated" },
            ]}
            data={sampleTableData}
            pageSize={3}
            onRowClick={() => {}}
          />
        </div>
        <CodeBlock>{`<DataTable columns={[...]} data={[...]} pageSize={5} onRowClick={fn} />`}</CodeBlock>
      </Section>

      {/* ── AUTH FORM ── */}
      <Section id="authform" title="Auth Form" description="Centered card with social login, email/password, and mode toggle (login/signup)." composedOf="FormField + Input + Button + Separator + Social buttons">
        <div className="flex flex-wrap gap-8 p-6 justify-center bg-background">
          <AuthForm mode="login" />
          <AuthForm mode="signup" />
        </div>
        <CodeBlock>{`<AuthForm mode="login | signup" onSubmit={fn} />`}</CodeBlock>
      </Section>

      {/* ── DASHBOARD STATS ── */}
      <Section id="dashstats" title="Dashboard Stats" description="4-column stat grid. Auto-fit min 200px columns." composedOf="StatCard × 4">
        <div className="p-4">
          <DashboardStats />
        </div>
        <CodeBlock>{`<DashboardStats />`}</CodeBlock>
      </Section>

      {/* ── ACTIVITY FEED ── */}
      <Section id="activityfeed" title="Activity Feed" description="Scrollable list of activity items. Max-height 400px." composedOf="Avatar + Text + Code + timestamps">
        <div className="p-4">
          <ActivityFeed items={activityItems} />
        </div>
        <CodeBlock>{`<ActivityFeed items={[{ actor, initials, action, resource, time }]} />`}</CodeBlock>
      </Section>

      {/* ── RUN HISTORY ── */}
      <Section
        id="runhistory"
        title="Run History"
        description="Scrollable list of playground/evaluation run entries with success/error header stats."
        composedOf="RunHistoryItem × N + summary header"
      >
        <RunHistory
          runs={[
            { id: "1", runId: "#1042", model: "claude-3.5-sonnet", status: "success", tokens: 1247, latencyMs: 820, timestamp: "2m ago" },
            { id: "2", runId: "#1041", model: "gpt-4-turbo",       status: "error",   tokens: 0,    latencyMs: 1500, timestamp: "5m ago" },
            { id: "3", runId: "#1040", model: "claude-3.5-sonnet", status: "running", tokens: 340,  timestamp: "8m ago" },
            { id: "4", runId: "#1039", model: "gemini-1.5-pro",    status: "pending", timestamp: "12m ago" },
          ]}
        />
        <CodeBlock>{`<RunHistory runs={[...]} onRunClick={fn} />`}</CodeBlock>
      </Section>

      {/* ── API DOC PANEL ── */}
      <Section
        id="apidocpanel"
        title="API Doc Panel"
        description="Collapsible API endpoint documentation with HTTP method badges and sample request/response code."
        composedOf="Badge (method) + endpoint list + code blocks"
      >
        <APIDocPanel />
        <CodeBlock>{`<APIDocPanel />`}</CodeBlock>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Settings & Config                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-settings" title="Settings & Config" description="API keys, integrations, onboarding, and settings navigation." count={5} />

      {/* ── SETTINGS NAV ── */}
      <Section id="settingsnav" title="Settings Nav" description="Horizontal tab navigation for settings pages. Wraps TabNav molecule." composedOf="TabNav">
        <div className="p-4">
          <SettingsNavDemo />
        </div>
        <CodeBlock>{`<SettingsNav sections={[{ label: "General", value: "general" }]} activeSection="general" onSectionChange={fn} />`}</CodeBlock>
      </Section>

      {/* ── API KEY MANAGER ── */}
      <Section id="apikeymanager" title="API Key Manager" description="Manages API keys with masked values, reveal toggle, add form, and delete." composedOf="Input + Button + Badge + eye toggle">
        <div className="p-4 max-w-xl">
          <APIKeyManager
            keys={[
              { id: "1", name: "openai-prod", provider: "OpenAI", maskedValue: "sk-••••••••••••3kF9", createdAt: "2 weeks ago" },
              { id: "2", name: "anthropic-dev", provider: "Anthropic", maskedValue: "sk-ant-••••••••Xy2z", createdAt: "3 days ago" },
            ]}
          />
        </div>
        <CodeBlock>{`<APIKeyManager keys={[{ id, name, provider, maskedValue, createdAt }]} onAdd={fn} onDelete={fn} />`}</CodeBlock>
      </Section>

      {/* ── INTEGRATION CARD ── */}
      <Section id="integrationcard" title="Integration Card" description="External service card with connection status and connect/disconnect actions." composedOf="Badge + Button + avatar">
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <IntegrationCard name="OpenAI API" provider="OpenAI" description="GPT-4, GPT-3.5 Turbo, and DALL·E models for generation and analysis." connected status="active" />
          <IntegrationCard name="Anthropic API" provider="Anthropic" description="Claude models for safe, helpful AI assistance." connected status="active" />
          <IntegrationCard name="Google AI" provider="Google" description="Gemini models for multimodal understanding." status="inactive" />
        </div>
        <CodeBlock>{`<IntegrationCard name="OpenAI" provider="OpenAI" description="..." connected status="active" onConnect={fn} />`}</CodeBlock>
      </Section>

      {/* ── ONBOARDING WIZARD ── */}
      <Section id="onboardingwizard" title="Onboarding Wizard" description="Step-by-step onboarding flow with progress indicator and navigation." composedOf="Badge + Button + step circles">
        <div className="p-4 max-w-lg">
          <OnboardingWizardDemo />
        </div>
        <CodeBlock>{`<OnboardingWizard steps={[{ id, title, description, completed }]} currentStep={0} onNext={fn} onSkip={fn} />`}</CodeBlock>
      </Section>

      {/* ── ORGANIZATION MANAGER ── */}
      <Section
        id="orgmanager"
        title="Organization Manager"
        description="Tab and tag management for workspace organization — create, rename, reorder, and delete."
        composedOf="Input + Badge + Dialog + RadioGroup + Button"
      >
        <OrganizationManager />
        <CodeBlock>{`<OrganizationManager />`}</CodeBlock>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Import & Export                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-io" title="Import & Export" description="Content import and export in multiple formats." count={3} />

      {/* ── IMPORT DIALOG ── */}
      <Section id="importdialog" title="Import Dialog" description="Multi-format import with paste area and file drop zone." composedOf="Textarea + Button + format selector">
        <div className="p-4 max-w-lg">
          <ImportDialog />
        </div>
        <CodeBlock>{`<ImportDialog onImport={(content, format) => {}} onCancel={fn} />`}</CodeBlock>
      </Section>

      {/* ── EXPORT MENU ── */}
      <Section id="exportmenu" title="Export Menu" description="Format picker for exporting prompts in JSON, CSV, YAML, Markdown, or clipboard." composedOf="Button list + icons + descriptions">
        <div className="p-4">
          <ExportMenu promptName="Customer Support Bot" />
        </div>
        <CodeBlock>{`<ExportMenu promptName="Customer Support Bot" onExport={(format) => {}} />`}</CodeBlock>
      </Section>

      {/* ── DATA MANAGER ── */}
      <Section
        id="datamanager"
        title="Data Manager"
        description="Export, import, and clear workspace data — with confirmation dialogs for destructive actions."
        composedOf="Checkbox + Button + Dialog"
      >
        <DataManager />
        <CodeBlock>{`<DataManager />`}</CodeBlock>
      </Section>
    </div>
  );
}

/** Demo wrapper for SettingsNav with local state */
function SettingsNavDemo() {
  const [active, setActive] = useState("general");
  return (
    <SettingsNav
      sections={[
        { label: "General", value: "general" },
        { label: "API Keys", value: "api-keys" },
        { label: "Integrations", value: "integrations" },
        { label: "Team", value: "team" },
        { label: "Billing", value: "billing" },
        { label: "Advanced", value: "advanced", disabled: true },
      ]}
      activeSection={active}
      onSectionChange={setActive}
    />
  );
}

/** Demo wrapper for OnboardingWizard with local state */
function OnboardingWizardDemo() {
  const [step, setStep] = useState(1);
  const steps = [
    { id: "connect", title: "Connect an Account", description: "Authenticate to start using the workspace.", completed: true },
    { id: "create", title: "Create Your First Project", description: "Use the editor to set up a new workspace project.", completed: false },
    { id: "test", title: "Run a Test", description: "Validate your setup with a test run before going live.", completed: false },
    { id: "deploy", title: "Deploy to Production", description: "Promote your project from staging to production when it's ready.", completed: false },
  ];
  return (
    <OnboardingWizard
      steps={steps}
      currentStep={step}
      onStepClick={setStep}
      onNext={() => setStep(Math.min(step + 1, steps.length - 1))}
    />
  );
}
