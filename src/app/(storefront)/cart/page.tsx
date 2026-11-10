

import { CheckoutProductsTable } from "@/components/storefront/checkout-product-table";
import { CheckoutSummary } from "@/components/storefront/checkout-summary";
import { PageTitle} from "@/components/typography";
import { getProductById } from "@/lib/products";

import { notFound } from "next/navigation";

type CartPageProps = {
  params: Promise <{id: string}>
}

export default async function CartPage({params}: CartPageProps) {

  const {id} = await params;  
  const product = await getProductById(id);

   if (!product) {
       notFound();
     }

  return (
     <main className="space-y-6 p-6 ">
    <div className="space-y-2 p-6 ">
      <div className="flex flex-col md:flex-row items-start gap-8 justify-center">
      <CheckoutProductsTable products={[product]}/>
      <CheckoutSummary product={product}/>
      </div>
    </div>
    </main>
  );
}
