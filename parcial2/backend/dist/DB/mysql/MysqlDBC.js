"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MysqlDBC {
    constructor() {
        this.connection = () => {
            this.pool.getConnection((err, connection) => {
                if (err)
                    throw err;
                connection.release();
                console.info('DB: pool connection');
            });
        };
        this.pool = mysql_1.default.createPool({
            connectionLimit: parseInt(process.env.DBCONNLIMIT || '10'),
            host: process.env.DBHOST,
            port: parseInt(process.env.DBPORT || '3306'),
            user: process.env.DBUSER,
            password: process.env.DBPASSWD,
            database: process.env.DBNAME,
            debug: false
        });
    }
    statement(statement, data) {
        return mysql_1.default.format(statement, data);
    }
}
exports.default = MysqlDBC;
