import type { NextApiRequest, NextApiResponse } from 'next';
import type { Data } from '../../../utilities/api/auth';

const Cookies = require('cookies');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const cookies = new Cookies(req, res);
  cookies.set('authToken', '', { httpOnly: true, maxAge: 1 });
  cookies.set('refreshToken', '', { httpOnly: true, maxAge: 1 });
  res.status(200).json({ success: true });
}
