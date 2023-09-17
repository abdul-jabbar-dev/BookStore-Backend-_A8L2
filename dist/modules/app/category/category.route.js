"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const authenticationRoute_1 = __importDefault(require("../../middlewares/authenticationRoute"));
const categoryRoute = (0, express_1.Router)();
categoryRoute.post("/create-category", (0, authenticationRoute_1.default)(["Admin"]), category_controller_1.CreateCategory);
categoryRoute.get("/", category_controller_1.GetCategory);
categoryRoute.get("/:id", category_controller_1.GetACategory);
categoryRoute.patch("/:id", (0, authenticationRoute_1.default)(["Admin"]), category_controller_1.UpdateCategory);
categoryRoute.delete("/:id", (0, authenticationRoute_1.default)(["Admin"]), category_controller_1.DeleteCategory);
exports.default = categoryRoute;
