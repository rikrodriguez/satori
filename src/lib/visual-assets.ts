export type SatoriVisualFit = "cover" | "contain";

export type SatoriVisualAsset = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  section: string;
  fit: SatoriVisualFit;
  priority: boolean;
};

function asset(
  key: string,
  file: string,
  width: number,
  height: number,
  alt: string,
  section: string,
  fit: SatoriVisualFit,
  priority = false,
): SatoriVisualAsset {
  return {
    key,
    src: `/images/satori/${file}`,
    width,
    height,
    alt,
    section,
    fit,
    priority,
  };
}

function publicAsset(
  key: string,
  src: string,
  width: number,
  height: number,
  alt: string,
  section: string,
  fit: SatoriVisualFit,
  priority = false,
): SatoriVisualAsset {
  return {
    key,
    src,
    width,
    height,
    alt,
    section,
    fit,
    priority,
  };
}

export const satoriVisualAssets = [
  asset(
    "homeHeroDesktop",
    "01_home_hero_desktop_2880x1400.jpg",
    1799,
    874,
    "Model holding Satori Critical Care and Scar Reducer skincare jar",
    "Home / Hero desktop",
    "cover",
    true,
  ),
  asset(
    "homeHeroMobile",
    "02_home_hero_mobile_1200x1600.jpg",
    1086,
    1448,
    "Model holding Satori skincare jar in a clean skincare setting",
    "Home / Hero mobile",
    "cover",
    true,
  ),
  asset(
    "homeBeforeAfter01",
    "03_home_before_after_01_1600x1600.jpg",
    1254,
    1254,
    "Satori skin transformation visual focused on skin texture context",
    "Home / Visual proof references",
    "cover",
  ),
  asset(
    "homeBeforeAfter02",
    "04_home_before_after_02_1600x1600.jpg",
    1254,
    1254,
    "Satori skin transformation visual focused on redness context",
    "Home / Visual proof references",
    "cover",
  ),
  asset(
    "homeBeforeAfter03",
    "05_home_before_after_03_1600x1600.jpg",
    1254,
    1254,
    "Satori skin transformation visual focused on skin appearance context",
    "Home / Visual proof references",
    "cover",
  ),
  asset(
    "homeBeforeAfter04",
    "06_home_before_after_04_1600x1600.jpg",
    1254,
    1254,
    "Satori skin transformation visual focused on smoother-looking skin context",
    "Home / Visual proof references",
    "cover",
  ),
  asset(
    "homeProductMain01",
    "07_home_product_card_main_01_2048x2048.jpg",
    1254,
    1254,
    "Satori Critical Care and Scar Reducer white jar",
    "Home / Product card main image 1",
    "contain",
  ),
  asset(
    "homeProductSecondary01",
    "08_home_product_card_secondary_01_2048x2048.jpg",
    1254,
    1254,
    "Model holding Satori Critical Care and Scar Reducer",
    "Home / Product card secondary image 1",
    "cover",
  ),
  asset(
    "homeProductMain02",
    "09_home_product_card_main_02_2048x2048.jpg",
    1254,
    1254,
    "Satori skincare jar angled product photo",
    "Home / Product card main image 2",
    "contain",
  ),
  asset(
    "homeProductSecondary02",
    "10_home_product_card_secondary_02_2048x2048.jpg",
    1254,
    1254,
    "Model applying Satori skincare product",
    "Home / Product card secondary image 2",
    "cover",
  ),
  asset(
    "homeProductMain03",
    "11_home_product_card_main_03_2048x2048.jpg",
    2048,
    2048,
    "Satori skincare jar with visible cream texture",
    "Home / Product visual 3",
    "contain",
  ),
  asset(
    "homeProductSecondary03",
    "12_home_product_card_secondary_03_2048x2048.jpg",
    2048,
    2048,
    "Satori skincare product in a daily routine setting",
    "Home / Secondary visual 3",
    "cover",
  ),
  asset(
    "homeProductMain04",
    "13_home_product_card_main_04_2048x2048.jpg",
    2048,
    2048,
    "Satori skincare jar with clean botanical ingredients",
    "Home / Product visual 4",
    "contain",
  ),
  asset(
    "homeProductSecondary04",
    "14_home_product_card_secondary_04_2048x2048.jpg",
    2048,
    2048,
    "Model holding Satori skincare product",
    "Home / Secondary visual 4",
    "cover",
  ),
  asset(
    "homeProductMain05",
    "15_home_product_card_main_05_2048x2048.jpg",
    2048,
    2048,
    "Satori skincare jar on a clean premium surface",
    "Home / Product visual 5",
    "contain",
  ),
  asset(
    "homeProductSecondary05",
    "16_home_product_card_secondary_05_2048x2048.jpg",
    2048,
    2048,
    "Customer-style photo with Satori skincare product",
    "Home / Secondary visual 5",
    "cover",
  ),
  asset(
    "homeGentleSkincare",
    "17_home_gentle_skincare_1800x1200.jpg",
    1800,
    1200,
    "Woman holding Satori skincare product in soft natural light",
    "Home / Gentle skincare editorial block",
    "cover",
  ),
  asset(
    "homeBrandStoryGroup",
    "18_home_brand_story_group_1800x1200.jpg",
    1800,
    1200,
    "Group of women smiling with Satori skincare product",
    "Home / Brand story community block",
    "cover",
  ),
  asset(
    "homeBlogThumb01",
    "19_home_blog_thumb_01_1600x1200.jpg",
    1600,
    1200,
    "Women smiling with Satori skincare product",
    "Home / Blog card 1",
    "cover",
  ),
  asset(
    "homeBlogThumb02",
    "20_home_blog_thumb_02_1600x1200.jpg",
    1600,
    1200,
    "Skincare routine with Satori product",
    "Home / Blog card 2",
    "cover",
  ),
  asset(
    "homeBlogThumb03",
    "21_home_blog_thumb_03_1600x1200.jpg",
    1600,
    1200,
    "Model applying Satori skincare during daily routine",
    "Home / Blog card 3",
    "cover",
  ),
  asset(
    "homeBlogThumb04",
    "22_home_blog_thumb_04_1600x1200.jpg",
    1600,
    1200,
    "Satori skincare community lifestyle image",
    "Home / Blog card 4",
    "cover",
  ),
  asset(
    "pdpMainProductFront",
    "23_pdp_main_product_front_2048x2048.jpg",
    2048,
    2048,
    "Satori Critical Care and Scar Reducer white jar front view",
    "PDP / Product gallery image 1",
    "contain",
    true,
  ),
  asset(
    "pdpProductAngle",
    "24_pdp_product_angle_2048x2048.jpg",
    2048,
    2048,
    "Satori Critical Care and Scar Reducer skincare jar angled view",
    "PDP / Product gallery image 2",
    "contain",
  ),
  asset(
    "pdpProductTexture",
    "25_pdp_product_texture_2048x2048.jpg",
    2048,
    2048,
    "Cream texture for Satori skincare product",
    "PDP / Product gallery image 3",
    "cover",
  ),
  asset(
    "pdpProductInHand",
    "26_pdp_product_in_hand_2048x2048.jpg",
    2048,
    2048,
    "Hand holding Satori skincare jar",
    "PDP / Product gallery image 4",
    "cover",
  ),
  asset(
    "pdpProductLifestyle",
    "27_pdp_product_lifestyle_1800x1200.jpg",
    1800,
    1200,
    "Satori skincare product in a clean bathroom setting",
    "PDP / Lifestyle benefits block",
    "cover",
  ),
  asset(
    "pdpIngredientsFlatlay",
    "28_pdp_ingredients_flatlay_1800x1200.jpg",
    1800,
    1200,
    "Satori skincare jar with botanical ingredients",
    "PDP / Ingredients block",
    "cover",
  ),
  asset(
    "pdpApplication01",
    "29_pdp_application_01_2048x2048.jpg",
    2048,
    2048,
    "Model applying Satori skincare product to skin",
    "PDP / How to use image 1",
    "cover",
  ),
  asset(
    "pdpApplication02",
    "30_pdp_application_02_2048x2048.jpg",
    2048,
    2048,
    "Close-up of Satori skincare product being applied",
    "PDP / How to use image 2",
    "cover",
  ),
  asset(
    "pdpApplication03",
    "31_pdp_application_03_2048x2048.jpg",
    2048,
    2048,
    "Model smiling after using Satori skincare product",
    "PDP / How to use image 3",
    "cover",
  ),
  asset(
    "pdpBeforeAfter05",
    "32_pdp_before_after_05_1600x1600.jpg",
    1600,
    1600,
    "Satori skin transformation visual showing skincare result context",
    "PDP / Visual reference 1",
    "cover",
  ),
  asset(
    "pdpBeforeAfter06",
    "33_pdp_before_after_06_1600x1600.jpg",
    1600,
    1600,
    "Satori skin transformation visual showing smoother-looking skin context",
    "PDP / Visual reference 2",
    "cover",
  ),
  asset(
    "pdpBeforeAfter07",
    "34_pdp_before_after_07_1600x1600.jpg",
    1600,
    1600,
    "Satori skin transformation visual showing skin texture context",
    "PDP / Visual reference 3",
    "cover",
  ),
  asset(
    "pdpBeforeAfter08",
    "35_pdp_before_after_08_1600x1600.jpg",
    1600,
    1600,
    "Satori skin transformation visual showing clearer-looking skin context",
    "PDP / Visual reference 4",
    "cover",
  ),
  asset(
    "pdpReviewAvatar01",
    "36_pdp_review_avatar_01_900x1200.jpg",
    900,
    1200,
    "Customer-style portrait holding Satori skincare product",
    "PDP / Review avatar 1",
    "cover",
  ),
  asset(
    "pdpReviewAvatar02",
    "37_pdp_review_avatar_02_900x1200.jpg",
    900,
    1200,
    "Customer-style portrait with Satori skincare jar",
    "PDP / Review avatar 2",
    "cover",
  ),
  asset(
    "pdpReviewAvatar03",
    "38_pdp_review_avatar_03_900x1200.jpg",
    900,
    1200,
    "Skincare customer portrait with Satori product",
    "PDP / Review avatar 3",
    "cover",
  ),
  asset(
    "pdpReviewAvatar04",
    "39_pdp_review_avatar_04_900x1200.jpg",
    900,
    1200,
    "Satori skincare customer-style review portrait",
    "PDP / Review avatar 4",
    "cover",
  ),
  asset(
    "pdpUgcPhoto01",
    "40_pdp_ugc_photo_01_1200x1600.jpg",
    1200,
    1600,
    "Woman smiling with Satori skincare product",
    "PDP / UGC community card 1",
    "cover",
  ),
  asset(
    "pdpUgcPhoto02",
    "41_pdp_ugc_photo_02_1200x1600.jpg",
    1200,
    1600,
    "Two women smiling with Satori skincare product",
    "PDP / UGC community card 2",
    "cover",
  ),
  asset(
    "pdpUgcPhoto03",
    "42_pdp_ugc_photo_03_1200x1600.jpg",
    1200,
    1600,
    "Model using Satori skincare in mirror routine",
    "PDP / UGC community card 3",
    "cover",
  ),
  asset(
    "pdpUgcPhoto04",
    "43_pdp_ugc_photo_04_1200x1600.jpg",
    1200,
    1600,
    "Group of women holding Satori skincare product",
    "PDP / UGC community card 4",
    "cover",
  ),
  asset(
    "pdpFinalCtaModel",
    "44_pdp_final_cta_model_1800x1200.jpg",
    1800,
    1200,
    "Model holding Satori skincare product for final call to action",
    "PDP / Final CTA model",
    "cover",
  ),
  asset(
    "pdpFinalCtaProductOnly",
    "45_pdp_final_cta_product_only_1800x1200.jpg",
    1800,
    1200,
    "Satori Critical Care and Scar Reducer product image",
    "PDP / Final CTA product-only image",
    "contain",
  ),
  asset(
    "cartProductThumbnail",
    "46_cart_product_thumbnail_512x512.jpg",
    512,
    512,
    "Satori Critical Care and Scar Reducer cart thumbnail",
    "Cart / Product thumbnail",
    "contain",
  ),
  asset(
    "cartSupportingImage",
    "47_cart_supporting_image_1200x1200.jpg",
    1200,
    1200,
    "Satori skincare product in a clean setting",
    "Cart / Cart reassurance image",
    "cover",
  ),
  asset(
    "checkoutProductThumbnail",
    "48_checkout_product_thumbnail_512x512.jpg",
    512,
    512,
    "Satori Critical Care and Scar Reducer checkout thumbnail",
    "Checkout / Order summary product thumbnail",
    "contain",
  ),
  asset(
    "checkoutHeaderBrand",
    "49_checkout_header_brand_1200x400.jpg",
    1200,
    400,
    "Satori Organic Skincare checkout brand image",
    "Checkout / Header brand image",
    "cover",
  ),
] as const;

