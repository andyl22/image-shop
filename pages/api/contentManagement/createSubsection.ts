import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Subsection from '../../../models/Subsection';
import Section from '../../../models/Section';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, section } = req.body;
  if (!section) {
    res
      .status(200)
      .json({ error: 'Must provide a section for a subsection' });
    return;
  }

  await dbConnect();

  const sectionID = await Section.findOne({ name: section });
  try {
    await Subsection.create({
      name,
      section: sectionID,
    });
    res.status(201).json({ data: 'Created subsection' });
  } catch (error) {
    // @ts-ignore
    res.status(200).json(error);
  }
}
