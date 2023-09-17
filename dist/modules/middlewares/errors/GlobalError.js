"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClientValidationError_1 = __importDefault(require("../../../errors/prisma/prismaClientValidationError"));
const prismaClientKnownRequestError_1 = __importDefault(require("../../../errors/prisma/prismaClientKnownRequestError"));
const GlobalError = (err, req, res, next) => {
    let error = {
        name: (err === null || err === void 0 ? void 0 : err.name) || "",
        message: (err === null || err === void 0 ? void 0 : err.message) || "",
        success: false,
        path: (err === null || err === void 0 ? void 0 : err.path) || [{ message: "", path: "" }],
        statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 404,
    };
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const { message, name, path } = (0, prismaClientValidationError_1.default)(err);
        error.message = message;
        error.name = name;
        error.path = path;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const { message, name, path } = (0, prismaClientKnownRequestError_1.default)(err);
        error.message = message;
        error.name = name;
        error.path = path;
    }
    res.status(error.statusCode || 404).send(error);
};
exports.default = GlobalError;
