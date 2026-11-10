import {Product} from "@/types/product";

type CartItem = {
  id: string;
  quantity: number;
  userId: string;
  productId: string;
  product: Product;
};