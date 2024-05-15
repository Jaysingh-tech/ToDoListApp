/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const KEY = "todolistappauthentication";

const returnResponse = (
  status: number,
  data: any,
  headerConfig?: HeadersInit
) =>
  NextResponse.json(data, {
    status,
    headers: { ...headerConfig }
  });

export const GET = async (req: Request) => {
  const data: any = req.headers.get("Authorization")?.split(" ")[1];
  try {
    const decode: any = jwt.verify(data, KEY);
    const email = decode?.email;
    const client = await clientPromise;
    const db = client.db("todolist");
    const users = await db.collection("users").find({ email }).toArray();
    if (!users.length) {
      return returnResponse(400, {
        message: `User not found`
      });
    }
    const { password, ...user } = users[0];
    console.log("user", user);
    return returnResponse(200, {
      profile: user
    });
  } catch (error: any) {
    return returnResponse(401, {
      message: "Unauthorized user"
    });
  }
};
