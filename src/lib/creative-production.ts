export type ProductionAssetStatus = "publish_day_1" | "hold_review";

export type ProductionShot = {
  order: number;
  shot: string;
  overlay: string;
  voiceoverOrCaption: string;
  notes: string;
};

export type DayOneProductionAsset = {
  assetName: string;
  status: ProductionAssetStatus;
  adSetName: string;
  concept: string;
  format: string;
  duration: string;
  hook: string;
  primaryText: string;
  destinationUrl: string;
  policyNote: string;
  shots: ProductionShot[];
};

export type CreativeLaunchBucket =
  | "static_ready"
  | "carousel_ready"
  | "video_capture_required"
  | "carousel_build_required"
  | "hold_not_for_day_1";

export type CreativeProductionReadinessItem = {
  assetName: string;
  launchBucket: CreativeLaunchBucket;
  launchLabel: string;
  dayOneRole: string;
  currentPreviewUse: string;
  finalAssetType: string;
  requiredBeforeUpload: string;
  nextProductionAction: string;
  fallbackPlan: string;
};

export type CreativeProductionQueueStatus =
  | "qa_now"
  | "shoot_now"
  | "design_now"
  | "hold_claim_review"
  | "hold_flow_setup";

export type CreativeProductionQueueItem = {
  priority: number;
  workstream: string;
  status: CreativeProductionQueueStatus;
  owner: string;
  assetNames: string[];
  deliverable: string;
  setup: string;
  captureChecklist: string[];
  editorNotes: string[];
  doneWhen: string;
};

export type CarouselCardAsset = {
  order: number;
  title: string;
  file1x1: string;
  file4x5: string;
  reviewNote: string;
};

export type VideoProductionShot = {
  timecode: string;
  shot: string;
  overlay: string;
  voiceover: string;
  rawFileName: string;
  editNote: string;
};

export type VideoProductionScript = {
  assetName: string;
  status: "ready_to_shoot";
  format: string;
  duration: string;
  objective: string;
  rawFilePrefix: string;
  creatorBrief: string;
  teleprompter: string;
  finalDeliverables: string[];
  shots: VideoProductionShot[];
  editorNotes: string[];
  complianceChecks: string[];
};

export type VideoShootKitOutput = {
  assetName: string;
  folder: string;
  readme: string;
  shotList: string;
  rawChecklist: string;
  editorHandoff: string;
  rawFootageFolder: string;
  finalExportsFolder: string;
  expectedFinalFiles: string[];
};

export type FinalCreativeApprovalStage =
  | "ready_for_visual_qa"
  | "requires_final_footage"
  | "hold_do_not_upload";

export type FinalCreativeApprovalItem = {
  assetName: string;
  adSetName: string;
  approvalStage: FinalCreativeApprovalStage;
  approvalLabel: string;
  currentFiles: string[];
  requiredFinalFiles: string[];
  mustApprove: string[];
  blocker: string;
  nextAction: string;
  metaUploadRule: string;
};

export type ClaimAdStatus =
  | "approved"
  | "approved_with_context"
  | "hold_for_review"
  | "do_not_use";

export type ClaimProofItem = {
  claim: string;
  claimType: string;
  whereUsed: string;
  evidenceRequired: string;
  currentEvidenceStatus: string;
  adStatus: ClaimAdStatus;
  notes: string;
};

export const productionBoardSummary = {
  campaign: "satori_prelaunch_us35_lead_202607",
  budget: "$75/day CBO",
  stage: "Stage 0 - Vercel prelaunch",
  docs: [
    "docs/satori-day-one-creative-execution-pack.md",
    "exports/satori-meta-ad-upload-map.csv",
    "exports/creative/satori-day-one-preview-manifest.csv",
    "exports/satori-day-one-creative-shotlist.csv",
    "exports/satori-claim-proof-registry.csv",
    "exports/satori-meta-prelaunch-ad-copy.csv",
    "docs/satori-final-creative-production-readiness.md",
    "exports/satori-final-creative-production-readiness.csv",
    "docs/satori-video-carousel-production-queue.md",
    "exports/satori-video-carousel-production-queue.csv",
    "docs/satori-video-production-scripts.md",
    "exports/satori-video-production-scripts.csv",
    "exports/video-shoot-kit/README.md",
    "exports/video-shoot-kit/satori-video-shoot-kit-manifest.csv",
    "exports/video-shoot-kit/satori-raw-footage-intake.csv",
    "docs/satori-final-creative-approval-gate.md",
    "exports/satori-final-creative-approval-gate.csv",
  ],
};

