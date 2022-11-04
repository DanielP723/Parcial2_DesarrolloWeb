"use strict";
exports.__esModule = true;
var express_1 = require("express");
var MongoController_1 = require("../controller/MongoController");
var MongoRoute = /** @class */ (function () {
    function MongoRoute() {
        var _this = this;
        this.config = function () {
            _this.router.get('/products', _this.controller.getProducts);
            _this.router.post('/search', _this.controller.searchProducts);
            _this.router.post('/filter', _this.controller.filterPriceProducts);
        };
        this.router = (0, express_1.Router)();
        this.controller = new MongoController_1["default"]();
        this.config();
    }
    return MongoRoute;
}());
exports["default"] = MongoRoute;
