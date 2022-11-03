"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBC_1 = __importDefault(require("DB/MongoDBC"));
const server = new MongoDBC_1.default();
server.start();
