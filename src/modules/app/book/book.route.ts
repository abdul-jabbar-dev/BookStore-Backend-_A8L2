import { Router } from "express";
import {
  CreateBook,
  DeleteBook,
  GetABook,
  GetBook,
  UpdateBook,
} from "./book.controller";
import authenticationRoute from "../../middlewares/authenticationRoute";

const bookRoute = Router();

bookRoute.post(
  "/create-book",
  authenticationRoute(["Admin"]),
  CreateBook
);
bookRoute.get("/", GetBook);
bookRoute.get("/:id", GetABook);
bookRoute.put("/:id", authenticationRoute(["Admin"]), UpdateBook);
bookRoute.delete("/:id", authenticationRoute(["Admin"]), DeleteBook);
export default bookRoute;
