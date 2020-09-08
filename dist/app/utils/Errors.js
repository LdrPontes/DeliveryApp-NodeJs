"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _EntityNotFoundError = require('typeorm/error/EntityNotFoundError');
var _typeorm = require('typeorm');

class Errors {
    
    isQueryError(error) {
        if(error instanceof _typeorm.QueryFailedError
        || error instanceof _EntityNotFoundError.EntityNotFoundError){
            return true
        }
        return false
    }
}

exports. default = new Errors()