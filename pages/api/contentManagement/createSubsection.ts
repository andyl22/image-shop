import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Subsection from '../../../models/Subsection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const subsectionName = req.body.name;
  const subsection = new Subsection({
    name: subsectionName,
  });
  await dbConnect();
  try {
    const doc = await subsection.save();
    res.status(201).json({ data: 'Created subsection', detail: doc });
  } catch (error) {
    // @ts-ignore
    res.status(200).json(error.errors.name.properties);
  }
}
