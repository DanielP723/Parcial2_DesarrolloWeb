"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ProductSchema_1 = require("./schemas/ProductSchema");
var dotenv_1 = require("dotenv");
var MongoDBC = /** @class */ (function () {
    function MongoDBC() {
        this.dbName = 'parcialWEB';
        this.colletion = 'productos';
        dotenv_1["default"].config();
        this.uri = "mongodb+srv://".concat(process.env.mongoUser, ":").concat(process.env.mongoPass, "@cluster0.a87koto.mongodb.net/").concat(process.env.mongoDBName, "?retryWrites=true&w=majority");
        this.ProductSchema = ProductSchema_1["default"];
    }
    MongoDBC.prototype.connection = function () {
        mongoose_1["default"].connect(this.uri)
            .then(function () { console.log('DB: Mongo connection'); })["catch"](function (err) { console.log('Error connecting MongoDB: ', err); });
    };
    return MongoDBC;
}());
exports["default"] = MongoDBC;
