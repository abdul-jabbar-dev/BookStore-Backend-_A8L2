"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authenticationRoute_1 = __importDefault(require("../../middlewares/authenticationRoute"));
const userRoute = (0, express_1.Router)();
const authRoute = (0, express_1.Router)();
exports.authRoute = authRoute;
// user route
userRoute.get("/", (0, authenticationRoute_1.default)(["Admin"]), user_controller_1.GetUser);
userRoute.get("/profile", (0, authenticationRoute_1.default)(["Admin", "Customer"]), user_controller_1.GetProfile);
userRoute.get("/:id", (0, authenticationRoute_1.default)(["Admin"]), user_controller_1.GetAUser);
userRoute.delete("/:id", (0, authenticationRoute_1.default)(["Admin"]), user_controller_1.DeleteUser);
userRoute.patch("/:id", (0, authenticationRoute_1.default)(["Admin"]), user_controller_1.UpdateUser);
// auth route
authRoute.post("/signup", user_controller_1.CreateUser);
authRoute.post("/signin", user_controller_1.LoginUser);
authRoute.patch("/reset_password", (0, authenticationRoute_1.default)(["Admin", "Customer"]), user_controller_1.ResetPassword); //extra
exports.default = userRoute;
