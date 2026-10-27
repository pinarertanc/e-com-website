'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put, del } from '@vercel/blob';
import { AgeGroup, ProductActionState, ProductCategory, ProductCondition } from '@/types/product';
import { Currency } from '@/types/currency';
import { updateProduct } from '@/lib/products';
import type { Product } from '@/types/product';
import { requireAdmin } from '@/lib/auth0';

function parseUrlList(value: FormDataEntryValue | null): string[] {
  try {
    const parsed = JSON.parse((value as string) || "[]");
    return Array.isArray(parsed) ? parsed.filter((u) => typeof u === "string") : [];
  } catch {
    return [];
  }
}

export async function updateProductAction(
  prevState: any,
  formData: FormData
): Promise<ProductActionState> {

   await requireAdmin();
   

  const productId = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceRaw = formData.get("price") as string;
  const currency = formData.get("currency") as Currency;
  const stockRaw = formData.get("stock") as string;
  const isActive = formData.get("isActive") === "on";
  const condition = formData.get("condition") as ProductCondition;
  const category = formData.get("category") as ProductCategory;
  const sellerId = formData.get("sellerId") as string;
  const ageGroup = formData.get("ageGroup") as AgeGroup;

  const existingImages = parseUrlList(formData.get("imageUrls"));
  const imagesToDelete = parseUrlList(formData.get("imagesToDelete"));


  const newFiles = formData
    .getAll("newImages")
    .filter((f): f is File => f instanceof File && f.size > 0);

  let updated :Product | null = null;

  try {
   
    const uploadedUrls = await Promise.all(
      newFiles.map(async (file) => {
        const blob = await put(`products/${productId}/${file.name}`, file, {
          access: "public",
          addRandomSuffix: true,
        });
        return blob.url;
      })
    );

    
     updated = await updateProduct(productId, {
      name,
      description,
      priceCents: Math.round(parseFloat(priceRaw.replace(",", ".")) * 100),
      stock: parseInt(stockRaw, 10) || 0,
      isActive,
      condition,
      category,
      currency,
      sellerId,
      ageGroup,
      imageUrls: [...existingImages, ...uploadedUrls],
    });


    if (updated && imagesToDelete.length > 0) {
      await del(imagesToDelete);
    }
  } catch (err) {
    console.error("updateProductAction error:", err);
    return { error: "Güncelleme sırasında bir hata oluştu." };
  }

  if (updated) {
    revalidatePath("/admin/products");
    redirect("/admin/products");
  }
  return { error: "Güncelleme başarısız oldu." };
}