export const dayOneProductionAssets: DayOneProductionAsset[] = [
  {
    assetName: "ugc_needleavoidant_no-needle-ritual_v1",
    status: "publish_day_1",
    adSetName: "no-needle-ritual_broad_us35",
    concept: "No-Needle Nightly Ritual",
    format: "UGC talking head",
    duration: "24-30s",
    hook: "A smoother-looking nightly ritual without needles or downtime.",
    primaryText:
      "A smoother-looking nightly ritual without needles or downtime. SATORI keeps the routine calm: cleanse, apply a small amount, and repeat at night.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=ugc_needleavoidant_no-needle-ritual_v1&utm_term=no-needle-ritual_broad_us35",
    policyNote: "No medical replacement claim. No personal-attribute attack.",
    shots: [
      {
        order: 1,
        shot: "Creator holds SATORI jar in first frame.",
        overlay: "No needles",
        voiceoverOrCaption:
          "If you want a serious nighttime ritual without appointments or downtime, this is the SATORI routine.",
        notes: "Product must be visible immediately.",
      },
      {
        order: 2,
        shot: "Cream texture close-up.",
        overlay: "One nightly cream step",
        voiceoverOrCaption:
          "Cleanse, apply a small amount, and keep the step simple.",
        notes: "No clinical or medical props.",
      },
      {
        order: 3,
        shot: "Application to cheek and neck.",
        overlay: "Hydration + texture support",
        voiceoverOrCaption:
          "Built for hydration, smoother-looking texture, and a calmer-looking finish over time.",
        notes: "Show normal skin texture.",
      },
      {
        order: 4,
        shot: "Jar on nightstand or vanity.",
        overlay: "Start the SATORI ritual",
        voiceoverOrCaption: "Start with the Cream, Duo, or Ritual Kit.",
        notes: "CTA at end.",
      },
    ],
  },
  {
    assetName: "reels_needleavoidant_no-needle-ritual_v1",
    status: "publish_day_1",
    adSetName: "no-needle-ritual_broad_us35",
    concept: "No-Needle Nightly Ritual",
    format: "Reels short",
    duration: "8-12s",
    hook: "No appointment. No downtime. One nightly cream step.",
    primaryText:
      "No appointment. No downtime. Just one nightly cream step built for hydration, texture support, and a smoother-looking ritual.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=reels_needleavoidant_no-needle-ritual_v1&utm_term=no-needle-ritual_broad_us35",
    policyNote: "Do not compare outcomes to injectables.",
    shots: [
      {
        order: 1,
        shot: "Product in hand.",
        overlay: "No appointment.",
        voiceoverOrCaption: "No appointment.",
        notes: "Fast hook.",
      },
      {
        order: 2,
        shot: "Texture and application.",
        overlay: "No downtime.",
        voiceoverOrCaption: "No downtime.",
        notes: "Avoid injectable comparison visuals.",
      },
      {
        order: 3,
        shot: "Nightstand product hero.",
        overlay: "One nightly cream step.",
        voiceoverOrCaption:
          "Just one nightly cream step built for hydration and texture support.",
        notes: "End with product.",
      },
    ],
  },
  {
    assetName: "demo_routinesimplifier_30-night-habit_v1",
    status: "publish_day_1",
    adSetName: "30-night-habit_broad_us35",
    concept: "30-Night Habit",
    format: "Night routine demo",
    duration: "15-20s",
    hook: "The best anti-aging routine is the one you can actually repeat.",
    primaryText:
      "The best anti-aging routine is the one you can actually repeat. Cleanse, apply SATORI, sleep, and keep the ritual simple for 30 nights.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=demo_routinesimplifier_30-night-habit_v1&utm_term=30-night-habit_broad_us35",
    policyNote: "Gradual cosmetic language only. No guaranteed result.",
    shots: [
      {
        order: 1,
        shot: "Crowded shelf or tired night routine.",
        overlay: "Too many steps?",
        voiceoverOrCaption:
          "The best anti-aging routine is the one you can actually repeat.",
        notes: "Avoid shaming viewer.",
      },
      {
        order: 2,
        shot: "SATORI jar enters frame.",
        overlay: "One cream step.",
        voiceoverOrCaption:
          "Cleanse, apply SATORI, sleep, and keep the ritual simple.",
        notes: "Product centered.",
      },
      {
        order: 3,
        shot: "Apply to face and neck.",
        overlay: "Cleanse. Apply. Sleep.",
        voiceoverOrCaption: "Repeat for 30 nights.",
        notes: "Use calm pace.",
      },
      {
        order: 4,
        shot: "Calendar or checkmark.",
        overlay: "Try the 30-night ritual.",
        voiceoverOrCaption: "Start with SATORI Cream.",
        notes: "No guaranteed result.",
      },
    ],
  },
  {
    assetName: "texture_routinesimplifier_hydration-texture_v1",
    status: "publish_day_1",
    adSetName: "30-night-habit_broad_us35",
    concept: "Hydration And Texture Support",
    format: "Texture close-up",
    duration: "10-15s",
    hook: "One cream step for a calmer-looking morning finish.",
    primaryText:
      "One cream step for a calmer-looking morning finish. SATORI is built for rich hydration, smoother-looking texture, and a night routine that stays simple.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=texture_routinesimplifier_hydration-texture_v1&utm_term=30-night-habit_broad_us35",
    policyNote: "Use product texture and application proof, not transformation proof.",
    shots: [
      {
        order: 1,
        shot: "Macro cream texture.",
        overlay: "Rich cream texture.",
        voiceoverOrCaption:
          "One cream step for a calmer-looking morning finish.",
        notes: "Macro shot.",
      },
      {
        order: 2,
        shot: "Fingertip pickup and application.",
        overlay: "Apply at night.",
        voiceoverOrCaption:
          "Built for rich hydration and smoother-looking texture.",
        notes: "No transformation proof.",
      },
      {
        order: 3,
        shot: "Soft finish and product shot.",
        overlay: "Make tonight simple.",
        voiceoverOrCaption: "A night routine that stays simple.",
        notes: "End with jar.",
      },
    ],
  },
  {
    assetName: "carousel_valuestarter_starter-kit_v1",
    status: "publish_day_1",
    adSetName: "starter-kit_broad_us35",
    concept: "Starter Kit Value",
    format: "Offer carousel",
    duration: "Static",
    hook: "Start with the ritual kit built for consistency, not clutter.",
    primaryText:
      "Start with the SATORI path that fits your routine: one jar to try, a Duo to stay stocked, or the Ritual Kit to build the 30-night habit.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=carousel_valuestarter_starter-kit_v1&utm_term=starter-kit_broad_us35",
    policyNote: "Offer must match the live Vercel page exactly.",
    shots: [
      {
        order: 1,
        shot: "SATORI product hero.",
        overlay: "Start the SATORI ritual.",
        voiceoverOrCaption: "Start with the SATORI path that fits your routine.",
        notes: "Frame 1.",
      },
      {
        order: 2,
        shot: "Single cream jar.",
        overlay: "Cream: simple first step.",
        voiceoverOrCaption: "One jar to try.",
        notes: "Frame 2.",
      },
      {
        order: 3,
        shot: "Duo bundle.",
        overlay: "Duo: stay consistent.",
        voiceoverOrCaption: "Two jars for consistency.",
        notes: "Frame 3.",
      },
      {
        order: 4,
        shot: "Ritual Kit.",
        overlay: "Ritual Kit: build the habit.",
        voiceoverOrCaption: "Choose the kit for the 30-night habit.",
        notes: "Frame 4.",
      },
      {
        order: 5,
        shot: "Subscribe offer.",
        overlay: "Subscribe & Save 15%.",
        voiceoverOrCaption: "Keep the ritual stocked.",
        notes: "Only if live on page.",
      },
      {
        order: 6,
        shot: "Product CTA.",
        overlay: "Choose your ritual path.",
        voiceoverOrCaption: "Tap Shop Now.",
        notes: "Match landing offers.",
      },
    ],
  },
  {
    assetName: "offer_valuestarter_starter-kit_v1",
    status: "publish_day_1",
    adSetName: "starter-kit_broad_us35",
    concept: "Starter Kit Value",
    format: "Offer demo",
    duration: "12-18s",
    hook: "Choose your ritual path: Cream, Duo, or Ritual Kit.",
    primaryText:
      "If you are starting SATORI, make the first order easy. Start with the Cream, upgrade to the Duo for consistency, or choose the Ritual Kit for the full routine.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=offer_valuestarter_starter-kit_v1&utm_term=starter-kit_broad_us35",
    policyNote: "No fake scarcity, fake savings, or unavailable membership perks.",
    shots: [
      {
        order: 1,
        shot: "One jar product card.",
        overlay: "Cream: simple first step.",
        voiceoverOrCaption:
          "If you are starting SATORI, make the first order easy.",
        notes: "Use real page/product visuals.",
      },
      {
        order: 2,
        shot: "Duo product card.",
        overlay: "Duo: stay consistent.",
        voiceoverOrCaption: "Upgrade to the Duo for consistency.",
        notes: "Match current price.",
      },
      {
        order: 3,
        shot: "Ritual Kit card.",
        overlay: "Ritual Kit: build the habit.",
        voiceoverOrCaption: "Or choose the Ritual Kit for the full routine.",
        notes: "Match current price.",
      },
      {
        order: 4,
        shot: "Add-to-cart screen.",
        overlay: "Start here.",
        voiceoverOrCaption: "Choose your ritual path.",
        notes: "No fake scarcity.",
      },
    ],
  },
  {
    assetName: "founder_sciencecurious_science-simple_v1",
    status: "hold_review",
    adSetName: "science-simple_broad_us35",
    concept: "Science Simplified",
    format: "Founder explainer",
    duration: "20-30s",
    hook: "Science-led skincare thinking simplified into one cream step.",
    primaryText:
      "Science-led skincare should make the routine clearer, not louder. SATORI translates the story into one premium cream step at night.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=founder_sciencecurious_science-simple_v1&utm_term=science-simple_broad_us35",
    policyNote: "Hold until source review for authority language.",
    shots: [
      {
        order: 1,
        shot: "Founder/expert-style talking head with product.",
        overlay: "Science-led, simplified.",
        voiceoverOrCaption:
          "Science-led skincare should make the routine clearer, not louder.",
        notes: "Hold until source review.",
      },
      {
        order: 2,
        shot: "Product texture and application.",
        overlay: "Hydration. Texture support. Consistency.",
        voiceoverOrCaption:
          "SATORI translates the story into one premium cream step at night.",
        notes: "Avoid unsourced authority.",
      },
    ],
  },
  {
    assetName: "dm_routinesimplifier_30-night-habit_v1",
    status: "hold_review",
    adSetName: "30-night-comment-dm_broad_us35",
    concept: "Comment / DM ritual prompt",
    format: "Comment DM prompt",
    duration: "8-12s",
    hook: "Comment 30 and we will send the nightly ritual path.",
    primaryText:
      "Comment 30 and we will send the simple SATORI night ritual: cleanse, apply, sleep, repeat.",
    destinationUrl:
      "https://satori-cream-funnel.vercel.app/pages/satori-wrinkle-smoothing-ritual?utm_source=meta&utm_medium=paid_social&utm_campaign=satori_prelaunch_us35_lead_202607&utm_content=dm_routinesimplifier_30-night-habit_v1&utm_term=30-night-habit_broad_us35",
    policyNote: "Use separate engagement objective only.",
    shots: [
      {
        order: 1,
        shot: "Creator/product with direct prompt.",
        overlay: "Comment 30.",
        voiceoverOrCaption:
          "Comment 30 and we will send the simple SATORI night ritual.",
        notes: "Use separate objective only.",
      },
      {
        order: 2,
        shot: "Routine steps on screen.",
        overlay: "Cleanse. Apply. Sleep. Repeat.",
        voiceoverOrCaption: "We will send the nightly ritual path.",
        notes: "Do not mix with core conversion test.",
      },
    ],
  },
];

