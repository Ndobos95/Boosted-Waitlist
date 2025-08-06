import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boosted - Band Booster Software Coming Soon",
  description: "Revolutionary software for band boosters to streamline fundraising, collect payments, and enhance communication. Join our waitlist for early access.",
  openGraph: {
    title: "Boosted - Supercharge Your Band Booster Fundraising",
    description: "The all-in-one platform designed specifically for band boosters to streamline fundraising, simplify payment collection, and enhance parent-student communication.",
    url: "https://boosted.band",
    siteName: "Boosted",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Boosted - Supercharge Your Band Booster Fundraising",
    description: "The all-in-one platform designed specifically for band boosters to streamline fundraising, simplify payment collection, and enhance parent-student communication.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags for social media */}
        <meta property="og:title" content="Boosted - Supercharge Your Band Booster Fundraising" />
        <meta property="og:description" content="The all-in-one platform designed specifically for band boosters to streamline fundraising, simplify payment collection, and enhance parent-student communication." />
        <meta property="og:url" content="https://boosted.band" />
        <meta property="og:site_name" content="Boosted" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Boosted - Supercharge Your Band Booster Fundraising" />
        <meta name="twitter:description" content="The all-in-one platform designed specifically for band boosters to streamline fundraising, simplify payment collection, and enhance parent-student communication." />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}