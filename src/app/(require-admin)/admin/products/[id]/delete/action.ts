'use server';
import { requireAdmin } from "@/lib/auth0";
import { deleteProduct, getProductById } from "@/lib/products";
import { del } from '@vercel/blob';
import { revalidatePath } from "next/cache";
import {redirect} from 'next/navigation';

export async function deleteProductAction (productId: string):Promise<void>{

  await requireAdmin();

  const product = await getProductById(productId);
  if(!product){
    return ;
  }

  const deleted = await deleteProduct(productId);
  if(!deleted){
    throw new Error ("ürün silinemedi");
  }

  try {
    if (product.imageUrls.length > 0) await del([...product.imageUrls]);
  } catch (err) {
    console.error("Blob silme hatası:", err); 
  }

  revalidatePath ("/admin/products");
  redirect("/admin/products");
}