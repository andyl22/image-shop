import type { NextApiRequest, NextApiResponse } from 'next';
import Item from '../../../models/Item';
import dbConnect from '../../../utilities/mongo';
import Section from '../../../models/Section';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const section = await Section.find({}, 'name');
  const tempData = await Item.find().populate('subsection');
  const data = tempData.map((item) => {
    const matchingSection = section.find(
      (sec) =>
        JSON.stringify(sec._id) ===
        JSON.stringify(item.subsection.section),
    );
    const jsonData = { ...JSON.parse(JSON.stringify(item)) };
    jsonData.section = matchingSection;
    return jsonData;
  });
  res.status(200).json({ status: 'Done', data, tempData });
}
