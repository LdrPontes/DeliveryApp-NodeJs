"use strict";Object.defineProperty(exports, "__esModule", {value: true});class AppError {
    

    

    

    constructor(statusCode = 400, statusName , message) {
        this.status = statusCode;
        this.name = statusName
        this.message = message;

    }
}

exports. default = AppError;