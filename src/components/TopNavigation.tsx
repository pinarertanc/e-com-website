'use client';

import React, { useState } from "react";
import Link from "next/link";
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
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, Settings, Package, User as UserIcon } from "lucide-react";

export function TopNavigation() {
  const { user } = useUser();
  const hasSession = Boolean(user);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Kullanıcı baş harfleri (Avatar fallback için)
  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "PL";

  return (
    <header className="sticky top-3 z-50 px-4 max-w-6xl mx-auto w-full">
      <div className="bg-background/80 backdrop-blur-md border border-amber-200/60 dark:border-amber-900/40 rounded-full px-5 py-2 shadow-lg shadow-amber-500/5 transition-all">
        <NavigationMenu className="max-w-none justify-between w-full">
          <NavigationMenuList className="flex items-center gap-2 w-full justify-between">

            {/* 🎠 LOGO */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-transparent focus:bg-transparent px-2"
                )}
                render={
                  <Link href="/" className="flex items-center gap-2 group">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300/50 text-xl group-hover:scale-110 transition-transform">
                      🎠
                    </span>
                    <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-500 via-rose-400 to-pink-500 bg-clip-text text-transparent">
                      PonyLoop
                    </span>
                  </Link>
                }
              />
            </NavigationMenuItem>

            {/* MASAÜSTÜ MENÜ (DESKTOP) */}
            <div className="hidden md:flex items-center gap-3">
              {hasSession ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full font-semibold hover:bg-amber-100/70 dark:hover:bg-amber-900/30 hover:text-amber-900 dark:hover:text-amber-100 transition-colors"
                      )}
                      render={
                        <Link href="/user/orders" className="flex items-center gap-1.5">
                          <Package className="w-4 h-4" />
                          Orders
                        </Link>
                      }
                    />
                  </NavigationMenuItem>

                  {/* PROFİL AVATAR & DROPDOWN MENÜ */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 outline-none rounded-full p-0.5 hover:ring-2 hover:ring-amber-400 transition-all cursor-pointer">
                      <Avatar className="w-9 h-9 border border-amber-300">
                        <AvatarImage src={user?.picture || ""} alt={user?.name || "User Avatar"} />
                        <AvatarFallback className="bg-amber-200 text-amber-900 font-bold text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mt-2 border-amber-200 dark:border-amber-900 shadow-xl">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-bold leading-none">{user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
                          </div>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="rounded-xl cursor-pointer">
                        <Link href="/user/settings" className="flex items-center gap-2 w-full">
                          <Settings className="w-4 h-4 text-amber-600" />
                          Settings
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="rounded-xl cursor-pointer text-rose-600 dark:text-rose-400 focus:bg-rose-50 dark:focus:bg-rose-950/50">
                        <a href="/auth/logout" className="flex items-center gap-2 w-full">
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full font-bold bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-sm shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 px-5"
                    )}
                    render={<a href="/auth/login">Log In</a>}
                  />
                </NavigationMenuItem>
              )}
            </div>

            {/* MOBİL MENÜ (SHEET / HAMBURGER) */}
            <div className="flex md:hidden items-center">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger className="flex items-center justify-center w-10 h-10 rounded-full text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors outline-none cursor-pointer">
                  <Menu className="w-6 h-6" />
                </SheetTrigger>

                <SheetContent side="right" className="rounded-l-3xl border-amber-200 dark:border-amber-900 w-72">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-left">
                      <span className="text-2xl">🎠</span>
                      <span className="font-extrabold text-xl bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
                        PonyLoop
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-4 mt-6">
                    {hasSession ? (
                      <>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200/50">
                          <Avatar className="w-10 h-10 border border-amber-300">
                            <AvatarImage src={user?.picture || ""} alt={user?.name || "User"} />
                            <AvatarFallback className="bg-amber-200 text-amber-900 font-bold">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col overflow-hidden">
                            <span className="font-bold text-sm truncate">{user?.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                          </div>
                        </div>

                        <nav className="flex flex-col gap-2">
                          <Link
                            href="/user/orders"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-amber-100/60 dark:hover:bg-amber-900/30 font-medium transition-colors"
                          >
                            <Package className="w-5 h-5 text-amber-600" />
                            Orders
                          </Link>

                          <Link
                            href="/user/settings"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-amber-100/60 dark:hover:bg-amber-900/30 font-medium transition-colors"
                          >
                            <Settings className="w-5 h-5 text-amber-600" />
                            Settings
                          </Link>

                          <a
                            href="/api/auth/logout"
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold transition-colors mt-4"
                          >
                            <LogOut className="w-5 h-5" />
                            Log Out
                          </a>
                        </nav>
                      </>
                    ) : (
                      <div className="flex flex-col gap-3 mt-4">
                        <a
                          href="/api/auth/login"
                          className="flex items-center justify-center font-bold bg-amber-400 hover:bg-amber-500 text-amber-950 py-3 rounded-full shadow-md transition-all text-center"
                        >
                          Log In
                        </a>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}