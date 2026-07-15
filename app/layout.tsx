import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arslanasif9t9.github.io/lailahassan"),
  title: {
    default: "Laila Hassan — Premium Video Editing for Brands & Creators",
    template: "%s · Laila Hassan",
  },
  description:
    "Turning raw footage into high-converting content. Professional video editing for brands, businesses, creators & agencies — long form, shorts, ads, real estate, corporate & motion graphics.",
  keywords: [
    "video editing",
    "video editor",
    "YouTube editing",
    "short form editing",
    "ad editing",
    "motion graphics",
  ],
  openGraph: {
    title: "Laila Hassan — Premium Video Editing Studio",
    description:
      "Professional video editing for brands, businesses, creators & agencies. Cinematic quality, high-retention edits, delivered fast.",
    type: "website",
    locale: "en_US",
    siteName: "Laila Hassan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laila Hassan — Premium Video Editing Studio",
    description:
      "Turning raw footage into high-converting content for brands & creators worldwide.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Laila Hassan",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* Runs before paint — prevents theme flash */
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-svh">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <ThemeProvider>
          <LenisProvider>
            <Navbar />
            {children}
            <Footer />
            <BottomNav />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
