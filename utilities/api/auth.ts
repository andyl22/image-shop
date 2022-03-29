import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");
const Cookies = require("cookies");

type Data = {
  success: boolean;
  data?: any;
  userInfo?: { username: string, id: string };
};

function setLoginTokens(
  payload: { username: string, id: string },
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  genAndSetAuthToken(payload, req, res);
  genAndSetRefreshToken(payload, req, res);
}

function refreshAuth(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const reqCookies = req.cookies;
  if (reqCookies.refreshToken) {
    const decodedToken = jwt.decode(reqCookies.refreshToken);
    const userInfo = { username: decodedToken.username, id: decodedToken.id }
    genAndSetAuthToken(userInfo, req, res);
    return true;
  } else {
    return false;
  }
}

function genAndSetAuthToken(
  payload: { username: string, id: string },
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authToken = jwt.sign(payload, process.env.SECRET);
  const cookies = new Cookies(req, res);
  cookies.set("authToken", authToken, { httpOnly: true, maxAge: 3600000 });
}

function genAndSetRefreshToken(
  payload: { username: string, id: string },
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const refreshToken = jwt.sign(payload, process.env.SECRET);
  const cookies = new Cookies(req, res);
  cookies.set("refreshToken", refreshToken, { httpOnly: true, maxAge: 86400000 });
}

export { setLoginTokens, genAndSetAuthToken, refreshAuth };
export type { Data };
