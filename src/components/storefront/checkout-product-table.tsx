
'use client';

import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Currency, formatPrice } from "@/types/currency";
import type { CartItemsWithProduct } from "@/types/cart";

interface CheckoutProductsTableProps {
  items: CartItemsWithProduct[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
}

export function CheckoutProductsTable({
  items,
  selectedIds,
  onToggleSelect,
  onToggleAll,
}: CheckoutProductsTableProps) {
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <div className="w-full flex-1 overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Input
                type="checkbox"
                className="size-4 cursor-pointer"
                checked={isAllSelected}
                onChange={onToggleAll}
                aria-label="Tümünü seç"
              />
            </TableHead>
            <TableHead className="w-16">Görsel</TableHead>
            <TableHead>Ürün</TableHead>
            <TableHead className="text-center">Adet</TableHead>
            <TableHead className="text-right">Toplam Fiyat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(({ id, product, quantity }) => {
            const isChecked = selectedIds.includes(id);
            const rowTotalCents = product.priceCents * quantity;

            return (
              <TableRow
                key={id}
                className={`transition-opacity ${!isChecked ? "opacity-50" : ""}`}
              >
                <TableCell>
                  <Input
                    type="checkbox"
                    className="size-4 cursor-pointer"
                    checked={isChecked}
                    onChange={() => onToggleSelect(id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                    {product.imageUrls?.[0] ? (
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-center">{quantity}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(rowTotalCents, product.currency as Currency)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}