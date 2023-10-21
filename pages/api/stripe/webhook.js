const stripe = require("stripe")(process.env.STRIPE_API_KEY);

import { buffer } from "micro";

import { putCourseToUser, removeCourseToCart } from "../../../apiCall/users";

export const config = {
  api: {
    bodyParser: false,
  },
};

const fulfillOrder = async (stripeSession) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const session = await stripe.checkout.sessions.retrieve(stripeSession.id);
    const cookies = session.metadata;

    const listLineItems = await stripe.checkout.sessions.listLineItems(
      stripeSession.id,
      {
        expand: ["data.price.product"],
      }
    );

    const courseIds = listLineItems.data.map(
      (item) => item.price.product.metadata.courseId
    );

    // eslint-disable-next-line immutable/no-let
    for (let i = 0; i < courseIds.length; i++) {
      await putCourseToUser(courseIds[i], cookies);
      await removeCourseToCart(courseIds[i], cookies);
    }

    resolve(true);
  });
};

export default async function webhookHandler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

    // eslint-disable-next-line immutable/no-let
    let event;

    try {
      if (!sig || !webhookSecret) {
        return;
      }
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (error) {
      console.error(`Webhook error: ${error.message}`);

      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const stripeSession = event.data.object;

      await fulfillOrder(stripeSession);
    }
    res.status(200).send();
  } else {
    res.status(405).end("Method not allowed");
  }
}
