import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

console.log('Stripe key starts with:', process.env.STRIPE_SECRET_KEY?.slice(0, 8));

export async function POST(req: NextRequest) {
  try {
    const { priceId, customerEmail } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      customer_email: customerEmail,
      metadata: {
        priceId: priceId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    console.error('Stripe error:', err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}