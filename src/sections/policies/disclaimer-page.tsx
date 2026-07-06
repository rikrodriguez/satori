export const metadata = {
  title: "Disclaimer",
  description:
    "Cosmetic and skincare disclaimer for Satori Cream, including product expectations and results language.",
  alternates: {
    canonical: "/policies/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <section className="policy-page">
      <span className="eyebrow">Satori Policies</span>
      <h1>Disclaimer</h1>
      <p>
        Satori Cream is positioned as a cosmetic skincare product. Site content
        is for general information and is not medical advice, dermatological
        diagnosis, or a treatment plan.
      </p>
      <p>
        Results vary by skin type, age, lifestyle, consistency, environment,
        and routine. Customers with sensitive, reactive, broken, or irritated
        skin should patch test first and consult a qualified professional when
        needed.
      </p>
      <p>
        Satori products are not intended to diagnose, treat, cure, or prevent
        disease.
      </p>
    </section>
  );
}
