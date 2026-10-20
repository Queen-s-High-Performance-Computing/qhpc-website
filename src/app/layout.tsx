import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/JsonLd";
import { AEOData } from "@/components/AEOData";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0E1A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "QHPC",
    "Queen's University Supercomputing",
    "High-Performance Computing Queen's",
    "HPC Workshops Kingston",
    "Student Cluster Competition Canada",
    "Parallel Programming Club",
    "Frontenac Cluster access",
    "Queen's Engineering Society Design Team",
  ],
  authors: [{ name: "QHPC Executive Team" }],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteConfig.name,
    "alternateName": siteConfig.shortName,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "logo": "https://qhpc.org/logo.png", // Assuming this path
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Queen's University",
      "url": "https://www.queensu.ca"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dunning 10",
      "addressLocality": "Kingston",
      "addressRegion": "ON",
      "postalCode": "K7L 3N6",
      "addressCountry": "CA"
    },
    "sameAs": [
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
      siteConfig.links.github
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationData} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AEOData />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:p-4 focus:bg-primary focus:text-background focus:rounded-lg focus:font-bold"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <ThemeToggle />
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

