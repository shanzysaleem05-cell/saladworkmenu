import Link from "next/link";
import { JsonLd } from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://saladworksmenu.us${item.href}`
    }))
  };

  return (
    <nav aria-label="breadcrumb" className="bg-site-bg py-3 px-4 border-b border-gray-200">
      <JsonLd data={schema} />
      <div className="container mx-auto max-w-6xl">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-brand-green font-bold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="text-brand-orange hover:text-brand-green font-bold transition-colors">
                      {item.label}
                    </Link>
                    <span className="text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
