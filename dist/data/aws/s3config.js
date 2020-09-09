"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);

exports. default = () => {
    _awssdk2.default.config.update({
        accessKeyId: 'AKIA4T34T4UNKT2YIUK6',
        secretAccessKey: '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'
    })

    return new _awssdk2.default.S3()

}