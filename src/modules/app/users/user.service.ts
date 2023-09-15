import db from "../../../db";
import { User } from "@prisma/client";
import { TSendData } from "../../../types/Response/sendResponse";

export const CreateUserDB = async (userInfo: User): Promise<User> => {
  const result = await db.user.create({ data: userInfo });
  return result;
};

export const GetUserDB = async (): Promise<TSendData<User[]>> => {
  const result: User[] = await db.user.findMany();
  return { data: result };
};

export const GetAUserDB = async (id: string): Promise<User> => {
  const result: User | null = await db.user.findUnique({
    where: { id },
  });
  if (!result) {
    throw new Error("data not found");
  }
  return result;
};
export const UpdateUserDB = () => {};
export const DeleteUserDB = () => {};
