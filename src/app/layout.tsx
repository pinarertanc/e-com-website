import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopNavigation } from "@/components/TopNavigation";
import { MobileBottomNav } from "@/components/MobileBottomNavBar";

const publicSansHeading = Public_Sans({subsets:['latin'],variable:'--font-heading'});

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "Hurç | Çocuk Eşyalarını Paraya Çevir, Evde Yer Aç",
    template: "%s | Hurç",
  },
  description:
    "Küçülenleri hurçta tutma, paraya çevir! İkinci el bebek ve çocuk kıyafetleri, bebek arabaları, oyuncaklar ve çok daha fazlası güvenli alışverişle Hurç'ta.",
  keywords: [
    "hurç",
    "ikinci el bebek eşyaları",
    "çocuk kıyafeti ikinci el",
    "bebek arabası",
    "ikinci el puset",
    "ikinci el oyuncak",
    "anne bebek pazaryeri",
    "ikinci el giyim",
  ],
  authors: [{ name: "Hurç" }],
  creator: "Hurç",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hurc.com",
    title: "Hurç | Çocuk Eşyalarını Paraya Çevir, Evde Yer Aç",
    description:
      "Küçülenleri hurçta tutma, paraya çevir! Güvenli ikinci el anne, bebek ve çocuk pazaryeri.",
    siteName: "Hurç",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hurç | Çocuk Eşyalarını Paraya Çevir",
    description:
      "Küçülen çocuk eşyalarını hurçtan çıkar, paraya çevir!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", figtree.variable, publicSansHeading.variable)}
    >

      <body className="min-h-full flex flex-col">
        <TopNavigation />
        {children}
        <MobileBottomNav />
        </body>
    </html>
  );
}
