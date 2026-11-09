import Image from "next/image";
import Link from "next/link";

import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Currency, formatPrice } from "@/types/currency";
import { MutedText, PageTitle } from "../typography";
import type { Product } from "@/types/product";

interface CheckoutProductsTableProps {
  products : Product[];
}

export async function CheckoutProductsTable({products}:CheckoutProductsTableProps) {
 

  if (products.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
        <PageTitle>Sepet</PageTitle>
        <MutedText>Henüz sepetinizde ürün bulunmamaktadır.</MutedText>

        <Button asChild className="mt-4">
          <Link href="/home">Alışverişe Devam Et</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border w-1/2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Select</TableHead>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Name</TableHead> 
            <TableHead>Price</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Input type="checkbox" className="size-5 " defaultChecked></Input>
              </TableCell>
              <TableCell>
                <div className="relative size-10 overflow-hidden rounded-md bg-muted">
                  {item.imageUrls[0] ? (
                    <Image
                      src={item.imageUrls[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      loading="eager"
                    />
                  ) : null}
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                {formatPrice(item.priceCents, item.currency as Currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}