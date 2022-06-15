import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(
  process.env.NEXT_PUBLIC_STRIPE_SECRET,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {}
