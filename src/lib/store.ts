import {
  cartAssets,
  homeBlogAssets,
  homeProductCardAssets,
  pdpFinalCtaAssets,
  satoriPackAssets,
  type SatoriVisualAsset,
} from "./visual-assets";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  memberPrice: number | null;
  subscriptionPrice: number | null;
  image: SatoriVisualAsset;
  images: SatoriVisualAsset[];
  cartImage: SatoriVisualAsset;
  badge: string;
  savingsLabel?: string | null;
  type?: "membership";
  handle: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sellingPlan?: string;
};

export const productImages = [
  homeProductCardAssets[0],
  homeProductCardAssets[2],
  homeProductCardAssets[4],
  homeProductCardAssets[8],
  homeProductCardAssets[1],
  homeProductCardAssets[3],
  homeProductCardAssets[5],
  pdpFinalCtaAssets[1],
];

export const heroProduct: Product = {
  id: "satori-cream",
  name: "Satori Cream",
  subtitle:
    "Science-led skincare ritual for smoother-looking texture, hydration, and calmer-looking skin.",
  price: 19.99,
  memberPrice: 17.99,
  subscriptionPrice: 16.99,
  image: productImages[0],
  images: productImages,
  cartImage: cartAssets.thumbnail,
  badge: "Science-Led Cream",
  savingsLabel: null,
  handle: "/products/satori-cream",
};

export const bundles: Product[] = [
  heroProduct,
  {
    id: "satori-duo",
    name: "Satori Duo",
    subtitle: "Two jars for a consistent 60-day skin-smoothing ritual.",
    price: 34.99,
    memberPrice: 31.99,
    subscriptionPrice: 29.99,
    image: satoriPackAssets.duo,
    images: productImages.slice(0, 4),
    cartImage: satoriPackAssets.duo,
    badge: "Best Value",
    savingsLabel: "Save $5",
    handle: "/products/satori-cream",
  },
  {
    id: "satori-ritual",
    name: "Satori Ritual Kit",
    subtitle: "A 90-day supply of the nightly cream ritual, built for consistency.",
    price: 49.99,
    memberPrice: 44.99,
    subscriptionPrice: 39.99,
    image: satoriPackAssets.ritual,
    images: productImages.slice(0, 4),
    cartImage: satoriPackAssets.ritual,
    badge: "Start Here",
    savingsLabel: "Save $10",
    handle: "/products/satori-cream",
  },
  {
    id: "golden-skin-club",
    name: "Satori Golden Skin Club",
    subtitle: "Annual membership with member pricing, gifts, and early access.",
    price: 29.99,
    memberPrice: null,
    subscriptionPrice: null,
    image: satoriPackAssets.goldenClub,
    images: productImages.slice(0, 4),
    cartImage: satoriPackAssets.goldenClub,
    badge: "Membership",
    savingsLabel: null,
    type: "membership",
    handle: "/pages/golden-standard-membership-info",
  },
];

export const collectionTaxonomy = [
  {
    id: "cream",
    label: "Satori Cream",
    eyebrow: "Core Product",
    title: "The nightly cream ritual.",
    body:
      "Start with one jar when you want the simplest Satori path: cleanse, apply a small amount, and repeat nightly.",
    href: "/products/satori-cream",
    productIds: ["satori-cream"],
  },
  {
    id: "bundles",
    label: "Bundles",
    eyebrow: "Routine Value",
    title: "Duo and Ritual Kit paths.",
    body:
      "Built for shoppers who already know consistency matters and want a 60- to 90-day cream supply.",
    href: "/collections/bundles",
    productIds: ["satori-duo", "satori-ritual"],
  },
  {
    id: "subscribe-and-save",
    label: "Subscribe & Save",
    eyebrow: "Refills",
    title: "A refill rhythm for the ritual.",
    body:
      "A simple path for customers who want the cream to arrive before their routine runs out.",
    href: "/collections/subscribe-and-save",
    productIds: ["satori-cream", "satori-duo", "satori-ritual"],
  },
  {
    id: "memberships",
    label: "Membership",
    eyebrow: "Golden Skin Club",
    title: "Member pricing and early access.",
    body:
      "A separate membership offer for customers who want member pricing, gifts, and routine support.",
    href: "/collections/memberships",
    productIds: ["golden-skin-club"],
  },
  {
    id: "solutions",
    label: "Solutions",
    eyebrow: "Skin Concerns",
    title: "Shop by skin concern.",
    body:
      "Find the Satori ritual for fine lines, dryness, texture, redness, dullness, and tired-looking skin.",
    href: "/collections/solutions",
    productIds: ["satori-cream", "satori-ritual"],
  },
] as const;

