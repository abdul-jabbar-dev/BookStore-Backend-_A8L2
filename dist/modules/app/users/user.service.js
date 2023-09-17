"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDB = exports.ResetPasswordDB = exports.DeleteUserDB = exports.UpdateUserDB = exports.GetAUserDB = exports.GetProfileDB = exports.GetUserDB = exports.CreateUserDB = void 0;
const db_1 = __importDefault(require("../../../db"));
const hashPass_1 = __importStar(require("../../../utils/bcrypt/hashPass"));
const generateToken_1 = __importDefault(require("../../../utils/jwt/generateToken"));
const config_1 = __importDefault(require("../../../config/config"));
const CreateUserDB = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { password } = _a, userInfo = __rest(_a, ["password"]);
    let user;
    const session = yield db_1.default.$transaction((prismaDb) => __awaiter(void 0, void 0, void 0, function* () {
        user = yield prismaDb.user.create({ data: userInfo }).catch((err) => {
            throw err;
        });
        if (!user) {
            throw new Error("User create failed");
        }
        else {
            const hashPassword = yield (0, hashPass_1.default)(password);
            const setCredential = yield prismaDb.credential.create({
                data: {
                    email: user.email,
                    password: hashPassword,
                    userId: user.id,
                    accessToken: (0, generateToken_1.default)({
                        email: user.email,
                        role: user.role,
                        id: user.id,
                    }, config_1.default.accessTokenExpire),
                    refreshToken: (0, generateToken_1.default)({
                        email: user.email,
                        role: user.role,
                        id: user.id,
                    }, config_1.default.refreshTokenExpire),
                },
            });
            if (!setCredential) {
                throw new Error("User create failed with credential");
            }
        }
    }));
    if (!user) {
        throw new Error("User create failed");
    }
    else {
        return user;
    }
});
exports.CreateUserDB = CreateUserDB;
const GetUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.user.findMany();
    return { data: result };
});
exports.GetUserDB = GetUserDB;
const GetProfileDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.user.findUnique({ where: { id: user.id } });
    if (!result) {
        throw new Error("User not found");
    }
    else {
        return result;
    }
});
exports.GetProfileDB = GetProfileDB;
const GetAUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.user.findUnique({
        where: { id },
    });
    if (!result) {
        throw new Error("data not found");
    }
    return result;
});
exports.GetAUserDB = GetAUserDB;
const UpdateUserDB = (userData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield db_1.default.user.update({
        where: { id: userId },
        data: userData,
    });
    return update;
});
exports.UpdateUserDB = UpdateUserDB;
const DeleteUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    try {
        yield db_1.default.$transaction((aDb) => __awaiter(void 0, void 0, void 0, function* () {
            let cre = yield aDb.credential
                .delete({ where: { userId: id } })
                .catch((err) => {
                throw err;
            });
            if (!cre) {
                throw new Error("User not remove");
            }
            result = yield aDb.user.delete({ where: { id } });
        }));
        if (!result) {
            throw new Error("User not remove");
        }
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.DeleteUserDB = DeleteUserDB;
const ResetPasswordDB = (userInfo, newPassword, oldPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const userCredential = yield db_1.default.credential.findUnique({
        where: { userId: userInfo.id },
    });
    const isPasswordMatch = yield (0, hashPass_1.verifyPass)(userCredential === null || userCredential === void 0 ? void 0 : userCredential.password, oldPassword);
    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }
    else {
        const encodedPass = yield (0, hashPass_1.default)(newPassword);
        if (!encodedPass) {
            throw new Error("Internal server error! Try again");
        }
        else {
            yield db_1.default.credential
                .update({
                where: { userId: userInfo.id },
                data: { password: encodedPass },
            })
                .catch((err) => {
                throw err;
            });
        }
    }
});
exports.ResetPasswordDB = ResetPasswordDB;
const LoginUserDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        throw new Error("Invalid Email address");
    }
    const userCredential = yield db_1.default.credential.findUnique({
        where: { userId: user.id },
    });
    if (!userCredential) {
        throw new Error("Internal server error");
    }
    const isPasswordMatch = (0, hashPass_1.verifyPass)(userCredential.password, data.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid Password");
    }
    const updatedTokens = yield db_1.default.credential.update({
        where: { userId: user.id },
        data: {
            accessToken: (0, generateToken_1.default)({
                id: user.id,
                email: user.email,
                role: user.role,
            }, config_1.default.accessTokenExpire),
            refreshToken: (0, generateToken_1.default)({
                id: user.id,
                email: user.email,
                role: user.role,
            }, config_1.default.refreshTokenExpire),
        },
    });
    if (!updatedTokens) {
        throw new Error("Internal server error");
    }
    return Object.assign(Object.assign({}, updatedTokens), { password: undefined });
});
exports.LoginUserDB = LoginUserDB;
