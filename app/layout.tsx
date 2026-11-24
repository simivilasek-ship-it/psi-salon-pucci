import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { withBase } from "@/lib/paths";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./fonts.css";
import "./globals.css";

const ogAlt = "Australský ovčák po úpravě, Psí salon Pucci, stříhání psů ve Svitavách";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Klára Zelinka, DiS" }],
  creator: "Klára Zelinka, DiS",
  publisher: SITE_NAME,
  keywords: [
    "psí salon Svitavy",
    "stříhání psů Svitavy",
    "úprava psů",
    "úprava psů Svitavy",
    "psí salon Pucci",
    "trimování psů",
    "dentální hygiena psů",
    "Klára Zelinka",
    "Svitavy",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: withBase("/favicon.ico?v=4"), sizes: "any" },
      { url: withBase("/favicon-16.png?v=4"), sizes: "16x16", type: "image/png" },
      { url: withBase("/favicon-32.png?v=4"), sizes: "32x32", type: "image/png" },
      { url: withBase("/favicon-48.png?v=4"), sizes: "48x48", type: "image/png" },
      { url: withBase("/icon-192.png?v=4"), sizes: "192x192", type: "image/png" },
      { url: withBase("/icon-512.png?v=4"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: withBase("/apple-touch-icon.png?v=4"), sizes: "180x180", type: "image/png" }],
    shortcut: [withBase("/favicon.ico?v=4")],
  },
  manifest: withBase("/site.webmanifest"),
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "cs_CZ",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "pets",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c65a78",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <Footer />
        {/* Dev: next/script runs. Export: strip keeps data-keep tag for static Pages. */}
        <Script src={withBase("/site-behavior.js")} strategy="afterInteractive" />
        <script data-keep defer src={withBase("/site-behavior.js")} />
      </body>
    </html>
  );
}
