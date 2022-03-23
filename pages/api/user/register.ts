// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongo";
import User from "../../../models/User";

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const existingUser = await User.findOne({
          username: req.body.username,
        });
        if (existingUser) {
          res
            .status(200)
            .json({ success: false, data: "The username is taken." });
        } else {
          const user = await User.create(req.body);
          res.status(201).json({ success: true, data: user });
        }
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
