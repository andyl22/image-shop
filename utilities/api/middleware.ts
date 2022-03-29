import { NextApiRequest, NextApiResponse } from "next";
import { refreshAuth } from "./auth";
const jwt = require("jsonwebtoken");

export default function middleware(
  fn: any,
  req: NextApiRequest,
  res: NextApiResponse
) {
  // refresh if no auth token found
  if (req.cookies.refreshToken && !req.cookies.authToken) {
    const isValid = verifyRefreshToken(req.cookies.refreshToken, req, res);
    if(isValid) refreshAuth(req, res);
  } else if (req.cookies.authToken) {
    jwt.verify(
      req.cookies.authToken,
      process.env.SECRET,
      function (err: any, decoded: any) {
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
    res
      .status(200)
      .json({
        success: false,
        data: "No auth/refresh token found. Try relogging.",
      });
  }
}

function verifyRefreshToken(refreshToken: any, req: NextApiRequest, res: NextApiResponse) {
  try {
    jwt.verify(
      refreshToken,
      process.env.SECRET)
    return true;
  } catch (e) {
    return false;
  }
}
