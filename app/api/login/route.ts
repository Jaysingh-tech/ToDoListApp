import { createHash } from "node:crypto";

import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const KEY: Secret | GetPublicKeyOrSecret | any = process.env.API_SECRATE_KEY;

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
  const email = data?.email;
  const password = data?.password;
  if (!email || !password) {
    return returnResponse(400, {
      message: `${!email ? "Email" : "Password"} is not given`,
      error: { field: !email ? "email" : "password" }
    });
  }
  try {
    const client = await clientPromise;
    const db = client.db("todolist");
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return returnResponse(400, {
        message: `User not found`,
        error: {
          field: "email"
        }
      });
    }
    const guess_hash = createHash("sha256").update(password).digest("hex");
    if (guess_hash === user.password || user.password === password) {
      await db
        .collection("users")
        .updateOne({ _id: user._id }, { $set: { ...user, isAuth: true } });
      const updated = await db.collection("users").findOne({ _id: user._id });
      return returnResponse(200, {
        profile: { ...updated },
        token: jwt.sign(
          {
            email: updated.email,
            name: `${updated?.firstName} ${updated?.lastName}`,
            _id: updated?._id,
            role: updated.role
          },
          KEY
        )
      });
    }
  } catch (error) {
    console.log("error", error);
    return returnResponse(500, {
      message: error
    });
  }
  return returnResponse(400, {
    message: "Incorrect password",
    error: {
      field: "password"
    }
  });
};
