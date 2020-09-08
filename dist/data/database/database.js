"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _typeorm = require('typeorm');

exports. default = async (name = 'default') => {
    const defaultOptions = await _typeorm.getConnectionOptions.call(void 0, );

    return _typeorm.createConnection.call(void 0, 
        Object.assign(defaultOptions, {
            name,
            database: defaultOptions.database,
        }),
    );
};