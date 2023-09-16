import { Router } from "express";
import {
  CreateCategory,
  DeleteCategory,
  GetACategory,
  GetCategory,
  UpdateCategory,
} from "./category.controller";
import authenticationRoute from "../../middlewares/authenticationRoute";

const categoryRoute = Router();

categoryRoute.post(
  "/create-category",
  authenticationRoute(["Admin"]),
  CreateCategory
);
categoryRoute.get("/", GetCategory);
categoryRoute.get("/:id", GetACategory);
categoryRoute.put("/:id", authenticationRoute(["Admin"]), UpdateCategory);
categoryRoute.delete("/:id", authenticationRoute(["Admin"]), DeleteCategory);
export default categoryRoute;
