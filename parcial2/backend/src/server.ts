import express, { Application, json, urlencoded } from "express";
import MongoRoute from "./route/MongoRoute";
import MysqlRoute from "./route/MysqlRoute";
import path from 'path';

class Server {

    private backend: Application;
    private mongoRouter: MongoRoute;
    private mysqlRouter: MysqlRoute;

    constructor(){
        this.mongoRouter = new MongoRoute();
        this.mysqlRouter = new MysqlRoute();
        this.backend = express();
        this.config();
        this.route();
    }

    private config(){
        this.backend.set('port', process.env.PORT || 3000);
        this.backend.use(json());
        this.backend.use(express.static(path.resolve('../frontend/public')));
    }

    public route = (): void => {
        this.backend.use('/api/mongo', this.mongoRouter.router);
        this.backend.use('/api/mysql', this.mysqlRouter.router);
    }

    public start(){
        this.backend.listen(this.backend.get('port'), () => {
            console.log(`Server on port ${this.backend.get('port')}`);
        });
    }
}

const server = new Server();
server.start();