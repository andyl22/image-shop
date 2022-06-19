import type { NextApiRequest, NextApiResponse } from 'next';
import Subsection from '../../../models/Subsection';
import dbConnect from '../../../utilities/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.body;
  await dbConnect();
  const data = await Subsection.findOne({ name });
  res.status(200).json({ status: 'Done', data });
}
