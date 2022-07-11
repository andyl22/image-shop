import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Section from '../../../models/Section';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, updateBody } = req.body;

  await dbConnect();

  try {
    await Section.findByIdAndUpdate(id, updateBody);
    res.status(201).json({ message: 'Updated section' });
  } catch (error) {
    // @ts-ignore
    res.status(200).json(error);
  }
}
