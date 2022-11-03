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
Object.defineProperty(exports, "__esModule", { value: true });
class MongoDBC {
    constructor() {
        this.mongoose = require('mongoose');
        this.dbName = 'parcialWEB';
        this.colletion = 'productos';
        this.config = () => __awaiter(this, void 0, void 0, function* () {
            let user = 'parcialWEB';
            let pass = 'upbbga2021';
            const URI = `mongodb+srv://${user}:${pass}@cluster0.a87koto.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
            try {
                let bolean = yield this.mongoose.connect(URI);
                if (bolean) {
                    console.log('DB is connected');
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.config();
    }
}
exports.default = MongoDBC;
