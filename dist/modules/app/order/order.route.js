"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const authenticationRoute_1 = __importDefault(require("../../middlewares/authenticationRoute"));
const orderRoute = (0, express_1.Router)();
orderRoute.post("/create-order", (0, authenticationRoute_1.default)(["Customer"]), order_controller_1.CreateOrder);
orderRoute.get("/", (0, authenticationRoute_1.default)(["Customer", "Admin"]), order_controller_1.GetOrder);
orderRoute.get("/:orderId", (0, authenticationRoute_1.default)(["Customer", "Admin"]), order_controller_1.GetAOrder);
// orderRoute.patch("/:id", authenticationRoute(["Admin"]), UpdateOrder);
// orderRoute.delete("/:id", authenticationRoute(["Admin"]), DeleteOrder);
exports.default = orderRoute;
