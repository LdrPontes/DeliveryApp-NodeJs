"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _s3config = require('./../aws/s3config'); var _s3config2 = _interopRequireDefault(_s3config);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);

 class ImageRespository  {
    
    async save(name, base64, img_type) {
        try {


            const response = await (await _s3config2.default.call(void 0, ).upload({
                Bucket: 'go-delivery',
                Key: name + '.' + img_type.replace('image/', ''),
                Body: Buffer.from(base64, 'base64'),
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: img_type
            })).promise()
    

            return response.Location

        } catch (error) {
            throw new (0, _AppError2.default)(500, 'ERROR_UPLOAD_IMAGE', JSON.stringify(error))
        }
      
    }

} exports.ImageRespository = ImageRespository;