export type GrowthLayer = "Current" | "Stable" | "Discarded";
export type LaunchStage = "Vercel Prelaunch" | "Real Checkout" | "Proof Required";
export type Confidence = "High" | "Medium" | "Low";

export type SamSignal = {
  layer: GrowthLayer;
  source: string;
  date: string;
  takeaway: string;
  confidence: Confidence;
  budgetFit: string;
};

export type SatoriAvatar = {
  id: string;
  label: string;
  desire: string;
  friction: string;
  safeLanguage: string;
};

export type CreativePack = {
  id: string;
  layer: GrowthLayer;
  stage: LaunchStage;
  avatar: string;
  problem: string;
  mechanism: string;
  proofRequirement: string;
  angle: string;
  hook: string;
  script: string;
  cta: string;
  source: string;
  sourceDate: string;
  confidence: Confidence;
  budgetFit: string;
  complianceNote: string;
  utmTerm: string;
};

export type MetaPrelaunchAdSet = {
  name: string;
  concept: string;
  status: "Day 1" | "Hold";
  audience: string;
  optimizationEvent: "Lead" | "InitiateCheckout";
  budgetNote: string;
  includedAssets: string[];
};

export type MetaPrelaunchAd = {
  adSetName: string;
  adName: string;
  status: "Day 1" | "Hold";
  format: string;
  primaryText: string;
  headline: string;
  description: string;
  cta: string;
  destinationUrl: string;
  policyNote: string;
};

export const paidLandingRoute = "/pages/satori-wrinkle-smoothing-ritual";

export const samResearchProtocol = [
  "Prioritize Sam Piliero and The Moonlighters material from 2026, especially the last 90-180 days.",
  "Use 2025-2026 content only when it discusses recent Meta changes, Andromeda, account structure, creative testing, CBO/ABO, cost controls, scaling, and post-launch ops.",
  "Keep older tactics only when the same principle appears again in recent material.",
  "Attach source, approximate date, confidence, and $75/day budget fit to each campaign recommendation.",
];

export const satoriAvatars: SatoriAvatar[] = [
  {
    id: "needle-avoidant",
    label: "Needle-avoidant anti-aging shopper",
    desire: "A premium way to support smoother-looking skin without invasive positioning.",
    friction: "Does not want downtime, pressure, or scary beauty messaging.",
    safeLanguage:
      "A non-invasive cosmetic ritual for hydrated, smoother-looking skin.",
  },
  {
    id: "routine-simplifier",
    label: "Routine simplifier",
    desire: "A shorter night routine that feels realistic after a long day.",
    friction: "Overwhelmed by crowded shelves and complicated active stacks.",
    safeLanguage:
      "One calm cream step built around nightly consistency.",
  },
  {
    id: "proof-seeker",
    label: "Proof seeker",
    desire: "Wants to see real context before trusting a new skincare brand.",
    friction: "Skeptical of edited transformations and exaggerated claims.",
    safeLanguage:
      "Verified customer context, routine notes, and realistic expectations.",
  },
  {
    id: "science-curious",
    label: "Science-curious buyer",
    desire: "A credible mechanism explained simply, without a medical lecture.",
    friction: "Distrusts vague luxury language and ingredient noise.",
    safeLanguage:
      "Science-led skincare thinking simplified into a repeatable ritual.",
  },
  {
    id: "value-starter",
    label: "Starter-kit buyer",
    desire: "The easiest first order: one jar, duo, or ritual kit with clear value.",
    friction: "Needs the offer to feel obvious before committing to a new brand.",
    safeLanguage:
      "Start with the cream, upgrade into the Duo or Ritual Kit when ready.",
  },
];

