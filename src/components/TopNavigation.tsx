import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
 
} from "@/components/ui/navigation-menu";
import Link from "next/dist/client/link";

export function TopNavigation(){
  return (

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
        <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/user/orders">Orders</Link>}/>
    </NavigationMenuItem>
    <NavigationMenuItem>
        <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/user/settings">Settings</Link>}/>
    </NavigationMenuItem>
    <NavigationMenuItem>
        <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<a href="/auth/login">Log In</a>}/>
    </NavigationMenuItem>
    <NavigationMenuItem>
        <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<a href="/auth/logout">Log Out</a>}/>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
)}