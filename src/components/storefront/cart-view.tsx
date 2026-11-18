'use client';

import {CartViewProps} from "@/types/cart"
import { useState } from "react"
import { PageTitle } from "../typography";
import { MutedText } from "../typography";
import { Button } from "../ui/button";
import Link from "next/link";
import { CheckoutSummary } from "./checkout-summary";
import { CheckoutProductsTable } from "./checkout-product-table";

export function CartView({ initialItems }: CartViewProps) {

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    initialItems.map((item) => item.id)
  );


  if (initialItems.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
        <PageTitle>Sepetiniz Boş</PageTitle>
        <MutedText>Henüz sepetinize eklenmiş bir ürün bulunmamaktadır.</MutedText>
        <Button asChild className="mt-4">
          <Link href="/home">Alışverişe Devam Et</Link>
        </Button>
      </div>
    );
  }

 
  const handleToggleSelect = (cartItemId: string) => {
    setSelectedIds((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId) 
        : [...prev, cartItemId]                
    );
  };

 
  const handleToggleAll = () => {
    if (selectedIds.length === initialItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(initialItems.map((item) => item.id)); 
    }
  };

 
  const selectedItems = initialItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  return (
    <div className="flex flex-col items-start gap-8 lg:flex-row">
      <CheckoutProductsTable
        items={initialItems}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleAll={handleToggleAll}
      />
      <CheckoutSummary selectedItems={selectedItems} />
    </div>
  );
}