import { Router } from "express";
import {
  BooksByCategoryId,
  CreateBook,
  DeleteBook,
  GetABook,
  GetBook,
  UpdateBook,
} from "./book.controller";
import authenticationRoute from "../../middlewares/authenticationRoute";

const bookRoute = Router();

bookRoute.post("/create-book", authenticationRoute(["Admin"]), CreateBook);
bookRoute.get("/", GetBook);
bookRoute.get("/:categoryId/category", BooksByCategoryId);
bookRoute.get("/:id", GetABook);
bookRoute.patch("/:id", authenticationRoute(["Admin"]), UpdateBook);
bookRoute.delete("/:id", authenticationRoute(["Admin"]), DeleteBook);
export default bookRoute;
