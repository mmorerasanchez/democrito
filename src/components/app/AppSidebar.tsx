import { useState } from "react";
import { NavLink } from "@/components/app/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

const topItems = [
  { title: "Overview",  url: "/"          },
  { title: "AI",        url: "/ai"        },
  { title: "Manifesto", url: "/manifesto" },
];

const designItems = [
  { title: "Tokens",    url: "/tokens"    },
  { title: "Atoms",     url: "/atoms"     },
  { title: "Molecules", url: "/molecules" },
  { title: "Organisms", url: "/organisms" },
  { title: "Templates", url: "/templates" },
];

const navLinkTop =
  "flex items-center rounded-md px-3 py-2 font-display text-sm font-medium text-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

const navLinkSub =
  "flex items-center rounded-md py-2 pl-6 pr-3 font-mono text-xs text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

const navLinkActive = "bg-sidebar-accent text-accent";

export function AppSidebar() {
  const [designOpen, setDesignOpen] = useState(true);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="pt-6">
        {/* Documentation */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
            Documentation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {topItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={navLinkTop}
                      activeClassName={navLinkActive}
                    >
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Design */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Collapsible open={designOpen} onOpenChange={setDesignOpen}>
              <CollapsibleTrigger asChild>
                <button className="flex w-full items-center justify-between rounded-md px-3 py-1.5 font-mono text-2xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
                  <span>Design</span>
                  <ChevronRight
                    className={`h-3 w-3 shrink-0 transition-transform duration-150 ${
                      designOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="mt-0.5">
                  {designItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={navLinkSub}
                          activeClassName={navLinkActive}
                        >
                          {item.title}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
