import { CollectionTemplate } from "@/components/collection-template";
import { collectionPages, getProductsByIds } from "@/lib/store";

const content = collectionPages.bundles;

export const metadata = {
  title: "Satori Bundles",
  description:
    "Shop Satori Duo and Satori Ritual Kit bundles for a simple 60- to 90-day skincare ritual.",
  alternates: {
    canonical: "/collections/bundles",
  },
};

export default function BundlesCollectionPage() {
  return (
    <CollectionTemplate
      content={content}
      products={getProductsByIds(content.productIds)}
    />
  );
}
