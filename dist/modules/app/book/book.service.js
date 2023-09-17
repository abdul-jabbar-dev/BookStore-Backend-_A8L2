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
exports.BooksByCategoryIdDB = exports.DeleteBookDB = exports.UpdateBookDB = exports.GetABookDB = exports.GetBookDB = exports.CreateBookDB = void 0;
const db_1 = __importDefault(require("../../../db"));
const CreateBookDB = (booksInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.book.create({ data: booksInfo });
    return result;
});
exports.CreateBookDB = CreateBookDB;
const GetBookDB = (pagination, sort, filter) => __awaiter(void 0, void 0, void 0, function* () {
    let searcher = {};
    if (filter.maxPrice || filter.minPrice) {
        searcher.AND = [
            { price: { gte: filter.minPrice } },
            { price: { lte: filter.maxPrice } },
        ];
    }
    if (filter.search) {
        searcher.OR = [
            { title: { contains: filter.search, mode: "insensitive" } },
            { genre: { contains: filter.search, mode: "insensitive" } },
            { author: { contains: filter.search, mode: "insensitive" } },
        ];
    }
    const result = yield db_1.default.book.findMany({
        where: searcher,
        orderBy: { [sort.sortBy]: sort.sortOrder },
        take: pagination.size,
        skip: pagination.skip,
    });
    const count = yield db_1.default.book.count();
    return {
        meta: {
            total: count,
            page: pagination.page,
            size: pagination.size,
            totalPage: result.length,
        },
        data: result,
    };
});
exports.GetBookDB = GetBookDB;
const GetABookDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.book.findUnique({
        where: { id },
        include: { category: true, reviewAndRating: true },
    });
    return result;
});
exports.GetABookDB = GetABookDB;
const UpdateBookDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.book.update({
        where: { id },
        data,
    });
    return result;
});
exports.UpdateBookDB = UpdateBookDB;
const DeleteBookDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.book.delete({ where: { id } });
    return result;
});
exports.DeleteBookDB = DeleteBookDB;
const BooksByCategoryIdDB = (id, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.book.findMany({
        where: { categoryId: id },
        take: pagination.size,
        skip: pagination.skip,
    });
    if (!result) {
        throw new Error("Books not found");
    }
    else {
        const count = yield db_1.default.book.findMany({
            where: { categoryId: id },
        });
        return {
            meta: {
                total: count.length,
                page: pagination.page,
                size: pagination.size,
                totalPage: result.length,
            },
            data: result,
        };
    }
});
exports.BooksByCategoryIdDB = BooksByCategoryIdDB;