export const currentSamSignals: SamSignal[] = [
  {
    layer: "Current",
    source: "SATORI full Sam Piliero channel audit",
    date: "2026-07-04",
    takeaway:
      "The full-channel pass found 153 videos, 129 with full text through transcripts or Moonlighters pages, and 39 of 40 2026 videos with full text. Current decisions should overweight 2026 concept matching, creative volume, CBO simplicity, and profit-based scaling.",
    confidence: "High",
    budgetFit:
      "$75/day should start concentrated: three day-one concept packs, six publishable ads, and hold packs ready for iteration instead of active fragmentation.",
  },
  {
    layer: "Current",
    source: "Sam Piliero / The Moonlighters - If You Only Watch One Facebook Ads Video, Make It This",
    date: "2026-06-26",
    takeaway:
      "For a small launch, keep the account structure simple: one prospecting CBO, broad delivery, clean exclusions where possible, and creative packs grouped by concept instead of many tiny tests.",
    confidence: "High",
    budgetFit:
      "$75/day fits one lean concept-testing campaign. Do not split spend into too many ad sets or force retargeting before traffic volume exists.",
  },
  {
    layer: "Current",
    source: "Sam Piliero / The Moonlighters - The Psychology of Winning Ads",
    date: "2026-06-09",
    takeaway:
      "Winning creative starts with avatar, problem, unique mechanism, proof, and offer. Creative is not just media; it is the targeting signal Meta uses to match buyers.",
    confidence: "High",
    budgetFit:
      "Very strong fit. Satori should launch with distinct avatar/concept packs before adding audience complexity.",
  },
  {
    layer: "Current",
    source: "Sam Piliero / The Moonlighters - Everything You Need to Know About Facebook Ads in 2026",
    date: "2026-03-12",
    takeaway:
      "Post-Andromeda delivery rewards clear concept matching, broad signal quality, and organized creative data more than old-school manual audience tinkering.",
    confidence: "High",
    budgetFit:
      "Use broad 18+ US delivery and let the creative language pull the anti-aging audience. Keep naming and UTMs strict.",
  },
  {
    layer: "Current",
    source: "Sam Piliero / The Moonlighters - The EXACT System to Scale Facebook Ads Profitably (2026)",
    date: "2026-02-08",
    takeaway:
      "Scaling decisions need real purchase economics, not vanity engagement. Kill, hold, or scale only after the data matches checkout quality and contribution margin.",
    confidence: "High",
    budgetFit:
      "On Vercel, use AddToCart, checkout intent, lead, CPC, CTR, and CVR as prelaunch signals only. Purchase scaling waits for Shopify or a real payment flow.",
  },
  {
    layer: "Stable",
    source: "Meta Health and Wellness ad standards",
    date: "Current policy",
    takeaway:
      "Cosmetic ads must avoid personal-attribute attacks, unrealistic outcomes, medical promises, and risky wrinkle before/after side-by-side framing.",
    confidence: "High",
    budgetFit:
      "Mandatory. A $75/day test can be ruined quickly by rejected ads or unstable delivery from aggressive claims.",
  },
];

export const discardedTactics: SamSignal[] = [
  {
    layer: "Discarded",
    source: "Outdated ABO/equal-spend creative testing",
    date: "Outdated for 2026 launch use",
    takeaway:
      "Do not build a large ABO matrix with equal spend across many ads at $75/day. It fragments learning and delays signal.",
    confidence: "High",
    budgetFit:
      "Bad fit. One lean CBO with clear concept packs gives cleaner data for this budget.",
  },
  {
    layer: "Discarded",
    source: "Old prospecting + retargeting default split",
    date: "Replaced for low-volume prelaunch",
    takeaway:
      "Do not force a fixed $60 prospecting / $15 retargeting split before Satori has enough site visitors, cart events, and checkout intent.",
    confidence: "High",
    budgetFit:
      "Bad fit for day one. Keep retargeting documented but inactive until volume supports it.",
  },
  {
    layer: "Discarded",
    source: "Fake ecommerce optimization on a Vercel intent flow",
    date: "Current launch constraint",
    takeaway:
      "Do not optimize or report this as real Purchase revenue until Shopify or another real checkout is connected and validated.",
    confidence: "High",
    budgetFit:
      "Mandatory. Prelaunch signals can rank concepts, but they cannot prove CPA, ROAS, or scale readiness.",
  },
  {
    layer: "Discarded",
    source: "Meta Health and Wellness policy risk review",
    date: "Current policy",
    takeaway:
      "Do not lead ads with copy that says the viewer looks old, tired, wrinkled, damaged, or insecure. Do not use unverified transformations.",
    confidence: "High",
    budgetFit:
      "Bad fit. Rejection risk is too high, especially in anti-aging.",
  },
];

