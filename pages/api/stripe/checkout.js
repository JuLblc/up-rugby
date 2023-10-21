const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      });
      break;
    case "POST":
      postStripSession(req, res);
      break;

    default:
      res.status(405).end("Method not allowed");
  }
}

const postStripSession = async (req, res) => {
  const { cookies, email, items } = req.body;

  const params = {
    cancel_url: `${req.headers.origin}/profile?profile=cart`,
    customer_email: email,
    line_items: items,
    metadata: cookies,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${req.headers.origin}/profile?profile=courses`,
  };

  const checkoutStripeSession = await stripe.checkout.sessions.create(params);

  res.status(200).json({ id: checkoutStripeSession.id });
};
