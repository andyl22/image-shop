import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Item from '../../../models/Item';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, updateBody } = req.body;

  await dbConnect();

  try {
    await Item.findByIdAndUpdate(id, updateBody);
    res.status(201).json({ message: 'Updated Item' });
  } catch (error) {
    // @ts-ignore
    res.status(200).json(error);
  }
}
