// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveUserFullname } from "@/lib/db/services/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  statusCode: number;
  status: boolean;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await retrieveUserFullname(req.query.id! as string);
  if (data) {
    res.status(200).json({ status: true, statusCode: 200, data: data });
  } else {
    res.status(400).json({ status: false, statusCode: 400, data: data });
  }
}
