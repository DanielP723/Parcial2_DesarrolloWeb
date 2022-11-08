import MysqlDBC from "../DB/mysql/MysqlDBC";
import bcrypt from 'bcryptjs';

export default class MysqlModel {

    private mysqlDBC: MysqlDBC;

    constructor() {
        this.mysqlDBC = new MysqlDBC();
    }

    public addUser = async (email: string, password: string, name: string, surname: string, fn: Function) => {
        let passwordEncrypt = await bcrypt.hash(password, 8);
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`INSERT INTO ??(??, ??, ??, ??) VALUES ('${email}', '${name}', '${surname}', '${passwordEncrypt}')`, 
        ['users', 'email', 'name', 'surname', 'password']);
        this.mysqlDBC.pool.query(statament, (error: any, rows: any) => {
            fn(error, rows);
        });
    }

    public searchUser(email: string, fn: Function){
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ?? LIKE '${email}';`, 
        ['users', 'email']);
        this.mysqlDBC.pool.query(statament, (error: any, rows: any) => {
            fn(error, rows);
        });
    }

    public showFavorites(email: string, fn: Function){
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ??  LIKE '${email}';`, 
        ['favorites', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error: any, rows: any) => {
            fn(error, rows);
        });
    }

    public searchFavorites(id: number, email: string, fn: Function){
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`SELECT * FROM ?? WHERE ??  = ${id} AND ?? LIKE '${email}';`, 
        ['favorites', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error: any, rows: any) => {
            fn(error, rows);
        });
    }

    public deleteFavorites(id: number, email: string, fn: Function){
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`DELETE FROM ?? WHERE ?? = ${id} AND ?? LIKE '${email}';`, 
        ['favorites', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error: any, rows: any) => {
            fn(error, rows);
        });
    }

    public addFavorites(id: number, email: string, fn: Function){
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement(`INSERT INTO ??(??, ??) VALUES (${id}, '${email}');`, 
        ['favorites', 'id_product', 'email_user']);
        this.mysqlDBC.pool.query(statament, (error: any, rows: any) => {
            fn(error, rows);
        });
    }
}