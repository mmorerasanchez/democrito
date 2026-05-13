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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Home, Palette, Box, Layers, LayoutGrid, Layout, Bot, ChevronRight } from "lucide-react";

const standaloneTop = [
  { title: "README", url: "/", icon: Home },
];

const designItems = [
  { title: "Tokens",    url: "/tokens",    icon: Palette    },
  { title: "Atoms",     url: "/atoms",     icon: Box        },
  { title: "Molecules", url: "/molecules", icon: Layers     },
  { title: "Organisms", url: "/organisms", icon: LayoutGrid },
  { title: "Layouts",   url: "/pages",     icon: Layout     },
];

const standaloneBottom = [
  { title: "AI", url: "/ai", icon: Bot },
];

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

              {/* README — standalone */}
              {standaloneTop.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-display font-medium text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-accent"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* DESIGN — collapsible group */}
              <Collapsible open={designOpen} onOpenChange={setDesignOpen}>
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-display font-medium text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform duration-150 ${designOpen ? "rotate-90" : ""}`}
                    />
                    <span className="font-mono text-2xs uppercase tracking-widest">DESIGN</span>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {designItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className="flex items-center gap-3 rounded-md pl-8 pr-3 py-2 text-sm font-display font-medium text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          activeClassName="bg-sidebar-accent text-accent"
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* AI — standalone */}
              {standaloneBottom.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-display font-medium text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-accent"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
