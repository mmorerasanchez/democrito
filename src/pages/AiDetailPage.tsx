import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ClaudePage from "./ai/claude";
import GithubPage from "./ai/github";
import VibeCodingPage from "./ai/vibe-coding";
import ExamplesPage from "./ai/examples";

// ---------------------------------------------------------------------------
// Router — maps slug → platform page
// ---------------------------------------------------------------------------

const platformMap: Record<string, React.ComponentType> = {
  "claude": ClaudePage,
  "github": GithubPage,
  "vibe-coding": VibeCodingPage,
  "examples": ExamplesPage,
};

export default function AiDetailPage() {
  const { platform } = useParams<{ platform: string }>();

  if (!platform || !platformMap[platform]) {
    return <Navigate to="/ai" replace />;
  }

  const PlatformContent = platformMap[platform];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/ai"
        className="inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        AI Integration
      </Link>

      <PlatformContent />
    </div>
  );
}
