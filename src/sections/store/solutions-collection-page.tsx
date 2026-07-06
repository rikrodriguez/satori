import Link from "next/link";
import { CollectionTemplate } from "@/components/collection-template";
import {
  collectionPages,
  concerns,
  getProductsByIds,
} from "@/lib/store";

const content = collectionPages.solutions;

export const metadata = {
  title: "Satori Skin Concern Solutions",
  description:
    "Shop Satori by skin concern paths including fine lines, dryness, uneven texture, redness, dullness, and tired-looking skin.",
  alternates: {
    canonical: "/collections/solutions",
  },
};

export default function SolutionsCollectionPage() {
  return (
    <>
      <CollectionTemplate
        content={content}
        products={getProductsByIds(content.productIds)}
      />
      <section className="solution-path-section">
        <div className="section-heading">
          <span>Concern Paths</span>
          <h2>Shop by what your skin is asking for.</h2>
          <p>
            Choose the concern that sounds closest to your skin today, then
            start with the Satori ritual built around one daily cream.
          </p>
        </div>
        <div className="solution-path-grid">
          {concerns.map((concern) => (
            <Link href="/pages/skin-concerns" key={concern.title}>
              <span>{concern.title}</span>
              <small>View concern path</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
