"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
var typeorm_1 = require("typeorm");
var Errors = /** @class */ (function () {
    function Errors() {
    }
    Errors.prototype.isQueryError = function (error) {
        if (error instanceof typeorm_1.QueryFailedError
            || error instanceof EntityNotFoundError_1.EntityNotFoundError) {
            return true;
        }
        return false;
    };
    return Errors;
}());
exports.default = new Errors();
//# sourceMappingURL=Errors.js.map