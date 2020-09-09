"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(statusCode, statusName, message) {
        if (statusCode === void 0) { statusCode = 400; }
        this.status = statusCode;
        this.name = statusName;
        this.message = message;
    }
    return AppError;
}());
exports.default = AppError;
//# sourceMappingURL=AppError.js.map