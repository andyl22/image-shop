import { NextApiRequest, NextApiResponse } from "next";
import { refreshAuth } from "./auth";
const jwt = require("jsonwebtoken");

export default async function middleware(
  fn: any,
  req: NextApiRequest,
  res: NextApiResponse
) {
  // refresh if no auth token found
  if (req.cookies.refreshToken && !req.cookies.authToken) {
    jwt.verify(
      req.cookies.refreshToken,
      process.env.SECRET,
      function (err: any, decoded: any) {
        if (err) throw "Invalid refresh token";
        if (decoded) {
          if (!req.cookies.authToken && req.cookies.refreshToken) {
            refreshAuth(req, res);
          }
        }
      }
    );
  } else 

  if (req.cookies.authToken) {
    jwt.verify(
      req.cookies.authToken,
      process.env.SECRET,
      function (err, decoded) {
        if (err) {
          res
            .status(200)
            .json({ success: false, data: "Could not verify the auth token." });
        }
        if (decoded) {
          fn();
          res.status(200).json({ success: true, data: decoded });
        }
      }
    );
  } else {
    res.status(200).json({ success: false, data: "No auth/refresh token found. Try relogging."})
  }
}
