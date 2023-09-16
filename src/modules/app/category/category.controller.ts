import { Category } from "@prisma/client";
import db from "../../../db";
import sendResponse from "../../../utils/Response/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import {
  CreateCategoryDB,
  DeleteCategoryDB,
  GetACategoryDB,
  GetCategoryDB,
  UpdateCategoryDB,
} from "./category.service";

export const CreateCategory = catchAsync(async (req, res) => {
  const { title } = req.body;
  const result = await CreateCategoryDB(title);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Category created successfully",
  });
});
export const GetCategory = catchAsync(async (req, res) => {
  const result = await GetCategoryDB();
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Categories fetched successfully",
  });
});
export const GetACategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await GetACategoryDB(id);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Categories fetched successfully",
  });
});
export const UpdateCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData: Partial<Category> = req.body;
  const result = await UpdateCategoryDB(id, updatedData);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Category updated successfully",
  });
});
export const DeleteCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DeleteCategoryDB(id);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Category deleted successfully",
  });
});
