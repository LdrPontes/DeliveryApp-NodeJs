"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeleteOptionalUseCase_1 = require("../../domain/usecases/optional/DeleteOptionalUseCase");
var ReadOptionalUseCase_1 = require("../../domain/usecases/optional/ReadOptionalUseCase");
var SaveOptionalUseCase_1 = require("../../domain/usecases/optional/SaveOptionalUseCase");
var UpdateOptionalUseCase_1 = require("../../domain/usecases/optional/UpdateOptionalUseCase");
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../domain/utils/AppError"));
var Errors_1 = __importDefault(require("../utils/Errors"));
var TextFormat_1 = __importDefault(require("../utils/TextFormat"));
var OptionalController = /** @class */ (function () {
    function OptionalController() {
        this.saveOptionalUseCase = new SaveOptionalUseCase_1.SaveOptionalUseCase();
        this.readOptionalUseCase = new ReadOptionalUseCase_1.ReadOptionalUseCase();
        this.updateOptionalUseCase = new UpdateOptionalUseCase_1.UpdateOptionalUseCase();
        this.deleteOptionalUseCase = new DeleteOptionalUseCase_1.DeleteOptionalUseCase();
    }
    OptionalController.prototype.save = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, _a, name, price, enterprise_id, section_id, optional, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            name: Yup.string().required(),
                            price: Yup.number().required(),
                            enterprise_id: Yup.number().required().integer(),
                            section_id: Yup.number().integer(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        _a = req.body, name = _a.name, price = _a.price, enterprise_id = _a.enterprise_id, section_id = _a.section_id;
                        return [4 /*yield*/, this.saveOptionalUseCase.execute(new SaveOptionalUseCase_1.SaveOptionalParams(name, price, enterprise_id, section_id))];
                    case 2:
                        optional = (_b.sent()).optional;
                        return [2 /*return*/, res.json(optional)];
                    case 3:
                        error_1 = _b.sent();
                        if (Errors_1.default.isQueryError(error_1)) {
                            console.log(error_1);
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_1.name), error_1.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_1.name), error_1.message))];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OptionalController.prototype.read = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, id, optional, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            id: Yup.number().integer().required()
                        });
                        return [4 /*yield*/, schema.isValid(req.params)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        id = req.params.id;
                        return [4 /*yield*/, this.readOptionalUseCase.execute(new ReadOptionalUseCase_1.ReadOptionalParams(Number(id)))];
                    case 2:
                        optional = (_a.sent()).optional;
                        return [2 /*return*/, res.json(optional)];
                    case 3:
                        error_2 = _a.sent();
                        if (Errors_1.default.isQueryError(error_2)) {
                            console.log(error_2);
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_2.name), error_2.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_2.name), error_2.message))];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OptionalController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, _a, id, name, price, section_id, optional, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            name: Yup.string(),
                            price: Yup.number(),
                            id: Yup.number().required().integer(),
                            section_id: Yup.number().integer(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        _a = req.body, id = _a.id, name = _a.name, price = _a.price, section_id = _a.section_id;
                        return [4 /*yield*/, this.updateOptionalUseCase.execute(new UpdateOptionalUseCase_1.UpdateOptionalParams(id, name, price, section_id))];
                    case 2:
                        optional = (_b.sent()).optional;
                        return [2 /*return*/, res.json(optional)];
                    case 3:
                        error_3 = _b.sent();
                        if (Errors_1.default.isQueryError(error_3)) {
                            console.log(error_3);
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_3.name), error_3.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_3.name), error_3.message))];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OptionalController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, id, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            id: Yup.number().integer().required()
                        });
                        return [4 /*yield*/, schema.isValid(req.params)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        id = req.params.id;
                        return [4 /*yield*/, this.deleteOptionalUseCase.execute(new DeleteOptionalUseCase_1.DeleteOptionalParams(Number(id)))];
                    case 2:
                        result = (_a.sent()).success;
                        return [2 /*return*/, res.status(result ? 200 : 400).json({
                                status: result ? 200 : 400,
                                name: result ? 'ENTITY_DELETED' : 'ENTITY_NOT_FOUND',
                                success: result
                            })];
                    case 3:
                        error_4 = _a.sent();
                        if (Errors_1.default.isQueryError(error_4)) {
                            console.log(error_4);
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_4.name), error_4.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_4.name), error_4.message))];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OptionalController;
}());
var optionalController = new OptionalController();
exports.default = optionalController;
//# sourceMappingURL=OptionalController.js.map