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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.resolversUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generateHelper = __importStar(require("../helper/generate"));
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const infoUser = yield user_model_1.default.findOne({
                token: context['user'].token,
                deleted: false,
            });
            if (infoUser) {
                return {
                    code: 200,
                    message: 'Thành công',
                    id: infoUser.id,
                    fullName: infoUser.fullName,
                    email: infoUser.email,
                    token: infoUser.token,
                };
            }
            else {
                return {
                    code: 400,
                    message: 'Thất bại',
                };
            }
        }),
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const emailExist = yield user_model_1.default.findOne({ email: user.email });
            if (emailExist) {
                return {
                    code: 400,
                    message: 'Email đã tồn tại',
                };
            }
            else {
                user.password = (0, md5_1.default)(user.password);
                const newUser = new user_model_1.default({
                    fullName: user.fullName,
                    email: user.email,
                    password: user.password,
                    token: generateHelper.generateRandomString(30),
                });
                const data = yield newUser.save();
                return {
                    code: 200,
                    message: 'tạo tài khoản thành công',
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token,
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const infoUser = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false,
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: 'Email không tồn tại',
                };
            }
            if (infoUser.password != (0, md5_1.default)(user.password)) {
                return {
                    code: 400,
                    message: 'Sai mật khẩu',
                };
            }
            if (infoUser.status === 'inactive') {
                return {
                    code: 400,
                    message: 'Tài khoản đã bị khóa',
                };
            }
            return {
                code: 200,
                message: 'Đăng nhập thành công',
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token,
            };
        }),
    },
};
