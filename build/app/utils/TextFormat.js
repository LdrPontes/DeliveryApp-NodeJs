"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextFormat = /** @class */ (function () {
    function TextFormat() {
    }
    TextFormat.prototype.camelToUnderscore = function (key) {
        if (/[A-Z]/.test(key) && !key.includes('_')) {
            var result = key.slice(1, key.length).replace(/([A-Z])/g, " $1");
            return key[0].toUpperCase() + result.split(' ').join('_').toUpperCase();
        }
        else {
            return key;
        }
    };
    return TextFormat;
}());
var textFormat = new TextFormat();
exports.default = textFormat;
//# sourceMappingURL=TextFormat.js.map