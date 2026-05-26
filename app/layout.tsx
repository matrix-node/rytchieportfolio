import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site-content";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Rytchie Macharia",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rytchie Macharia Portfolio",
    description: "Full Stack Developer and Cybersecurity Enthusiast",
    url: siteConfig.url,
    siteName: "Rytchie Macharia",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Rytchie Macharia portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rytchie Macharia Portfolio",
    description: "Full Stack Developer and Cybersecurity Enthusiast",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/images/favicon.png",
  },
  themeColor: "#081b29",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}