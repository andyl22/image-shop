import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Item from '../../../models/Item';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { itemName } = req.body;
  const subsection = new Item({
    name: itemName,
  });
  await dbConnect();
  try {
    const doc = await subsection.save();
    res.status(200).json({ data: 'Created subsection', detail: doc });
  } catch (error) {
    // @ts-ignore
    res.status(201).json({ data: error });
  }
}