export const creativeReadinessBuckets = [
  {
    bucket: "static_ready",
    label: "Static ready",
    description:
      "Can be uploaded as a single-image ad after final visual approval.",
  },
  {
    bucket: "carousel_ready",
    label: "Carousel ready",
    description:
      "Final card set is generated and ready for visual/offer QA before upload.",
  },
  {
    bucket: "video_capture_required",
    label: "Video needed",
    description:
      "Approved concept, but the preview PNG is only a storyboard/static backup.",
  },
  {
    bucket: "carousel_build_required",
    label: "Carousel needed",
    description:
      "Approved concept, but the final card set must be exported before upload.",
  },
  {
    bucket: "hold_not_for_day_1",
    label: "Hold",
    description:
      "Do not publish in the core $75/day conversion test.",
  },
] as const satisfies {
  bucket: CreativeLaunchBucket;
  label: string;
  description: string;
}[];

export const creativeProductionReadiness: CreativeProductionReadinessItem[] = [
  {
    assetName: "ugc_needleavoidant_no-needle-ritual_v1",
    launchBucket: "video_capture_required",
    launchLabel: "Video needed",
    dayOneRole: "Day-one concept approved for no-needle ritual testing.",
    currentPreviewUse:
      "Use as internal QA storyboard and emergency static backup only.",
    finalAssetType: "9:16 UGC talking-head video, 24-30 seconds",
    requiredBeforeUpload:
      "Record final creator video with product visible in the first 2 seconds.",
    nextProductionAction:
      "Film creator holding jar, texture close-up, cheek/neck application, and vanity CTA.",
    fallbackPlan:
      "If video is delayed, keep the concept live through the Reels short or static texture asset instead of uploading the storyboard as the main ad.",
  },
  {
    assetName: "reels_needleavoidant_no-needle-ritual_v1",
    launchBucket: "video_capture_required",
    launchLabel: "Video needed",
    dayOneRole: "Day-one short-form hook for the no-needle ritual ad set.",
    currentPreviewUse: "Use as QA storyboard and static backup only.",
    finalAssetType: "9:16 Reels-style product video, 8-12 seconds",
    requiredBeforeUpload:
      "Record fast product-in-hand, texture/application, and nightstand hero shots.",
    nextProductionAction:
      "Capture three short clips matching the overlays: No appointment, No downtime, One nightly cream step.",
    fallbackPlan:
      "If not filmed, let the UGC long-form carry the ad set after it is produced.",
  },
  {
    assetName: "demo_routinesimplifier_30-night-habit_v1",
    launchBucket: "video_capture_required",
    launchLabel: "Video needed",
    dayOneRole: "Day-one routine demo for the 30-night habit concept.",
    currentPreviewUse: "Use as storyboard/static backup for internal approval.",
    finalAssetType: "9:16 night routine demo video, 15-20 seconds",
    requiredBeforeUpload:
      "Record cleanse, apply, sleep/bedside, and 30-night consistency cue.",
    nextProductionAction:
      "Shoot the routine in one calm bathroom/vanity setup with product centered.",
    fallbackPlan:
      "If video is delayed, launch the static texture asset first and add this demo as the first iteration.",
  },
  {
    assetName: "texture_routinesimplifier_hydration-texture_v1",
    launchBucket: "static_ready",
    launchLabel: "Static ready",
    dayOneRole: "Day-one static ad for hydration and texture support.",
    currentPreviewUse: "Can be uploaded as a single-image ad after visual QA.",
    finalAssetType: "Single-image ad now; optional 10-15 second macro video later",
    requiredBeforeUpload:
      "Final visual approval that product, texture, and copy match the live funnel.",
    nextProductionAction:
      "Approve the current still or replace with a cleaner macro product/application frame.",
    fallbackPlan:
      "Use as the first routine concept if the demo video is not ready.",
  },
  {
    assetName: "carousel_valuestarter_starter-kit_v1",
    launchBucket: "carousel_ready",
    launchLabel: "Carousel ready",
    dayOneRole: "Day-one offer concept for Cream, Duo, Ritual Kit, and Subscribe & Save.",
    currentPreviewUse:
      "Final card set is generated in public/creative/satori-carousel/starter-kit.",
    finalAssetType: "6 carousel cards, exported in 1:1 and 4:5 safe variants",
    requiredBeforeUpload:
      "Review generated cards for offer parity, mobile readability, and policy-safe claims.",
    nextProductionAction:
      "Approve the generated carousel cards or rerun npm run creative:carousel after copy/design edits.",
    fallbackPlan:
      "If cards are not ready, launch the single-image offer asset first.",
  },
  {
    assetName: "offer_valuestarter_starter-kit_v1",
    launchBucket: "static_ready",
    launchLabel: "Static ready",
    dayOneRole: "Day-one static offer ad for starter-kit value testing.",
    currentPreviewUse: "Can be uploaded as a single-image ad after visual QA.",
    finalAssetType: "Single-image ad now; optional 12-18 second offer demo later",
    requiredBeforeUpload:
      "Final visual approval that bundle names, pricing, and CTA match the live funnel.",
    nextProductionAction:
      "Approve the current still or replace with a cleaner bundle/product frame.",
    fallbackPlan:
      "Use as the starter-kit concept if the carousel set is not ready.",
  },
  {
    assetName: "founder_sciencecurious_science-simple_v1",
    launchBucket: "hold_not_for_day_1",
    launchLabel: "Hold",
    dayOneRole:
      "Hold as a later authority/education angle after claim source review.",
    currentPreviewUse: "Internal review only.",
    finalAssetType: "Founder/expert explainer video, 20-30 seconds",
    requiredBeforeUpload:
      "Approve authority language and source file before filming or publishing.",
    nextProductionAction:
      "Collect source notes for science-led claims and rewrite script without unsupported authority language.",
    fallbackPlan:
      "Keep outside the core launch until proof and compliance are clean.",
  },
  {
    assetName: "dm_routinesimplifier_30-night-habit_v1",
    launchBucket: "hold_not_for_day_1",
    launchLabel: "Hold",
    dayOneRole:
      "Hold for a separate engagement/message flow, not the core conversion test.",
    currentPreviewUse: "Internal review only.",
    finalAssetType: "9:16 comment-to-DM prompt creative, 8-12 seconds",
    requiredBeforeUpload:
      "Confirm DM/comment automation and run under a separate objective if used.",
    nextProductionAction:
      "Design the DM response path before producing final engagement creative.",
    fallbackPlan:
      "Do not mix this with the $75/day conversion campaign.",
  },
];

