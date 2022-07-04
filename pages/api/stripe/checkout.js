const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({STRIPE_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY})
      break
    case 'POST':
      postStripSession(req, res);
      break
    default:
      res.status(405).end('Method not allowed')
  } 
}

const postStripSession = async (req, res) => {
  const { items, email, cookies } = req.body

  const params = {
    payment_method_types: ['card'],
    line_items: items,
    customer_email: email,
    mode: 'payment',
    success_url: `${req.headers.origin}/profile?profile=courses`,
    cancel_url: `${req.headers.origin}/profile?profile=cart`,
    metadata: cookies,
  }

  const checkoutStripeSession = await stripe.checkout.sessions.create(params)

  res.status(200).json({ id: checkoutStripeSession.id })
}