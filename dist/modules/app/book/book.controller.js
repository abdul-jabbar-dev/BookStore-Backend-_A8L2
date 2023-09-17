"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksByCategoryId = exports.DeleteBook = exports.UpdateBook = exports.GetABook = exports.CreateBook = exports.GetBook = void 0;
const client_1 = require("@prisma/client");
const sendResponse_1 = __importDefault(require("../../../utils/Response/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const book_service_1 = require("./book.service");
exports.GetBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, sortBy, sortOrder, minPrice, maxPrice, category, search, } = req.query;
    const pagination = {
        page: page ? parseInt(page) : 1,
        size: size ? parseInt(size) : 10,
        skip: 0,
    };
    pagination.skip = (pagination.page - 1) * pagination.size;
    const sort = {
        sortBy: sortBy || "createdAt",
        sortOrder: sortOrder || client_1.Prisma.SortOrder.asc,
    };
    const filter = {
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        category: category === null || category === void 0 ? void 0 : category.toString(),
        search: search === null || search === void 0 ? void 0 : search.toString(),
    };
    const result = yield (0, book_service_1.GetBookDB)(pagination, sort, filter);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Book fetched successfully",
    });
}));
exports.CreateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    const result = yield (0, book_service_1.CreateBookDB)(book);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Book created successfully",
    });
}));
exports.GetABook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, book_service_1.GetABookDB)(id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Books fetched successfully",
    });
}));
exports.UpdateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield (0, book_service_1.UpdateBookDB)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Book updated successfully",
    });
}));
exports.DeleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, book_service_1.DeleteBookDB)(id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Book deleted successfully",
    });
}));
exports.BooksByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const pagination = {
        page: page ? parseInt(page) : 1,
        size: size ? parseInt(size) : 10,
        skip: 0,
    };
    pagination.skip = (pagination.page - 1) * pagination.size;
    const categoryId = req.params.categoryId;
    const result = yield (0, book_service_1.BooksByCategoryIdDB)(categoryId, pagination);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Books with associated category data fetched successfully",
        data: result.data,
        meta: result.meta,
        statusCode: 200,
    });
}));
