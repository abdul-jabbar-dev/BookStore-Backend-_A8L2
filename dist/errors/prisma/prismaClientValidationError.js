"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClientValidationError = (err) => {
    let error = {
        message: "",
        name: "",
        path: [{ message: "", path: "" }],
    };
    if (err.message.includes("missing")) {
        const errString = err.message.split("Argument")[1].split("`");
        error.message = errString[1] + errString[2];
        error.name = "Missing Property";
        error.path = [{ message: errString[1] + errString[2], path: errString[1] }];
    }
    else if (err.message.includes("Invalid value for argument")) {
        const errString = err.message.split("argument")[1].split("`");
        error.message = errString[1] + errString[2];
        error.name = "Invalid property type";
        error.path = [{ message: errString[1] + errString[2], path: errString[1] }];
    }
    else {
        error.message = err.message;
        error.name = err.name;
    }
    return error;
};
exports.default = prismaClientValidationError;
