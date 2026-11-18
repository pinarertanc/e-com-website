"use server";

import { getSessionUser } from "@/lib/auth0";
import { findCartItemByUserAndProduct, upsertCartItem } from "@/lib/cart";
import { getProductById } from "@/lib/products";
import { AddToCartResult } from "@/types/cart";
import { revalidatePath } from "next/cache";


export async function addToCartAction (quantity:number, productId: string) : Promise <AddToCartResult>{

  try{
   const user = await getSessionUser();
   if(!user || !user.sub){
    return{success: false,
        error: "Sepete ürün eklemek için giriş yapmalısınız."}
   }

   if(quantity < 1){
    return{
      success: false,
      error: "Geçersiz ürün adedi."
    }
   }

   const product = await getProductById(productId);
   if(!product || !product.isActive){
    return{
      success: false,
      error: "Bu ürün artık satışta değil."
    }
   }

   if(product.stock < quantity){
    return{
      success:false,
      error:"Yeterli stok bulunmakmaktadır."
    }
   }

   const existingItem = await findCartItemByUserAndProduct(user.sub,productId);

   const finalQuantity = existingItem? existingItem.quantity + quantity: quantity;

   if(finalQuantity > product.stock){
    return{
      success:false,
      error: `Stok sınırını aştınız. Sepetinizde zaten ${existingItem?.quantity} adet var.`
    }
   }

   await upsertCartItem({
    userId: user.sub,
    productId,
    quantity: finalQuantity,
    existingProductId: existingItem?._id
   })

   revalidatePath("/cart");

   return{
    success:true,
    message: "Ürün sepeteeklendi."
   }
  }catch(error){
    console.error("AddToCartAction error:" , error);
    return{
      success:false,
      error:"Ürün sepete eklenirken bir hata oluştu."
    }
  } 

}