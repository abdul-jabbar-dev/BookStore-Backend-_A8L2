import { Router } from "express";
import {
  CreateUser,
  DeleteUser,
  GetAUser,
  GetUser,
  UpdateUser,
} from "./user.controller";

const userRoute = Router();
userRoute.get("/", GetUser);
userRoute.get("/:id", GetAUser);
userRoute.post("/", CreateUser);
userRoute.delete("/:id", DeleteUser);
userRoute.put("/:id", UpdateUser);
export default userRoute;
