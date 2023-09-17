import { Router } from "express";
import {
  CreateOrder,
  // DeleteOrder,
  GetAOrder,
  GetOrder,
  // UpdateOrder,
} from "./order.controller";
import authenticationRoute from "../../middlewares/authenticationRoute";

const orderRoute = Router();

orderRoute.post(
  "/create-order",
  authenticationRoute(["Customer"]),
  CreateOrder
);
orderRoute.get("/", authenticationRoute(["Customer", "Admin"]), GetOrder);
orderRoute.get(
  "/:orderId",
  authenticationRoute(["Customer", "Admin"]),
  GetAOrder
);
// orderRoute.patch("/:id", authenticationRoute(["Admin"]), UpdateOrder);
// orderRoute.delete("/:id", authenticationRoute(["Admin"]), DeleteOrder);
export default orderRoute;
