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
exports.GetAOrder = exports.GetOrder = exports.CreateOrder = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/Response/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const order_service_1 = require("./order.service");
exports.CreateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { orderedBooks } = req.body;
    const result = yield (0, order_service_1.CreateOrderDB)(user.id, orderedBooks);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Order created successfully",
    });
}));
exports.GetOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield (0, order_service_1.GetOrderDB)(user);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
    });
}));
exports.GetAOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const orderId = req.params.orderId;
    const result = yield (0, order_service_1.GetAOrderDB)(user, orderId);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
    });
}));
// export const UpdateOrder = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const updatedData: Partial<Order> = req.body;
//   const result = await UpdateOrderDB(id, updatedData);
//   sendResponse(res, {
//     data: result,
//     success: true,
//     statusCode: 200,
//     message: "Order updated successfully",
//   });
// });
// export const DeleteOrder = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const result = await DeleteOrderDB(id);
//   sendResponse(res, {
//     data: result,
//     success: true,
//     statusCode: 200,
//     message: "Order deleted successfully",
//   });
// });