export const metaAdsBudgetPlan = {
  dailyBudget: 75,
  durationDays: 14,
  activeStage: "Vercel prelaunch demand test",
  objective:
    "Rank Satori concepts and creative formats using compliant traffic, AddToCart, checkout-intent, lead, CTR, CPC, and landing conversion quality.",
  provisionalSplit: [
    {
      name: "Prospecting CBO - concept packs",
      budget: 75,
      objective:
        "Run broad US 18+ delivery with three day-one concept packs and six publishable ads. Optimize to the best valid event available, but treat data as intent until real checkout exists.",
      activation:
        "Active from day one if Pixel/GTM events are verified.",
    },
    {
      name: "Warm retargeting",
      budget: 0,
      objective:
        "Retarget visitors, ATC, and checkout-intent users only after there is enough volume to avoid starving prospecting.",
      activation:
        "Hold until traffic volume supports it. Move dollars from prospecting only after signal exists.",
    },
  ],
  note:
    "Final kill/scale rules require real margin, COGS, AOV, checkout conversion rate, and break-even CPA. Purchase is disabled until real payment or Shopify checkout is live.",
};

export const metaLaunchPackage = {
  command: "npm run meta:launch-package",
  folder: "exports/meta-launch-package",
  readyCreativeGroups: 3,
  notReadyOrHoldAssets: 5,
  files: [
    {
      label: "Ready creative",
      path: "exports/meta-launch-package/creative-ready-to-upload",
      note: "Only these files can move toward upload after visual QA.",
    },
    {
      label: "Ready upload sheet",
      path: "exports/meta-launch-package/satori-ready-to-upload.csv",
      note: "Creative file paths, ad copy, CTAs, and UTM URLs.",
    },
    {
      label: "Operator checklist",
      path: "exports/meta-launch-package/satori-operator-checklist.md",
      note: "Draft setup order and hard rules before publishing.",
    },
    {
      label: "Controls and copy",
      path: "exports/meta-launch-package/controls-and-copy",
      note: "Campaign fields, copy exports, approval gate, and claim registry.",
    },
    {
      label: "Not ready",
      path: "exports/meta-launch-package/not-ready",
      note: "Video and hold assets that stay out of Meta for now.",
    },
  ],
};

export const utmNaming = {
  source: "meta",
  medium: "paid_social",
  campaignPattern: "satori_us35_prelaunch_{concept}_{date}",
  contentPattern: "{format}_{angle}_{version}",
  termPattern: "{avatar_or_broad_signal}",
};

export const metaPrelaunchCampaign = {
  name: "satori_prelaunch_us35_lead_202607",
  stage: "Stage 0 - Vercel Prelaunch",
  buyingType: "Auction",
  objective: "Leads or website conversion",
  optimizationEvent: "Lead preferred; InitiateCheckout acceptable if Lead is not ready",
  budgetType: "Campaign budget optimization",
  dailyBudget: 75,
  durationDays: 14,
  geo: "United States",
  age: "35+ strategic audience; 18+ minimum policy floor",
  placements: "Advantage+ placements",
  destinationPath: paidLandingRoute,
  note:
    "Treat all results as prelaunch intent until real Shopify/payment checkout is live.",
};

const productionLandingUrl = `https://satori-cream-funnel.vercel.app${paidLandingRoute}`;

function createMetaUrl(adName: string, adSetName: string) {
  return `${productionLandingUrl}?utm_source=meta&utm_medium=paid_social&utm_campaign=${metaPrelaunchCampaign.name}&utm_content=${adName}&utm_term=${adSetName}`;
}

