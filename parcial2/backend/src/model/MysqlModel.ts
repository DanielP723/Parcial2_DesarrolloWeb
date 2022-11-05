import MysqlDBC from "../DB/mysql/MysqlDBC";

export default class MysqlModel {

    private mysqlDBC: MysqlDBC;

    constructor() {
        this.mysqlDBC = new MysqlDBC();
    }

    public addUser(email: string, password: string, name: string, surname: string, fn: Function){
        this.mysqlDBC.connection();
        const statament = this.mysqlDBC.statement('INSERT INTO ??(??, ??, ??, ??) VALUES (??, ??, ??, ??)', 
        ['users', 'email', 'name', 'surname', 'password', email, name, surname, password]);
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
    
    public limit = (start: number, step: number): number[] => {
        return this.mysqlDBC.limit(start, step);
    };

    public getMovies = (limit: number[], fn: Function) => {
        this.mysqlDBC.connection();
        const statement = this.mysqlDBC.statement(`SELECT DISTINCT movie.movie_id, title, homepage, overview, popularity, release_date, vote_average, genre_name
        FROM ??, ??, ?? 
        WHERE movie.movie_id = movie_genres.movie_id
        AND movie_genres.genre_id = genre.genre_id
        ORDER BY title ASC LIMIT ${limit[0]},${limit[1]}`, 
        ['movie', 'genre', 'movie_genres']);
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {            
            fn(error, rows);
        });              
    }

    public getMovie = (id: number, fn: Function) => {
        this.mysqlDBC.connection();
        const statement = this.mysqlDBC.statement(`SELECT DISTINCT movie.movie_id, title, homepage, overview, popularity, release_date, vote_average, genre_name
        FROM ??, ??, ?? 
        WHERE movie.movie_id = movie_genres.movie_id
        AND movie_genres.genre_id = genre.genre_id
        AND movie.movie_id = ${id}`, 
        ['movie', 'genre', 'movie_genres']);
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {            
            fn(error, rows);
        });
    }

    public updateTitleMovie = (data: { id: number, title: string }, fn: Function) => {
        this.mysqlDBC.connection();
        const statement = this.mysqlDBC.statement(`UPDATE movie SET movie.title = ? WHERE movie.movie_id = ?`, 
        [data.title, data.id.toString()]);
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {            
            fn(error, rows);
        });
    }
}