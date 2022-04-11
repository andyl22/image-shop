import type { NextApiRequest, NextApiResponse } from "next";
const { Client, CheckoutAPI } = require("@adyen/api-library");

const client = new Client({ apiKey: "YOUR_API_KEY", environment: "TEST" });
const checkout = new CheckoutAPI(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  checkout
    .sessions({
      amount: { currency: "EUR", value: 1000 },
      reference: "YOUR_PAYMENT_REFERENCE",
      returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
      merchantAccount: "YOUR_MERCHANT_ACCOUNT",
      countryCode: "NL",
    })
    .then((response: any) => {
      console.log(response);
    })
    .catch((e: any) => {
      console.log(e);
    });

  res.status(200).json({ message: "Done" });
}
