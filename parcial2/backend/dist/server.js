"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const MongoRoute_1 = __importDefault(require("./route/MongoRoute"));
const MysqlRoute_1 = __importDefault(require("./route/MysqlRoute"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.route = () => {
            this.backend.use('/api/mongo', this.mongoRouter.router);
            this.backend.use('/api/mysql', this.mysqlRouter.router);
        };
        this.mongoRouter = new MongoRoute_1.default();
        this.mysqlRouter = new MysqlRoute_1.default();
        this.backend = (0, express_1.default)();
        this.config();
        this.route();
    }
    config() {
        this.backend.set('port', process.env.PORT || 3000);
        this.backend.use((0, express_1.json)());
        this.backend.use(express_1.default.static(path_1.default.resolve('../frontend/public')));
    }
    start() {
        this.backend.listen(this.backend.get('port'), () => {
            console.log(`Server on port ${this.backend.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