export const creativeProductionReadinessSummary = {
  staticReady: creativeProductionReadiness.filter(
    (item) => item.launchBucket === "static_ready",
  ).length,
  carouselReady: creativeProductionReadiness.filter(
    (item) => item.launchBucket === "carousel_ready",
  ).length,
  videoCaptureRequired: creativeProductionReadiness.filter(
    (item) => item.launchBucket === "video_capture_required",
  ).length,
  carouselBuildRequired: creativeProductionReadiness.filter(
    (item) => item.launchBucket === "carousel_build_required",
  ).length,
  holdNotForDayOne: creativeProductionReadiness.filter(
    (item) => item.launchBucket === "hold_not_for_day_1",
  ).length,
};

export const creativeProductionQueue: CreativeProductionQueueItem[] = [
  {
    priority: 1,
    workstream: "Approve the two static-ready files",
    status: "qa_now",
    owner: "Creative lead",
    assetNames: [
      "texture_routinesimplifier_hydration-texture_v1",
      "offer_valuestarter_starter-kit_v1",
    ],
    deliverable:
      "Final approved PNGs in exports/meta-upload/day-one-static-ready.",
    setup:
      "Review image clarity, offer parity, product visibility, and compliance before upload.",
    captureChecklist: [
      "Product and texture are clear on mobile.",
      "No unverified transformation, review, or medical claim appears.",
      "Offer names and CTA match the Vercel funnel.",
      "Regenerate the upload kit after approval.",
    ],
    editorNotes: [
      "Do not add ratings, badges, clinical seals, or before/after framing.",
      "Keep the approved PNG filename unchanged for UTM and upload tracking.",
    ],
    doneWhen:
      "Both PNGs are approved and `npm run meta:upload-kit` has been regenerated.",
  },
  {
    priority: 2,
    workstream: "Film no-needle creator batch",
    status: "shoot_now",
    owner: "Creator / editor",
    assetNames: [
      "ugc_needleavoidant_no-needle-ritual_v1",
      "reels_needleavoidant_no-needle-ritual_v1",
    ],
    deliverable:
      "One 24-30s UGC talking-head video and one 8-12s Reels cutdown.",
    setup:
      "Vanity or bathroom setup with SATORI visible in the first frame, plus nightstand product hero.",
    captureChecklist: [
      "Creator holds the jar in the first 2 seconds.",
      "Macro texture pickup on fingertip.",
      "Application to cheek and neck with normal skin texture.",
      "Nightstand or vanity CTA shot.",
      "Clean 3-second product-only end frame.",
    ],
    editorNotes: [
      "Export 9:16 master and 4:5 crop-safe version.",
      "Use overlays: No appointment, No downtime, One nightly cream step.",
      "Do not imply equivalent injectable outcomes.",
    ],
    doneWhen:
      "Both videos are exported, reviewed, and marked ready in the upload manifest.",
  },
  {
    priority: 3,
    workstream: "Film 30-night routine demo",
    status: "shoot_now",
    owner: "Creator / editor",
    assetNames: ["demo_routinesimplifier_30-night-habit_v1"],
    deliverable: "One 15-20s night routine demo video.",
    setup:
      "Calm bathroom or vanity scene with cleanse, apply, close jar, bedside, and consistency cue.",
    captureChecklist: [
      "Before-routine shelf or routine-start shot without shaming copy.",
      "SATORI jar enters as the simple cream step.",
      "Cleanse, apply, sleep sequence.",
      "Calendar, checklist, or 30-night cue.",
      "Product CTA end frame.",
    ],
    editorNotes: [
      "Export 9:16 master and 4:5 crop-safe version.",
      "Use gradual cosmetic language only.",
      "No guaranteed result or transformation proof.",
    ],
    doneWhen:
      "Routine demo is exported, reviewed, and added to the Meta upload set.",
  },
  {
    priority: 4,
    workstream: "Review starter-kit carousel export",
    status: "qa_now",
    owner: "Creative lead / designer",
    assetNames: ["carousel_valuestarter_starter-kit_v1"],
    deliverable:
      "Generated carousel cards for Cream, Duo, Ritual Kit, Subscribe & Save, and CTA.",
    setup:
      "Review the generated 1:1 and 4:5 cards in public/creative/satori-carousel/starter-kit.",
    captureChecklist: [
      "Card 1: SATORI ritual opening.",
      "Card 2: Cream simple first step.",
      "Card 3: Duo consistency.",
      "Card 4: Ritual Kit habit build.",
      "Card 5: Subscribe & Save only if live.",
      "Card 6: CTA to choose your ritual path.",
    ],
    editorNotes: [
      "Generated exports already include 1:1 and 4:5 safe versions.",
      "Do not invent savings, scarcity, reviews, or membership perks.",
      "Check current prices before upload.",
    ],
    doneWhen:
      "All carousel cards pass offer parity and mobile readability QA.",
  },
  {
    priority: 5,
    workstream: "Hold founder/science authority angle",
    status: "hold_claim_review",
    owner: "Brand / compliance",
    assetNames: ["founder_sciencecurious_science-simple_v1"],
    deliverable: "Founder/expert explainer only after authority claims are sourced.",
    setup:
      "Collect approved source notes for science-led language before filming.",
    captureChecklist: [
      "Source file exists for science-led claim language.",
      "Script avoids unsupported authority phrasing.",
      "No clinical treatment or biological reversal language.",
    ],
    editorNotes: [
      "Keep this outside the $75/day core test.",
      "Use later as education/authority iteration if ritual/offer concepts win.",
    ],
    doneWhen:
      "Authority copy is sourced, approved, and converted into a conservative script.",
  },
  {
    priority: 6,
    workstream: "Hold comment-to-DM flow",
    status: "hold_flow_setup",
    owner: "Lifecycle / DM ops",
    assetNames: ["dm_routinesimplifier_30-night-habit_v1"],
    deliverable: "Comment-to-DM creative only after the response flow exists.",
    setup:
      "Define the DM automation, reply copy, tracking, and objective before producing creative.",
    captureChecklist: [
      "DM flow is written and tested.",
      "Engagement/message objective is separated from conversion test.",
      "Landing link and UTM are defined for the DM path.",
    ],
    editorNotes: [
      "Do not mix this into the core conversion campaign.",
      "Use after there is a clear IG/DM support process.",
    ],
    doneWhen:
      "DM flow is tested and a separate engagement test is approved.",
  },
];

