"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MysqlController_1 = __importDefault(require("../controller/MysqlController"));
class MysqlRoute {
    constructor() {
        this.config = () => {
            this.router.post('/addUser', this.controller.addUser);
            this.router.post('/searchFavorites', this.controller.searchFavorites);
            this.router.post('/signIn', this.controller.signIn);
            this.router.post('/showFavorites', this.controller.showFavorites);
        };
        this.router = (0, express_1.Router)();
        this.controller = new MysqlController_1.default();
        this.config();
    }
}
exports.default = MysqlRoute;