export const collectionPages = {
  bundles: {
    eyebrow: "Satori Bundles",
    title: "Stock up on the ritual without crowding the shelf.",
    description:
      "Choose the Duo or Ritual Kit when you want a longer Satori routine, a lower cost per jar, or a simple giftable supply.",
    productIds: ["satori-duo", "satori-ritual"],
    primaryCta: "Shop Satori Cream",
    primaryHref: "/products/satori-cream",
    secondaryCta: "Subscribe & Save",
    secondaryHref: "/collections/subscribe-and-save",
    highlights: [
      "60- and 90-day ritual paths",
      "Built around one hero cream",
      "Better for consistency than one-off buying",
    ],
  },
  "subscribe-and-save": {
    eyebrow: "Subscribe & Save",
    title: "Keep the nightly ritual stocked before it runs out.",
    description:
      "A replenishment collection for shoppers who want Satori Cream on a predictable rhythm with subscription savings.",
    productIds: ["satori-cream", "satori-duo", "satori-ritual"],
    primaryCta: "See Subscription Details",
    primaryHref: "/pages/subscribe-and-save",
    secondaryCta: "Shop Bundles",
    secondaryHref: "/collections/bundles",
    highlights: [
      "Easy refill rhythm",
      "Simple subscription savings",
      "Designed for repeat routine behavior",
    ],
  },
  memberships: {
    eyebrow: "Golden Skin Club",
    title: "A membership path for routine-first customers.",
    description:
      "The membership collection keeps Golden Skin Club separate from product bundles so shoppers understand it as a benefits layer.",
    productIds: ["golden-skin-club"],
    primaryCta: "Explore Membership",
    primaryHref: "/pages/golden-standard-membership-info",
    secondaryCta: "Shop All",
    secondaryHref: "/collections/all",
    highlights: [
      "Member pricing layer",
      "Gifts and early access positioning",
      "Made for customers who want more from the ritual",
    ],
  },
  solutions: {
    eyebrow: "Satori Solutions",
    title: "Shop by what your skin is asking for.",
    description:
      "Choose a concern-led path for fine lines, dryness, uneven texture, redness, dullness, or tired-looking skin.",
    productIds: ["satori-cream", "satori-ritual"],
    primaryCta: "See Skin Concerns",
    primaryHref: "/pages/skin-concerns",
    secondaryCta: "View Before & After",
    secondaryHref: "/pages/reviews",
    highlights: [
      "Fine lines and smoother-looking texture",
      "Dryness, redness, dullness, and tired-looking skin",
      "One simple cream ritual, guided by concern",
    ],
  },
} as const;

