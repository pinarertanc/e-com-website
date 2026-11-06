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


