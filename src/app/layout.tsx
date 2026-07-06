import type { Metadata } from "next";
import { Josefin_Sans, Questrial } from "next/font/google";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TrackingPixels } from "@/components/tracking-pixels";
import {
  absoluteUrl,
  defaultOgImage,
  defaultSeoDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";
import "./globals.css";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Satori Cream | Science-Led Anti-Aging Skin Ritual",
    template: "%s | Satori",
  },
  description: defaultSeoDescription,
  keywords: [
    "Satori Cream",
    "organic skin care",
    "anti-aging cream",
    "science-led skincare",
    "clean beauty",
    "hydrating face cream",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Satori Cream | Science-Led Anti-Aging Skin Ritual",
    description: defaultSeoDescription,
    url: absoluteUrl("/"),
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1799,
        height: 874,
        alt: "Satori Cream skincare ritual",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Satori Cream | Science-Led Anti-Aging Skin Ritual",
    description: defaultSeoDescription,
    images: [defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className={`${questrial.variable} ${josefin.variable}`}>
        <TrackingPixels />
        <AttributionTracker />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
