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
exports.GetAOrderDB = exports.GetOrderDB = exports.CreateOrderDB = void 0;
const db_1 = __importDefault(require("../../../db"));
const CreateOrderDB = (id, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let order;
        yield db_1.default.$transaction((asyncDB) => __awaiter(void 0, void 0, void 0, function* () {
            const existOrder = yield asyncDB.order.create({ data: { userId: id } });
            if (!existOrder) {
                throw new Error("Invalid User");
            }
            else {
                order = existOrder;
                for (let i = 0; i < orderedBooks.length; i++) {
                    const element = orderedBooks[i];
                    const makeOrderList = yield asyncDB.orderedBook.create({
                        data: {
                            quantity: element.quantity,
                            bookId: element.bookId,
                            orderId: existOrder.id,
                        },
                    });
                    if (!makeOrderList) {
                        throw new Error(element.bookId + " book Create failed ");
                    }
                }
            }
        }));
        let succeed = yield db_1.default.order.findUnique({
            where: { id: order.id },
            include: { orderedBookId: { select: { quantity: true, bookId: true } } },
        });
        return succeed;
    }
    catch (error) {
        throw error;
    }
});
exports.CreateOrderDB = CreateOrderDB;
const GetOrderDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user.role === "Customer") {
        result = yield db_1.default.order.findMany({
            where: { userId: user.id },
        });
    }
    else {
        result = yield db_1.default.order.findMany();
    }
    return result;
});
exports.GetOrderDB = GetOrderDB;
const GetAOrderDB = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user.role === "Customer") {
        result = yield db_1.default.order.findMany({
            where: { userId: user.id, id: orderId },
        });
        if (!result) {
            throw new Error("Try to valid order id");
        }
    }
    else {
        result = yield db_1.default.order.findMany({
            where: { id: orderId },
        });
    }
    return result;
});
exports.GetAOrderDB = GetAOrderDB;
// export const UpdateOrderDB = async (id: string, data: Partial<Order>) => {
//   const result = await db.order.update({
//     where: { id },
//     data,
//   });
//   return result;
// };
// export const DeleteOrderDB = async (id: string) => {
//   const result = await db.order.delete({ where: { id } });
//   return result;
// };
