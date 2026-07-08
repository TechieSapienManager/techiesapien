import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Cursor } from "@/components/layout/cursor";
import { site, heroContent } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — AI & Tech Creator, App Builder, AI Filmmaker`,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} — AI & Tech Creator, App Builder, AI Filmmaker`,
    description: site.description,
    type: "website",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: heroContent.image.src,
        width: heroContent.image.width,
        height: heroContent.image.height,
        alt: heroContent.image.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI & Tech Creator`,
    description: site.description,
    images: [heroContent.image.src],
  },
  icons: {
    icon: [
      { url: "/avatar.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/avatar.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <SmoothScrollProvider>
          <Cursor />
          <Navbar />
          <main id="top" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
