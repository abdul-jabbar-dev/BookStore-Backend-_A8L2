import { Book, Prisma } from "@prisma/client";
import sendResponse from "../../../utils/Response/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import {
  CreateBookDB,
  DeleteBookDB,
  GetABookDB,
  GetBookDB,
  UpdateBookDB,
} from "./book.service";
import { TFilter, TPagination, TSort } from "./book.type";

export const GetBook = catchAsync(async (req, res) => {
  const {
    page,
    size,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    category,
    search,
  } = req.query;

  const pagination: TPagination = {
    page: page ? parseInt(page as string) : 1,
    size: size ? parseInt(size as string) : 10,
    skip: 0,
  };
  pagination.skip = (pagination.page - 1) * pagination.size;
  const sort: TSort = {
    sortBy: (sortBy as string) || "createdAt",
    sortOrder: (sortOrder as Prisma.SortOrder) || Prisma.SortOrder.asc,
  };
  const filter: TFilter = {
    minPrice: minPrice ? parseInt(minPrice as string) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
    category: category?.toString(),
    search: search?.toString(),
  };
  const result = await GetBookDB(pagination, sort, filter);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Book fetched successfully",
  });
});

export const CreateBook = catchAsync(async (req, res) => {
  const book: Book = req.body;
  const result = await CreateBookDB(book);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Book created successfully",
  });
});

export const GetABook = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await GetABookDB(id);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Books fetched successfully",
  });
});
export const UpdateBook = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData: Partial<Book> = req.body;
  const result = await UpdateBookDB(id, updatedData);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Book updated successfully",
  });
});
export const DeleteBook = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DeleteBookDB(id);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Book deleted successfully",
  });
});
