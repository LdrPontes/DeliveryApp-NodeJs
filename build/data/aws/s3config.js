"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.default = (function () {
    aws_sdk_1.default.config.update({
        accessKeyId: 'AKIA4T34T4UNKT2YIUK6',
        secretAccessKey: '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'
    });
    return new aws_sdk_1.default.S3();
});
//# sourceMappingURL=s3config.js.map