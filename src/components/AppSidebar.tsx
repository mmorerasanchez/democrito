import { useState } from "react";
import { NavLink } from "@/components/NavLink";
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
  { title: "README",      url: "/"          },
  { title: "AI",          url: "/ai"        },
  { title: "MANIFIESTO",  url: "/manifesto" },
];

const designItems = [
  { title: "Tokens",    url: "/tokens"    },
  { title: "Atoms",     url: "/atoms"     },
  { title: "Molecules", url: "/molecules" },
  { title: "Organisms", url: "/organisms" },
  { title: "Layouts",   url: "/pages"     },
];

const navLinkBase =
  "flex items-center rounded-md px-3 py-2 font-mono text-2xs uppercase tracking-widest text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

const navLinkActive = "bg-sidebar-accent text-accent";

export function AppSidebar() {
  const [designOpen, setDesignOpen] = useState(true);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
            Documentation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              {/* README, AI, MANIFIESTO */}
              {topItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={navLinkBase}
                      activeClassName={navLinkActive}
                    >
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* DESIGN — collapsible */}
              <Collapsible open={designOpen} onOpenChange={setDesignOpen}>
                <CollapsibleTrigger asChild>
                  <button
                    className={`${navLinkBase} w-full justify-between`}
                  >
                    <span>DESIGN</span>
                    <ChevronRight
                      className={`h-3 w-3 shrink-0 transition-transform duration-150 ${
                        designOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-0.5 space-y-0.5">
                    {designItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            end
                            className="flex items-center rounded-md py-2 pl-6 pr-3 font-mono text-xs text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            activeClassName={navLinkActive}
                          >
                            {item.title}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
