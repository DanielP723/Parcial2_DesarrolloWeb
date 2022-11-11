"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
class MongoController {
    constructor() {
        this.getProducts = (req, res) => {
            this.model.getProducts((products) => {
                res.json(products);
            });
        };
        this.searchProducts = (req, res) => {
            this.model.searchProducts(req.body.query, (products) => {
                res.json(products);
            });
        };
        this.filterPriceProducts = (req, res) => {
            this.model.filterPriceProducts(req.body.min, req.body.max, (products) => {
                res.json(products);
            });
        };
        this.getProductsById = (req, res) => {
            let ids = req.body.ids;
            if (ids && ids.length > 0) {
                this.model.showFavorites(ids, (products) => {
                    res.json(products);
                });
            }
        };
        this.getProductById = (req, res) => {
            let id = req.body.id;
            if (id && id > 0) {
                this.model.getProductById(id, (products) => {
                    res.json(products);
                });
            }
        };
        this.getProductsCart = (req, res) => {
            let ids = req.body.ids;
            if (ids && ids.length > 0) {
                this.model.showFavorites(ids, (products) => {
                    res.json(products);
                });
            }
        };
        this.model = new ProductModel_1.default();
    }
}
exports.default = MongoController;
