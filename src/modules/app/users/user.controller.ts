import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { CreateUserDB, GetAUserDB, GetUserDB } from "./user.service";
import { User } from "@prisma/client";
import sendResponse from "../../../utils/Response/sendResponse";
import { TSendData } from "../../../types/Response/sendResponse";

export const GetUser: RequestHandler = catchAsync(async (req, res) => {
  const result: TSendData<User[]> = await GetUserDB();
  sendResponse(res, {
    message: "User retrieve successfully",
    success: true,
    statusCode: 200,
    meta: result.meta,
    data: result.data,
  });
});

export const GetAUser: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  const result: User = await GetAUserDB(id);
  sendResponse(res, {
    message: "User retrieve successfully",
    success: true,
    statusCode: 200,
    data: result,
  });
});

export const CreateUser: RequestHandler = catchAsync(async (req, res) => {
  const data: User = req.body;
  const result: User = await CreateUserDB(data);
  sendResponse(res, {
    message: "User create successfully",
    success: true,
    data: result,
    statusCode: 200,
  });
});

export const UpdateUser = () => {};
export const DeleteUser = () => {};
