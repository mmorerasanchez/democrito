import { useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import { SearchBar } from "@/components/molecules/SearchBar";
import { NavItem } from "@/components/molecules/NavItem";
import { StatCard } from "@/components/molecules/StatCard";
import { AvatarGroup } from "@/components/molecules/AvatarGroup";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { TokenCounter } from "@/components/molecules/TokenCounter";
import { EmptyState } from "@/components/molecules/EmptyState";
import { TabNav } from "@/components/molecules/TabNav";
import { ParameterControl } from "@/components/molecules/ParameterControl";
import { VariableHighlight } from "@/components/molecules/VariableHighlight";
import { FieldHeader } from "@/components/molecules/FieldHeader";
import { DiffLine } from "@/components/molecules/DiffLine";
import { ActivityFeedItem } from "@/components/molecules/ActivityFeedItem";
import { VariableEditorRow } from "@/components/molecules/VariableEditorRow";
import { RunHistoryItem } from "@/components/molecules/RunHistoryItem";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Home, FileText, Settings, BarChart3, Users, Search, Lock, ChevronDown, ChevronUp } from "lucide-react";

function Section({ id, title, description, composedOf, children }: { id: string; title: string; description: string; composedOf?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-medium tracking-tight">{title}</h2>
        <p className="font-body text-sm text-muted-foreground">{description}</p>
        {composedOf && (
          <p className="mt-1 font-mono text-2xs text-accent">Composed of: {composedOf}</p>
        )}
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card p-6 space-y-6">{children}</div>
    </section>
  );
}

function TabNavDemo() {
  const [active, setActive] = useState("profile");
  return (
    <TabNav
      items={[
        { label: "Profile", value: "profile" },
        { label: "Presets", value: "presets" },
        { label: "Defaults", value: "defaults" },
        { label: "Variables", value: "variables", icon: Lock, disabled: true },
        { label: "Organization", value: "org" },
        { label: "Data", value: "data" },
      ]}
      value={active}
      onValueChange={setActive}
    />
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-2 rounded-md border border-border bg-muted p-3 font-mono text-2xs text-muted-foreground overflow-x-auto">
      {children}
    </pre>
  );
}

