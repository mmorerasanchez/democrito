import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { SidebarNav } from "@/components/organisms/SidebarNav";
import { TopBar } from "@/components/organisms/TopBar";
import { ThemeToggle } from "@/components/app/ThemeToggle";

const routeMap: Record<string, string> = {
  store: "/app/library",
  designer: "/app/ai-designer",
  settings: "/app/settings",
};

function getActiveItem(pathname: string): string {
  if (pathname.startsWith("/app/library")) return "store";
  if (pathname.startsWith("/app/ai-designer")) return "designer";
  if (pathname.startsWith("/app/settings")) return "settings";
  return "";
}

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const activeItem = getActiveItem(location.pathname);
  const activeProject = searchParams.get("project") || undefined;

  const handleNavClick = (id: string) => {
    navigate(routeMap[id] || `/app/${id}`);
    setMobileOpen(false);
  };

  const handleProjectClick = (slug: string) => {
    navigate(`/app/library?project=${slug}`);
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-overlay bg-background/80 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-modal lg:relative lg:z-auto transition-transform duration-200",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}>
        <SidebarNav
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          activeItem={activeItem}
          onItemClick={handleNavClick}
          activeProject={activeProject}
          onProjectClick={handleProjectClick}
          className="h-full"
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setMobileOpen(true)} actions={<ThemeToggle />} />
        <Outlet />
      </div>
    </div>
  );
}
