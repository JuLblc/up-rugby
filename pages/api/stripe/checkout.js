const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      getStripeSession(req, res);
      break
    case 'POST':
      postStripSession(req, res);
      break
    default:
      console.log('switch default')
  }
 
}

const getStripeSession = (req, res,) => {
  console.log('get session')
  res.status(200).json({message:'get session'})
}

const postStripSession = async (req, res,) => {
  const { items, email } = req.body

  const params = {
    payment_method_types: ['card'],
    line_items: items,
    customer_email: email,
    mode: 'payment',
    success_url: `${req.headers.origin}/profile?profile=courses`,
    cancel_url: `${req.headers.origin}/profile?profile=cart`
  }

  const checkoutStripeSession = await stripe.checkout.sessions.create(params)

  res.json({ id: checkoutStripeSession.id })
}