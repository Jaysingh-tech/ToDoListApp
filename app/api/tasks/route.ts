/* eslint-disable no-unused-vars */
import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { ObjectId } from "mongodb";
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
  const data: any = await req.json();
  const header: any = req.headers.get("authorization")?.split(" ")[1];
  try {
    const tokenData: any = jwt.verify(header, KEY);
    try {
      const modifyPayload = {
        ...data,
        assignedUser: new ObjectId(data?.assignedUser || tokenData?._id)
      };
      const client = await clientPromise;
      const db = client.db("todolist");
      const result = await db.collection("tasks").insertOne({
        ...modifyPayload,
        createdAt: new Date().toISOString(),
        createdBy: tokenData?.name,
        updatedAt: new Date().toISOString(),
        updatedBy: tokenData?.name
      });
      const insertedData = await db
        .collection("tasks")
        .findOne({ _id: result?.insertedId });
      const assignUserDetails = await db
        .collection("users")
        .findOne({ _id: new ObjectId(data?.assignedUser || tokenData?._id) });
      console.log("assignUserDetails", assignUserDetails);
      return returnResponse(201, {
        data: { ...insertedData, assignedUser: assignUserDetails },
        message: "Task added successfully"
      });
    } catch (error) {
      console.log("error", error);
      return returnResponse(500, {
        message1: "Something went wrong!"
      });
    }
  } catch (error) {
    return returnResponse(401, {
      message: "Unauthorized"
    });
  }
};

export const GET = async (req: Request) => {
  const token: any = req.headers.get("Authorization")?.split(" ")[1];

  try {
    const decodedToken: any = jwt.verify(token, KEY);
    const currentUserRole = decodedToken?.role;
    console.log("decodedToken", { decodedToken, currentUserRole });
    try {
      const client = await clientPromise;
      const db = client.db("todolist");
      const data = await db
        .collection("tasks")
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "assignedUser",
              foreignField: "_id",
              as: "assignedUser"
            }
          },
          {
            $unwind: "$assignedUser"
          },
          {
            $project: {
              _id: 1,
              taskName: 1,
              description: 1,
              // Include user details in the response
              assignedUser: { _id: 1, firstName: 1, lastName: 1 },
              createdAt: 1,
              createdBy: 1,
              updatedAt: 1,
              updatedBy: 1
            }
          }
        ])
        .toArray();
      const modifiableTasks = data.map((task: any) => {
        // Check if the current user is a super admin
        if (currentUserRole === "superAdmin") {
          return {
            ...task,
            modifiable: true
          };
        }
        // Check if the task is created by the super admin
        else if (task.createdBy === "superAdmin") {
          return {
            ...task,
            modifiable: true
          };
        }
        // Otherwise, the task is not modifiable
        else {
          return {
            ...task,
            modifiable: false
          };
        }
      });
      // if (!data.length) {
      //   return returnResponse(200, {
      //     message: `Tasks not found`
      //   });
      // }
      return returnResponse(200, {
        data: modifiableTasks,
        message: "Tasks retrieved successfully"
      });
    } catch (error) {
      console.log("error", error);
      return returnResponse(500, {
        message: "Something went wrong!"
      });
    }
  } catch (error: any) {
    return returnResponse(401, {
      message: "Unauthorized"
    });
  }
};

export const PUT = async (req: Request) => {
  const { _id, ...data }: any = await req.json();
  const header: any = req.headers.get("authorization")?.split(" ")[1];
  try {
    const tokenData: any = jwt.verify(header, KEY);
    try {
      const client = await clientPromise;
      const db = client.db("todolist");
      const objectId = new ObjectId(_id);
      const modifyPayload = {
        ...data,
        ...(data?.assignedUser && {
          assignedUser: new ObjectId(data?.assignedUser)
        }),
        updatedAt: new Date().toISOString(),
        updatedBy: tokenData?.name
      };
      const updatedData = await db
        .collection("tasks")
        .updateOne({ _id: objectId }, { $set: { ...modifyPayload } });
      if (updatedData?.modifiedCount) {
        const updatedRecord = await db
          .collection("tasks")
          .findOne({ _id: objectId });
        const assignUserDetails = await db
          .collection("users")
          .findOne({ _id: new ObjectId(data?.assignedUser || tokenData?._id) });
        console.log("updatedRecord --> ", updatedRecord);
        return returnResponse(200, {
          data: { ...updatedRecord, assignedUser: assignUserDetails },
          message: "Task updated successfully"
        });
      } else {
        return returnResponse(400, {
          message: "Record not found"
        });
      }
    } catch (error: any) {
      console.log("error", error);
      return returnResponse(500, {
        message: "Something went wrong!"
      });
    }
  } catch (error: any) {
    console.log("error -> ", error);
    return returnResponse(401, {
      message: "Unauthorized"
    });
  }
};

export const DELETE = async (req: Request) => {
  const { id }: any = await req.json();
  const header: any = req.headers.get("Authorization")?.split(" ")[1];
  try {
    jwt.verify(header, KEY);
    try {
      const client = await clientPromise;
      const db = client.db("todolist");
      if (typeof id === "string") {
        const objectId = new ObjectId(id);
        const deletedData = await db
          .collection("tasks")
          .deleteOne({ _id: objectId });
        if (deletedData?.deletedCount) {
          return returnResponse(200, {
            message: "Task deleted successfully"
          });
        } else {
          return returnResponse(400, {
            message: "Task not found"
          });
        }
      } else {
        const objectIds = id?.map((val: string) => new ObjectId(val));
        const deletedData = await db
          .collection("tasks")
          .deleteMany({ _id: { $in: objectIds } });
        if (deletedData?.deletedCount) {
          return returnResponse(204, {
            message: `${deletedData?.deletedCount} tasks are deleted successfully`
          });
        } else {
          return returnResponse(400, {
            message: "Tasks not found"
          });
        }
      }
    } catch (error) {
      console.log("error", error);
      return returnResponse(500, {
        message: "Something went wrong!"
      });
    }
  } catch (error: any) {
    return returnResponse(401, {
      message: "Unauthorized"
    });
  }
};
