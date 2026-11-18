'use server';

import { requireAdmin} from '@/lib/auth0';
import { addProduct } from '@/lib/products';
import {
  createProductFormSchema,
  createProductImagesSchema,
} from '@/lib/validation';
import { put } from '@vercel/blob';
import { stripe } from '@/lib/stripe';
import { auth0 } from '@/lib/auth0'; 
import { parseFormValues,flattenFieldErrors } from '@/types/product';
import { CreateProductState } from '@/types/product';



export async function createProduct(
  _prevState: CreateProductState | null,
  formData: FormData,
): Promise<CreateProductState> {

  await requireAdmin();
   const session = await auth0.getSession();

   if (!session || !session.user) {
  throw new Error("Bu işlem için oturum açmanız gerekmektedir.");
}
   const sellerId = session.user.sub;

  const values = await parseFormValues(formData);
  
 
  const parsed = createProductFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      values,
      fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  const images = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File);
  const imagesParsed = createProductImagesSchema.safeParse(images);
  if (!imagesParsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      values,
      fieldErrors: {
        images: imagesParsed.error.issues[0]?.message ?? 'Invalid images',
      },
    };
  }

  let imageUrls: string[] = [];
  try {
    imageUrls = await Promise.all(
      images.map(async (image) => {
        const blob = await put(image.name, image, {
          access: 'public',
          addRandomSuffix: true,
        });
        return blob.url;
      }),
    );
  } catch (err) {
    console.error('Vercel Blob Yükleme Hatası:', err);
    return {
      success: false,
      message: 'Resimler yüklenirken bir sorun oluştu.',
      values,
    };
  }

  if (!(imageUrls?.length > 0)) {
    return {
      success: false,
      message: 'Lütfen en az bir resim yükleyin.',
      values,
    };
  }


  const stripeProduct = await stripe.products.create({
  name: parsed.data.name,
  description: parsed.data.description,
});

const stripePrice = await stripe.prices.create({
  product: stripeProduct.id,
  unit_amount: Math.round(parseFloat(parsed.data.price) * 100),
  currency: parsed.data.currency.toLowerCase(),
});

  try {
    const createdProduct = await addProduct({
      name: parsed.data.name,
      description: parsed.data.description,
      priceCents: Math.round(parseFloat(parsed.data.price) * 100),
      currency: parsed.data.currency,
      category: parsed.data.category,
      stock: parseInt(parsed.data.stock, 10),
      imageUrls: imageUrls,
      isActive: parsed.data.isActive,
      sellerId: sellerId,
      condition: parsed.data.condition,
      stripePriceId: stripePrice.id,
      stripeProductId: stripeProduct.id,
      ageGroup: parsed.data.AgeGroup
    });

    if (!createdProduct) {
      return {
        success: false,
        message: 'Failed saving product to database, please try again',
        values,
      };
    }

    return {
      success: true,
      productId: createdProduct.id,
    };
  } catch (error) {
    console.error('Veritabanı Kayıt Hatası:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Veritabanı bağlantı hatası oluştu.',
      values,
    };
  }
}


