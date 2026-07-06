import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>SATORI</h2>
        <p>
          Science-led skincare for a simple, consistent anti-aging cream
          ritual.
        </p>
      </div>
      <div>
        <h3>Information You May Want:</h3>
        <Link href="/pages/our-guarantee">Our Guarantee</Link>
        <Link href="/pages/shipping">Shipping</Link>
        <Link href="/pages/returns-refunds">Returns & Refunds</Link>
        <Link href="/policies/disclaimer">Disclaimer</Link>
        <Link href="/policies/terms-of-service">Terms of Service</Link>
        <Link href="/policies/privacy-policy">Privacy Policy</Link>
        <Link href="/pages/faq">FAQ</Link>
        <Link href="/pages/subscribe-and-save">Subscribe & Save</Link>
      </div>
      <div>
        <h3>Quick Links</h3>
        <Link href="/collections/all">Shop All Products</Link>
        <Link href="/collections/bundles">Bundles</Link>
        <Link href="/collections/subscribe-and-save">Subscribe & Save Collection</Link>
        <Link href="/collections/solutions">Shop By Concern</Link>
        <Link href="/products/satori-cream">Shop Satori Cream</Link>
        <Link href="/pages/reviews">Reviews</Link>
        <Link href="/pages/before-after">Visual Proof</Link>
        <Link href="/pages/how-to-apply">How To Apply</Link>
        <Link href="/blog">Blog</Link>
      </div>
      <div>
        <h3>Get In Touch</h3>
        <p>Care@satoriorganicskincare.com</p>
        <p>Monday through Friday 9:00 am to 5:00 pm EST</p>
        <p className="fine-print">
          Cosmetic information only. Not medical or dermatological advice. Not
          intended to diagnose, treat, cure, or prevent disease.
        </p>
      </div>
    </footer>
  );
}
