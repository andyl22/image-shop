import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utilities/mongo';
import User from '../../../models/User';

const bcrypt = require('bcryptjs');

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { username, password } = req.body;
        console.log(req.body);
        const hashedPassword = bcrypt.hashSync(password, 10);
        const updatedUser = await User.findOneAndUpdate(
          { username },
          { password: hashedPassword },
        );
        if (!updatedUser) {
          res.status(200).json({
            success: false,
            data: 'Failed to update password.',
          });
        } else {
          res.status(200).json({
            success: true,
            data: 'Updated password!',
          });
        }
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
