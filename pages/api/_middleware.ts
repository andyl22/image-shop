import { NextApiRequest, NextApiResponse } from "next";
import { refreshAuth } from "../../utilities/api/auth";
const jwt = require("jsonwebtoken");

export default function middleware(
  fn: any, req: NextApiRequest, res: NextApiResponse
) {
  const reqCookies = req.cookies
  // jwt.verify(req.cookies.refreshToken, process.env.SECRET, function (err: any, decoded: any) {
  //   if (err) console.log(err);
  //   if (decoded) {
  //     if (!req.cookies.authToken && req.cookies.refreshToken) {
  //       refreshAuth(req, res);
  //     }
  //   }
  // })
}