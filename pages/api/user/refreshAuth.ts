import type { NextApiRequest, NextApiResponse } from 'next';
import { Data } from '../../../utilities/api/auth';
import authMiddleware from '../../../utilities/api/middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    authMiddleware(() => {}, req, res);
    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(200).json({ success: false, data: e });
  }
}