export const starterKitCarouselCards: CarouselCardAsset[] = [
  {
    order: 1,
    title: "Ritual path opener",
    file1x1:
      "/creative/satori-carousel/starter-kit/1x1/card_01_ritual-path_1080x1080.png",
    file4x5:
      "/creative/satori-carousel/starter-kit/4x5/card_01_ritual-path_1080x1350.png",
    reviewNote: "Introduces Cream, Duo, and Ritual Kit without fake urgency.",
  },
  {
    order: 2,
    title: "Cream first step",
    file1x1:
      "/creative/satori-carousel/starter-kit/1x1/card_02_cream_1080x1080.png",
    file4x5:
      "/creative/satori-carousel/starter-kit/4x5/card_02_cream_1080x1350.png",
    reviewNote: "Simple entry offer at $39.99.",
  },
  {
    order: 3,
    title: "Duo consistency",
    file1x1:
      "/creative/satori-carousel/starter-kit/1x1/card_03_duo_1080x1080.png",
    file4x5:
      "/creative/satori-carousel/starter-kit/4x5/card_03_duo_1080x1350.png",
    reviewNote: "Duo value framed around staying stocked.",
  },
  {
    order: 4,
    title: "Ritual Kit habit",
    file1x1:
      "/creative/satori-carousel/starter-kit/1x1/card_04_ritual-kit_1080x1080.png",
    file4x5:
      "/creative/satori-carousel/starter-kit/4x5/card_04_ritual-kit_1080x1350.png",
    reviewNote: "90-day habit framing without guaranteed result language.",
  },
  {
    order: 5,
    title: "Subscribe and Save",
    file1x1:
      "/creative/satori-carousel/starter-kit/1x1/card_05_subscribe-save_1080x1080.png",
    file4x5:
      "/creative/satori-carousel/starter-kit/4x5/card_05_subscribe-save_1080x1350.png",
    reviewNote: "Uses 15% savings only because it is already in the funnel.",
  },
  {
    order: 6,
    title: "Shop Now CTA",
    file1x1:
      "/creative/satori-carousel/starter-kit/1x1/card_06_cta_1080x1080.png",
    file4x5:
      "/creative/satori-carousel/starter-kit/4x5/card_06_cta_1080x1350.png",
    reviewNote: "Closes with choose-your-path CTA.",
  },
];

