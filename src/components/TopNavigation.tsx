'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { cn } from "@/lib/utils";

export function TopNavigation() {
  const { user } = useUser();
  const hasSession = Boolean(user);

  return (
    <header className="sticky top-3 z-50 px-4 max-w-6xl mx-auto w-full">
      <div className="bg-background/80 backdrop-blur-md border border-amber-200/60 dark:border-amber-900/40 rounded-full px-5 py-2 shadow-lg shadow-amber-500/5 transition-all">
        <NavigationMenu className="max-w-none justify-between w-full">
          <NavigationMenuList className="flex items-center gap-2 w-full justify-between">
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

            {/* NAVİGASYON LİNKLERİ */}
            <div className="flex items-center gap-1.5">
              {hasSession ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full font-semibold hover:bg-amber-100/70 dark:hover:bg-amber-900/30 hover:text-amber-900 dark:hover:text-amber-100 transition-colors"
                      )}
                      render={<Link href="/user/orders">Orders</Link>}
                    />
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full font-semibold hover:bg-amber-100/70 dark:hover:bg-amber-900/30 hover:text-amber-900 dark:hover:text-amber-100 transition-colors"
                      )}
                      render={<Link href="/user/settings">Settings</Link>}
                    />
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                      )}
                      render={<a href="/auth/logout">Log Out</a>}
                    />
                  </NavigationMenuItem>
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

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}