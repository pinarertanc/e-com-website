'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ShoppingBag, PlusCircle, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const hasSession = Boolean(user);

  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "H";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 pt-2 bg-background/90 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* 🛍️ SEPET */}
        <Link
          href="/cart"
          className={cn(
            "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer min-w-[64px]",
            pathname === "/cart"
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {/* Dilerseniz sepet sayısı rozeti (badge) eklenebilir */}
          </div>
          <span className="text-[11px] tracking-tight">Sepet</span>
        </Link>

        {/* ➕ ÜRÜN EKLE (Vurgulu Buton) */}
        <Link
          href="/sell"
          className="flex flex-col items-center justify-center -mt-5 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 group-hover:scale-105 active:scale-95 transition-all">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-primary mt-1">İlan Ekle</span>
        </Link>

        {/* 👤 PROFİL */}
        {hasSession ? (
          <Link
            href="/user/settings"
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer min-w-[64px]",
              pathname?.startsWith("/user")
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Avatar className="w-7 h-7 border border-border">
              <AvatarImage src={user?.picture || ""} alt={user?.name || "Profil"} />
              <AvatarFallback className="bg-secondary text-secondary-foreground font-bold text-[9px]">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <span className="text-[11px] tracking-tight">Profil</span>
          </Link>
        ) : (
          <a
            href="/api/auth/login"
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer min-w-[64px]",
              "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="w-5 h-5" />
            <span className="text-[11px] tracking-tight">Giriş Yap</span>
          </a>
        )}

      </div>
    </nav>
  );
}