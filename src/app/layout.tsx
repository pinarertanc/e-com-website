import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/themeProvider";


const publicSansHeading = Public_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  
 
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
        publicSansHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
      </body>
    </html>
  );
}