export const metaPrelaunchAdSets: MetaPrelaunchAdSet[] = [
  {
    name: "no-needle-ritual_broad_us35",
    concept: "No-Needle Nightly Ritual",
    status: "Day 1",
    audience: "Broad United States, 35+, English, Advantage+ placements",
    optimizationEvent: "Lead",
    budgetNote: "CBO campaign budget; do not force fixed ad set budget on day one.",
    includedAssets: [
      "ugc_needleavoidant_no-needle-ritual_v1",
      "reels_needleavoidant_no-needle-ritual_v1",
    ],
  },
  {
    name: "30-night-habit_broad_us35",
    concept: "30-Night Habit",
    status: "Day 1",
    audience: "Broad United States, 35+, English, Advantage+ placements",
    optimizationEvent: "Lead",
    budgetNote: "CBO campaign budget; keep as one routine concept pack.",
    includedAssets: [
      "demo_routinesimplifier_30-night-habit_v1",
      "texture_routinesimplifier_hydration-texture_v1",
    ],
  },
  {
    name: "starter-kit_broad_us35",
    concept: "Starter Kit Value",
    status: "Day 1",
    audience: "Broad United States, 35+, English, Advantage+ placements",
    optimizationEvent: "Lead",
    budgetNote: "CBO campaign budget; use for offer and bundle-interest signal.",
    includedAssets: [
      "carousel_valuestarter_starter-kit_v1",
      "offer_valuestarter_starter-kit_v1",
    ],
  },
  {
    name: "science-simple_broad_us35",
    concept: "Science Simplified",
    status: "Hold",
    audience: "Broad United States, 35+, English, Advantage+ placements",
    optimizationEvent: "Lead",
    budgetNote: "Hold for day 4 iteration or use if the founder/expert asset is strongest.",
    includedAssets: ["founder_sciencecurious_science-simple_v1"],
  },
  {
    name: "30-night-comment-dm_broad_us35",
    concept: "Comment / DM ritual prompt",
    status: "Hold",
    audience: "Broad United States, 35+, English, Advantage+ placements",
    optimizationEvent: "InitiateCheckout",
    budgetNote:
      "Hold unless running an engagement/message variant. Do not mix objective learning if conversion test is limited.",
    includedAssets: ["dm_routinesimplifier_30-night-habit_v1"],
  },
];

