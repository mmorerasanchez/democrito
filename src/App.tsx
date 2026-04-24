import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { ShowcaseLayout } from "@/components/ShowcaseLayout";
import OverviewPage from "@/pages/OverviewPage";
import TokensPage from "@/pages/TokensPage";
import AtomsPage from "@/pages/AtomsPage";
import MoleculesPage from "@/pages/MoleculesPage";
import OrganismsPage from "@/pages/OrganismsPage";
import TemplatesPage from "@/pages/TemplatesPage";
import PagesPage from "@/pages/PagesPage";
import NotFound from "@/pages/NotFound";
import TokenSmokeTest from "@/pages/TokenSmokeTest";
import AiPage from "@/pages/AiPage";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Design system showcase */}
            <Route element={<ShowcaseLayout />}>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/tokens" element={<TokensPage />} />
              <Route path="/atoms" element={<AtomsPage />} />
              <Route path="/molecules" element={<MoleculesPage />} />
              <Route path="/organisms" element={<OrganismsPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/pages" element={<PagesPage />} />
              <Route path="/ai" element={<AiPage />} />
            </Route>
            <Route path="/test/tokens" element={<TokenSmokeTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
