import React from "react";

export function JsonLd({ data }: { data: Record<string, any> | Record<string, any>[] }) {
  // Escape "<" so a stray "</script>" inside any interpolated field (e.g. an
  // item description sourced from scraped menu data) can't break out of the
  // script tag or corrupt the JSON-LD block.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
