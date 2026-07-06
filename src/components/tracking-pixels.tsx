import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const klaviyoCompanyId = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;
const trackedEvents = [
  "PageView",
  "ViewContent",
  "AddToCart",
  "InitiateCheckout",
  "Purchase",
  "Lead",
];

export function TrackingPixels() {
  return (
    <>
      {gtmId ? (
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            window.dataLayer.push({
              event: "satori_tracking_ready",
              tracked_events: ${JSON.stringify(trackedEvents)}
            });
            var firstScript = document.getElementsByTagName("script")[0];
            var gtmScript = document.createElement("script");
            gtmScript.async = true;
            gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=${gtmId}";
            firstScript.parentNode.insertBefore(gtmScript, firstScript);
          `}
        </Script>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
            fbq("init", "${metaPixelId}");
          `}
        </Script>
      ) : null}

      {tiktokPixelId ? (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];
              ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load("${tiktokPixelId}");
              ttq.page();
            }(window, document, "ttq");
          `}
        </Script>
      ) : null}

      {klaviyoCompanyId ? (
        <Script
          src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyoCompanyId}`}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