export const videoProductionScripts: VideoProductionScript[] = [
  {
    assetName: "ugc_needleavoidant_no-needle-ritual_v1",
    status: "ready_to_shoot",
    format: "UGC talking head",
    duration: "24-30 seconds",
    objective:
      "Make the no-needle ritual concept feel personal, simple, and credible without medical comparison claims.",
    rawFilePrefix: "SATORI_UGC_NO_NEEDLE",
    creatorBrief:
      "Speak like a real customer explaining a night routine. Product must be in hand or clearly visible in the first frame.",
    teleprompter:
      "If you want a serious nighttime ritual without appointments or downtime, this is the SATORI routine. Cleanse, apply a small amount, and keep the step simple. It is built for hydration, smoother-looking texture, and a calmer-looking finish over time. Start with the Cream, Duo, or Ritual Kit depending on how consistent you want to be. Tap Shop Now and start the SATORI ritual.",
    finalDeliverables: [
      "9:16 MP4, 1080x1920, H.264, 24-30 seconds",
      "4:5 MP4, 1080x1350 crop-safe version",
      "Captioned version with safe overlays",
      "Clean product-only end frame",
    ],
    shots: [
      {
        timecode: "0-2s",
        shot: "Creator holds SATORI jar close to camera.",
        overlay: "No needles",
        voiceover:
          "If you want a serious nighttime ritual without appointments or downtime...",
        rawFileName: "SATORI_UGC_NO_NEEDLE_A_HOOK_PRODUCT",
        editNote: "Product visible immediately; use as opening frame.",
      },
      {
        timecode: "3-7s",
        shot: "Creator at vanity, jar visible beside face.",
        overlay: "No downtime",
        voiceover: "...this is the SATORI routine.",
        rawFileName: "SATORI_UGC_NO_NEEDLE_B_TALKING_HEAD",
        editNote: "Natural delivery, no medical or injectable outcome comparison.",
      },
      {
        timecode: "8-14s",
        shot: "Texture close-up and fingertip pickup.",
        overlay: "One nightly cream step",
        voiceover:
          "Cleanse, apply a small amount, and keep the step simple.",
        rawFileName: "SATORI_UGC_NO_NEEDLE_C_TEXTURE",
        editNote: "Use macro crop; keep skin/product realistic.",
      },
      {
        timecode: "15-23s",
        shot: "Application to cheek and neck.",
        overlay: "Hydration + texture support",
        voiceover:
          "Built for hydration, smoother-looking texture, and a calmer-looking finish over time.",
        rawFileName: "SATORI_UGC_NO_NEEDLE_D_APPLICATION",
        editNote: "Show normal skin texture; no before/after framing.",
      },
      {
        timecode: "24-30s",
        shot: "Jar on vanity or nightstand with simple CTA gesture.",
        overlay: "Start the SATORI ritual",
        voiceover: "Start with the Cream, Duo, or Ritual Kit.",
        rawFileName: "SATORI_UGC_NO_NEEDLE_E_CTA",
        editNote: "End with product and Shop Now CTA.",
      },
    ],
    editorNotes: [
      "Cut fast enough for Reels/Feed but keep the product readable.",
      "Use captions for every spoken line.",
      "Use warm bathroom/vanity light, not clinical lighting.",
      "Keep first 2 seconds product-forward.",
    ],
    complianceChecks: [
      "No 'works like Botox' or injectable replacement claim.",
      "No 'your wrinkles' personal-attribute attack.",
      "No guaranteed wrinkle removal language.",
      "No fake review, rating, or before/after proof.",
    ],
  },
  {
    assetName: "reels_needleavoidant_no-needle-ritual_v1",
    status: "ready_to_shoot",
    format: "Reels short",
    duration: "8-12 seconds",
    objective:
      "Create the shortest hook version of the no-needle ritual concept for fast placement testing.",
    rawFilePrefix: "SATORI_REELS_NO_NEEDLE",
    creatorBrief:
      "No long talking head. Shoot quick product, texture, application, and nightstand frames with crisp overlays.",
    teleprompter:
      "No appointment. No downtime. One nightly cream step built for hydration and texture support. Start with SATORI Cream.",
    finalDeliverables: [
      "9:16 MP4, 1080x1920, 8-12 seconds",
      "4:5 MP4, 1080x1350 crop-safe version",
      "Caption/overlay-only version",
    ],
    shots: [
      {
        timecode: "0-2s",
        shot: "Product in hand enters frame.",
        overlay: "No appointment.",
        voiceover: "No appointment.",
        rawFileName: "SATORI_REELS_NO_NEEDLE_A_PRODUCT_HAND",
        editNote: "Fast hook; jar label readable.",
      },
      {
        timecode: "2-4s",
        shot: "Texture close-up on fingertip.",
        overlay: "No downtime.",
        voiceover: "No downtime.",
        rawFileName: "SATORI_REELS_NO_NEEDLE_B_TEXTURE",
        editNote: "Macro, soft movement.",
      },
      {
        timecode: "4-8s",
        shot: "Quick application to cheek or neck.",
        overlay: "One nightly cream step.",
        voiceover: "One nightly cream step.",
        rawFileName: "SATORI_REELS_NO_NEEDLE_C_APPLICATION",
        editNote: "Avoid transformation implication.",
      },
      {
        timecode: "8-12s",
        shot: "Jar on nightstand, hand leaves frame.",
        overlay: "Start with SATORI Cream",
        voiceover: "Start with SATORI Cream.",
        rawFileName: "SATORI_REELS_NO_NEEDLE_D_NIGHTSTAND_CTA",
        editNote: "End on clean product shot.",
      },
    ],
    editorNotes: [
      "Use hard cuts or very quick dissolves.",
      "Make overlay text large enough for mobile.",
      "No music that overpowers captions.",
    ],
    complianceChecks: [
      "No direct procedure comparison visuals.",
      "No medical or treatment language.",
      "No personal flaw callout.",
      "No before/after result.",
    ],
  },
  {
    assetName: "demo_routinesimplifier_30-night-habit_v1",
    status: "ready_to_shoot",
    format: "Night routine demo",
    duration: "15-20 seconds",
    objective:
      "Show SATORI as the repeatable 30-night ritual for routine simplifiers.",
    rawFilePrefix: "SATORI_DEMO_30_NIGHT",
    creatorBrief:
      "Shoot calm routine footage, not a dramatic transformation. The story is consistency, not instant results.",
    teleprompter:
      "The best anti-aging routine is the one you can actually repeat. Cleanse, apply SATORI, sleep, and keep the ritual simple for 30 nights. Start with SATORI Cream.",
    finalDeliverables: [
      "9:16 MP4, 1080x1920, 15-20 seconds",
      "4:5 MP4, 1080x1350 crop-safe version",
      "Captioned version with step overlays",
      "Clean product CTA frame",
    ],
    shots: [
      {
        timecode: "0-3s",
        shot: "Bathroom shelf or night routine starting point.",
        overlay: "Too many steps?",
        voiceover:
          "The best anti-aging routine is the one you can actually repeat.",
        rawFileName: "SATORI_DEMO_30_NIGHT_A_ROUTINE_START",
        editNote: "Do not shame the viewer; show the routine problem softly.",
      },
      {
        timecode: "4-7s",
        shot: "SATORI jar enters frame and opens.",
        overlay: "One cream step",
        voiceover: "Cleanse, apply SATORI...",
        rawFileName: "SATORI_DEMO_30_NIGHT_B_JAR_OPEN",
        editNote: "Product centered and clear.",
      },
      {
        timecode: "8-12s",
        shot: "Apply small amount to face and neck.",
        overlay: "Cleanse. Apply. Sleep.",
        voiceover: "...sleep, and keep the ritual simple...",
        rawFileName: "SATORI_DEMO_30_NIGHT_C_APPLICATION",
        editNote: "Normal skin texture; no transformation cue.",
      },
      {
        timecode: "13-17s",
        shot: "Calendar/checkmark or bedside consistency cue.",
        overlay: "Repeat for 30 nights",
        voiceover: "...for 30 nights.",
        rawFileName: "SATORI_DEMO_30_NIGHT_D_30_NIGHT_CUE",
        editNote: "Use habit cue, not result guarantee.",
      },
      {
        timecode: "18-20s",
        shot: "Jar on nightstand or vanity.",
        overlay: "Try the 30-night ritual",
        voiceover: "Start with SATORI Cream.",
        rawFileName: "SATORI_DEMO_30_NIGHT_E_CTA",
        editNote: "End with product and CTA.",
      },
    ],
    editorNotes: [
      "Use calm pacing and clean step labels.",
      "Keep routine simple: no crowded active-stack education.",
      "The promise is repeatability and cosmetic support.",
    ],
    complianceChecks: [
      "No guaranteed 30-night result.",
      "No before/after imagery.",
      "No viewer insecurity callout.",
      "No medical repair or reversal language.",
    ],
  },
];

