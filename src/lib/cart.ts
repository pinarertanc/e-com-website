import { db } from "@/prisma/db";
import {CartItemsWithProduct} from "@/types/cart";
import { getProductById } from "./products";




export async function getCartItemsByUserId(userId: string):Promise<CartItemsWithProduct[]>{
  try{
    const rawCartItems = await db.orm.cart_items
    .where({userId})
    .all();

    if(!rawCartItems){
      return [];
    }

    const itemsWithProduct = await Promise.all(
      rawCartItems .map(async(item)=>{
        const productIdStr = item.productId.toString();
        const product = await getProductById(productIdStr);

        if (!product || !product.isActive){
          return null;
        }
        return {
          id: item._id.toString(),
          userId: item.userId,
          productId: productIdStr,
          quantity: item.quantity,
          product
        }
      })
    );
    return itemsWithProduct.filter((item)=> item !== null)

  } catch(error){
    console.error("getCartItemsByUserId error:", error);
    return [];
  }

  }

export async function upsertCartItem(params:{
  userId: string;
  productId:string;
  quantity: number;
  existingProductId?: string;
}): Promise<void>{

  const {userId, productId, quantity, existingProductId} = params;

  if(existingProductId){
    await db.orm.cart_items
    .where({_id:existingProductId})
    .update({quantity, updatedAt: new Date(),

    })
  } else {
    await db.orm.cart_items
    .create({
      userId,
      productId,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date(),

    })
  }

}

export async function findCartItemByUserAndProduct(userId: string, productId: string){

  const userCartItems = await db.orm.cart_items
  .where({userId})
  .all();

  return(
    userCartItems.find((item)=>item.productId === productId)
  );

}