export type SatoriVisualKey = (typeof satoriVisualAssets)[number]["key"];

export const satoriAssets = Object.fromEntries(
  satoriVisualAssets.map((item) => [item.key, item]),
) as Record<SatoriVisualKey, SatoriVisualAsset>;

export const homeHeroAssets = {
  desktop: satoriAssets.homeHeroDesktop,
  mobile: satoriAssets.homeHeroMobile,
} as const;

export const homeBeforeAfterAssets = [
  satoriAssets.homeBeforeAfter01,
  satoriAssets.homeBeforeAfter02,
  satoriAssets.homeBeforeAfter03,
  satoriAssets.homeBeforeAfter04,
] as const;

export const homeProductCardAssets = [
  satoriAssets.homeProductMain01,
  satoriAssets.homeProductSecondary01,
  satoriAssets.homeProductMain02,
  satoriAssets.homeProductSecondary02,
  satoriAssets.homeProductMain03,
  satoriAssets.homeProductSecondary03,
  satoriAssets.homeProductMain04,
  satoriAssets.homeProductSecondary04,
  satoriAssets.homeProductMain05,
  satoriAssets.homeProductSecondary05,
] as const;

export const homeEditorialAssets = {
  gentle: satoriAssets.homeGentleSkincare,
  brandStory: satoriAssets.homeBrandStoryGroup,
} as const;

