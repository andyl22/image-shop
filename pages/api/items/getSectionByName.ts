import type { NextApiRequest, NextApiResponse } from 'next';
import Section from '../../../models/Section';
import dbConnect from '../../../utilities/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.body;
  await dbConnect();
  const data = await Section.findOne({ name });
  res.status(200).json({ status: 'Done', data });
}
