import { CollectionTemplate } from "@/components/collection-template";
import { collectionPages, getProductsByIds } from "@/lib/store";

const content = collectionPages["subscribe-and-save"];

export const metadata = {
  title: "Satori Subscribe & Save Collection",
  description:
    "Shop subscription-friendly Satori Cream offers for a simple refill rhythm and consistent nightly skincare ritual.",
  alternates: {
    canonical: "/collections/subscribe-and-save",
  },
};

export default function SubscribeAndSaveCollectionPage() {
  return (
    <CollectionTemplate
      content={content}
      products={getProductsByIds(content.productIds)}
    />
  );
}
