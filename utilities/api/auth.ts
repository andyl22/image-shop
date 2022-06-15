import type { NextApiRequest, NextApiResponse } from 'next';

const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

type Data = {
  success: boolean;
  data?: any;
  userInfo?: { username: string; id: string };
};

function genAndSetAuthToken(
  payload: { username: string; id: string },
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const authToken = jwt.sign(payload, process.env.SECRET);
  const cookies = new Cookies(req, res);
  cookies.set('authToken', authToken, {
    httpOnly: true,
    maxAge: 3600000,
  });
}

function genAndSetRefreshToken(
  payload: { username: string; id: string },
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const refreshToken = jwt.sign(payload, process.env.SECRET);
  const cookies = new Cookies(req, res);
  cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 86400000,
  });
}

function genUserCookies(
  username: string,
  id: string,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = new Cookies(req, res);
  cookies.set('user', JSON.stringify({ username, id }), {
    httpOnly: false,
    maxAge: 86400000,
  });
}

function setUserTokens(
  payload: { username: string; id: string },
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  genAndSetAuthToken(payload, req, res);
  genAndSetRefreshToken(payload, req, res);
  genUserCookies(payload.username, payload.id, req, res);
}

function refreshAuth(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const reqCookies = req.cookies;
  const { username, id } = jwt.decode(reqCookies.refreshToken);
  const userInfo = { username, id };
  genAndSetAuthToken(userInfo, req, res);
  genUserCookies(username, id, req, res);
}

export { setUserTokens, genAndSetAuthToken, refreshAuth };
export type { Data };
