
'use client';

import { useState } from "react";
import { BodyText, MutedText, PageTitle } from "../typography";
import { Currency, formatPrice } from "@/types/currency";
import type { CartItemsWithProduct } from "@/types/cart";
import { CheckoutButton } from "./checkout-button";

interface CheckoutSummaryProps {
  selectedItems: CartItemsWithProduct[];
}

export function CheckoutSummary({ selectedItems }: CheckoutSummaryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  const subtotalCents = selectedItems.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0
  );

  const shippingCents = 0; 
  const totalCents = subtotalCents + shippingCents;

  const currency = (selectedItems[0]?.product.currency as Currency) || "TRY";

  const handleCheckout = async () => {
    if (selectedItems.length === 0) return;

    try {
      setIsLoading(true);
      setErrorMsg(null);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItemIds: selectedItems.map((item) => item.id),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Ödeme oturumu başlatılamadı.");
      }

     
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout başlatma hatası:", error);
      setErrorMsg(
        error instanceof Error
          ? error.message
          : "Ödeme başlatılırken bir hata oluştu."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col gap-4 rounded-xl border bg-muted/30 p-5 lg:w-80">
      <PageTitle>Sipariş Özeti</PageTitle>

      <div className="space-y-3 border-b pb-4 text-sm">
        <div className="flex items-center justify-between">
          <MutedText>Seçilen Ürün</MutedText>
          <span className="font-medium">{selectedItems.length} kalem</span>
        </div>

        <div className="flex items-center justify-between">
          <MutedText>Ürünler Toplamı</MutedText>
          <span>{formatPrice(subtotalCents, currency)}</span>
        </div>

        <div className="flex items-center justify-between">
          <MutedText>Kargo Ücreti</MutedText>
          <span>
            {shippingCents === 0
              ? "Ücretsiz"
              : formatPrice(shippingCents, currency)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between font-semibold">
        <BodyText>Toplam</BodyText>
        <BodyText>{formatPrice(totalCents, currency)}</BodyText>
      </div>

      {errorMsg && (
        <p className="text-sm text-destructive">{errorMsg}</p>
      )}

      <CheckoutButton
        className="mt-2 w-full"
        disabled={selectedItems.length === 0 || isLoading}
        onClick={handleCheckout}
      >
        {isLoading
          ? "Yönlendiriliyor..."
          : selectedItems.length === 0
          ? "Ödeme İçin Ürün Seçin"
          : `Ödeme Yap (${formatPrice(totalCents, currency)})`}
      </CheckoutButton>
    </div>
  );
}