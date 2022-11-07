"use strict";
exports.__esModule = true;
var express_1 = require("express");
var MongoRoute_1 = require("./route/MongoRoute");
var path_1 = require("path");
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this.route = function () {
            _this.backend.use('/api', _this.mongoRouter.router);
        };
        this.mongoRouter = new MongoRoute_1["default"]();
        this.backend = (0, express_1["default"])();
        this.config();
        this.route();
    }
    Server.prototype.config = function () {
        this.backend.set('port', process.env.PORT || 3000);
        this.backend.use((0, express_1.json)());
        this.backend.use(express_1["default"].static(path_1["default"].resolve('../frontend/public')));
    };
    Server.prototype.start = function () {
        var _this = this;
        this.backend.listen(this.backend.get('port'), function () {
            console.log("Server on port ".concat(_this.backend.get('port')));
        });
    };
    return Server;
}());
var server = new Server();
server.start();
