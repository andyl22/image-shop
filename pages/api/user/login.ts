import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utilities/mongo";
import User from "../../../models/User";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cookies = require("cookies");

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = req.body;
  await dbConnect();
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    res.status(200).json({ success: false, data: "Invalid credentials." });
  } else if (bcrypt.compareSync(password, foundUser.password)) {
    generateAndSetAuthTokens({ username: username }, req, res);
    res.status(200).json({ success: true, data: foundUser.id });
  } else {
    res.status(200).json({ success: false, data: "Invalid credentials." });
  }
}

function generateAndSetAuthTokens(
  payload: { username: any },
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authToken = jwt.sign(payload, process.env.SECRET);
  const refreshToken = jwt.sign(payload, process.env.SECRET);
  const cookies = new Cookies(req, res);
  cookies.set("authToken", authToken, { httpOnly: true, maxAge: 3600000 });
  cookies.set("refreshToken", refreshToken, { httpOnly: true, maxAge: 86400000 });
}
