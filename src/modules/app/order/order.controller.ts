import { Order } from "@prisma/client";
import db from "../../../db";
import sendResponse from "../../../utils/Response/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import {
  CreateOrderDB,
  // DeleteOrderDB,
  // GetAOrderDB,
  // GetOrderDB,
  // UpdateOrderDB,
} from "./order.service";

export const CreateOrder = catchAsync(async (req, res) => {
  const user = req.user!;
  const {orderedBooks} = req.body; 
  const result = await CreateOrderDB(user.id, orderedBooks);
 
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Order created successfully",
  });
});
// export const GetOrder = catchAsync(async (req, res) => {
//   const user = req.user
//   const result = await GetOrderDB(user!.id);
//   sendResponse(res, {
//     data: result,
//     success: true,
//     statusCode: 200,
//     message: "Categories fetched successfully",
//   });
// });
// export const GetAOrder = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const result = await GetAOrderDB(id);
//   sendResponse(res, {
//     data: result,
//     success: true,
//     statusCode: 200,
//     message: "Categories fetched successfully",
//   });
// });
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
