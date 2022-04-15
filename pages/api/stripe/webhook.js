const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { buffer } from 'micro'

import { putCourseToUser, removeCourseToCart } from '../../../apiCall/users'

export const config = {
  api: {
    bodyParser: false
  }
}

const fulfillOrder = async session => {

  const listLineItems = await stripe.checkout.sessions.listLineItems(
    session.id,
    {
      expand: ['data.price.product']
    }
  )
  
  const courseIds = listLineItems.data.map(
    item => item.price.product.metadata.courseId
  )

  for (let i = 0; i < courseIds.length; i++){
    console.log('id: ',courseIds[i])
    // await putCourseToUser(courseIds[i])
    // await removeCourseToCart(courseIds[i])
  }  
}

export default async function webhookHandler (req, res) {
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

    let event

    try {
      if (!sig || !webhookSecret) return
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (error) {
      console.log(`Webhook error: ${error.message}`)
      return res.status(400).send(`Webhook error: ${error.message}`)
    }

    console.log('event type: ', event.type)
    if (event.type === 'checkout.session.completed') {
      // if (event.type === 'payment_intent.succeeded') {

      const session = event.data.object
      // Fulfill the purchase...
      fulfillOrder(session)
    }
    res.status(200).send()
  }
}
