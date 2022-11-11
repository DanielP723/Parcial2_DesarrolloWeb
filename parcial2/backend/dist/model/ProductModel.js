"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBC_1 = __importDefault(require("../DB/mongo/MongoDBC"));
class ProductModel {
    constructor() {
        this.getProducts = (fn) => __awaiter(this, void 0, void 0, function* () {
            this.MongoDBC.connection();
            const products = yield this.MongoDBC.ProductSchema.find();
            fn(products);
        });
        this.searchProducts = (query, fn) => __awaiter(this, void 0, void 0, function* () {
            this.MongoDBC.connection();
            const products = yield this.MongoDBC.ProductSchema.find({ name: new RegExp(query, 'i') });
            fn(products);
        });
        this.filterPriceProducts = (min, max, fn) => __awaiter(this, void 0, void 0, function* () {
            this.MongoDBC.connection();
            const products = yield this.MongoDBC.ProductSchema.find({ price: { $gte: min, $lte: max } });
            fn(products);
        });
        this.showFavorites = (ids, fn) => __awaiter(this, void 0, void 0, function* () {
            this.MongoDBC.connection();
            let allIds = ids.map((x) => x.id_product);
            const products = yield this.MongoDBC.ProductSchema.find({ ID: { $in: allIds } });
            fn(products);
        });
        this.getProductById = (id, fn) => __awaiter(this, void 0, void 0, function* () {
            this.MongoDBC.connection();
            const products = yield this.MongoDBC.ProductSchema.find({ ID: id });
            fn(products);
        });
        this.MongoDBC = new MongoDBC_1.default();
    }
}
exports.default = ProductModel;
