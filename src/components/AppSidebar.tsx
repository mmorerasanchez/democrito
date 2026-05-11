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
import { Home, Palette, Box, Layers, LayoutGrid, Layout, Bot } from "lucide-react";

const navItems = [
  { title: "Overview", url: "/", icon: Home },
  { title: "Tokens", url: "/tokens", icon: Palette },
  { title: "Atoms", url: "/atoms", icon: Box },
  { title: "Molecules", url: "/molecules", icon: Layers },
  { title: "Organisms", url: "/organisms", icon: LayoutGrid },
  { title: "Pages", url: "/pages", icon: Layout },
  { title: "AI", url: "/ai", icon: Bot },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
            Documentation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
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