export const metaPrelaunchAds: MetaPrelaunchAd[] = [
  {
    adSetName: "no-needle-ritual_broad_us35",
    adName: "ugc_needleavoidant_no-needle-ritual_v1",
    status: "Day 1",
    format: "UGC talking head",
    primaryText:
      "A smoother-looking nightly ritual without needles or downtime. SATORI keeps the routine calm: cleanse, apply a small amount, and repeat at night. Built for hydration, texture support, and a premium non-invasive skincare ritual.",
    headline: "Start the SATORI ritual",
    description: "One calm cream step for smoother-looking texture.",
    cta: "Shop Now",
    destinationUrl: createMetaUrl(
      "ugc_needleavoidant_no-needle-ritual_v1",
      "no-needle-ritual_broad_us35",
    ),
    policyNote: "No medical replacement claim. No personal-attribute attack.",
  },
  {
    adSetName: "30-night-habit_broad_us35",
    adName: "demo_routinesimplifier_30-night-habit_v1",
    status: "Day 1",
    format: "Night routine demo",
    primaryText:
      "The best anti-aging routine is the one you can actually repeat. Cleanse, apply SATORI, sleep, and keep the ritual simple for 30 nights.",
    headline: "Try the 30-night ritual",
    description: "Hydration, texture support, and a calmer-looking finish.",
    cta: "Shop Now",
    destinationUrl: createMetaUrl(
      "demo_routinesimplifier_30-night-habit_v1",
      "30-night-habit_broad_us35",
    ),
    policyNote: "Gradual cosmetic language only. No guaranteed result.",
  },
  {
    adSetName: "30-night-habit_broad_us35",
    adName: "texture_routinesimplifier_hydration-texture_v1",
    status: "Day 1",
    format: "Texture close-up",
    primaryText:
      "One cream step for a calmer-looking morning finish. SATORI is built for rich hydration, smoother-looking texture, and a night routine that stays simple.",
    headline: "Make tonight simple",
    description: "A premium cream ritual for nightly consistency.",
    cta: "Shop Now",
    destinationUrl: createMetaUrl(
      "texture_routinesimplifier_hydration-texture_v1",
      "30-night-habit_broad_us35",
    ),
    policyNote: "Use product texture and application proof, not transformation proof.",
  },
  {
    adSetName: "starter-kit_broad_us35",
    adName: "carousel_valuestarter_starter-kit_v1",
    status: "Day 1",
    format: "Offer carousel",
    primaryText:
      "Start with the SATORI path that fits your routine: one jar to try, a Duo to stay stocked, or the Ritual Kit to build the 30-night habit.",
    headline: "Choose your ritual path",
    description: "Cream, Duo, or Ritual Kit.",
    cta: "Shop Now",
    destinationUrl: createMetaUrl(
      "carousel_valuestarter_starter-kit_v1",
      "starter-kit_broad_us35",
    ),
    policyNote: "Offer must match the live Vercel page exactly.",
  },
  {
    adSetName: "starter-kit_broad_us35",
    adName: "offer_valuestarter_starter-kit_v1",
    status: "Day 1",
    format: "Offer demo",
    primaryText:
      "If you are starting SATORI, make the first order easy. Start with the Cream, upgrade to the Duo for consistency, or choose the Ritual Kit for the full routine.",
    headline: "Start here",
    description: "A simple first step into the SATORI ritual.",
    cta: "Shop Now",
    destinationUrl: createMetaUrl(
      "offer_valuestarter_starter-kit_v1",
      "starter-kit_broad_us35",
    ),
    policyNote: "No fake scarcity, fake savings, or unavailable membership perks.",
  },
  {
    adSetName: "no-needle-ritual_broad_us35",
    adName: "reels_needleavoidant_no-needle-ritual_v1",
    status: "Day 1",
    format: "Reels short",
    primaryText:
      "No appointment. No downtime. Just one nightly cream step built for hydration, texture support, and a smoother-looking ritual.",
    headline: "No-needle nightly ritual",
    description: "Start with SATORI Cream.",
    cta: "Shop Now",
    destinationUrl: createMetaUrl(
      "reels_needleavoidant_no-needle-ritual_v1",
      "no-needle-ritual_broad_us35",
    ),
    policyNote: "Do not compare outcomes to injectables.",
  },
  {
    adSetName: "science-simple_broad_us35",
    adName: "founder_sciencecurious_science-simple_v1",
    status: "Hold",
    format: "Founder / expert explainer",
    primaryText:
      "Science-led skincare should make the routine clearer, not louder. SATORI translates the story into one premium cream step at night.",
    headline: "Science simplified",
    description: "A serious ritual without a crowded routine.",
    cta: "Learn More",
    destinationUrl: createMetaUrl(
      "founder_sciencecurious_science-simple_v1",
      "science-simple_broad_us35",
    ),
    policyNote: "Authority claims must remain sourced and non-medical.",
  },
  {
    adSetName: "30-night-comment-dm_broad_us35",
    adName: "dm_routinesimplifier_30-night-habit_v1",
    status: "Hold",
    format: "Comment / DM prompt",
    primaryText:
      "Comment 30 and we will send the simple SATORI night ritual: cleanse, apply, sleep, repeat.",
    headline: "Get the 30-night ritual",
    description: "A simple routine path for SATORI Cream.",
    cta: "Learn More",
    destinationUrl: createMetaUrl(
      "dm_routinesimplifier_30-night-habit_v1",
      "30-night-comment-dm_broad_us35",
    ),
    policyNote: "Use for engagement/message testing, not the core conversion test.",
  },
];

