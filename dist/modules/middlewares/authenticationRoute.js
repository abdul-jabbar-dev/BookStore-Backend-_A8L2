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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../../db"));
const authenticationRoute = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (token && typeof token === "undefined") {
        next(new Error("Token must be provided"));
    }
    if (token && token.includes("Bearer")) {
        token = token.split(" ")[1];
    }
    if (!token) {
        next(new Error("Token must be provided"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "string") {
            next(new Error("Invalid Token"));
        }
        else {
            if (decoded.role === "admin") {
                decoded.role = "Admin";
            }
            else if (decoded.role === "customer") {
                decoded.role = "Customer";
            }
            if (role === null || role === void 0 ? void 0 : role.includes(decoded.role)) {
                const user = yield db_1.default.user.findUnique({ where: { id: decoded.id } });
                if (!user) {
                    next(new Error("Invalid Token"));
                }
                else {
                    req.user = user;
                    next();
                }
            }
            else {
                next(new Error("Unauthorized user"));
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = authenticationRoute;
