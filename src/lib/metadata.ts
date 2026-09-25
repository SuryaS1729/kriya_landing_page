import type { Metadata } from "next";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

/**
 * Per-route metadata. `openGraph` and `twitter` have to be restated on every
 * page — Next merges metadata shallowly, so a child route that only sets
 * `title`/`description` inherits the parent's og:title/og:description/og:url,
 * which would advertise the home page's social preview on every route.
 */
export function pageMetadata({ title, description, path }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
