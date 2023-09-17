"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, popery) => {
    const response = {
        message: popery.message,
        success: popery.success,
        data: popery.data,
        meta: popery.meta,
    };
    res.send(response);
};
exports.default = sendResponse;
