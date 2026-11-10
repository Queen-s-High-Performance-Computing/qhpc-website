"use client";

import React from "react";

/**
 * Reusable JSON-LD component for injecting structured data.
 * This is crucial for SEO/AEO to help bots understand and cite your site.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
