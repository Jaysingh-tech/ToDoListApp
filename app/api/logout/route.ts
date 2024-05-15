import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const returnResponse = (
  status: number,
  data: any,
  headerConfig?: HeadersInit
) =>
  NextResponse.json(data, {
    status,
    headers: { ...headerConfig }
  });

export const POST = async (req: Request) => {
  const data = await req.json();
  const _id = data?._id;
  try {
    const client = await clientPromise;
    const db = client.db("todolist");
    try {
      const objectId = new ObjectId(_id);
      const user = await db.collection("users").findOne({ _id: objectId });
      if (user) {
        await db
          .collection("users")
          .updateOne({ _id: objectId }, { $set: { isAuth: false } });
        return returnResponse(200, {
          message: "Logout successful"
        });
      }
      return returnResponse(400, {
        message: "User not found"
      });
    } catch (error) {
      console.log("error", error);
      return returnResponse(500, {
        message: error
      });
    }
  } catch (error) {
    console.log("error", error);
    return returnResponse(500, {
      message: error
    });
  }
};
