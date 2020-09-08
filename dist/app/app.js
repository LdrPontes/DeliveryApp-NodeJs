"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../data/database/database'); var _database2 = _interopRequireDefault(_database);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
require('express-async-errors');
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _youch = require('youch'); var _youch2 = _interopRequireDefault(_youch);
var _node = require('@sentry/node'); var Sentry = _interopRequireWildcard(_node);
var _sentry = require('./config/sentry'); var _sentry2 = _interopRequireDefault(_sentry);
require('reflect-metadata');
var _AppError = require('../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);

class App {
     __init() {this.express = _express2.default.application}

     constructor() {;App.prototype.__init.call(this);
        this.express = _express2.default.call(void 0, )

        this.configs()
        this.middlewares()
        this.database()
        this.routes()
        this.exceptionHandler()
    }

     middlewares() {
        this.express.use(_bodyparser2.default.json({
            limit: '50mb'
        }))
        this.express.use(_bodyparser2.default.urlencoded({
            limit: '50mb',
            parameterLimit: 50000,
            extended: true
        }))
        this.express.use(Sentry.Handlers.requestHandler())
        this.express.use(_express2.default.json())
        this.express.use(_cors2.default.call(void 0, ));
      
    }

     async database() {
        _database2.default.call(void 0, ).then(async connection => {
            console.log("TypeORM connection success")
        }).catch(error => {
            console.log("Type " + error.type)
            throw new (0, _AppError2.default)(500, "TypeORM connection error: ", error)

        })
    }


     routes() {
        this.express.use(_routes2.default)
        this.express.use(Sentry.Handlers.errorHandler())
    }

     configs() {
        Sentry.init(_sentry2.default)

        _dotenv2.default.config({
            path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env"
        })
    }

     exceptionHandler() {
        this.express.use(async (err, req, res, next) => {
            console.log(err)
            const errors = await new (0, _youch2.default)(err, req)

            return res.status(500).json(errors)
        })
    }
}

exports. default = new App().express