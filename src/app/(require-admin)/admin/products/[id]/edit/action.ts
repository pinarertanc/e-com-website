// app/actions/product-actions.ts
"use server";

import { db } from "@/prisma/db";
import { requireAdmin } from "@/lib/auth0";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { updateProductDataSchema } from "@/lib/validation/product";

export type FormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function updateProductAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const productId = formData.get("productId") as string;

  // 1. Zod Doğrulaması
  const rawValues = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    currency: formData.get("currency") || "USD",
    category: formData.get("category"),
    stock: formData.get("stock"),
    isActive: formData.get("isActive") === "true",
    condition: formData.get("condition") || "NEW",
  };

  const validationResult = updateProductDataSchema.safeParse(rawValues);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
      message: "Lütfen formdaki hataları düzeltin.",
    };
  }

  const validatedData = validationResult.data;

  try {
    // 2. Silinecek resimleri Blob'dan kaldır
    const imagesToDelete: string[] = JSON.parse(
      (formData.get("imagesToDelete") as string) || "[]"
    );
    if (imagesToDelete.length > 0) {
      await del(imagesToDelete);
    }

    // 3. Yeni yüklenen resimleri Blob'a kaydet
    const existingImages: string[] = JSON.parse(
      (formData.get("existingImages") as string) || "[]"
    );
    const newImageFiles = formData.getAll("newImages") as File[];
    const newUploadedUrls: string[] = [];

    for (const file of newImageFiles) {
      if (file.size > 0) {
        const blob = await put(file.name, file, { access: "public" });
        newUploadedUrls.push(blob.url);
      }
    }

    // 4. Veritabanını Güncelle
    await db.orm.products.update({
      where: { id: productId },
      data: {
        ...validatedData,
        imageUrl: [...existingImages, ...newUploadedUrls],
      },
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Ürün başarıyla güncellendi!" };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, message: "Güncelleme sırasında bir hata oluştu." };
  }
}