export const videoShootKitOutputs: VideoShootKitOutput[] =
  videoProductionScripts.map((script) => ({
    assetName: script.assetName,
    folder: `exports/video-shoot-kit/${script.assetName}`,
    readme: `exports/video-shoot-kit/${script.assetName}/README.md`,
    shotList: `exports/video-shoot-kit/${script.assetName}/shot-list.csv`,
    rawChecklist: `exports/video-shoot-kit/${script.assetName}/raw-footage-checklist.md`,
    editorHandoff: `exports/video-shoot-kit/${script.assetName}/editor-handoff.md`,
    rawFootageFolder: `exports/video-shoot-kit/${script.assetName}/raw-footage`,
    finalExportsFolder: `exports/video-shoot-kit/${script.assetName}/final-exports`,
    expectedFinalFiles: [
      `${script.assetName}_9x16_master.mp4`,
      `${script.assetName}_4x5_crop-safe.mp4`,
      `${script.assetName}_captions.mp4`,
      `${script.assetName}_cover-frame.jpg`,
    ],
  }));

export const finalCreativeApprovalChecklist: FinalCreativeApprovalItem[] = [
  {
    assetName: "texture_routinesimplifier_hydration-texture_v1",
    adSetName: "30-night-habit_broad_us35",
    approvalStage: "ready_for_visual_qa",
    approvalLabel: "Ready for visual QA",
    currentFiles: [
      "exports/meta-upload/day-one-static-ready/texture_routinesimplifier_hydration-texture_v1.png",
    ],
    requiredFinalFiles: [
      "texture_routinesimplifier_hydration-texture_v1.png",
    ],
    mustApprove: [
      "Product and texture are readable on mobile.",
      "Copy says hydration, texture support, and calmer-looking finish only.",
      "No fake proof, rating, clinical seal, or before/after implication.",
      "Destination URL and UTM match the ad copy row.",
    ],
    blocker: "Visual QA only.",
    nextAction:
      "Approve the static PNG or replace it with a cleaner macro product/application still.",
    metaUploadRule:
      "Can be uploaded as a single-image ad after visual and copy QA.",
  },
  {
    assetName: "offer_valuestarter_starter-kit_v1",
    adSetName: "starter-kit_broad_us35",
    approvalStage: "ready_for_visual_qa",
    approvalLabel: "Ready for visual QA",
    currentFiles: [
      "exports/meta-upload/day-one-static-ready/offer_valuestarter_starter-kit_v1.png",
    ],
    requiredFinalFiles: ["offer_valuestarter_starter-kit_v1.png"],
    mustApprove: [
      "Cream, Duo, Ritual Kit, and Subscribe & Save language matches the live funnel.",
      "No fake savings, fake scarcity, fake membership perk, or invented review.",
      "CTA and product framing are readable on mobile.",
      "Destination URL and UTM match the ad copy row.",
    ],
    blocker: "Offer parity QA only.",
    nextAction:
      "Approve the static PNG or replace it with a cleaner bundle/product still.",
    metaUploadRule:
      "Can be uploaded as a single-image ad after offer and visual QA.",
  },
  {
    assetName: "carousel_valuestarter_starter-kit_v1",
    adSetName: "starter-kit_broad_us35",
    approvalStage: "ready_for_visual_qa",
    approvalLabel: "Ready for carousel QA",
    currentFiles: [
      "exports/meta-upload/day-one-carousel-ready/carousel_valuestarter_starter-kit_v1",
      "exports/creative/satori-starter-kit-carousel-manifest.csv",
    ],
    requiredFinalFiles: [
      "6 card set, 1:1 1080x1080",
      "6 card set, 4:5 1080x1350",
    ],
    mustApprove: [
      "All 6 cards appear in the correct order.",
      "Every card is readable on mobile.",
      "Offer names and Subscribe & Save language match the Vercel funnel.",
      "No fake urgency, fake savings, reviews, or clinical proof.",
    ],
    blocker: "Card-by-card offer and readability QA.",
    nextAction:
      "Approve the generated carousel or rerun npm run creative:carousel after copy/design edits.",
    metaUploadRule:
      "Can be uploaded as carousel only after every card passes QA.",
  },
  {
    assetName: "ugc_needleavoidant_no-needle-ritual_v1",
    adSetName: "no-needle-ritual_broad_us35",
    approvalStage: "requires_final_footage",
    approvalLabel: "Needs final video",
    currentFiles: [
      "exports/video-shoot-kit/ugc_needleavoidant_no-needle-ritual_v1",
      "public/creative/satori-day-one/ugc_needleavoidant_no-needle-ritual_v1.png",
    ],
    requiredFinalFiles: [
      "ugc_needleavoidant_no-needle-ritual_v1_9x16_master.mp4",
      "ugc_needleavoidant_no-needle-ritual_v1_4x5_crop-safe.mp4",
      "ugc_needleavoidant_no-needle-ritual_v1_captions.mp4",
      "ugc_needleavoidant_no-needle-ritual_v1_cover-frame.jpg",
    ],
    mustApprove: [
      "Product appears in the first 2 seconds.",
      "Creator script does not imply injectable-equivalent outcomes.",
      "Captions match the approved teleprompter.",
      "Normal skin texture is preserved; no before/after structure.",
    ],
    blocker: "Final creator footage has not been recorded.",
    nextAction:
      "Film from the shoot kit, export final MP4s, QA captions, then update readiness.",
    metaUploadRule:
      "Do not upload the storyboard PNG as the main ad unless explicitly approving it as emergency static backup.",
  },
  {
    assetName: "reels_needleavoidant_no-needle-ritual_v1",
    adSetName: "no-needle-ritual_broad_us35",
    approvalStage: "requires_final_footage",
    approvalLabel: "Needs final video",
    currentFiles: [
      "exports/video-shoot-kit/reels_needleavoidant_no-needle-ritual_v1",
      "public/creative/satori-day-one/reels_needleavoidant_no-needle-ritual_v1.png",
    ],
    requiredFinalFiles: [
      "reels_needleavoidant_no-needle-ritual_v1_9x16_master.mp4",
      "reels_needleavoidant_no-needle-ritual_v1_4x5_crop-safe.mp4",
      "reels_needleavoidant_no-needle-ritual_v1_captions.mp4",
      "reels_needleavoidant_no-needle-ritual_v1_cover-frame.jpg",
    ],
    mustApprove: [
      "Hook frames match No appointment, No downtime, One nightly cream step.",
      "Product label is readable in the opening frame.",
      "No direct procedure comparison visuals.",
      "Overlay text is readable in 9:16 and 4:5.",
    ],
    blocker: "Final Reels footage has not been recorded.",
    nextAction:
      "Shoot the four short raw clips from the shoot kit and export final MP4s.",
    metaUploadRule:
      "Do not upload the storyboard PNG as the main ad until final video exists.",
  },
  {
    assetName: "demo_routinesimplifier_30-night-habit_v1",
    adSetName: "30-night-habit_broad_us35",
    approvalStage: "requires_final_footage",
    approvalLabel: "Needs final video",
    currentFiles: [
      "exports/video-shoot-kit/demo_routinesimplifier_30-night-habit_v1",
      "public/creative/satori-day-one/demo_routinesimplifier_30-night-habit_v1.png",
    ],
    requiredFinalFiles: [
      "demo_routinesimplifier_30-night-habit_v1_9x16_master.mp4",
      "demo_routinesimplifier_30-night-habit_v1_4x5_crop-safe.mp4",
      "demo_routinesimplifier_30-night-habit_v1_captions.mp4",
      "demo_routinesimplifier_30-night-habit_v1_cover-frame.jpg",
    ],
    mustApprove: [
      "Routine story is consistency, not instant transformation.",
      "No guaranteed 30-night result appears in captions or overlays.",
      "Application and product shots are clear on mobile.",
      "CTA sends users to the approved ritual landing URL.",
    ],
    blocker: "Final routine footage has not been recorded.",
    nextAction:
      "Shoot the calm routine demo from the shoot kit and export final MP4s.",
    metaUploadRule:
      "Do not upload the storyboard PNG as the main ad until final video exists.",
  },
  {
    assetName: "founder_sciencecurious_science-simple_v1",
    adSetName: "science-simple_broad_us35",
    approvalStage: "hold_do_not_upload",
    approvalLabel: "Hold",
    currentFiles: [
      "public/creative/satori-day-one/founder_sciencecurious_science-simple_v1.png",
    ],
    requiredFinalFiles: [
      "Founder or expert-style explainer only after source approval.",
    ],
    mustApprove: [
      "Source file exists for science-led authority language.",
      "No unsupported Nobel, clinical, treatment, repair, or reversal claim.",
      "Script stays cosmetic and brand-positioning only.",
    ],
    blocker: "Authority and source review pending.",
    nextAction:
      "Keep outside day-one launch until source notes are approved.",
    metaUploadRule:
      "Do not upload in the core $75/day conversion test.",
  },
  {
    assetName: "dm_routinesimplifier_30-night-habit_v1",
    adSetName: "30-night-comment-dm_broad_us35",
    approvalStage: "hold_do_not_upload",
    approvalLabel: "Hold",
    currentFiles: [
      "public/creative/satori-day-one/dm_routinesimplifier_30-night-habit_v1.png",
    ],
    requiredFinalFiles: [
      "Comment-to-DM creative only after the DM flow is built.",
    ],
    mustApprove: [
      "DM/comment automation exists and is tested.",
      "Objective is separate from the core conversion test.",
      "Reply copy uses compliant ritual-help language.",
    ],
    blocker: "DM flow and separate objective are not set up.",
    nextAction:
      "Design and test the DM response path before producing this creative.",
    metaUploadRule:
      "Do not upload in the core $75/day conversion test.",
  },
];

