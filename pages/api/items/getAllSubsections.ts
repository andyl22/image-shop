import type { NextApiRequest, NextApiResponse } from 'next';
import Section from '../../../models/Section';
import dbConnect from '../../../utilities/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const data = await Section.find();
  res.status(200).json({ status: 'Done', data });
}
