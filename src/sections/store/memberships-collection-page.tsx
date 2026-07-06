import { CollectionTemplate } from "@/components/collection-template";
import { collectionPages, getProductsByIds } from "@/lib/store";

const content = collectionPages.memberships;

export const metadata = {
  title: "Satori Membership Collection",
  description:
    "Explore Satori Golden Skin Club membership for member pricing, gifts, early access, and routine support.",
  alternates: {
    canonical: "/collections/memberships",
  },
};

export default function MembershipCollectionPage() {
  return (
    <CollectionTemplate
      content={content}
      products={getProductsByIds(content.productIds)}
    />
  );
}
