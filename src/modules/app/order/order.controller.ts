import { Order } from "@prisma/client";
import db from "../../../db";
import sendResponse from "../../../utils/Response/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import {
  CreateOrderDB,
  GetOrderDB,
  // DeleteOrderDB,
  GetAOrderDB,
  // UpdateOrderDB,
} from "./order.service";
import { JwtPayload } from "jsonwebtoken";

export const CreateOrder = catchAsync(async (req, res) => {
  const user = req.user!;
  const { orderedBooks } = req.body;
  const result = await CreateOrderDB(user.id, orderedBooks);

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Order created successfully",
  });
});
export const GetOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await GetOrderDB(user as JwtPayload);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Orders retrieved successfully",
  });
});
export const GetAOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const orderId = req.params.orderId;
  const result = await GetAOrderDB(user!, orderId);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Orders retrieved successfully",
  });
});
// export const UpdateOrder = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const updatedData: Partial<Order> = req.body;
//   const result = await UpdateOrderDB(id, updatedData);
//   sendResponse(res, {
//     data: result,
//     success: true,
//     statusCode: 200,
//     message: "Order updated successfully",
//   });
// });
// export const DeleteOrder = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const result = await DeleteOrderDB(id);
//   sendResponse(res, {
//     data: result,
//     success: true,
//     statusCode: 200,
//     message: "Order deleted successfully",
//   });
// });
