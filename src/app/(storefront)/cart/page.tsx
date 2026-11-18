import {CartView} from "@/components/storefront/cart-view";
import { getSessionUser } from "@/lib/auth0";
import { getCartItemsByUserId } from "@/lib/cart";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components/typography";


export default async function CartPage() {

  const user = await getSessionUser();

  if(!user || !user.sub){
    redirect("/auth/login");
  }

  const cartItems = await getCartItemsByUserId(user.sub);

  return(
    <main className="container mx-auto space-y-6 p-6">
      <PageTitle>Sepetim</PageTitle>
      <CartView initialItems={cartItems} />
    </main>
  );

  

}