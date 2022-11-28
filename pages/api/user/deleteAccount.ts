import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username } = req.body;
  await dbConnect();
  const deletedUser = await User.deleteOne({ username });
  if (!deletedUser) {
    res
      .status(200)
      .json({ success: false, data: 'Could not delete this user.' });
  } else {
    res
      .status(200)
      .json({ success: true, data: `Deleted account: ${username}` });
  }
}