export const homeBlogAssets = [
  satoriAssets.homeBlogThumb01,
  satoriAssets.homeBlogThumb02,
  satoriAssets.homeBlogThumb03,
  satoriAssets.homeBlogThumb04,
] as const;

export const productGalleryAssets = [
  satoriAssets.pdpMainProductFront,
  satoriAssets.pdpProductAngle,
  satoriAssets.pdpProductTexture,
  satoriAssets.pdpProductInHand,
] as const;

export const pdpApplicationAssets = [
  satoriAssets.pdpApplication01,
  satoriAssets.pdpApplication02,
  satoriAssets.pdpApplication03,
] as const;

export const pdpBeforeAfterAssets = [
  satoriAssets.pdpBeforeAfter05,
  satoriAssets.pdpBeforeAfter06,
  satoriAssets.pdpBeforeAfter07,
  satoriAssets.pdpBeforeAfter08,
] as const;

export const pdpReviewAssets = [
  satoriAssets.pdpReviewAvatar01,
  satoriAssets.pdpReviewAvatar02,
  satoriAssets.pdpReviewAvatar03,
  satoriAssets.pdpReviewAvatar04,
] as const;

export const pdpUgcAssets = [
  satoriAssets.pdpUgcPhoto01,
  satoriAssets.pdpUgcPhoto02,
  satoriAssets.pdpUgcPhoto03,
  satoriAssets.pdpUgcPhoto04,
] as const;

