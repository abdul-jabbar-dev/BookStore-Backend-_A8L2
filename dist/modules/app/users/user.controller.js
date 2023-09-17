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
exports.LoginUser = exports.ResetPassword = exports.DeleteUser = exports.UpdateUser = exports.CreateUser = exports.GetAUser = exports.GetProfile = exports.GetUser = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../utils/Response/sendResponse"));
exports.GetUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.GetUserDB)();
    (0, sendResponse_1.default)(res, {
        message: "User retrieve successfully",
        success: true,
        statusCode: 200,
        meta: result.meta,
        data: result.data,
    });
}));
exports.GetProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield (0, user_service_1.GetProfileDB)(user);
    (0, sendResponse_1.default)(res, {
        message: "User retrieve successfully",
        success: true,
        statusCode: 200,
        data: result
    });
}));
exports.GetAUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_service_1.GetAUserDB)(id);
    (0, sendResponse_1.default)(res, {
        message: "User retrieve successfully",
        success: true,
        statusCode: 200,
        data: result,
    });
}));
exports.CreateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (0, user_service_1.CreateUserDB)(data);
    (0, sendResponse_1.default)(res, {
        message: "User create successfully",
        success: true,
        data: result,
        statusCode: 200,
    });
}));
exports.UpdateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign(Object.assign({}, req.body), { email: undefined, id: undefined });
    const userId = req.params.id;
    const result = yield (0, user_service_1.UpdateUserDB)(userData, userId);
    (0, sendResponse_1.default)(res, {
        message: "User Update successfully",
        success: true,
        data: result,
        statusCode: 200,
    });
}));
exports.DeleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_service_1.DeleteUserDB)(id);
    (0, sendResponse_1.default)(res, {
        message: "User Delete successfully",
        success: true,
        data: result,
        statusCode: 200,
    });
}));
exports.ResetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, oldPassword } = req.body;
    const result = yield (0, user_service_1.ResetPasswordDB)(req.user, newPassword, oldPassword);
    (0, sendResponse_1.default)(res, {
        message: "Password Reset successfully",
        success: true,
        data: result,
        statusCode: 200,
    });
}));
exports.LoginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield (0, user_service_1.LoginUserDB)({ email, password });
    res.send({
        message: "User signing successfully!",
        success: true,
        token: result.accessToken,
        statusCode: 200,
    });
}));
