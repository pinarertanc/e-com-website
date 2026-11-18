import {Product} from "@/types/product";

export type CartItemsWithProduct = {
  id: string;
  quantity: number;
  userId: string;
  productId: string;
  product: Product;
  existingProductId?: string;
};

export interface CartViewProps {
  initialItems: CartItemsWithProduct[];
}

export type AddToCartResult =
  | { success: true; message: string }
  | { success: false; error: string };

  export interface AddToCartButtonProps{
    productId: string;
    disabled: boolean;
  }