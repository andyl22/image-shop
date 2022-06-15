import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Section from '../../../models/Section';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.body;

  await dbConnect();

  try {
    await Section.create({
      name,
    });
    res.status(201).json({ message: 'Created section' });
  } catch (error) {
    // @ts-ignore
    res.status(200).json(error);
  }
}
