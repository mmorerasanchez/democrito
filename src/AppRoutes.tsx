import { Routes, Route, Navigate } from "react-router-dom";
import { ShowcaseLayout } from "@/components/ShowcaseLayout";
import OverviewPage from "@/pages/OverviewPage";
import TokensPage from "@/pages/TokensPage";
import AtomsPage from "@/pages/AtomsPage";
import MoleculesPage from "@/pages/MoleculesPage";
import OrganismsPage from "@/pages/OrganismsPage";
import TemplatesPage from "@/pages/TemplatesPage";
import NotFound from "@/pages/NotFound";
import TokenSmokeTest from "@/pages/TokenSmokeTest";
import AiPage from "@/pages/AiPage";
import AiDetailPage from "@/pages/AiDetailPage";
import ManifiestoPage from "@/pages/ManifiestoPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ShowcaseLayout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="/atoms" element={<AtomsPage />} />
        <Route path="/molecules" element={<MoleculesPage />} />
        <Route path="/organisms" element={<OrganismsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/pages" element={<Navigate to="/templates" replace />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/ai/:platform" element={<AiDetailPage />} />
        <Route path="/manifesto" element={<ManifiestoPage />} />
      </Route>
      <Route path="/test/tokens" element={<TokenSmokeTest />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
