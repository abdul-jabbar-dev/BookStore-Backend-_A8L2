"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClientKnownRequestError = (err) => {
    var _a;
    let error = {
        message: err.message,
        name: err.name,
        path: [{ message: "", path: "" }],
    };
    if (err.code === "P2002") {
        const path = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target;
        error.path = path === null || path === void 0 ? void 0 : path.map((p) => ({
            path: p,
            message: p + " is already exist",
        }));
        error.name = "Duplicate Entries";
        error.message = path ? path.join(", ") + " duplicate Entries" : err.name;
    }
    else if (err.code === "P2025") {
        error.name = "Data not exist";
        error.message = err.meta.cause;
    }
    else if (err.code === "P2003") {
        // console.log(error)
    }
    return error;
};
exports.default = prismaClientKnownRequestError;
