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
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../domain/utils/AppError"));
var Errors_1 = __importDefault(require("../utils/Errors"));
var TextFormat_1 = __importDefault(require("../utils/TextFormat"));
var SaveEnterpriseUseCase_1 = require("../../domain/usecases/enterprise/SaveEnterpriseUseCase");
var ReadEnterpriseUseCase_1 = require("../../domain/usecases/enterprise/ReadEnterpriseUseCase");
var UpdateEnterpriseUseCase_1 = require("../../domain/usecases/enterprise/UpdateEnterpriseUseCase");
var DeleteEnterpriseUseCase_1 = require("../../domain/usecases/enterprise/DeleteEnterpriseUseCase");
var UploadImageUseCase_1 = require("../../domain/usecases/image/UploadImageUseCase");
var uuid_1 = require("uuid");
var cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
var UpdateEntepriseSettingsUseCase_1 = require("../../domain/usecases/enterprise/UpdateEntepriseSettingsUseCase");
var UpdateCatalogUseCase_1 = require("../../domain/usecases/enterprise/UpdateCatalogUseCase");
var EnterpriseController = /** @class */ (function () {
    function EnterpriseController() {
        this.saveEnterpriseUseCase = new SaveEnterpriseUseCase_1.SaveEnterpriseUseCase();
        this.readEnterpriseUseCase = new ReadEnterpriseUseCase_1.ReadEnterpriseUseCase();
        this.updateEnterpriseUseCase = new UpdateEnterpriseUseCase_1.UpdateEnterpriseUseCase();
        this.updateEnterpriseSettingsUseCase = new UpdateEntepriseSettingsUseCase_1.UpdateEnterpriseSettingsUseCase();
        this.updateEnterpriseCatalogUseCase = new UpdateCatalogUseCase_1.UpdateEnterpriseCatalogUseCase();
        this.deleteEnterpriseUseCase = new DeleteEnterpriseUseCase_1.DeleteEnterpriseUseCase();
        this.uploadImageUseCase = new UploadImageUseCase_1.UploadImageUseCase();
    }
    EnterpriseController.prototype.save = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, _a, name, document_type, document, address, img, img_type, enterprise_id, category_id, logo_url, optional, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        schema = Yup.object().shape({
                            name: Yup.string().required(),
                            document_type: Yup.number().required(),
                            document: Yup.string().required(),
                            img: Yup.string(),
                            img_type: Yup.string(),
                            address: Yup.string().required(),
                            category_id: Yup.number().required().integer(),
                            enterprise_id: Yup.number().required().integer(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        _a = req.body, name = _a.name, document_type = _a.document_type, document = _a.document, address = _a.address, img = _a.img, img_type = _a.img_type, enterprise_id = _a.enterprise_id, category_id = _a.category_id;
                        //Valida o documento
                        if (document_type == 0) { //CPF
                            if (!cpf_cnpj_validator_1.cpf.isValid(document)) {
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore('INVALID_DOCUMENT'), 'This document (CPF) is not valid'))];
                            }
                        }
                        else { //CNPJ
                            if (!cpf_cnpj_validator_1.cnpj.isValid(document)) {
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore('INVALID_DOCUMENT'), 'This document (CNPJ) is not valid'))];
                            }
                        }
                        logo_url = '';
                        if (!(img != null && img_type != null && img != "" && img_type != "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.uploadImageUseCase.execute(new UploadImageUseCase_1.UploadImageParams(uuid_1.v4(), img, img_type))];
                    case 2:
                        logo_url = (_b.sent()).url;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.saveEnterpriseUseCase.execute(new SaveEnterpriseUseCase_1.SaveEnterpriseParams(name, document_type, document, address, logo_url, enterprise_id, category_id))];
                    case 4:
                        optional = (_b.sent()).enterprise;
                        return [2 /*return*/, res.json(optional)];
                    case 5:
                        error_1 = _b.sent();
                        if (Errors_1.default.isQueryError(error_1)) {
                            if (error_1.message.includes('ER_DUP_ENTRY'))
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'ER_DUP_ENTRY', error_1.message))];
                            else
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_1.name), error_1.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_1.name), error_1.message))];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseController.prototype.read = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, id, enterprise, error_2;
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
                        return [4 /*yield*/, this.readEnterpriseUseCase.execute(new ReadEnterpriseUseCase_1.ReadEnterpriseParams(Number(id)))];
                    case 2:
                        enterprise = (_a.sent()).enterprise;
                        return [2 /*return*/, res.json(enterprise)];
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
    EnterpriseController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, _a, id, name, address, img, img_type, category_id, logo_url, enterprise, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        schema = Yup.object().shape({
                            name: Yup.string(),
                            img: Yup.string(),
                            img_type: Yup.string(),
                            address: Yup.string(),
                            id: Yup.number().required().integer(),
                            category_id: Yup.number().integer(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        _a = req.body, id = _a.id, name = _a.name, address = _a.address, img = _a.img, img_type = _a.img_type, category_id = _a.category_id;
                        logo_url = '';
                        if (!(img != null && img_type != null && img != "" && img_type != "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.uploadImageUseCase.execute(new UploadImageUseCase_1.UploadImageParams(uuid_1.v4(), img, img_type))];
                    case 2:
                        logo_url = (_b.sent()).url;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.updateEnterpriseUseCase.execute(new UpdateEnterpriseUseCase_1.UpdateEnterpriseParams(id, name, address, logo_url, category_id))];
                    case 4:
                        enterprise = (_b.sent()).enterprise;
                        return [2 /*return*/, res.json(enterprise)];
                    case 5:
                        error_3 = _b.sent();
                        if (Errors_1.default.isQueryError(error_3)) {
                            if (error_3.message.includes('ER_DUP_ENTRY'))
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'ER_DUP_ENTRY', error_3.message))];
                            else
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_3.name), error_3.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_3.name), error_3.message))];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseController.prototype.updateSettings = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, _a, id, settings, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            id: Yup.number().required().integer(),
                            settings: Yup.object().required(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        _a = req.body, id = _a.id, settings = _a.settings;
                        return [4 /*yield*/, this.updateEnterpriseSettingsUseCase.execute(new UpdateEntepriseSettingsUseCase_1.UpdateEnterpriseSettingsParams(id, settings))];
                    case 2:
                        result = (_b.sent()).success;
                        return [2 /*return*/, res.status(result ? 200 : 400).json({
                                status: result ? 200 : 400,
                                name: result ? 'ENTERPRISE_SETTINGS_UPDATED' : 'ENTITY_NOT_FOUND',
                                success: result
                            })];
                    case 3:
                        error_4 = _b.sent();
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
    EnterpriseController.prototype.updateCatalog = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, _a, id, catalog, code, result, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            id: Yup.number().required().integer(),
                            catalog: Yup.object().required(),
                            code: Yup.string().required(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'INVALID_PARAMETERS', 'Invalid params for request'))];
                        }
                        _a = req.body, id = _a.id, catalog = _a.catalog, code = _a.code;
                        return [4 /*yield*/, this.updateEnterpriseCatalogUseCase.execute(new UpdateCatalogUseCase_1.UpdateEnterpriseCatalogParams(id, catalog, code))];
                    case 2:
                        result = (_b.sent()).success;
                        return [2 /*return*/, res.status(result ? 200 : 400).json({
                                status: result ? 200 : 400,
                                name: result ? 'ENTERPRISE_CATALOG_UPDATED' : 'ENTITY_NOT_FOUND',
                                success: result
                            })];
                    case 3:
                        error_5 = _b.sent();
                        if (Errors_1.default.isQueryError(error_5)) {
                            if (error_5.message.includes('ER_DUP_ENTRY'))
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, 'ER_DUP_ENTRY', error_5.message))];
                            else
                                return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_5.name), error_5.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_5.name), error_5.message))];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, id, result, error_6;
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
                        return [4 /*yield*/, this.deleteEnterpriseUseCase.execute(new DeleteEnterpriseUseCase_1.DeleteEnterpriseParams(Number(id)))];
                    case 2:
                        result = (_a.sent()).success;
                        return [2 /*return*/, res.status(result ? 200 : 400).json({
                                status: result ? 200 : 400,
                                name: result ? 'ENTITY_DELETED' : 'ENTITY_NOT_FOUND',
                                success: result
                            })];
                    case 3:
                        error_6 = _a.sent();
                        if (Errors_1.default.isQueryError(error_6)) {
                            console.log(error_6);
                            return [2 /*return*/, res.status(400).json(new AppError_1.default(400, TextFormat_1.default.camelToUnderscore(error_6.name), error_6.message))];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json(new AppError_1.default(500, TextFormat_1.default.camelToUnderscore(error_6.name), error_6.message))];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return EnterpriseController;
}());
var enterpriseController = new EnterpriseController();
exports.default = enterpriseController;
//# sourceMappingURL=EnterpriseController.js.map