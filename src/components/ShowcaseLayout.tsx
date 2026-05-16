import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContactCreator } from "@/components/ContactCreator";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/atoms";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

/**
 * Auto-closes the mobile sidebar drawer whenever the route changes,
 * so users aren't left with an open overlay after navigating.
 */
function CloseMobileSidebarOnNav() {
  const { setOpenMobile, isMobile } = useSidebar();
  const location = useLocation();
  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [location.pathname, isMobile, setOpenMobile]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function FaviconSync() {
  const { theme } = useTheme();
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) {
      link.href = theme === "dark" ? "/favicon-dark.png" : "/favicon-light-warm.png";
    }
  }, [theme]);
  return null;
}

function TopbarWordmark() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) {
      setHidden(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "-56px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-w-0 items-center gap-2">
      <h1
        className={`truncate font-mono text-lg font-semibold tracking-tight lowercase transition-opacity duration-200 ${
          hidden ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden={hidden}
      >
        democrito
      </h1>
      <span
        className={`font-mono text-2xs text-muted-foreground transition-opacity duration-200 ${
          hidden ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        v3
      </span>
    </div>
  );
}

export function ShowcaseLayout() {
  return (
    <SidebarProvider>
      <CloseMobileSidebarOnNav />
      <FaviconSync />
      <ScrollToTop />
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-sticky flex h-header items-center justify-between gap-2 border-b border-border bg-surface px-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <SidebarTrigger className="lg:hidden" />
              <Logo size={24} />
              <TopbarWordmark />
            </div>
            <ThemeToggle />
          </header>
          <main id="main-scroll" className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
            <div className="mx-auto w-full max-w-5xl">
              <Outlet />
            </div>
            <div className="mx-auto w-full max-w-5xl mt-16 space-y-4 border-t border-border pt-8 pb-10">
              <ContactCreator />
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
