'use client';

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// 🟢 ShoppingCart ikonu eklendi
import { LogOut, Settings, ShoppingBag, Tag, PlusCircle, ShoppingCart } from "lucide-react";

import { SearchBar } from "@/components/SearchBar";

export function TopNavigation() {
  const { user } = useUser();
  const hasSession = Boolean(user);

  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "H";

  // Örnek sepet ürün sayısı (İleride Sepet Context/State'ine bağlanacak)
  const cartItemCount = 0; 

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4 max-w-6xl mx-auto w-full">
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-4 sm:px-6 py-1.5 shadow-lg shadow-black/5 transition-all flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20">
        
        {/* 📦 LOGO */}
        <div className="shrink-0 flex items-center">
          <Link href="/" className="flex items-center group py-1">
            <Image
              src="/logo.png"
              alt="Hurç Logo"
              width={260}
              height={90}
              priority
              unoptimized
              style={{ width: "auto" }}
              className="!h-10 sm:!h-14 md:!h-16 lg:!h-20 max-w-none object-contain group-hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* 🔍 ARAMA ÇUBUĞU */}
        <div className="flex-1 max-w-2xl">
          <SearchBar />
        </div>

        {/* 🛒 SEPET VE MASAÜSTÜ MENÜ KISMI */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          
          {/* 🛍️ SEPET İKONU */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-full hover:bg-secondary text-foreground/80 hover:text-foreground transition-all cursor-pointer group"
            title="Sepetim"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-background animate-in zoom-in">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* PROFİL VEYA GİRİŞ YAP MENÜSÜ */}
          {hasSession ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none rounded-full p-0.5 hover:ring-2 hover:ring-ring transition-all cursor-pointer">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={user?.picture || ""} alt={user?.name || "Kullanıcı Profil"} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-bold text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mt-2 border-border shadow-xl bg-popover">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem className="rounded-xl cursor-pointer p-0">
                    <Link href="/sell" className="flex items-center gap-2 w-full px-2 py-1.5 text-primary font-medium">
                      <PlusCircle className="w-4 h-4 text-primary" />
                      Hurça İlan Ekle
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="rounded-xl cursor-pointer p-0">
                    <Link href="/user/orders" className="flex items-center gap-2 w-full px-2 py-1.5">
                      <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                      Siparişlerim
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="rounded-xl cursor-pointer p-0">
                    <Link href="/user/listings" className="flex items-center gap-2 w-full px-2 py-1.5">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      İlanlarım
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="rounded-xl cursor-pointer p-0">
                    <Link href="/user/settings" className="flex items-center gap-2 w-full px-2 py-1.5">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      Hesap Ayarları
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem className="rounded-xl cursor-pointer p-0 text-destructive focus:bg-destructive/10">
                    <a href="/api/auth/logout" className="flex items-center gap-2 w-full px-2 py-1.5">
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:scale-105 active:scale-95 px-5"
                    )}
                    render={<a href="/api/auth/login">Giriş Yap</a>}
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

      </div>
    </header>
  );
}