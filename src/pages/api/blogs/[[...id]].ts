// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveBlogs, retriveBlogsByUserId } from "@/lib/db/services/blog";
import { retrieveDataById } from "@/lib/db/services/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log(req.query);

  if (req.query.visibility && req.query.userId) {
    const data = await retriveBlogsByUserId(
      req.query.visibility as string,
      req.query.userId as string,
    );
    res.status(200).json({ status: true, statusCode: 200, data: data });
  } else if (req.query.id) {
    const data = await retrieveDataById("blogs", req.query.id[0]);
    res.status(200).json({ status: true, statusCode: 200, data: data });
  } else {
    const data = await retrieveBlogs("public");
    res.status(200).json({ status: true, statusCode: 200, data: data });
  }
}