export default function MoleculesPage() {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("prompts");

  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [varName, setVarName] = useState("user_name");
  const [varValue, setVarValue] = useState("John Doe");

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Molecules</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Composite components built from atoms. Each molecule combines 2+ atoms into a reusable pattern.
        </p>
      </div>

      {/* ── FORM FIELD ── */}
      <Section id="form-field" title="Form Field" description="Label + Input + Helper/Error text. Vertical layout with consistent spacing." composedOf="Label + Input/Textarea/Select + Helper/Error text">
        <SubSection title="Variants">
          <div className="grid gap-4 max-w-sm">
            <FormField label="Prompt Name" htmlFor="ff-1" helper="A descriptive name for your prompt">
              <Input id="ff-1" placeholder="e.g. Customer Support Bot" />
            </FormField>
            <FormField label="Model" htmlFor="ff-2" required>
              <Select>
                <SelectTrigger id="ff-2" className="font-mono"><SelectValue placeholder="Select model…" /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="claude">claude-3.5-sonnet</SelectItem>
                  <SelectItem value="gpt4">gpt-4-turbo</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="System Prompt" htmlFor="ff-3" error="System prompt is required">
              <Textarea id="ff-3" error placeholder="Enter system prompt…" />
            </FormField>
          </div>
        </SubSection>
        <CodeBlock>{`<FormField label="Name" required helper="..." error="..."><Input /></FormField>`}</CodeBlock>
      </Section>

      {/* ── SEARCH BAR ── */}
      <Section id="search-bar" title="Search Bar" description="Input with search icon, clear button, and keyboard shortcut hint." composedOf="Icon + Input + Clear Button + Kbd">
        <div className="max-w-md">
          <SearchBar value={search} onChange={setSearch} placeholder="Search prompts…" />
        </div>
        <CodeBlock>{`<SearchBar value={search} onChange={setSearch} placeholder="..." showShortcut />`}</CodeBlock>
      </Section>

      {/* ── NAV ITEM ── */}
      <Section id="nav-item" title="Nav Item" description="Sidebar navigation item with icon, label, optional badge count." composedOf="Icon + Label + Badge count">
        <SubSection title="States">
          <div className="max-w-[240px] space-y-1">
            <NavItem icon={Home} label="Dashboard" active={activeNav === "dashboard"} onClick={() => setActiveNav("dashboard")} />
            <NavItem icon={FileText} label="Prompts" active={activeNav === "prompts"} onClick={() => setActiveNav("prompts")} count={12} />
            <NavItem icon={BarChart3} label="Evaluations" active={activeNav === "evaluations"} onClick={() => setActiveNav("evaluations")} />
            <NavItem icon={Settings} label="Settings" active={activeNav === "settings"} onClick={() => setActiveNav("settings")} />
            <NavItem icon={Users} label="Team" disabled />
          </div>
        </SubSection>
        <SubSection title="Collapsed">
          <div className="max-w-[64px] space-y-1">
            <NavItem icon={Home} label="Dashboard" collapsed />
            <NavItem icon={FileText} label="Prompts" collapsed active />
            <NavItem icon={Settings} label="Settings" collapsed />
          </div>
        </SubSection>
        <CodeBlock>{`<NavItem icon={Home} label="Dashboard" active count={12} collapsed disabled />`}</CodeBlock>
      </Section>

      {/* ── STAT CARD ── */}
      <Section id="stat-card" title="Stat Card" description="KPI display with label, mono value, and trend indicator." composedOf="Label + Value (font-mono) + Trend">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Prompts" value="1,247" trend={{ direction: "up", value: "+12.5%" }} />
          <StatCard label="Evaluations" value="384" trend={{ direction: "down", value: "-3.2%" }} />
          <StatCard label="Avg Score" value="87.3" trend={{ direction: "neutral", value: "0.0%" }} />
          <StatCard label="Active Users" value="23" trend={{ direction: "up", value: "+2" }} />
        </div>
        <CodeBlock>{`<StatCard label="Total Prompts" value="1,247" trend={{ direction: "up", value: "+12.5%" }} />`}</CodeBlock>
      </Section>

      {/* ── AVATAR GROUP ── */}
      <Section id="avatar-group" title="Avatar Group" description="Avatar with name and optional role text." composedOf="Avatar + Name + Role text">
        <SubSection title="Sizes">
          <div className="space-y-4">
            <AvatarGroup name="Mariano R." role="Designer" size="sm" status="online" />
            <AvatarGroup name="Jane Doe" role="Engineer" size="md" status="busy" />
            <AvatarGroup name="Alex Kim" role="Product Manager" size="lg" status="offline" />
          </div>
        </SubSection>
        <CodeBlock>{`<AvatarGroup name="Mariano" role="Designer" size="md" status="online" />`}</CodeBlock>
      </Section>

      {/* ── BREADCRUMB ── */}
      <Section id="breadcrumb" title="Breadcrumb" description="Linked path segments with chevron separators. Truncation for long paths." composedOf="Path items + Separators">
        <SubSection title="Default">
          <BreadcrumbNav items={[
            { label: "Library", href: "#" },
            { label: "Customer Support", href: "#" },
            { label: "v3" },
          ]} />
        </SubSection>
        <SubSection title="Truncated">
          <BreadcrumbNav items={[
            { label: "Home", href: "#" },
            { label: "Projects", href: "#" },
            { label: "Workspace", href: "#" },
            { label: "Library", href: "#" },
            { label: "Customer Support", href: "#" },
            { label: "Editor" },
          ]} maxItems={4} />
        </SubSection>
        <CodeBlock>{`<BreadcrumbNav items={[{ label: "Library", href: "#" }, { label: "v3" }]} maxItems={4} />`}</CodeBlock>
      </Section>

      {/* ── TOKEN COUNTER ── */}
      <Section id="token-counter" title="Token Counter" description="Token count with thin progress bar. Color by threshold: safe/warning/danger." composedOf="Text (font-mono) + Progress (60px×3px)">
        <div className="flex flex-wrap items-center gap-8">
          <TokenCounter current={1200} max={4000} />
          <TokenCounter current={3200} max={4000} />
          <TokenCounter current={3800} max={4000} />
          <TokenCounter current={800} max={4000} compact />
        </div>
        <CodeBlock>{`<TokenCounter current={1200} max={4000} compact />`}</CodeBlock>
      </Section>

      {/* ── EMPTY STATE ── */}
      <Section id="empty-state" title="Empty State" description="Centered placeholder for empty views with title, description, and CTA." composedOf="Title + Description + CTA Button">
        <EmptyState
          title="No items yet"
          description="Create your first item to get started."
          action={{ label: "Create Item", onClick: () => {} }}
        />
        <CodeBlock>{`<EmptyState title="..." description="..." action={{ label: "Create", onClick: fn }} />`}</CodeBlock>
      </Section>

      {/* ── TAB NAV ── */}
      <Section id="tab-nav" title="Tab Nav" description="Horizontal tab navigation bar with active state and optional disabled tabs. Used for settings, detail views, and section navigation." composedOf="Button-like tabs + active highlight">
        <TabNavDemo />
        <CodeBlock>{`<TabNav items={[{ label: "Profile", value: "profile" }, { label: "Variables", value: "vars", icon: Lock, disabled: true }]} value={active} onValueChange={setActive} />`}</CodeBlock>
      </Section>

      {/* ── PARAMETER CONTROL ── */}
      <Section id="parameter-control" title="Parameter Control" description="Labeled slider + numeric input for model parameters like temperature and top_p." composedOf="Label + Slider + Input">
        <div className="max-w-sm space-y-4">
          <ParameterControl label="Temperature" value={temperature} onChange={setTemperature} min={0} max={2} step={0.01} />
          <ParameterControl label="Top P" value={topP} onChange={setTopP} min={0} max={1} step={0.01} />
          <ParameterControl label="Max Tokens" value={2048} min={1} max={8192} step={1} unit="tok" />
        </div>
        <CodeBlock>{`<ParameterControl label="Temperature" value={0.7} onChange={fn} min={0} max={2} step={0.01} />`}</CodeBlock>
      </Section>

      {/* ── VARIABLE HIGHLIGHT ── */}
      <Section id="variable-highlight" title="Variable Highlight" description="Inline styled {{variable}} token with click interaction and unresolved state." composedOf="Styled button with mono text">
        <div className="flex flex-wrap items-center gap-3">
          <VariableHighlight name="user_name" resolvedValue="John Doe" />
          <VariableHighlight name="company" resolvedValue="Acme Corp" />
          <VariableHighlight name="missing_var" unresolved />
          <VariableHighlight name="clickable" onClick={(n) => alert(`Clicked: ${n}`)} />
        </div>
        <CodeBlock>{`<VariableHighlight name="user_name" resolvedValue="John" unresolved onClick={fn} />`}</CodeBlock>
      </Section>

      {/* ── FIELD HEADER ── */}
      <Section id="field-header" title="Field Header" description="Header bar for a labeled field section with colored dot, label, token count, and actions." composedOf="Dot + Label + TokenCounter + Actions slot">
        <div className="space-y-2 max-w-lg">
          <FieldHeader field="role" label="Role" tokenCount={120} required />
          <FieldHeader field="task" label="Task" tokenCount={340} actions={<Button variant="ghost" size="sm">Edit</Button>} />
          <FieldHeader field="constraints" label="Constraints" tokenCount={80} />
          <FieldHeader field="examples" label="Examples" tokenCount={3800} tokenMax={4000} />
        </div>
        <CodeBlock>{`<FieldHeader field="role" label="Role" tokenCount={120} required actions={...} />`}</CodeBlock>
      </Section>

      {/* ── DIFF LINE ── */}
      <Section id="diff-line" title="Diff Line" description="A single line in a diff view with line number, +/− prefix, and semantic coloring." composedOf="Line number + prefix + text">
        <div className="rounded-md border border-border overflow-hidden max-w-lg">
          <DiffLine lineNumber={1} type="unchanged" text="You are a helpful assistant." />
          <DiffLine lineNumber={2} type="removed" text="Be concise in your responses." />
          <DiffLine lineNumber={3} type="added" text="Be thorough and detailed in your responses." />
          <DiffLine lineNumber={4} type="unchanged" text="Always cite your sources." />
          <DiffLine lineNumber={5} type="added" text="Use markdown formatting when appropriate." />
        </div>
        <CodeBlock>{`<DiffLine lineNumber={1} type="added" text="New line content" />`}</CodeBlock>
      </Section>

      {/* ── ACTIVITY FEED ITEM ── */}
      <Section id="activity-feed-item" title="Activity Feed Item" description="A single row in an activity feed showing user, action, target, and timestamp." composedOf="Avatar + User + Badge + Target + Timestamp">
        <div className="max-w-lg">
          <ActivityFeedItem user="Mariano" type="created" target="Customer Support Bot" timestamp="2m ago" />
          <ActivityFeedItem user="Jane" type="updated" target="Code Review v3" timestamp="15m ago" detail="Changed temperature from 0.7 to 0.3" />
          <ActivityFeedItem user="Alex" type="deployed" target="Translation Helper" timestamp="1h ago" />
          <ActivityFeedItem user="Sam" type="archived" target="Legacy Prompt" timestamp="3h ago" />
          <ActivityFeedItem user="Chris" type="commented" target="API Docs Generator" timestamp="5h ago" detail="Looks good, ready for production" />
        </div>
        <CodeBlock>{`<ActivityFeedItem user="Mariano" type="created" target="Bot" timestamp="2m ago" detail="..." />`}</CodeBlock>
      </Section>

      {/* ── VARIABLE EDITOR ROW ── */}
      <Section id="variable-editor-row" title="Variable Editor Row" description="Name/value input pair with delete button and highlight state for variable management." composedOf="Input (name) + Input (value) + Delete Button">
        <div className="max-w-lg space-y-1">
          <VariableEditorRow name={varName} value={varValue} onNameChange={setVarName} onValueChange={setVarValue} />
          <VariableEditorRow name="company" value="Acme Corp" highlighted />
          <VariableEditorRow name="role" value="" />
        </div>
        <CodeBlock>{`<VariableEditorRow name="user" value="John" highlighted onDelete={fn} />`}</CodeBlock>
      </Section>

      {/* ── RUN HISTORY ITEM ── */}
      <Section id="run-history-item" title="Run History Item" description="A single run entry showing model, status, token usage, latency, and timestamp." composedOf="Run ID + Model + Status Badge + Tokens + Latency + Timestamp">
        <div className="rounded-md border border-border overflow-hidden max-w-2xl">
          <RunHistoryItem runId="#1042" model="claude-3.5-sonnet" status="success" tokens={1247} latencyMs={820} timestamp="2m ago" />
          <RunHistoryItem runId="#1041" model="gpt-4-turbo" status="error" tokens={0} latencyMs={1500} timestamp="5m ago" />
          <RunHistoryItem runId="#1040" model="claude-3.5-sonnet" status="running" tokens={340} timestamp="8m ago" />
          <RunHistoryItem runId="#1039" model="gemini-1.5-pro" status="pending" timestamp="12m ago" />
        </div>
        <CodeBlock>{`<RunHistoryItem runId="#1042" model="claude-3.5-sonnet" status="success" tokens={1247} latencyMs={820} timestamp="2m ago" />`}</CodeBlock>
      </Section>

    </div>
  );
}
