import { Router } from "express";
import {
  CreateUser,
  DeleteUser,
  GetAUser,
  GetUser,
  UpdateUser,
  ResetPassword,
  LoginUser,
} from "./user.controller";
import authenticationRoute from "../../middlewares/authenticationRoute";

const userRoute = Router();
const authRoute = Router();

// user route
userRoute.get("/", authenticationRoute(["Admin"]), GetUser);
userRoute.get("/:id", authenticationRoute(["Admin"]), GetAUser);
userRoute.delete("/:id", authenticationRoute(["Admin"]), DeleteUser);
userRoute.put("/:id", authenticationRoute(["Admin"]), UpdateUser);

// auth route
authRoute.post("/signup", CreateUser);
authRoute.put(
  "/reset_password",
  authenticationRoute(["Admin", "Customer"]),
  ResetPassword
);
authRoute.post("/signin", LoginUser);

export { authRoute };
export default userRoute;
