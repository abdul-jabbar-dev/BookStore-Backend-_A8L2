"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const authenticationRoute_1 = __importDefault(require("../../middlewares/authenticationRoute"));
const bookRoute = (0, express_1.Router)();
bookRoute.post("/create-book", (0, authenticationRoute_1.default)(["Admin"]), book_controller_1.CreateBook);
bookRoute.get("/", book_controller_1.GetBook);
bookRoute.get("/:categoryId/category", book_controller_1.BooksByCategoryId);
bookRoute.get("/:id", book_controller_1.GetABook);
bookRoute.patch("/:id", (0, authenticationRoute_1.default)(["Admin"]), book_controller_1.UpdateBook);
bookRoute.delete("/:id", (0, authenticationRoute_1.default)(["Admin"]), book_controller_1.DeleteBook);
exports.default = bookRoute;