export function getProductsByIds(productIds: readonly string[]) {
  return productIds
    .map((id) => bundles.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}

export const navGroups = [
  {
    label: "Shop All",
    href: "/collections/all",
    children: [
      ["Shop All Products", "/collections/all"],
      ["Start Here", "/collections/all#start-here"],
      ["Satori Cream", "/collections/all#cream"],
      ["Bundles", "/collections/bundles"],
      ["Subscribe & Save", "/collections/subscribe-and-save"],
      ["Membership", "/collections/memberships"],
      ["Solutions", "/collections/solutions"],
    ],
  },
  {
    label: "Satori Cream",
    href: "/products/satori-cream",
    children: [
      ["How It Works", "/products/satori-cream#how-it-works"],
      ["Ingredients", "/products/satori-cream#ingredients"],
      ["Visual Proof", "/pages/before-after"],
      ["Reviews", "/pages/reviews"],
      ["FAQ", "/pages/faq"],
    ],
  },
  {
    label: "Membership & Rewards",
    href: "/pages/golden-standard-membership-info",
    children: [
      ["The Golden Skin Club", "/pages/golden-standard-membership-info"],
      ["Member Pricing", "/pages/golden-standard-membership-info#pricing"],
      ["Rewards", "/pages/golden-standard-membership-info#rewards"],
    ],
  },
  {
    label: "Skin Concerns",
    href: "/pages/skin-concerns",
    children: [
      ["Fine Lines", "/pages/skin-concerns#fine-lines"],
      ["Dryness", "/pages/skin-concerns#dryness"],
      ["Texture", "/pages/skin-concerns#uneven-texture"],
      ["Redness", "/pages/skin-concerns#redness"],
      ["Dull Skin", "/pages/skin-concerns#dull-skin"],
    ],
  },
];

export const topLinks = [
  ["Wrinkle Ritual", "/pages/satori-wrinkle-smoothing-ritual"],
  ["Subscribe & Save", "/pages/subscribe-and-save"],
  ["Visual Proof", "/pages/before-after"],
  ["How To Apply", "/pages/how-to-apply"],
  ["FAQ", "/pages/faq"],
  ["About Satori", "/pages/about-satori"],
];

export const testimonials = [
  {
    title: "Hydration without heaviness",
    body:
      "A simple nightly cream step designed to support comfortable moisture without making the routine feel heavy.",
    name: "Satori ritual note",
    location: "Hydration support",
  },
  {
    title: "A routine that feels repeatable",
    body:
      "Cleanse, apply a small amount, and let the formula absorb overnight. The ritual is built to be easy enough to keep.",
    name: "Satori ritual note",
    location: "Night routine",
  },
  {
    title: "Softer-looking texture over time",
    body:
      "Consistent use supports hydration, glow, and a smoother-looking finish without aggressive steps.",
    name: "Satori ritual note",
    location: "Texture support",
  },
  {
    title: "A calmer-looking morning finish",
    body:
      "A gentle nighttime cream ritual can help skin look more rested and ready for the next morning.",
    name: "Satori ritual note",
    location: "Morning glow",
  },
];

export const reviewRegistryStats = [
  ["4", "ritual notes"],
  ["6", "skin concerns"],
  ["60", "day ritual window"],
  ["1", "simple cream step"],
];

export const reviewFilters = [
  "All ritual stories",
  "Texture",
  "Dryness",
  "Glow",
  "Sensitive skin",
  "Night routine",
];

export const reviewRegistryItems = [
  {
    title: "Hydration without heaviness",
    concern: "Dryness",
    rating: "Ritual note",
    body:
      "For skin that wants moisture and comfort without a heavy layer, Satori keeps the step simple and repeatable.",
    meta: "Hydration support",
  },
  {
    title: "A calmer-looking morning routine",
    concern: "Redness support",
    rating: "Ritual note",
    body:
      "The nightly ritual is designed to support a calmer-looking finish with consistent use over time.",
    meta: "Calmer-looking skin",
  },
  {
    title: "The cream step I actually repeat",
    concern: "Night ritual",
    rating: "Ritual note",
    body:
      "This review type supports the Satori positioning: one premium cream step that feels easy enough to keep using.",
    meta: "Repeatable routine",
  },
  {
    title: "Makeup sat better after consistency",
    concern: "Texture",
    rating: "Ritual note",
    body:
      "A softer, hydrated-looking finish can make the morning routine feel easier after consistent nighttime use.",
    meta: "Texture support",
  },
];

export const reviewQuestions = [
  {
    q: "Are these verified customer reviews?",
    a:
      "These are Satori ritual notes, not verified customer review claims. Verified ratings, customer photos, and customer results should only be labeled once source data and permissions are confirmed.",
  },
  {
    q: "Can Satori publish customer result photos?",
    a:
      "Only after collecting customer permission, dates, routine context, lighting context, and a clear cosmetic-results disclaimer.",
  },
  {
    q: "What should a helpful review include?",
    a:
      "A helpful review includes the skin concern, product used, routine timeline, comfort notes, and whether the reviewer gave permission for any photo or quote.",
  },
  {
    q: "How does Satori keep stories trustworthy?",
    a:
      "Satori keeps customer stories responsible by avoiding medical claims, exaggerated timelines, manipulated results, and unsupported verified badges.",
  },
];

export const reviewProofChecklist = [
  "Authentic purchase context",
  "Customer permission",
  "Review date",
  "Routine timeline",
  "Skin concern context",
  "Photo lighting context",
  "Cosmetic disclaimer",
  "Review source on file",
];

export const concerns = [
  {
    title: "Fine lines",
    image: "/images/satori-concerns/01_fine_lines_closeup_1200x1200.jpg",
    alt: "Close-up of subtle facial fine lines around the eye and cheek",
  },
  {
    title: "Dryness",
    image: "/images/satori-concerns/02_dryness_closeup_1200x1200.jpg",
    alt: "Close-up of dry-looking skin texture on the cheek",
  },
  {
    title: "Uneven texture",
    image: "/images/satori-concerns/03_uneven_texture_closeup_1200x1200.jpg",
    alt: "Close-up of uneven facial skin texture and visible pores",
  },
  {
    title: "Redness",
    image: "/images/satori-concerns/04_redness_closeup_1200x1200.jpg",
    alt: "Close-up of mild facial redness on the cheek",
  },
  {
    title: "Dull skin",
    image: "/images/satori-concerns/05_dull_skin_closeup_1200x1200.jpg",
    alt: "Close-up of dull-looking skin with muted glow",
  },
  {
    title: "Tired-looking skin",
    image: "/images/satori-concerns/06_tired_skin_closeup_1200x1200.jpg",
    alt: "Close-up of tired-looking under-eye skin and cheek",
  },
];

export const proofStats = [
  ["2 min", "nightly ritual"],
  ["15%", "subscribe & save"],
  ["60 days", "risk-free window"],
  ["Science", "led skincare"],
];

export const paidTrafficOffer = {
  eyebrow: "Satori wrinkle-smoothing ritual",
  title: "A no-needle nightly cream ritual simple enough to repeat.",
  subtitle:
    "Built for anti-aging shoppers who want hydration, smoother-looking texture, and a premium non-invasive routine without a crowded shelf.",
  primaryCta: "Start the ritual",
  secondaryCta: "See how it works",
  route: "/pages/satori-wrinkle-smoothing-ritual",
};

export const proofGuardrails = [
  "Before-and-after visuals are labeled clearly and never exaggerated.",
  "Keep claims cosmetic, responsible, and focused on smoother-looking, calmer-looking skin.",
  "Speak to skin goals with respectful, confidence-building language.",
  "Keep customer stories clear, story-led, and grounded in routine context.",
];

export const paidLandingModules = [
  {
    label: "Avatar",
    title: "For the buyer who wants a calmer option.",
    body:
      "Satori speaks to shoppers who want smoother-looking skin support without invasive pressure, crowded routines, or harsh beauty messaging.",
  },
  {
    label: "Mechanism",
    title: "Hydration, texture support, and ritual consistency.",
    body:
      "The ritual frames anti-aging as a repeatable cosmetic habit: apply a small amount, let the cream absorb, and let consistency carry the visible-looking change.",
  },
  {
    label: "Offer",
    title: "Start with one jar, then upgrade into the ritual.",
    body:
      "Start with Satori Cream, then choose the Duo, Ritual Kit, Subscribe & Save, or Golden Skin Club when your routine calls for it.",
  },
];

export const faq = [
  {
    q: "What is Satori Cream designed to do?",
    a:
      "Satori Cream is a daily anti-aging moisturizer designed to support smoother-looking texture, lasting hydration, calmer-looking skin, and a healthier-looking glow with consistent use.",
  },
  {
    q: "Is this an injectable alternative?",
    a:
      "It is a non-invasive skincare ritual, not an injectable. It is positioned for people who want to support smoother-looking skin without harsh routines, downtime, or needles.",
  },
  {
    q: "How often should I use it?",
    a:
      "Use it on clean, dry skin. The strongest habit is a consistent nightly application, especially for the first 30 days.",
  },
  {
    q: "When will I see results?",
    a:
      "Most cosmetic skincare routines need consistency. Skin may feel hydrated quickly, while visible texture and tone improvements usually build over weeks of daily use.",
  },
  {
    q: "What makes Satori different?",
    a:
      "The brand story centers on science-led skincare positioning, plant-powered hydration, and a simple ritual people can actually stick with.",
  },
  {
    q: "Is it safe for sensitive skin?",
    a:
      "The positioning is gentle and clean. Customers with reactive skin should patch test first and avoid use on broken or irritated skin.",
  },
  {
    q: "Can I use it with retinol or exfoliating acids?",
    a:
      "Keep the routine simple if your skin is reactive. If you use retinol or acids, introduce Satori on alternate nights first and avoid layering too many active steps at once.",
  },
  {
    q: "What is the 60-day ritual guarantee?",
    a:
      "Satori is built around consistency, so the guarantee gives customers a routine window to try the product and get support if the ritual is not the right fit.",
  },
  {
    q: "What happens if Satori is out of stock?",
    a:
      "Due to high demand, stock may not always be immediately available. If an item is unavailable, customers can be notified by email when Satori restocks.",
  },
];

export const faqCategories = [
  {
    id: "product",
    title: "Product Basics",
    eyebrow: "Start Here",
    items: [
      {
        q: "What is Satori Cream?",
        a:
          "Satori Cream is a premium daily moisturizer positioned for smoother-looking texture, fine lines, dryness, redness support, elasticity, and glow through a simple repeatable ritual.",
      },
      {
        q: "What makes Satori different?",
        a:
          "The brand story centers on science-led skincare positioning, clean beauty, and one cream step customers can realistically repeat.",
      },
      {
        q: "Is Satori a medical treatment?",
        a:
          "No. Satori is cosmetic skincare. It is not intended to diagnose, treat, cure, or prevent any disease or skin condition.",
      },
      {
        q: "Is this a replacement for injectables?",
        a:
          "No. Satori is a non-invasive skincare ritual for people who want a softer, calmer-looking appearance without needles, downtime, or a complicated routine.",
      },
    ],
  },
  {
    id: "application",
    title: "How To Use",
    eyebrow: "Ritual",
    items: [
      {
        q: "How do I apply Satori Cream?",
        a:
          "Cleanse, pat skin dry, apply a small amount to face and neck, and massage until absorbed. Keep the routine simple enough to repeat.",
      },
      {
        q: "Should I use it morning or night?",
        a:
          "Nightly use is the core ritual. You can also use it in the morning if it works with your skin and routine, followed by sunscreen during the day.",
      },
      {
        q: "How much product should I use?",
        a:
          "Start with a small amount. Add more only if your skin needs it. The goal is comfortable hydration, not a heavy layer.",
      },
      {
        q: "Can I use it with other products?",
        a:
          "Yes, but avoid overloading your routine. If you use strong actives like retinol or exfoliating acids, introduce Satori gradually and watch how your skin responds.",
      },
    ],
  },
  {
    id: "results",
    title: "Results & Expectations",
    eyebrow: "Visible-Looking Change",
    items: [
      {
        q: "When should I expect visible-looking change?",
        a:
          "Hydration can feel faster, while smoother-looking texture, calmer-looking skin, and glow usually require consistent use over multiple weeks.",
      },
      {
        q: "Are the visual references real customer results?",
        a:
          "No. These are illustrative skin transformation visuals. We only label images as real customer results when customer photos, permissions, and usage details are verified.",
      },
      {
        q: "Why does Satori focus on consistency?",
        a:
          "Because the best skincare routine is the one you actually repeat. Satori is designed around one low-friction step that can become a nightly habit.",
      },
      {
        q: "Will everyone get the same result?",
        a:
          "No. Cosmetic results vary by skin type, routine, consistency, environment, and lifestyle. Satori should be positioned around support, not guaranteed outcomes.",
      },
    ],
  },
  {
    id: "skin",
    title: "Skin Compatibility",
    eyebrow: "Sensitive Skin",
    items: [
      {
        q: "Can sensitive skin use Satori?",
        a:
          "Satori is positioned as gentle and clean, but reactive skin should patch test first and avoid applying it over broken or irritated skin.",
      },
      {
        q: "Can I use it if my skin is red or dry?",
        a:
          "Satori is positioned for dryness, redness support, and a calmer-looking finish. If redness is persistent, severe, or painful, customers should consult a professional.",
      },
      {
        q: "Is it greasy?",
        a:
          "The intended texture is rich but comfortable: nourishing enough for a nighttime ritual without feeling like a heavy occlusive layer.",
      },
      {
        q: "Should I stop other actives?",
        a:
          "Not necessarily. But if your routine is causing irritation, simplify first, then reintroduce active products slowly.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders, Shipping & Guarantee",
    eyebrow: "Shopping",
    items: [
      {
        q: "How much is shipping?",
        a:
          "The current Satori offer includes free shipping over $70 where available. Shipping details can vary by destination and carrier.",
      },
      {
        q: "What is the guarantee?",
        a:
          "Satori gives customers a 60-day ritual window to try the product and get clear support if the routine is not the right fit.",
      },
      {
        q: "Can I remove products from my cart?",
        a:
          "Yes. The cart drawer supports quantity changes and item removal before checkout.",
      },
      {
        q: "What happens if inventory is unavailable?",
        a:
          "If stock is unavailable, customers should receive a restock message and know that a charge has not been captured for unavailable inventory.",
      },
    ],
  },
  {
    id: "membership",
    title: "Subscribe, Save & Membership",
    eyebrow: "Rewards",
    items: [
      {
        q: "What is Subscribe & Save?",
        a:
          "Subscribe & Save is positioned as a lower-friction way to keep the ritual consistent while saving 15% compared with one-time purchase.",
      },
      {
        q: "What is the Golden Skin Club?",
        a:
          "Golden Skin Club is the paid annual membership tier for stronger savings, gifts, early access, and member status from day one.",
      },
      {
        q: "What is Elevated?",
        a:
          "Elevated is the loyalty tier that unlocks after $200 in annual spend. It is designed for returning customers who build repeat purchase behavior.",
      },
      {
        q: "Can the membership details change?",
        a:
          "Membership benefits may evolve as Satori grows, but current pricing, gifts, and access details should always be clearly shown before checkout.",
      },
    ],
  },
];

export const supportPages = {
  guarantee: {
    eyebrow: "Our Guarantee",
    title: "A 60-day ritual window built around consistency.",
    summary:
      "Satori is positioned as a repeatable skincare ritual, so the guarantee experience should feel clear, calm, and supportive instead of transactional.",
    badge: "60-day ritual guarantee",
    route: "/pages/our-guarantee",
    highlights: [
      "Try the routine consistently",
      "Get clear support if it is not the right fit",
      "Keep expectations cosmetic and responsible",
    ],
    steps: [
      {
        title: "Start the ritual",
        body:
          "Use Satori on clean, dry skin and keep the nightly routine simple enough to repeat.",
      },
      {
        title: "Give it time",
        body:
          "Hydration can feel faster, while smoother-looking texture and glow usually build over weeks.",
      },
      {
        title: "Contact support",
        body:
          "If the ritual is not the right fit, customers should have a clear support path within the guarantee window.",
      },
    ],
    details: [
      {
        title: "What the guarantee covers",
        body:
          "The guarantee is a customer-confidence layer for the Satori Cream routine, with clear expectations around returns and support.",
      },
      {
        title: "What it should not claim",
        body:
          "Satori does not promise identical results, medical outcomes, or guaranteed visible changes. Skincare response varies by person and routine.",
      },
      {
        title: "Why this page matters",
        body:
          "Clear support details help shoppers feel confident before starting a new skincare ritual.",
      },
    ],
    finalTitle: "Confidence should feel simple.",
    finalBody:
      "Use this page to show shoppers that Satori stands behind the ritual while keeping claims responsible.",
  },
  shipping: {
    eyebrow: "Shipping",
    title: "Clear shipping expectations before checkout.",
    summary:
      "Clear delivery, tracking, and free-shipping expectations help shoppers understand what happens after checkout.",
    badge: "Free shipping over $70",
    route: "/pages/shipping",
    highlights: [
      "Free shipping threshold visible",
      "Tracking expectation explained",
      "Carrier timing may vary by location",
    ],
    steps: [
      {
        title: "Order placed",
        body:
          "Customers receive order confirmation once checkout is complete and the order is accepted.",
      },
      {
        title: "Order prepared",
        body:
          "Satori prepares the shipment and sends fulfillment information once the package is ready.",
      },
      {
        title: "Tracking sent",
        body:
          "Tracking is emailed when available, with delivery timing controlled by the carrier.",
      },
    ],
    details: [
      {
        title: "Free shipping threshold",
        body:
          "The current Satori offer includes free shipping over $70 where available. Shipping thresholds can vary by destination.",
      },
      {
        title: "Processing windows",
        body:
          "Processing and transit times can vary by destination, order volume, and carrier availability.",
      },
      {
        title: "Out-of-stock orders",
        body:
          "If stock is unavailable, customers should see clear restock language and confirmation that unavailable inventory has not been charged.",
      },
    ],
    finalTitle: "Shipping copy should remove doubt.",
    finalBody:
      "Clear shipping information gives every shopper a calmer path from checkout to delivery.",
  },
  returns: {
    eyebrow: "Returns & Refunds",
    title: "A calmer returns page for a premium skincare ritual.",
    summary:
      "Returns and refunds should feel transparent, human, and aligned with the 60-day ritual window while avoiding over-promising.",
    badge: "Clear support path",
    route: "/pages/returns-refunds",
    highlights: [
      "Simple return request path",
      "Condition and timing guidance",
      "Clear refund expectations",
    ],
    steps: [
      {
        title: "Reach out",
        body:
          "Customers should contact support with their order email and reason for the request.",
      },
      {
        title: "Review eligibility",
        body:
          "Support checks timing, order status, and store policy before approving next steps.",
      },
      {
        title: "Resolve clearly",
        body:
          "Approved requests should receive clear instructions and a transparent refund or replacement timeline.",
      },
    ],
    details: [
      {
        title: "Return window",
        body:
          "Return timing, eligibility, and refund steps are reviewed clearly so customers understand the process before sending anything back.",
      },
      {
        title: "Skincare-specific handling",
        body:
          "Because skincare is a personal-use product, Satori clearly explains what can be returned, replaced, or refunded.",
      },
      {
        title: "Out-of-stock update",
        body:
          "If an item is unavailable, Satori provides a clear restock message and confirmation that unavailable inventory has not been charged.",
      },
    ],
    finalTitle: "Make support feel premium.",
    finalBody:
      "A clean returns page lowers anxiety and gives the shopper confidence that there is a real process behind the brand.",
  },
} as const;

export const blogPosts = [
  {
    slug: "consistency-beats-trend-skincare",
    category: "Routine",
    readTime: "4 min read",
    title: "Why Consistency Beats Trend Skincare",
    excerpt:
      "A simple nightly cream ritual can outperform a shelf full of products you never finish.",
    href: "/blog#consistency-beats-trend-skincare",
    image: homeBlogAssets[0],
    body: [
      "Most skincare routines fail because they ask too much from real life. A cleanser, serum, active, mask, oil, and recovery product can sound serious, but the best ritual is the one that actually happens when you are tired.",
      "Satori is built around a simpler behavior: cleanse, apply a small amount, and repeat. The goal is not to chase a dramatic overnight claim. The goal is to make hydration, texture support, and calmer-looking skin feel easy enough to maintain.",
      "Consistency matters because visible-looking change usually compounds. Skin can feel more hydrated quickly, while smoother-looking texture and a fresher morning finish are more realistic when the routine becomes automatic.",
    ],
    takeaways: [
      "Keep the routine short enough to repeat.",
      "Use a cream step that supports hydration and barrier feel.",
      "Judge the ritual over weeks, not one night.",
    ],
  },
  {
    slug: "nobel-nominated-skincare-science",
    category: "Science",
    readTime: "5 min read",
    title: "What Science-Led Skincare Means",
    excerpt:
      "How Satori turns authority, ritual, and gentle ingredients into a premium anti-aging story.",
    href: "/blog#nobel-nominated-skincare-science",
    image: homeBlogAssets[1],
    body: [
      "Beauty brands often use heritage as authority. Satori is positioned differently: science-led skincare translated into one daily cream. The point is to make the ritual feel credible without making the customer manage a complicated product stack.",
      "For shoppers, scientific authority should become practical. That means a product that is easy to understand, easy to apply, and easy to repeat. Satori centers the nightly cream step because it is one of the few habits people can realistically keep.",
      "The promise stays cosmetic and responsible: softer-feeling hydration, smoother-looking texture, a calmer-looking finish, and a daily glow that comes from consistency rather than intensity.",
    ],
    takeaways: [
      "Science should make the routine simpler, not more confusing.",
      "A premium cream can carry the ritual when the story is clear.",
      "Responsible cosmetic language builds more trust than miracle claims.",
    ],
  },
  {
    slug: "30-night-satori-skin-ritual",
    category: "How To Apply",
    readTime: "4 min read",
    title: "The Satori 30-Night Skin Ritual",
    excerpt:
      "A repeatable routine for smoother-looking texture, hydrated skin, and a calmer morning glow.",
    href: "/blog#30-night-satori-skin-ritual",
    image: homeBlogAssets[2],
    body: [
      "The 30-night ritual is intentionally simple. Start with clean, dry skin. Apply a small amount of Satori Cream to the face and neck. Let it absorb, then repeat the next night.",
      "The first week is about texture and comfort. The second and third weeks are about making the habit automatic. By the end of the month, the ritual should feel less like another task and more like the final step of the day.",
      "A cream ritual works best when it is not competing with aggressive routines. If your skin feels reactive, keep the surrounding routine quiet: gentle cleanse, Satori, and sunscreen in the morning.",
    ],
    takeaways: [
      "Use nightly after cleansing.",
      "Apply a small amount to face and neck.",
      "Let consistency carry the visible-looking change.",
    ],
  },
  {
    slug: "clean-beauty-without-crowded-shelf",
    category: "Clean Beauty",
    readTime: "3 min read",
    title: "Clean Beauty Without a Crowded Shelf",
    excerpt:
      "Why one repeatable cream can make a daily routine feel easier to keep.",
    href: "/blog#clean-beauty-without-crowded-shelf",
    image: homeBlogAssets[3],
    body: [
      "A crowded shelf can feel productive, but it often creates friction. The more decisions a routine requires, the easier it becomes to skip. Satori narrows the ritual to one premium cream step that supports the way skin looks and feels over time.",
      "Clean beauty should still feel substantial. The Satori positioning is gentle, premium, and routine-friendly: hydration, smoother-looking texture, calmer-looking skin, and glow without turning the bathroom counter into a lab.",
      "The simplest version is usually the strongest: cleanse, apply, repeat. When a product is easy to finish, it has a better chance of becoming the product customers buy again.",
    ],
    takeaways: [
      "Reduce routine friction.",
      "Choose a product simple enough to finish.",
      "Make repeat use the conversion promise.",
    ],
  },
];

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;
