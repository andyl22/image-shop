import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    }
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
}
