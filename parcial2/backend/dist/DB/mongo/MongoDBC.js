"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema_1 = __importDefault(require("./schemas/ProductSchema"));
const dotenv_1 = __importDefault(require("dotenv"));
class MongoDBC {
    constructor() {
        this.dbName = 'parcialWEB';
        this.colletion = 'productos';
        dotenv_1.default.config();
        this.uri = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPass}@cluster0.a87koto.mongodb.net/${process.env.mongoDBName}?retryWrites=true&w=majority`;
        this.ProductSchema = ProductSchema_1.default;
    }
    connection() {
        mongoose_1.default.connect(this.uri)
            .then(() => { console.log('DB: Mongo connection'); })
            .catch((err) => { console.log('Error connecting MongoDB: ', err); });
    }
}
exports.default = MongoDBC;
