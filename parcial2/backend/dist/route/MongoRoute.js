"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MongoController_1 = __importDefault(require("../controller/MongoController"));
class MongoRoute {
    constructor() {
        this.config = () => {
            this.router.get('/products', this.controller.getProducts);
            this.router.post('/search', this.controller.searchProducts);
            this.router.post('/filter', this.controller.filterPriceProducts);
            this.router.post('/getProductsById', this.controller.getProductsById);
            this.router.post('/getCart', this.controller.getProductsCart);
            this.router.post('/getProductById', this.controller.getProductById);
        };
        this.router = (0, express_1.Router)();
        this.controller = new MongoController_1.default();
        this.config();
    }
}
exports.default = MongoRoute;
