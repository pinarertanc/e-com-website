import 'server-only'

import Stripe from 'stripe'

const stripeKey = ()=>{
  if(process.env.STRIPE_SECRET_KEY){
    return process.env.STRIPE_SECRET_KEY;
  } else {
    throw Error ('Missing stripe secret key')
  }
}

export const stripe = new Stripe(stripeKey());

export async function archiveStripeProduct(stripeProductId: string) {
  try {
    
    const archivedProduct = await stripe.products.update(stripeProductId, {
      active: false,
    });

    const prices = await stripe.prices.list({
      product: stripeProductId,
      active: true,
    });

    await Promise.all(
      prices.data.map((price) =>
        stripe.prices.update(price.id, { active: false })
      )
    );

    return archivedProduct;
  } catch (error) {
    console.error("Stripe archiving error:", error);
    throw error;
  }
}


interface SyncStripeProductParams {
  existingStripeProductId?: string | null;
  existingStripePriceId?: string | null;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  isActive: boolean;
  isPriceChanged: boolean;
  isDetailsChanged: boolean;
}

export async function syncStripeProduct({
  existingStripeProductId,
  existingStripePriceId,
  name,
  description,
  priceCents,
  currency,
  isActive,
  isPriceChanged,
  isDetailsChanged,
}: SyncStripeProductParams): Promise<{
  stripeProductId: string;
  stripePriceId: string;
}> {
  let stripeProductId = existingStripeProductId || "";
  let stripePriceId = existingStripePriceId || "";


  if (!stripeProductId) {
    const createdProduct = await stripe.products.create({
      name,
      description,
      active: isActive,
    });
    stripeProductId = createdProduct.id;
  } else if (isDetailsChanged) {
    await stripe.products.update(stripeProductId, {
      name,
      description,
      active: isActive,
    });
  }

  if (!stripePriceId || isPriceChanged) {
    const newPrice = await stripe.prices.create({
      product: stripeProductId,
      unit_amount: priceCents,
      currency: currency.toLowerCase(),
    });

    if (stripePriceId) {
      await stripe.prices.update(stripePriceId, { active: false });
    }

    stripePriceId = newPrice.id;
  }

  return { stripeProductId, stripePriceId };
}