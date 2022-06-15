import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import Item from '../../../models/Item';
import Subsection from '../../../models/Subsection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    name,
    sourceName,
    sourceLink,
    image,
    price,
    description,
    subsection,
  } = req.body;

  if (!subsection) {
    res.status(200).json({ error: 'Must provide a subsection.' });
    return;
  }

  const subsectionID = await Subsection.findOne({
    name: subsection,
  });

  if (!subsectionID) {
    res.status(200).json({
      error: 'Could not find the subsection. Please create it first.',
    });
    return;
  }

  const sectionItem = new Item({
    name,
    sourceName,
    sourceLink,
    image,
    price,
    description,
    subsection: subsectionID,
  });

  await dbConnect();

  try {
    const doc = await sectionItem.save();
    res.status(201).json({ data: 'Created item', detail: doc });
  } catch (error) {
    // @ts-ignore
    res.status(200).json(error);
  }
}
