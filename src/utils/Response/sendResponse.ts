import { Response } from "express";
import TSendResponse from "../../types/Response/sendResponse";

const sendResponse = <T>(res: Response, popery: TSendResponse<T>) => {
  const response: TSendResponse<T> = {
    message: popery.message,
    success: popery.success,
    data: popery.data,
    meta: popery.meta,
  };
  res.send(response);
};

export default sendResponse;
