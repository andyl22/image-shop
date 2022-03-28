import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utilities/mongo";
import User from "../../../models/User";
const bcrypt = require("bcryptjs");
import { Data, setLoginTokens } from "../../../utilities/api/auth";

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
    setLoginTokens({ username: username, id: foundUser.id }, req, res);
    res.status(200).json({ success: true, data: foundUser.id });
  } else {
    res.status(200).json({ success: false, data: "Invalid credentials." });
  }
}