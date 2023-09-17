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
exports.DeleteCategoryDB = exports.UpdateCategoryDB = exports.GetACategoryDB = exports.GetCategoryDB = exports.CreateCategoryDB = void 0;
const db_1 = __importDefault(require("../../../db"));
const CreateCategoryDB = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.category.create({ data: { title } });
    return result;
});
exports.CreateCategoryDB = CreateCategoryDB;
const GetCategoryDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.category.findMany();
    return result;
});
exports.GetCategoryDB = GetCategoryDB;
const GetACategoryDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.category.findUnique({
        where: { id },
        include: { books: true },
    });
    return result;
});
exports.GetACategoryDB = GetACategoryDB;
const UpdateCategoryDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.category.update({
        where: { id },
        data,
    });
    return result;
});
exports.UpdateCategoryDB = UpdateCategoryDB;
const DeleteCategoryDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.category.delete({ where: { id } });
    return result;
});
exports.DeleteCategoryDB = DeleteCategoryDB;
