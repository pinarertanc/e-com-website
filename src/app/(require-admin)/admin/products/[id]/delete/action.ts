'use server';
import { requireAdmin } from "@/lib/auth0";
import { deleteProduct, getProductById } from "@/lib/products";
import { archiveStripeProduct } from "@/lib/stripe";
import { del } from '@vercel/blob';
import { revalidatePath } from "next/cache";
import {redirect} from 'next/navigation';

type DeleteProductState = { error: string | null };

export async function deleteProductAction (
  productId:string,
  formData: FormData,
):Promise<DeleteProductState>{

  await requireAdmin();

  const product = await getProductById(productId);

  if(!product){
    redirect("/admin/products");
  }

  if(product.imageUrls.length > 0) 
    { try {  await del([...product.imageUrls]);}
      catch(error){ console.error("Blob silme hatası", error);
        return {
        error: "Images could not be deleted. The product is still saved. Try again.",
      }
    }}

  const deleted = await deleteProduct(productId);
  if(!deleted){
   return {
    error: "Images were deleted, but the product record was not. Try again.",
   }
  }
if (product.stripeProductId) {
    try {
      await archiveStripeProduct(product.stripeProductId);
    } catch (error) {
      console.error("Stripe arşivleme hatası:", error);
    
      return {
        error: "Stripe üzerinde ürün arşivlenemedi. Ürün silinmedi.",
      };
    }
  }

  revalidatePath ("/admin/products");
  redirect("/admin/products");
  
}