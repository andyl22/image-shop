import type { NextApiRequest, NextApiResponse } from 'next';
import Subsection from '../../../models/Subsection';
import dbConnect from '../../../utilities/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const data = await Subsection.find().populate('section', 'name');
  res.status(200).json({ status: 'Done', data });
}
