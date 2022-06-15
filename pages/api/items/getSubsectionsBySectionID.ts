import type { NextApiRequest, NextApiResponse } from 'next';
import Subsection from '../../../models/Subsection';
import dbConnect from '../../../utilities/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { section } = req.body;
  await dbConnect();
  const data = await Subsection.find({ section });
  res.status(200).json({ status: 'Done', data });
}