export const creativePacks: CreativePack[] = [
  {
    id: "no-needle-ritual",
    layer: "Current",
    stage: "Vercel Prelaunch",
    avatar: "Needle-avoidant anti-aging shopper",
    problem: "Wants smoother-looking skin without invasive beauty pressure.",
    mechanism: "A calm cosmetic cream ritual built around hydration and consistency.",
    proofRequirement: "Product/demo proof is enough for prelaunch; no transformation claim.",
    angle: "No needles / non-invasive ritual",
    hook: "A smoother-looking nightly ritual without needles or downtime.",
    script:
      "Show the jar, a clean application shot, and a calm morning finish. Position Satori as a simple cosmetic ritual for hydrated, smoother-looking skin without comparing the viewer to a flaw.",
    cta: "Start the Satori ritual",
    source: "Sam 2026 concept testing + Meta Health and Wellness policy",
    sourceDate: "2026-06",
    confidence: "High",
    budgetFit:
      "Strong fit for the $75/day prelaunch CBO because the concept is clear, broad, and policy-safe.",
    complianceNote:
      "Use non-invasive language, but do not imply it replaces a medical procedure or guarantees wrinkle removal.",
    utmTerm: "broad_needle_avoidant",
  },
  {
    id: "thirty-night-habit",
    layer: "Current",
    stage: "Vercel Prelaunch",
    avatar: "Routine simplifier",
    problem: "Needs a skincare step simple enough to repeat after a long day.",
    mechanism: "A two-minute nightly ritual with a consistent application rhythm.",
    proofRequirement: "Routine proof, application footage, and clear usage window.",
    angle: "30-night consistency ritual",
    hook: "The anti-aging cream ritual simple enough to repeat every night.",
    script:
      "Film cleanse, apply, bedside table, morning glow. The message is consistency over intensity: one cream step for hydration, texture support, and a calmer-looking finish.",
    cta: "Try the 30-night ritual",
    source: "Sam 2026 psychology framework + Frownies ritual pattern",
    sourceDate: "2026-06",
    confidence: "High",
    budgetFit:
      "Best starter concept for $75/day because it can be shot cheaply in UGC and demo formats.",
    complianceNote:
      "Avoid saying viewers failed their routine. Keep the promise cosmetic and gradual.",
    utmTerm: "broad_routine_simplifier",
  },
  {
    id: "calm-texture",
    layer: "Current",
    stage: "Vercel Prelaunch",
    avatar: "Routine simplifier",
    problem: "Wants skin to look smoother and calmer without adding more products.",
    mechanism: "Hydration, texture support, and a premium cream finish.",
    proofRequirement: "Texture close-ups and application footage only until claims are verified.",
    angle: "Hydration and texture support",
    hook: "One cream step for a calmer-looking morning finish.",
    script:
      "Use product texture, fingertips, and skin finish footage. Keep the language sensory and cosmetic: rich, hydrated, smoother-looking, calmer-looking.",
    cta: "Make tonight simple",
    source: "Sam 2026 creative-as-targeting principle",
    sourceDate: "2026-03",
    confidence: "High",
    budgetFit:
      "Strong fit for cheap production and fast creative iteration during the Vercel test.",
    complianceNote:
      "Do not use clinical repair, reversal, or guaranteed wrinkle language.",
    utmTerm: "broad_texture_hydration",
  },
  {
    id: "science-simple",
    layer: "Stable",
    stage: "Vercel Prelaunch",
    avatar: "Science-curious buyer",
    problem: "Wants credible skincare without a complicated ingredient lecture.",
    mechanism: "Science-led skincare thinking simplified into one cream step.",
    proofRequirement: "Authority positioning must be accurate and sourced.",
    angle: "Science-led skincare made simple",
    hook: "Science-led skincare thinking, simplified into one cream step.",
    script:
      "Founder or expert-style explanation: science should make the routine easier, not more crowded. Keep the authority story clear without medical claims.",
    cta: "See the ritual",
    source: "Satori positioning + repeated Sam authority creative pattern",
    sourceDate: "2025-2026",
    confidence: "Medium",
    budgetFit:
      "Useful as an authority angle, but it should compete against ritual and offer concepts before getting more spend.",
    complianceNote:
      "Do not imply clinical treatment, disease claims, or guaranteed biological reversal.",
    utmTerm: "broad_science_curious",
  },
  {
    id: "starter-kit-value",
    layer: "Current",
    stage: "Vercel Prelaunch",
    avatar: "Starter-kit buyer",
    problem: "Needs the first order to feel easy and worth trying.",
    mechanism: "Cream, Duo, and Ritual Kit offer ladder with subscribe-and-save framing.",
    proofRequirement: "Offer accuracy and price parity with the live page.",
    angle: "Starter kit / bundle value offer",
    hook: "Start with the ritual kit built for consistency, not clutter.",
    script:
      "Show the offer stack: cream, duo, ritual kit, and Subscribe & Save. The creative should make the first order feel obvious and easy while the page stays honest about current availability.",
    cta: "Start here",
    source: "Frownies starter-kit funnel pattern + Sam 2026 concept structure",
    sourceDate: "2026",
    confidence: "High",
    budgetFit:
      "Strong fit for ranking offer interest now. Real AOV and CPA decisions wait for checkout.",
    complianceNote:
      "Offer claims must match the live Vercel page and eventual checkout exactly.",
    utmTerm: "broad_value_starter",
  },
  {
    id: "verified-proof-story",
    layer: "Current",
    stage: "Proof Required",
    avatar: "Proof seeker",
    problem: "Needs real context before trusting a new anti-aging brand.",
    mechanism: "Customer routine story with permission, dates, lighting notes, and usage context.",
    proofRequirement:
      "Written consent, original assets, timeline, routine notes, disclaimers, and claim review.",
    angle: "Real results / customer proof story",
    hook: "Document the ritual. Let the proof do the talking.",
    script:
      "Use verified customer context only: timeline, consent, lighting notes, and routine. In ads, prefer story-led proof and product application over risky side-by-side wrinkle comparison.",
    cta: "See the ritual details",
    source: "Meta Health and Wellness policy + Frownies proof pattern",
    sourceDate: "Current policy",
    confidence: "High",
    budgetFit:
      "Good fit after real proof assets are approved. Until then, keep it in proof-safe planning mode.",
    complianceNote:
      "Before/after assets need permission, dates, disclaimers, and no manipulative side-by-side wrinkle framing in ads.",
    utmTerm: "broad_verified_proof",
  },
  {
    id: "injectable-comparison-safe",
    layer: "Current",
    stage: "Proof Required",
    avatar: "Needle-avoidant anti-aging shopper",
    problem: "Is comparing cosmetic routines with more invasive options.",
    mechanism: "Non-invasive ritual positioning without replacement claims.",
    proofRequirement:
      "Policy review, conservative language, and no direct medical replacement promise.",
    angle: "No-injection comparison, safely framed",
    hook: "For nights when you want a calmer skincare ritual, not an appointment.",
    script:
      "Frame Satori as a cosmetic nightly ritual. Avoid naming procedures in a way that implies equivalent outcomes. Use lifestyle contrast and routine ease, not medical comparison.",
    cta: "Start the ritual",
    source: "Sam 2026 hook testing + Meta policy risk review",
    sourceDate: "2026",
    confidence: "Medium",
    budgetFit:
      "Potentially strong hook, but not a day-one ad until policy-safe variants are reviewed.",
    complianceNote:
      "Do not say Satori replaces Botox, fillers, dermatology, or any medical procedure.",
    utmTerm: "broad_safe_comparison",
  },
  {
    id: "membership-retention",
    layer: "Stable",
    stage: "Real Checkout",
    avatar: "Value starter",
    problem: "Likes the ritual but needs a reason to repeat and stay stocked.",
    mechanism: "Subscribe & Save, membership, replenishment, and bundle ladders.",
    proofRequirement:
      "Live Shopify offers, discount rules, inventory, and retention flow must be real.",
    angle: "Subscribe, save, and stay consistent",
    hook: "The easiest skincare ritual is the one that stays on your shelf.",
    script:
      "Show one jar becoming Duo, Ritual Kit, Subscribe & Save, and membership benefits. Use only live benefits once Shopify is connected.",
    cta: "Keep the ritual going",
    source: "Frownies membership/retention pattern + ecommerce retention fundamentals",
    sourceDate: "2026",
    confidence: "Medium",
    budgetFit:
      "Not a Vercel prelaunch priority. Activate after real checkout, post-purchase data, and replenishment offers exist.",
    complianceNote:
      "Do not advertise membership perks until they are real and redeemable.",
    utmTerm: "broad_retention_value",
  },
];

