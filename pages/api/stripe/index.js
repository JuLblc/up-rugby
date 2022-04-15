const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler (req, res) {
  const { items , email} = req.body

  const params = {
    payment_method_types: ['card'],
    line_items: items,
    customer_email:email,
    mode: 'payment',
    success_url: `${req.headers.origin}/result?status=success`,
    cancel_url: `${req.headers.origin}/profile?profile=cart`
  }

  const checkoutStripeSession = await stripe.checkout.sessions.create(params)

  res.json({ id: checkoutStripeSession.id })
}
