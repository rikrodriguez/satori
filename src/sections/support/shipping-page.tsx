import { SupportPage } from "@/components/support-page";
import { supportPages } from "@/lib/store";

export const metadata = {
  title: "Satori Shipping Information",
  description:
    "Satori shipping information, free-shipping details, tracking expectations, and delivery guidance for the skincare ritual.",
  alternates: {
    canonical: "/pages/shipping",
  },
};

export default function ShippingPage() {
  return <SupportPage content={supportPages.shipping} variant="shipping" />;
}