const formats = [
  {
    id: "ugc",
    label: "UGC talking head",
    body:
      "Creator opens with the hook, shows the jar in hand, applies a small amount, and ends with a direct offer CTA.",
  },
  {
    id: "night-demo",
    label: "Night routine demo",
    body:
      "Clean face, apply cream, close jar, bedside shot, morning skin shot. Keep captions direct and readable.",
  },
  {
    id: "founder",
    label: "Founder / expert explainer",
    body:
      "Explain the mechanism simply: consistent hydration, texture support, calmer-looking skin, and a shorter routine.",
  },
  {
    id: "texture",
    label: "Texture close-up",
    body:
      "Show the cream texture, absorption, and final finish. Use simple cosmetic language and avoid clinical claims.",
  },
  {
    id: "proof-card",
    label: "Proof-safe card",
    body:
      "Use verified proof, product close-up, and one approved claim. If proof is not verified, use product/ritual proof only.",
  },
  {
    id: "carousel",
    label: "Offer carousel",
    body:
      "Frames: problem-safe ritual promise, mechanism, how to use, bundle value, guarantee, CTA.",
  },
  {
    id: "reels-short",
    label: "Reels short",
    body:
      "Six to twelve seconds: hook overlay, application shot, texture close-up, final jar plus CTA.",
  },
  {
    id: "comment-dm",
    label: "Comment / DM prompt",
    body:
      "Ask a simple ritual-fit question and route warm users to help in comments or DM without making personal-attribute claims.",
  },
];

