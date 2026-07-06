import { SupportPage } from "@/components/support-page";
import { supportPages } from "@/lib/store";

export const metadata = {
  title: "Satori 60-Day Ritual Guarantee",
  description:
    "Learn how the Satori 60-day ritual guarantee is positioned to support a consistent skincare routine with clear customer expectations.",
  alternates: {
    canonical: "/pages/our-guarantee",
  },
};

export default function OurGuaranteePage() {
  return <SupportPage content={supportPages.guarantee} variant="guarantee" />;
}
