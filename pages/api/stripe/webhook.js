const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { buffer } from 'micro'

import { putCourseToUser, removeCourseToCart } from '../../../apiCall/users'

export const config = {
  api: {
    bodyParser: false
  }
}

const fulfillOrder = async stripeSession => {

  const session = await stripe.checkout.sessions.retrieve(stripeSession.id)
  const cookies = session.metadata

  const listLineItems = await stripe.checkout.sessions.listLineItems(
    stripeSession.id,
    {
      expand: ['data.price.product']
    }
  )
  
  const courseIds = listLineItems.data.map(
    item => item.price.product.metadata.courseId
  )

  for (let i = 0; i < courseIds.length; i++){
    await putCourseToUser(courseIds[i],cookies)
    await removeCourseToCart(courseIds[i],cookies)
  }  
}

export default async function webhookHandler (req, res) {

  console.log('req headers: ', req.headers)

  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

    console.log('sig: ', sig)
    console.log('webhookSecret: ', webhookSecret)

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

      const stripeSession = event.data.object
      fulfillOrder(stripeSession)
    }
    res.status(200).send()
  } else {
    res.status(405).end('Method not allowed')
  }
}
