import { SupportPage } from "@/components/support-page";
import { supportPages } from "@/lib/store";

export const metadata = {
  title: "Satori Returns & Refunds",
  description:
    "Satori returns and refunds page structure for a premium skincare support experience, with clear expectations and customer-friendly guidance.",
  alternates: {
    canonical: "/pages/returns-refunds",
  },
};

export default function ReturnsRefundsPage() {
  return <SupportPage content={supportPages.returns} variant="returns" />;
}
