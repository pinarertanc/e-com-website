import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1UWEpJ8BVF3TFi8zJnj4AtIR',
          quantity: 10,
        },
      ],
      mode: 'payment',
      cancel_url: `${origin}/user/checkout`,
      success_url: `${origin}/user/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    if (!session.url) {
      return NextResponse.json(
        { error: 'Checkout session URL is unavailable' },
        { status: 500 }
      )
    }

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred'
    const statusCode =
      typeof err === 'object' && err !== null && 'statusCode' in err &&
      typeof err.statusCode === 'number'
        ? err.statusCode
        : 500

    return NextResponse.json(
      { error: message },
      { status: statusCode }
    )
  }
}