import TSendError from "../../types/error/sendError";
import { Prisma } from "@prisma/client";
const prismaClientKnownRequestError = (
  err: Prisma.PrismaClientKnownRequestError
): TSendError => {
  let error: TSendError = {
    message: err.message,
    name: err.name,
    path: [{ message: "", path: "" }],
  };

  if (err.code === "P2002") {
    const path = (err.meta as { target: string[] })?.target;
    error.path = path?.map((p) => ({
      path: p,
      message: p + " is already exist",
    }));
    error.name = "Duplicate Entries";
    error.message = path ? path.join(", ") + " duplicate Entries" : err.name;
  } else if (err.code === "P2025") {
    error.name = "Data not exist";
    error.message  = err.meta!.cause as string;
  }
  return error;
};
export default prismaClientKnownRequestError;
