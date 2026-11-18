'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put, del } from '@vercel/blob';
import { updateProduct, getProductById } from '@/lib/products';
import { syncStripeProduct } from '@/lib/stripe';
import { requireAdmin } from '@/lib/auth0';
import { UpdateProductFormSchema } from '@/lib/validation/product';
import {
  parseFormValues,
  flattenFieldErrors,
  type Product,
  type UpdateProductState,
} from '@/types/product';

function parseUrlList(value: FormDataEntryValue | null): string[] {
  try {
    const parsed = JSON.parse((value as string) || '[]');
    return Array.isArray(parsed)
      ? parsed.filter((u): u is string => typeof u === 'string')
      : [];
  } catch {
    return [];
  }
}

export async function updateProductAction(
  prevState: UpdateProductState,
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
  if (!productId) {
    return { success: false, error: 'Geçersiz ürün kimliği.' };
  }

  const existingProduct = await getProductById(productId);
  if (!existingProduct) {
    return { success: false, error: 'Güncellenmek istenen ürün bulunamadı.' };
  }

  const formStripePriceId = (formData.get('stripePriceId') as string) || '';
  const formStripeProductId = (formData.get('stripeProductId') as string) || '';

  const existingImages = parseUrlList(formData.get('imageUrls'));
  const imagesToDelete = parseUrlList(formData.get('imagesToDelete'));

  const newFiles = formData
    .getAll('newImages')
    .filter((f): f is File => f instanceof File && f.size > 0);

  let updated: Product | null = null;

  try {
    
    const uploadedUrls = await Promise.all(
      newFiles.map(async (file) => {
        const blob = await put(`products/${productId}/${file.name}`, file, {
          access: 'public',
          addRandomSuffix: true,
        });
        return blob.url;
      })
    );

    const newPriceCents = Math.round(
      parseFloat(values.price.replace(',', '.')) * 100
    );

   
    const { stripeProductId, stripePriceId } = await syncStripeProduct({
      existingStripeProductId:
        existingProduct.stripeProductId || formStripeProductId,
      existingStripePriceId:
        existingProduct.stripePriceId || formStripePriceId,
      name: values.name,
      description: values.description,
      priceCents: newPriceCents,
      currency: values.currency,
      isActive: values.isActive,
      isPriceChanged:
        existingProduct.priceCents !== newPriceCents ||
        existingProduct.currency !== values.currency,
      isDetailsChanged:
        existingProduct.name !== values.name ||
        existingProduct.description !== values.description ||
        existingProduct.isActive !== values.isActive,
    });

    
    updated = await updateProduct(productId, {
      name: values.name,
      description: values.description,
      priceCents: newPriceCents,
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
    console.error('updateProductAction error:', err);
    return {
      success: false,
      error: 'Güncelleme sırasında bir hata oluştu.',
    };
  }

  if (updated) {
    revalidatePath('/admin/products');
    redirect('/admin/products');
  }

  return {
    success: false,
    error: 'Güncelleme başarısız oldu.',
  };
}