import { expect, test } from "@playwright/test";

const baseUrl = process.env.SATORI_BASE_URL ?? "http://localhost:3000";
const chromeChannel = process.env.SATORI_PLAYWRIGHT_CHANNEL ?? "chrome";
const paidLandingPath = "/pages/satori-wrinkle-smoothing-ritual";
const expectedCampaign = "satori_prelaunch_us35_lead_202607";
const expectedContent = "ugc_needleavoidant_no-needle-ritual_v1";
const expectedTerm = "no-needle-ritual_broad_us35";

if (chromeChannel !== "bundled") {
  test.use({ channel: chromeChannel });
}

function buildQaUrl() {
  const url = new URL(paidLandingPath, baseUrl);
  url.searchParams.set("satori_debug", "1");
  url.searchParams.set("satori_reset", "1");
  url.searchParams.set("utm_source", "meta");
  url.searchParams.set("utm_medium", "paid_social");
  url.searchParams.set("utm_campaign", expectedCampaign);
  url.searchParams.set("utm_content", expectedContent);
  url.searchParams.set("utm_term", expectedTerm);
  return url.toString();
}

async function readTrackingState(page) {
  return page.evaluate(() => ({
    attribution: JSON.parse(window.localStorage.getItem("satori-attribution") || "null"),
    cart: JSON.parse(window.localStorage.getItem("satori-cart") || "[]"),
    events: window.__satoriTrackingEvents || [],
  }));
}

async function waitForEvent(page, eventName) {
  await page.waitForFunction(
    (name) =>
      (window.__satoriTrackingEvents || []).some(
        (event) => event.satori_event_name === name,
      ),
    eventName,
  );
}

test("prelaunch funnel preserves attribution and does not fire Purchase", async ({
  page,
}) => {
  await page.goto(buildQaUrl(), { waitUntil: "networkidle" });

  await expect(page.locator("#satori-tracking-debug")).toBeVisible();
  await waitForEvent(page, "PageView");
  await waitForEvent(page, "ViewContent");

  let state = await readTrackingState(page);
  expect(state.attribution.first_touch.utm_campaign).toBe(expectedCampaign);
  expect(state.attribution.last_touch.utm_content).toBe(expectedContent);
  expect(state.attribution.last_touch.utm_term).toBe(expectedTerm);
  expect(
    state.events.find((event) => event.satori_event_name === "ViewContent")
      ?.last_utm_campaign,
  ).toBe(expectedCampaign);

  await page
    .locator("#offer")
    .getByRole("button", { name: /^Add /i })
    .first()
    .click();
  await waitForEvent(page, "AddToCart");
  state = await readTrackingState(page);
  expect(state.cart.length).toBeGreaterThan(0);
  expect(
    state.events.filter((event) => event.satori_event_name === "AddToCart"),
  ).toHaveLength(1);

  await page.getByRole("button", { name: "Protected Checkout" }).click();
  await page.waitForURL(/\/checkout\/?\?protection=1/);
  await waitForEvent(page, "InitiateCheckout");

  await page.getByRole("button", { name: /Continue/i }).click();
  await page.waitForURL(/\/thank-you\/?/);
  await waitForEvent(page, "Lead");

  state = await readTrackingState(page);
  expect(
    state.events.filter((event) => event.satori_event_name === "InitiateCheckout"),
  ).toHaveLength(1);
  expect(
    state.events.filter((event) => event.satori_event_name === "Lead"),
  ).toHaveLength(1);
  expect(
    state.events.filter((event) => event.satori_event_name === "Purchase"),
  ).toHaveLength(0);
});
