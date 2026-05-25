import { PageMeta } from "@/components/PageMeta";
import { Heading } from "@/components/atoms";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Heart } from "lucide-react";
import {
  FileArchitectureSection,
  HeroSection,
} from "@/components/organisms/ai";

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 509.64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z" />
    </svg>
  );
}

const platforms = [
  {
    path: "/ai/claude",
    icon: ClaudeIcon,
    name: "Claude",
    badge: "Anthropic",
    desc: "Attach design-tokens.json as context and describe your brand. Claude generates a complete new theme in natural language.",
  },
  {
    path: "/ai/vibe-coding",
    icon: Heart,
    name: "Vibe Coding Tools",
    badge: "Lovable · Stitch · Replit",
    desc: "Fork the repo and prompt your visual direction. No terminal needed.",
  },
  {
    path: "/ai/github",
    icon: Github,
    name: "GitHub",
    badge: "Open Source",
    desc: "Edit src/index.css directly. Two variables change the whole personality.",
  },
];

/**
 * /ai — documentation page rendered inside ShowcaseLayout.
 * Sibling of Overview, Tokens, Atoms, etc. — uses the showcase
 * page pattern (page header + section blocks).
 */
export default function AiPage() {
  return (
    <div className="space-y-12">
      <PageMeta
        title="AI Integration"
        description="Three-file architecture for Claude, Lovable, GitHub, and any LLM. Drop in democrito and every AI agent renders on-brand."
        path="/ai"
      />
      <div className="space-y-4">
        <Heading level="h1">AI Integration</Heading>
        <p className="max-w-2xl font-body text-base text-muted-foreground">
          The first open-source design system with structured AI context files.
          3-file architecture, vibe coding and LLM plugs, and open-sourced, fully customizable.
        </p>
      </div>

      <HeroSection />
      <FileArchitectureSection />

      {/* Distribution */}
      <section className="space-y-4">
        <Heading level="h2">Distribution</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors duration-150 hover:border-accent-subtle"
            >
              <div className="flex items-center justify-between">
                <item.icon className="h-4 w-4 text-accent" />
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">{item.badge}</p>
              </div>
              <p className="font-body text-sm text-muted-foreground">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
