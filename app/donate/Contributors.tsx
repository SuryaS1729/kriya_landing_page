"use client";

import { useEffect, useState } from "react";

type Contributor = {
  name: string;
  twitter_handle: string | null;
};

function getTwitterUrl(handle: string) {
  const trimmedHandle = handle.trim();
  if (trimmedHandle.startsWith("http://") || trimmedHandle.startsWith("https://")) {
    return trimmedHandle;
  }

  return `https://x.com/${trimmedHandle.replace(/^@/, "")}`;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    async function loadContributors() {
      try {
        const response = await fetch("/api/contributors");
        if (!response.ok) return;
        const data = (await response.json()) as { contributors?: Contributor[] };
        setContributors(data.contributors ?? []);
      } catch {
        // The donation flow should remain usable if the public list is unavailable.
      }
    }

    void loadContributors();
    window.addEventListener("kriya:contributor-added", loadContributors);

    return () => window.removeEventListener("kriya:contributor-added", loadContributors);
  }, []);

  if (contributors.length === 0) return null;

  return (
    <section className="mx-auto mt-12 max-w-[520px] border-t border-[#4a6484]/10 pt-8" aria-labelledby="contributors-heading">
      <h2 id="contributors-heading" className="font-recoleta text-2xl text-gray-900 md:text-3xl">
        Contributors
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">Thank you to everyone helping keep Kriya free.</p>
      <ul className="mt-5 divide-y divide-[#4a6484]/10">
        {contributors.map((contributor) => (
          <li key={`${contributor.name}-${contributor.twitter_handle ?? ""}`} className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="font-medium text-gray-800">{contributor.name}</span>
            {contributor.twitter_handle ? (
              <a
                href={getTwitterUrl(contributor.twitter_handle)}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-800/75 transition-colors hover:text-cyan-800 hover:underline"
              >
                {contributor.twitter_handle}
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
