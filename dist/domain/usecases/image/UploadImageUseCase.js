"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _ImageRepository = require('../../../data/repositories/ImageRepository');

 class UploadImageUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UploadImageUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _ImageRepository.ImageRespository)()}

    async buildUseCase(params) {

        const response = await this.repository.save(params.name, params.base64, params.img_type)

        return new UploadImageResponse(response)
    }

} exports.UploadImageUseCase = UploadImageUseCase;

 class UploadImageResponse {
    

    constructor(url) {
        this.url = url
    }
} exports.UploadImageResponse = UploadImageResponse;

 class UploadImageParams {
    
    
    

    constructor(name, base64, img_type) {
        this.name = name
        this.base64 = base64
        this.img_type = img_type
    }
} exports.UploadImageParams = UploadImageParams;