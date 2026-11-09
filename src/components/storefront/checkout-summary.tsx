import { BodyText, MutedText, PageTitle } from "../typography";
import { CheckoutButton } from "./checkout-button";
import { Currency, formatPrice } from "@/types/currency";
import type { Product } from "@/types/product";

interface CheckoutSummaryProps {
  product: Product;
}

export function CheckoutSummary({ product }: CheckoutSummaryProps) {
  const shippingCents = 0; // İleride kargo mantığı eklenebilir
  const totalCents = product.priceCents + shippingCents;

  return (
    <div className="flex w-full md:w-80 flex-col gap-4 rounded-lg border bg-muted/30 p-5 h-fit">
      <PageTitle>Özet</PageTitle>
      
      <div className="space-y-3 border-b pb-4 text-sm">
        <div className="flex items-center justify-between">
          <MutedText>Ürünler</MutedText>
          <span>{formatPrice(product.priceCents, product.currency as Currency)}</span>
        </div>
        <div className="flex items-center justify-between">
          <MutedText>Kargo</MutedText>
          <span>{shippingCents === 0 ? "Ücretsiz" : formatPrice(shippingCents, product.currency as Currency)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between font-semibold">
        <BodyText>Toplam</BodyText>
        <BodyText>{formatPrice(totalCents, product.currency as Currency)}</BodyText>
      </div>

      <CheckoutButton 
        stripePriceId={product.stripePriceId || ""} 
        quantity={"1"} 
      />
    </div>
  );
}