import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://solarcomplaint.com"),
  title: "Solar Consumer Research",
  description:
    "Verified public resources, practical guides, and updates for residential solar consumers.",
  keywords: [
    "residential solar consumer resources",
    "solar consumer resources by state",
    "solar policies by state",
    "solar consumer protection",
    "solar company complaints",
    "solar financing complaint",
    "solar public records",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Solar Consumer Research",
    description: "Verified public resources and source-based guides for residential solar consumers.",
    url: "/",
    siteName: "Solar Consumer Research",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Solar Consumer Research",
    description: "Verified public resources and source-based guides for residential solar consumers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Solar Research",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#214f3b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Solar Consumer Research",
              url: "https://solarcomplaint.com",
              description: "Verified public resources and source-based guides for residential solar consumers.",
              inLanguage: "en-US",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