export const adAngles = creativePacks;

export const initialPrelaunchPacks = creativePacks.filter(
  (pack) => pack.stage === "Vercel Prelaunch",
);

const dayOnePrelaunchPackIds = new Set([
  "no-needle-ritual",
  "thirty-night-habit",
  "starter-kit-value",
]);

export const dayOnePrelaunchPacks = creativePacks.filter((pack) =>
  dayOnePrelaunchPackIds.has(pack.id),
);

export const holdPrelaunchPacks = creativePacks.filter(
  (pack) =>
    pack.stage === "Vercel Prelaunch" && !dayOnePrelaunchPackIds.has(pack.id),
);

export const dayOneMetaPrelaunchAdSets = metaPrelaunchAdSets.filter(
  (adSet) => adSet.status === "Day 1",
);

export const holdMetaPrelaunchAdSets = metaPrelaunchAdSets.filter(
  (adSet) => adSet.status === "Hold",
);

export const dayOneMetaPrelaunchAds = metaPrelaunchAds.filter(
  (ad) => ad.status === "Day 1",
);

export const holdMetaPrelaunchAds = metaPrelaunchAds.filter(
  (ad) => ad.status === "Hold",
);

export const adProductionMatrix = creativePacks.flatMap((pack) =>
  formats.map((format, index) => ({
    id: `${pack.id}-${format.id}`,
    format: format.label,
    formatId: format.id,
    stage: pack.stage,
    avatar: pack.avatar,
    problem: pack.problem,
    mechanism: pack.mechanism,
    proofRequirement: pack.proofRequirement,
    hook: pack.hook,
    body: `${pack.script} ${format.body}`,
    cta: pack.cta,
    angle: pack.angle,
    packId: pack.id,
    layer: pack.layer,
    source: pack.source,
    sourceDate: pack.sourceDate,
    confidence: pack.confidence,
    budgetFit: pack.budgetFit,
    complianceNote: pack.complianceNote,
    landingUrl: `${paidLandingRoute}?utm_source=${utmNaming.source}&utm_medium=${utmNaming.medium}&utm_campaign=satori_us35_prelaunch_${pack.id}_launch&utm_content=${format.id}_${pack.id}_v${index + 1}&utm_term=${pack.utmTerm}`,
  })),
);
