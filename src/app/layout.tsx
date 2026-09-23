import type { Metadata } from "next";
import { Jost } from "next/font/google";
// import Script from "next/script"; // uncomment when GA4 / Meta Pixel are wired up, see below
import "./globals.css";

// One typeface for the whole site — sans-serif, never bold, full Cyrillic
// coverage. Jost (a geometric grotesque in the Futura spirit) replaces the
// earlier two-font system (bold condensed Oswald for headings + Inter for
// body): same family for both buckets now, just a lighter weight range for
// display use, so headings and body read as one consistent voice.
const display = Jost({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
});

const inter = Jost({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

// TODO: replace with the real production domain once it's known, then re-check
// every field below that depends on it (openGraph.url, alternates.canonical).
const SITE_URL = "https://sofialorenti.com";
const SITE_TITLE = "DR. SOFIA LORENTI — Aesthetic Medicine";
const SITE_DESCRIPTION =
  "A private aesthetic-medicine practice in Milan. Natural, living beauty — built on anatomy, precision and respect for individuality.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    // TODO: /public/og-image.jpg is auto-generated from doctor-portrait.jpg
    // (1200×630) as a placeholder — swap in a properly art-directed/branded
    // image before launch if you want something more considered here.
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_TITLE }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* GA4: вставити тег тут — не підключено. Розкоментуйте, підставте
            свій Measurement ID (G-XXXXXXXXXX) і імпорт Script вище.
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        */}

        {/* Meta Pixel: вставити тут — не підключено. Розкоментуйте і
            підставте свій Pixel ID.
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){...standard Meta Pixel snippet...}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
        */}

        {children}
      </body>
    </html>
  );
}
