import type { Metadata } from "next";
import { TopNavBar } from "@/components/storefront/TopNavBar";
import { MobileBottomNav } from "@/components/storefront/MobileBottomNavBar";


export const metadata: Metadata = {
  metadataBase: new URL("https://hurc.com"), 
  title: {
    default: "Hurç | Çocuk Eşyalarını Paraya Çevir, Evde Yer Aç",
    template: "%s | Hurç",
  },
  description:
    "Küçülenleri hurçta tutma, paraya çevir! İkinci el bebek ve çocuk kıyafetleri, bebek arabaları, oyuncaklar ve çok daha fazlası güvenli alışverişle Hurç'ta.",
  authors: [{ name: "Hurç" }],
  creator: "Hurç",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function StoreFrontLayout({ children }: LayoutProps<"/">) {
  
    return (
        <>
        <TopNavBar/>
         {children}
        <MobileBottomNav/>
        </>
      );
}
