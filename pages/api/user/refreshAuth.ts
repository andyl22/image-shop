import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from "../../../utilities/api/auth";
import authMiddleware from "../_middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  authMiddleware(() => console.log("test"), req, res);
  res.status(200).json({success: true});
}