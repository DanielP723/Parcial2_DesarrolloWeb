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
const MysqlDBC_1 = __importDefault(require("../DB/mysql/MysqlDBC"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class MysqlModel {
    constructor() {
        this.addUser = (email, password, name, surname, fn) => __awaiter(this, void 0, void 0, function* () {
            let passwordEncrypt = yield bcryptjs_1.default.hash(password, 8);
            this.mysqlDBC.connection();
            const statament = this.mysqlDBC.statement(`INSERT INTO ??(??, ??, ??, ??) VALUES ('${email}', '${name}', '${surname}', '${passwordEncrypt}')`, ['users', 'email', 'name', 'surname', 'password']);
            this.mysqlDBC.pool.query(statament, (error, rows) => {
                fn(error, rows);
            });
        });
        this.mysqlDBC = new MysqlDBC_1.default();
    }
    searchUser(email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ?? LIKE '${email}';`, ['users', 'email']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    showFavorites(email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ??  LIKE '${email}';`, ['favorites', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    searchCart(id, email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ??  = ${id} AND ?? LIKE '${email}';`, ['cart', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    insertToCart(id, email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`INSERT INTO ??(??,??,??) VALUES(${id}, 1, '${email}');`, ['cart', 'id_product', 'amount', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    addToCart(id, amount, email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`CALL ??(${id}, ${amount} ,'${email}');`, ['addAmountCart']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    getCartId(email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ?? LIKE '${email}';`, ['cart', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    searchFavorites(id, email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ??  = ${id} AND ?? LIKE '${email}';`, ['favorites', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    deleteFavorites(id, email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`DELETE FROM ?? WHERE ?? = ${id} AND ?? LIKE '${email}';`, ['favorites', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    addFavorites(id, email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`INSERT INTO ??(??, ??) VALUES (${id}, '${email}');`, ['favorites', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    makeOrder(email, totalPrice, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`CALL ??('${email}', ${totalPrice});`, ['makeOrder']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
    deleteProductCart(id, email, fn) {
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`DELETE FROM ?? WHERE ?? = ${id} AND ?? LIKE '${email}';`, ['cart', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error, rows) => {
            fn(error, rows);
        });
    }
}
exports.default = MysqlModel;
