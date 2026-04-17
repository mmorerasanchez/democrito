import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { ShowcaseLayout } from "@/components/ShowcaseLayout";
import { AppShell } from "@/components/templates/AppShell";
import { ProtectedGate } from "@/components/ProtectedGate";
import OverviewPage from "@/pages/OverviewPage";
import TokensPage from "@/pages/TokensPage";
import AtomsPage from "@/pages/AtomsPage";
import MoleculesPage from "@/pages/MoleculesPage";
import OrganismsPage from "@/pages/OrganismsPage";
import TemplatesPage from "@/pages/TemplatesPage";
import PagesPage from "@/pages/PagesPage";
import DashboardPage from "@/pages/DashboardPage";
import LibraryPage from "@/pages/LibraryPage";
import SettingsPage from "@/pages/SettingsPage";
import AIDesignerPage from "@/pages/AIDesignerPage";
import PromptEditorPage from "@/pages/PromptEditorPage";
import PromptDetailPage from "@/pages/PromptDetailPage";
import OnboardingPage from "@/pages/OnboardingPage";
import NotFound from "@/pages/NotFound";
import TokenSmokeTest from "@/pages/TokenSmokeTest";
import AiPage from "@/pages/AiPage";

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
            </Route>
            {/* App pages */}
            <Route path="/app" element={<ProtectedGate><AppShell /></ProtectedGate>}>
              <Route index element={<DashboardPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="library/:id" element={<PromptDetailPage />} />
              <Route path="library/:id/edit" element={<PromptEditorPage />} />
              <Route path="ai-designer" element={<AIDesignerPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/app/welcome" element={<ProtectedGate><OnboardingPage /></ProtectedGate>} />
            <Route path="/test/tokens" element={<TokenSmokeTest />} />
            {/* /ai is standalone (no sidebar) — marketing/education page for the AI integration story */}
            <Route path="/ai" element={<AiPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