export const claimProofRegistry: ClaimProofItem[] = [
  {
    claim: "Smoother-looking texture",
    claimType: "Cosmetic appearance",
    whereUsed: "Ads, landing, PDP, homepage",
    evidenceRequired: "Product positioning and cosmetic disclaimer",
    currentEvidenceStatus: "Allowed as cosmetic language",
    adStatus: "approved",
    notes: "Use smoother-looking, not erase wrinkles.",
  },
  {
    claim: "Hydration",
    claimType: "Cosmetic benefit",
    whereUsed: "Ads, landing, PDP, homepage",
    evidenceRequired: "Ingredient/product positioning",
    currentEvidenceStatus: "Allowed as cosmetic language",
    adStatus: "approved",
    notes: "Avoid medical repair language.",
  },
  {
    claim: "Calmer-looking skin",
    claimType: "Cosmetic appearance",
    whereUsed: "Ads, landing, PDP, homepage",
    evidenceRequired: "Product positioning and cosmetic disclaimer",
    currentEvidenceStatus: "Allowed as cosmetic language",
    adStatus: "approved",
    notes: "Use calmer-looking, not treats redness.",
  },
  {
    claim: "No needles / no downtime",
    claimType: "Positioning",
    whereUsed: "Ads, landing, homepage",
    evidenceRequired: "Non-invasive cosmetic product category",
    currentEvidenceStatus: "Self-evident product positioning",
    adStatus: "approved",
    notes: "Do not say replaces injectables.",
  },
  {
    claim: "Subscribe & Save 15%",
    claimType: "Offer policy",
    whereUsed: "Offer carousel, landing, collections",
    evidenceRequired: "Subscription pricing setup",
    currentEvidenceStatus: "Visible in current funnel; operations pending",
    adStatus: "approved_with_context",
    notes: "Use only while landing shows same offer.",
  },
  {
    claim: "Science-led skincare",
    claimType: "Brand positioning",
    whereUsed: "Site and hold science creative",
    evidenceRequired: "Source file explaining product mechanism and approved claims",
    currentEvidenceStatus: "Pending source file",
    adStatus: "hold_for_review",
    notes: "Allowed as broad positioning; avoid stronger authority language until sourced.",
  },
  {
    claim: "Nobel-nominated skincare science",
    claimType: "Authority claim",
    whereUsed: "Previous drafts only",
    evidenceRequired: "Documented source, nomination context, exact wording approval",
    currentEvidenceStatus: "Not provided",
    adStatus: "do_not_use",
    notes: "Removed from public prelaunch copy until source is verified.",
  },
  {
    claim: "Before/after visible transformation",
    claimType: "Proof claim",
    whereUsed: "Future proof page only",
    evidenceRequired:
      "Customer permission, dates, original assets, lighting/routine context, disclaimer",
    currentEvidenceStatus: "Not provided",
    adStatus: "do_not_use",
    notes: "Use visual references only for now.",
  },
  {
    claim: "Verified review or star rating",
    claimType: "Review claim",
    whereUsed: "Future review widgets",
    evidenceRequired: "Imported review source or verified purchase platform ID",
    currentEvidenceStatus: "Not connected",
    adStatus: "do_not_use",
    notes: "Current story modules are previews only.",
  },
  {
    claim: "Works like Botox / erase wrinkles",
    claimType: "Medical or guaranteed result",
    whereUsed: "Never",
    evidenceRequired: "Not acceptable for SATORI ads",
    currentEvidenceStatus: "Not applicable",
    adStatus: "do_not_use",
    notes: "High rejection and account risk.",
  },
];

export const productionApprovalGate = [
  "Product appears in the first 2 seconds.",
  "Avatar and concept are clear without personal-attribute attacks.",
  "Mechanism is cosmetic: hydration, texture support, consistency.",
  "Offer and prices match the live Vercel page.",
  "UTM uses the exact campaign, content, and term naming.",
  "Claim appears in the claim registry as approved or approved_with_context.",
  "Preview PNGs are not treated as final video/carousel assets unless the readiness matrix says static ready.",
  "No fake review, star rating, before/after result, medical claim, or injectable replacement claim.",
];
