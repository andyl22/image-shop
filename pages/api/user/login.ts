import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utilities/mongo";
import User from "../../../models/User";
const bcrypt = require("bcryptjs");

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
  const foundUser = await User.findOne({username: username});
  if(!foundUser) {
    res.status(200).json({ success: false, data: "Invalid username or password." });
  } else if(bcrypt.compareSync(password, foundUser.password)) {
    res.status(200).json({ success: true })
  } else {
    res.status(200).json({ success: false, data: "Invalid username or password." });
  }
}