import { Book } from "@prisma/client";
import db from "../../../db";
import { TFilter, TPagination, TSort } from "./book.type";
import { TSendData } from "../../../types/Response/sendResponse";

export const CreateBookDB = async (booksInfo: Book): Promise<Book> => {
  const result = await db.book.create({ data: booksInfo });
  return result;
};
export const GetBookDB = async (
  pagination: TPagination,
  sort: TSort,
  filter: TFilter
): Promise<TSendData<Book[]>> => {
  let searcher: Record<string, unknown> = {};
  if (filter.maxPrice || filter.minPrice) {
    searcher.AND = [
      { price: { gte: filter.minPrice } },
      { price: { lte: filter.maxPrice } },
    ];
  }
  if (filter.search) {
    searcher.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { genre: { contains: filter.search, mode: "insensitive" } },
      { author: { contains: filter.search, mode: "insensitive" } },
    ];
  }
  const result = await db.book.findMany({
    where: searcher,
    orderBy: { [sort.sortBy]: sort.sortOrder },
    take: pagination.size,
    skip: pagination.skip,
  });

  const count = await db.book.count();
  return {
    meta: {
      total: count,
      page: pagination.page,
      size: pagination.size,
      totalPage: result.length,
    },
    data: result,
  };
};
export const GetABookDB = async (id: string) => {
  const result = await db.book.findUnique({
    where: { id },
    include: { category: true, reviewAndRating: true },
  });
  return result;
};
export const UpdateBookDB = async (id: string, data: Partial<Book>) => {
  const result = await db.book.update({
    where: { id },
    data,
  });
  return result;
};
export const DeleteBookDB = async (id: string) => {
  const result = await db.book.delete({ where: { id } });
  return result;
};
export const BooksByCategoryIdDB = async (
  id: string,
  pagination: TPagination
): Promise<TSendData<Book[]>> => {
  const result = await db.book.findMany({
    where: { categoryId: id },
    take: pagination.size,
    skip: pagination.skip,
  });
  if (!result) {
    throw new Error("Books not found");
  } else {
    const count = await db.book.findMany({
      where: { categoryId: id },
    });
    return {
      meta: {
        total: count.length,
        page: pagination.page,
        size: pagination.size,
        totalPage: result.length,
      },
      data: result,
    };
  }
};
