"use client";
import { addToCartAction } from "@/app/(storefront)/cart/action";
import { AddToCartButtonProps } from "@/types/cart";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Check, ShoppingCart } from "lucide-react";
import { MutedText } from "../typography";

export function AddToCartButton({productId, disabled}:AddToCartButtonProps){

  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = () =>{
    setErrorMessage(null);

    startTransition(async ()=>{
      const result = await addToCartAction(1,productId);

      if(!result.success){
        setErrorMessage(result.error);
        return;

      }

      setAdded(true);
      router.refresh();
      setTimeout(()=>{
        setAdded(false);
      }, 2000)
      
    });
  };

  return(
    <div className="space-y-2">
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isPending}
    >
    {isPending ? (
          "Ekleniyor..."
        ) : added ? (
          <>
            <Check className="mr-2 size-4" />
            Sepete Eklendi
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 size-4" />
            Sepete Ekle
          </>
        )}
    </Button>

   {errorMessage && (
        <MutedText>
          {errorMessage}
        </MutedText>
      )}
      </div>

  )
}