/* eslint-disable no-unused-vars */
import { createHash } from "crypto";
import { writeFile } from "fs/promises";
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
  const data: any = await req.formData();
  const isEmptyField = [...data.values()].some((val) => val === "");
  console.log("data --> ", isEmptyField);
  try {
    if (!isEmptyField) {
      console.log("Inside....");
      const profileImg = data?.get("profile");
      const username = data?.get("username");
      const fileName = `${profileImg?.name
        ?.replace(/\s/g, "-")
        ?.toLowerCase()}`;
      const filePath = `images/profile-images/${fileName}`;
      const formData: any = {
        firstName: data?.get("firstName"),
        lastName: data?.get("lastName"),
        email: data?.get("email"),
        username: username,
        password: createHash("sha256")
          .update(data?.get("password"))
          .digest("hex"),
        fileName,
        filePath: `http://localhost:3000/${filePath}`
      };

      const client = await clientPromise;
      const db = client.db("todolist");
      try {
        const checkExisting = await db
          .collection("users")
          .findOne({ email: formData?.email });
        console.log("checkExisting", checkExisting);
        if (!checkExisting?._id) {
          console.log("profileImg", profileImg);
          if (profileImg) {
            const bytes = await profileImg.arrayBuffer();
            const buffers = Buffer.from(bytes);
            await writeFile(`public/${filePath}`, buffers);
          } else {
            delete formData.fileName;
            delete formData.filePath;
          }
          await db.collection("users").insertOne({ ...formData, role: "user" });
          const userData = await db
            .collection("users")
            .findOne({ email: formData?.email });

          return returnResponse(201, {
            message: "Sign up successfully",
            profile: { ...userData },
            token: jwt.sign({ email: userData.email, role: userData.role }, KEY)
          });
        }
        return returnResponse(422, {
          message: "Email already exist",
          data: {
            field: "email"
          }
        });
      } catch (error) {
        console.log("error", error);
        return returnResponse(400, {
          message: "Data didn't stored"
        });
      }
    } else {
      console.log("No....");
      let errors = {};
      Object.entries(data).forEach(([key, _]: any) => {
        errors = {
          ...errors,
          [key]: `${key} must required`
        };
      });
      return returnResponse(422, {
        message: "Please fill reqired fields",
        data: {
          field: [...data.keys()].filter((key) => data.get(key) === "")
        }
      });
    }
  } catch (error: any) {
    console.log("error -> ", error);
    return returnResponse(500, {
      message: "Something went wrong"
    });
  }
};
