import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from "../../../utilities/api/auth";
import authMiddleware from "../../../utilities/api/middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    authMiddleware(() => {console.log("test")}, req, res);
  } catch (e) {
    console.error(e);
    res.status(200).json({success: e});
  }
}