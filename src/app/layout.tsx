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
  // Favicons are provided by the app-dir file conventions:
  // src/app/{favicon.ico,icon.png,apple-icon.png}.
  verification: {
    google: "1yJZ6FXuRreImdy7WSi8AvhZ0qN-grPKebs8Xkguz2c",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060A" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Applies the stored theme before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var dark=t?t!=='light':true;var c=document.documentElement.classList;c.toggle('dark',dark);c.toggle('light',!dark);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
