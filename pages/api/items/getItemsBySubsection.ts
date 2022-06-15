import type { NextApiRequest, NextApiResponse } from 'next';
import Item from '../../../models/Item';
import dbConnect from '../../../utilities/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { subsection } = req.body;
  await dbConnect();
  const data = await Item.find({ subsection });
  res.status(200).json({ status: 'Done', data });
}