export const pdpFinalCtaAssets = [
  satoriAssets.pdpFinalCtaModel,
  satoriAssets.pdpFinalCtaProductOnly,
] as const;

export const cartAssets = {
  thumbnail: satoriAssets.cartProductThumbnail,
  support: satoriAssets.cartSupportingImage,
} as const;

export const checkoutAssets = {
  thumbnail: satoriAssets.checkoutProductThumbnail,
  header: satoriAssets.checkoutHeaderBrand,
} as const;

export const satoriPackAssets = {
  duo: publicAsset(
    "satoriDuoTwoJars",
    "/images/satori-packs/satori-duo-two-jars-1254x1254.jpg",
    1254,
    1254,
    "Two Satori Organic Skin Care jars for the Satori Duo pack",
    "Collection / Satori Duo pack image",
    "contain",
  ),
  ritual: publicAsset(
    "satoriRitualThreeJars",
    "/images/satori-packs/satori-ritual-kit-three-jars-1254x1254.jpg",
    1254,
    1254,
    "Three Satori Organic Skin Care jars for the Satori Ritual Kit",
    "Collection / Satori Ritual Kit pack image",
    "contain",
  ),
  goldenClub: publicAsset(
    "satoriGoldenSkinClubCommunity",
    "/images/satori-packs/satori-golden-skin-club-community-1254x1254.jpg",
    1254,
    1254,
    "Three women smiling with Satori Organic Skin Care product",
    "Collection / Satori Golden Skin Club image",
    "cover",
  ),
} as const;

export const adFrameAssets = [
  satoriAssets.pdpUgcPhoto01,
  satoriAssets.pdpApplication01,
  satoriAssets.pdpFinalCtaModel,
  satoriAssets.pdpMainProductFront,
] as const;
