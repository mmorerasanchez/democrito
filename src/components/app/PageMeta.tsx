import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  /** Page-specific title fragment. Will be suffixed with " · democrito". */
  title: string;
  /** Page description for <meta name="description"> and OG/Twitter. */
  description: string;
  /** Canonical path including leading slash. */
  path: string;
  /** Optional Schema.org JSON-LD structured data object. */
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = "https://democrito.design";

export function PageMeta({ title, description, path, jsonLd }: PageMetaProps) {
  const fullTitle = title.includes("democrito") ? title : `${title} · democrito`;
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
