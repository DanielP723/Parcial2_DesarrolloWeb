"use strict";
exports.__esModule = true;
var ProductModel_1 = require("../model/ProductModel");
var MongoController = /** @class */ (function () {
    function MongoController() {
        var _this = this;
        this.getProducts = function (req, res) {
            _this.model.getProducts(function (products) {
                res.json(products);
            });
        };
        this.searchProducts = function (req, res) {
            _this.model.searchProducts(req.body.query, function (products) {
                res.json(products);
            });
        };
        this.filterPriceProducts = function (req, res) {
            _this.model.filterPriceProducts(req.body.min, req.body.max, function (products) {
                res.json(products);
            });
        };
        this.model = new ProductModel_1["default"]();
    }
    return MongoController;
}());
exports["default"] = MongoController;
