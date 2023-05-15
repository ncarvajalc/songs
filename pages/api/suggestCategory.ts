// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: "success" | "error";
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //Disike category
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
  const DB_NAME = process.env.DB_NAME || "test";

  try {
    const uri = MONGO_URI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    const database = client.db(DB_NAME);
    const collection = database.collection("suggestions");
    try {
      const result = await collection.insertOne(req.body);
      res.status(200).json({ status: "success", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", result: error });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", result: error });
  }
}
