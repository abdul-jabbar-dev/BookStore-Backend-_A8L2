import { Prisma } from "@prisma/client";

export type TFilter = {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  search?: string;
};
export type TSort = {
  sortBy: string;
  sortOrder: Prisma.SortOrder;
};

export type TPagination = {
  page: number;
  size: number;
  skip: number;
};
