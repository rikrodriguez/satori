export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Satori Organic Skin Care, including customer data, checkout, email, analytics, and support information.",
  alternates: {
    canonical: "/policies/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="policy-page">
      <span className="eyebrow">Satori Policies</span>
      <h1>Privacy Policy</h1>
      <p>
        Satori collects customer information needed to operate the storefront,
        process orders, provide support, improve the shopping experience, and
        send brand updates when customers opt in.
      </p>
      <p>
        This includes contact details, shipping details, checkout information,
        device and analytics data, customer service messages, and subscription
        preferences. Payment details are handled by the live commerce and
        payment providers connected at checkout.
      </p>
      <p>
        Customers can request support, email preferences, or privacy questions
        at Care@satoriorganicskincare.com.
      </p>
    </section>
  );
}
