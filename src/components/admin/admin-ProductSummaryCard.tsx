import Image from "next/image";
import { Product } from "@/types/product";

type ProductSummaryCardProps = {
  product: Product;
};

export function ProductSummaryCard({ product }: ProductSummaryCardProps) {
  const price = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);

  const coverImage = product.imageUrls?.[0];

  return (
    <div className="flex gap-4 rounded-lg border bg-muted/30 p-4">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-md border bg-muted">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
            Görsel yok
          </div>
        )}
      </div>

      <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="text-muted-foreground">Ad</dt>
        <dd className="font-medium text-foreground">{product.name}</dd>

        <dt className="text-muted-foreground">Fiyat</dt>
        <dd>{price}</dd>

        <dt className="text-muted-foreground">Stok</dt>
        <dd>{product.stock}</dd>

        <dt className="text-muted-foreground">Durum</dt>
        <dd>{product.isActive ? "Yayında" : "Gizli"}</dd>

        <dt className="text-muted-foreground">ID</dt>
        <dd className="font-mono text-xs">{product.id}</dd>
      </dl>
    </div>
  );
}