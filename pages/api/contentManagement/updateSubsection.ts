import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Subsection from '../../../models/Subsection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, updateBody } = req.body;

  await dbConnect();

  try {
    await Subsection.findByIdAndUpdate(id, updateBody);
    res.status(201).json({ message: 'Updated Subsection' });
  } catch (error) {
    // @ts-ignore
    res.status(200).json(error);
  }
}
