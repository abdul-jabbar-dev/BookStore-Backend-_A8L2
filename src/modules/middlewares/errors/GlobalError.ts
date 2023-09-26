import { ErrorRequestHandler } from "express";
import TSendError from "../../../types/error/sendError";
import { Prisma } from "@prisma/client";
import prismaClientValidationError from "../../../errors/prisma/prismaClientValidationError";
import prismaClientKnownRequestError from "../../../errors/prisma/prismaClientKnownRequestError";

const GlobalError: ErrorRequestHandler = (err, req, res, next) => {
  let error: TSendError = {
    name: err?.name || "",
    message: err?.message || "",
    success: false,
    path: err?.path || [{ message: "", path: "" }],
    statusCode: err?.statusCode || 404,
  };  
 console.log(err)
  if (err instanceof Prisma.PrismaClientValidationError) {
    const { message, name, path } = prismaClientValidationError(err);
    error.message = message;
    error.name = name;
    error.path = path;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { message, name, path } = prismaClientKnownRequestError(err);
    error.message = message;
    error.name = name;
    error.path = path;
  }

  res.status(error.statusCode || 404).send(error);
};
export default GlobalError;
