"use client";

import { useState } from "react";
import Link from "next/link";

export function CollectionControls({
  categories = [],
  productCount,
}: {
  categories?: readonly { href: string; label: string }[];
  productCount: number;
}) {
  const [showPaths, setShowPaths] = useState(false);

  return (
    <div className="filter-row">
      <button onClick={() => setShowPaths((current) => !current)}>
        {showPaths ? "Hide Shopping Paths" : "Browse Shopping Paths"}
      </button>
      <span>Featured rituals</span>
      <span>{productCount} offers</span>
      {showPaths ? (
        <div className="filter-panel">
          {categories.map((category) => (
            <Link href={category.href} key={category.href}>
              {category.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
