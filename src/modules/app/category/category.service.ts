import { Category } from "@prisma/client";
import db from "../../../db";

export const CreateCategoryDB = async (title: string): Promise<Category> => {
  const result = await db.category.create({ data: { title } });
  return result;
};
export const GetCategoryDB = async () => {
  const result = await db.category.findMany();
  return result;
};
export const GetACategoryDB = async (id: string) => {
  const result = await db.category.findUnique({
    where: { id },
    include: { books:true },
  });
  return result;
};
export const UpdateCategoryDB = async (id: string, data: Partial<Category>) => {
  const result = await db.category.update({
    where: { id },
    data,
  });
  return result;
};
export const DeleteCategoryDB = async (id: string) => {
  const result = await db.category.delete({ where: { id } });
  return result;
};
