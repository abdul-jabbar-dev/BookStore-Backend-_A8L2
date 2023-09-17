import { Router } from "express";
import {
  CreateUser,
  DeleteUser,
  GetAUser,
  GetUser,
  UpdateUser,
  ResetPassword,
  LoginUser,
  GetProfile,
} from "./user.controller";
import authenticationRoute from "../../middlewares/authenticationRoute";

const userRoute = Router();
const authRoute = Router();



// user route
userRoute.get("/", authenticationRoute(["Admin"]), GetUser);
userRoute.get(
  "/profile",
  authenticationRoute(["Admin", "Customer"]),
  GetProfile
);
userRoute.get("/:id", authenticationRoute(["Admin"]), GetAUser);
userRoute.delete("/:id", authenticationRoute(["Admin"]), DeleteUser);
userRoute.patch("/:id", authenticationRoute(["Admin"]), UpdateUser);




// auth route
authRoute.post("/signup", CreateUser);
authRoute.post("/signin", LoginUser);

authRoute.patch(
  "/reset_password",
  authenticationRoute(["Admin", "Customer"]),
  ResetPassword
); //extra

export { authRoute };
export default userRoute;
