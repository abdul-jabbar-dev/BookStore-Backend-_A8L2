import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import {
  CreateUserDB,
  DeleteUserDB,
  GetAUserDB,
  GetUserDB,
  LoginUserDB,
  ResetPasswordDB,
  GetProfileDB,
  UpdateUserDB,
} from "./user.service";
import { Credential, User } from "@prisma/client";
import sendResponse from "../../../utils/Response/sendResponse";
import { TSendData } from "../../../types/Response/sendResponse";
import { JwtPayload } from "jsonwebtoken";

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
export const GetProfile: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result: User = await GetProfileDB(user!);
  sendResponse(res, {
    message: "User retrieve successfully",
    success: true,
    statusCode: 200,
    data: result,
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
  const data: User & Credential = req.body;
  const result: User = await CreateUserDB(data);
  sendResponse(res, {
    message: "User create successfully",
    success: true,
    data: result,
    statusCode: 200,
  });
});

export const UpdateUser: RequestHandler = catchAsync(async (req, res) => {
  const userData: Partial<Omit<User, "email">> = {
    ...req.body,
    email: undefined,
    id: undefined,
  };
  const userId: string = req.params.id;
  const result = await UpdateUserDB(userData, userId);
  sendResponse(res, {
    message: "User Update successfully",
    success: true,
    data: result,
    statusCode: 200,
  });
});
export const DeleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  const result = await DeleteUserDB(id);
  sendResponse(res, {
    message: "User Delete successfully",
    success: true,
    data: result,
    statusCode: 200,
  });
});
export const ResetPassword: RequestHandler = catchAsync(async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const result = await ResetPasswordDB(
    req.user as JwtPayload,
    newPassword,
    oldPassword
  );

  sendResponse(res, {
    message: "Password Reset successfully",
    success: true,
    data: result,
    statusCode: 200,
  });
});

export const LoginUser: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const result = await LoginUserDB({ email, password });

  res.send({
    message: "User signing successfully!",
    success: true,
    token: result.accessToken,
    statusCode: 200,
  });
});
