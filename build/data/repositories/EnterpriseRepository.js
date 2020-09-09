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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseRepository = void 0;
var Enterprise_1 = require("../../domain/entities/Enterprise");
var typeorm_1 = require("typeorm");
var EnterpriseUser_1 = require("../../domain/entities/EnterpriseUser");
var EnterpriseRepository = /** @class */ (function () {
    function EnterpriseRepository() {
    }
    EnterpriseRepository.prototype.save = function (name, document_type, document, address, logo_url, enterprise_id, category_id) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, repositoryUser, enterprise, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        repository = typeorm_1.getRepository(Enterprise_1.Enterprise);
                        repositoryUser = typeorm_1.getRepository(EnterpriseUser_1.EnterpriseUser);
                        enterprise = new Enterprise_1.Enterprise();
                        enterprise.name = name;
                        enterprise.document_type = document_type;
                        enterprise.document = document;
                        enterprise.address = address;
                        enterprise.logo_url = logo_url;
                        enterprise.category_id = category_id;
                        enterprise.enterprise_user_id = enterprise_id;
                        enterprise.code = name.toLowerCase().replace(/[^\w\s]/gi, '').replace(' ', '-');
                        enterprise.settings = JSON.stringify({ "delivery": { "min_price": 0, "free_delivery_above": 0, "free_delivery_above_enabled": false, "delivery_fee_type": 0, "delivery_fee": 0, "delivery_time_start": 30, "delivery_time_end": 60, "pickup_on_site": true }, "enterprise": { "daily_works": [], "ask_cpf": false, "observation_enabled": true, "accept_money": true, "accept_credit_card": true, "accept_debit_card": true } });
                        enterprise.catalog = JSON.stringify({ "color": "#880e4f", "start_msg": "Bem vindo!", "end_msg": "Obrigado pela preferência!" });
                        return [4 /*yield*/, repository.save(enterprise)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, repositoryUser.update(enterprise_id, { enterprise: enterprise })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseRepository.prototype.read = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        repository = typeorm_1.getRepository(Enterprise_1.Enterprise);
                        return [4 /*yield*/, repository.findOneOrFail({ where: { id: id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseRepository.prototype.readByCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, repositoryUser, result, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        repository = typeorm_1.getRepository(Enterprise_1.Enterprise);
                        repositoryUser = typeorm_1.getRepository(EnterpriseUser_1.EnterpriseUser);
                        return [4 /*yield*/, repository.findOneOrFail({
                                where: {
                                    code: code
                                },
                                join: {
                                    alias: "enterprise",
                                    leftJoinAndSelect: {
                                        "product_sections": "enterprise.product_sections",
                                        "products": "product_sections.products",
                                        "optional_sections": "products.optional_sections",
                                        "optionals": "optional_sections.products",
                                    }
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, repositoryUser.findOneOrFail({ where: { id: result.enterprise_user_id }, select: ["telephone"] })];
                    case 2:
                        user = _a.sent();
                        result.user = user;
                        return [2 /*return*/, result];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseRepository.prototype.update = function (id, name, address, logo_url, category_id) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, values, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        repository = typeorm_1.getRepository(Enterprise_1.Enterprise);
                        values = { name: name, address: address, logo_url: logo_url !== '' ? logo_url : undefined, category_id: category_id };
                        return [4 /*yield*/, repository.update(id, JSON.parse(JSON.stringify(values)))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, repository.findOneOrFail({ where: { id: id } })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseRepository.prototype.updateSettings = function (id, settings) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        repository = typeorm_1.getRepository(Enterprise_1.Enterprise);
                        return [4 /*yield*/, repository.update(id, { settings: JSON.stringify(settings) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.affected > 0];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseRepository.prototype.updateCatalog = function (id, catalog, code) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        repository = typeorm_1.getRepository(Enterprise_1.Enterprise);
                        return [4 /*yield*/, repository.update(id, { code: code, catalog: JSON.stringify(catalog) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.affected > 0];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        repository = typeorm_1.getRepository(Enterprise_1.Enterprise);
                        return [4 /*yield*/, repository.delete(id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.affected > 0];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EnterpriseRepository;
}());
exports.EnterpriseRepository = EnterpriseRepository;
//# sourceMappingURL=EnterpriseRepository.js.map