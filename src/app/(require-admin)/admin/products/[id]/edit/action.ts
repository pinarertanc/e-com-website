'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put, del } from '@vercel/blob';
import { updateProduct } from '@/lib/products';
import type { Product } from '@/types/product';
import { requireAdmin } from '@/lib/auth0';
import { parseFormValues , flattenFieldErrors} from '@/types/product';

import { getProductById } from '@/lib/products';
import {UpdateProductFormSchema,} from '@/lib/validation/product';
import { UpdateProductState } from '@/types/product';


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
): Promise<UpdateProductState> {

   await requireAdmin();
   
  const values = await parseFormValues(formData);

   const parsed = UpdateProductFormSchema.safeParse(values);
     if (!parsed.success) {
       return {
         success: false,
         message: 'Please fix the errors below.',
         values,
         fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors),
       };
     }
   
   const productId = values.productId;
   const existingProduct = await getProductById(productId)

  const stripePriceId = formData.get("stripePriceId") as string;
  const stripeProductId = formData.get("stipeProductId") as string;

   if (!existingProduct) {
    return { error: "Güncellenmek istenen ürün bulunamadı." };
  }

   if (!productId) {
    return { error: "Geçersiz ürün kimliği." };
  }
  
  const existingImages = parseUrlList(formData.get("imageUrls"));
  const imagesToDelete = parseUrlList(formData.get("imagesToDelete"));


  const newFiles = formData
    .getAll("newImages")
    .filter((f): f is File => f instanceof File && f.size > 0);

  let updated :Product | null = null;

  try {
   
    const uploadedUrls = await Promise.all(
      newFiles.map(async (file) => {
        const blob = await put(`products/${values.productId}/${file.name}`, file, {
          access: "public",
          addRandomSuffix: true,
        });
        return blob.url;
      })
    );

    
     updated = await updateProduct(values.productId, {
      name: values.name,
      description: values.description,
      priceCents: Math.round(parseFloat(values.price.replace(",", ".")) * 100),
      stock: parseInt(values.stock, 10) || 0,
      isActive: values.isActive,
      condition: values.condition,
      category: values.category,
      currency: values.currency,
      sellerId: existingProduct.sellerId,
      ageGroup: values.ageGroup,
      imageUrls: [...existingImages, ...uploadedUrls],
      stripePriceId,
      stripeProductId,
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


