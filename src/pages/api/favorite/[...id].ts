// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFavoriteBlogs } from "@/lib/db/services/favorite";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!id || typeof id === "undefined" || !Array.isArray(id)) {
    return res
      .status(400)
      .json({ status: false, statusCode: 400, data: "Invalid ID" });
  }

  const data = await getFavoriteBlogs(id[0]);
  res.status(200).json({ status: true, statusCode: 200, data: data });
}
