import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductById } from "@/lib/products";
import { requireAdmin } from "@/lib/auth0";
import { ProductSummaryCard } from "@/components/ProductSummaryCard.tsx";
import { deleteProductAction } from "./action";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({ params }: DeleteProductPageProps) {
  await requireAdmin();

  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const imageCount = product.imageUrls?.length ?? 0;

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Delete product
        </h1>
        <p className="text-sm text-muted-foreground">
          Bu işlem ürünü veritabanından kalıcı olarak kaldırır.
        </p>
      </div>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Silmeyi onayla</CardTitle>
          <CardDescription>
            Aşağıdaki ürün silinecek. Bu işlem geri alınamaz.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <ProductSummaryCard product={product} />

          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Ürün kaydı veritabanından silinir.</li>
            <li>
              {imageCount > 0
                ? `${imageCount} görsel Vercel Blob'dan da silinir.`
                : "Bu ürüne bağlı görsel yok."}
            </li>
            <li>
              Sadece mağazada gizlemek istiyorsan silmek yerine düzenleme
              sayfasından "active" kutusunu kaldırman yeterli.
            </li>
          </ul>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3">
          <form action={deleteProductAction.bind(null, product.id)}>
            <Button type="submit" variant="destructive">
              Ürünü kalıcı olarak sil
            </Button>
          </form>
          <Button asChild variant="outline">
            <Link href="/admin/products">Vazgeç, kataloğa dön</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}