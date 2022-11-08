import mysql, { Pool } from "mysql";

export default class MysqlDBC {

    public pool: Pool;

    constructor() {
        this.pool = mysql.createPool(
            {
                connectionLimit: parseInt(process.env.DBCONNLIMIT || '10'),
                host: process.env.DBHOST,
                port: parseInt(process.env.DBPORT || '3306'),
                user: process.env.DBUSER,
                password: process.env.DBPASSWD,
                database: process.env.DBNAME,
                debug: false
            }
        );        
    }

    public connection = () => {
        this.pool.getConnection((err, connection) => { 
            if (err) throw err;
            connection.release();
            console.info('DB: pool connection');
        });
    }

    public statement(statement: string, data: string[]) {
        return mysql.format(statement, data);        
    }

}